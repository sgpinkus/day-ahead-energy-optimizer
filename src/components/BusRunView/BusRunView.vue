<script setup lang="ts">
import { onMounted, ref, computed, type Ref } from 'vue';
import { getPyodide, pyodideLoadingStateCode, pyodideLoadingStateMessage } from '@/pyodide';
import AppNavDrawer from '@/components/AppNavDrawer.vue';
import RunList from './RunList.vue';
import loadScript from '@/python-scripts/load.py?raw';
import solveScript from '@/python-scripts/solve.py?raw';
import tablesScript from '@/python-scripts/tables.py?raw';
import plotsScript from '@/python-scripts/plots.py?raw';
import { NotFoundError } from '@/errors';
import model, { type OptimizationResult, Bus } from '@/model';
import md5 from 'md5';

const { id } = defineProps<{ id: string }>();
const bus = model.busses[id];
if (!bus) throw new NotFoundError();

const busExport = JSON.stringify(bus.toExportObject());
const busHash = md5(busExport);
const focusedId = ref(busHash);
const currentResult: Ref<OptimizationResult | undefined> = computed(() => model.optimizationResults[focusedId.value]);

const optimizationStateCode: Ref<'initial' | 'running' | 'done' | 'error'> = ref('initial');
const optimizationStateMessage = ref('');
const solverMessage = ref('');
const showLoading: Ref<boolean> = computed(() => {
  return ['loading', 'installing'].includes(pyodideLoadingStateCode.value) ||
  optimizationStateCode.value === 'running';
});
const stateMessage = computed(() => {
  if (optimizationStateCode.value !== 'initial') return optimizationStateMessage.value;
  return pyodideLoadingStateMessage.value;
});
const optimizationDisabled: Ref<boolean> = computed(() => pyodideLoadingStateCode.value !== 'ready' && optimizationStateCode.value !== 'running');
const plot1Src = computed(() => currentResult.value ? `data:image/png;base64,${currentResult.value?.data.plot1Image}` : undefined);

function newOptimizationResult(bus: Bus, data: OptimizationResult['data']) {
  const busExport = JSON.stringify(bus.toExportObject());
  const result = {
    id: md5(busExport),
    busId: bus.id,
    busExport,
    createdAt: (new Date()).toISOString(),
    data,
  };
  model.optimizationResults[result.id] = result;
  return result;
}

async function _run() {
  const pyodide = await getPyodide();
  const modelExport = bus.toExportObject();
  const load = pyodide.runPython(loadScript);
  const solve = pyodide.runPython(solveScript);
  const plots = pyodide.runPython(plotsScript);
  const tables = pyodide.runPython(tablesScript);
  const deviceset = load(JSON.stringify(modelExport));
  const [x, solveMeta] = solve(deviceset);
  solverMessage.value = solveMeta.message;
  console.log(x, solveMeta);
  if (solveMeta.success) {
    const [flowData, totalFlowsData, totalCostsData, flowDerivsData] = tables(deviceset, x);
    const [plot1Image, plot2Image] = plots(deviceset, x);
    newOptimizationResult(bus,  { flowData, totalFlowsData, totalCostsData, flowDerivsData, plot1Image, plot2Image });
  }
  // console.log(imageString.value);
}

function run() {
  optimizationStateMessage.value = 'Running Optimization';
  optimizationStateCode.value = 'running';

  setTimeout(() => {
      _run().then(() => {
      optimizationStateMessage.value = 'Finished: ' + solverMessage.value;
      optimizationStateCode.value = 'done';
    })
    .catch((e: any) => {
      optimizationStateMessage.value = 'Error: ' + e?.message;
      optimizationStateCode.value = 'error';
    });
  }, 100);
}

onMounted(() => {
  getPyodide();
});


</script>

<template>
  <AppNavDrawer>
    <route-path path="/">
      <v-list-item prepend-icon="mdi-arrow-left">
        Bus
      </v-list-item>
    </route-path>
    <v-divider />
    <v-list-item
      prepend-icon="mdi-play-box"
      :disabled="optimizationDisabled"
      @click="run"
    >
      Run Optimization
    </v-list-item>
    <RunList
      :bus="bus"
      @focused="(id) => focusedId = id"
    />
  </AppNavDrawer>
  <v-main>
    <v-container class="container">
      <div class="d-flex justify-center">
        {{ stateMessage }}&nbsp;
        <v-progress-circular
          v-if="showLoading"
          :size="25"
          color="primary"
          indeterminate
        />
      </div>
      <hr>
      <div class="image-container">
        <template v-if="currentResult">
          <img :src="plot1Src">
        </template>
        <template v-else>
          -
        </template>
      </div>
      <hr>
      <div v-if="currentResult">
        <h3>Device Flows:</h3>
        <div class="table-data">
          {{ currentResult.data.flowData }}
        </div>
        <h3>Supply Device Flow Derivatives (Marginal Cost):</h3>
        <div class="table-data">
          {{ currentResult.data.flowDerivsData }}
        </div>
        <h3>Total Device Flows:</h3>
        <div class="table-data">
          {{ currentResult.data.totalFlowsData }}
        </div>
        <h3>Total Supply Device Costs:</h3>
        <div class="table-data">
          {{ currentResult.data.totalCostsData }}
        </div>
      </div>
      <hr>
    </v-container>
  </v-main>
</template>

<style scoped>
  .container {
    min-height: 100vh;
    max-width: 1280px;
    display: flex;
    flex-flow: column nowrap;
    align-items: stretch;
    padding: 1em;
    justify-content: stretch;
  }
  .table-data {
    font: monospace;
    white-space: pre-wrap;
    overflow-x: scroll;
  }
  .image-container {
    margin: 1em auto;
  }
</style>


