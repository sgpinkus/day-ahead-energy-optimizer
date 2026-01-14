<script setup lang="ts">
import { onMounted, ref, computed, type Ref, watch } from 'vue';
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
import { jsonStringify } from '@/model/importlib';

const { id } = defineProps<{ id: string }>();
const bus = model.busses[id];
if (!bus) throw new NotFoundError();

const busExport = JSON.stringify(bus.toExportObject());
const busHash = md5(busExport);
const focusedId = ref(busHash);
const currentResult: Ref<OptimizationResult | undefined> = computed(() => model.optimizationResults[focusedId.value]);

const blobUrl = ref('');
function exportModel() {
  const data = jsonStringify(bus.toExportObject());
  const blob = new Blob([data], { type: 'application/json' });
  blobUrl.value = URL.createObjectURL(blob);
}

const optimizationStateCode: Ref<'initial' | 'running' | 'success' | 'error'> = ref('initial');
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
}

function run() {
  optimizationStateMessage.value = 'Running Optimization';
  optimizationStateCode.value = 'running';

  setTimeout(() => {
      _run().then(() => {
      optimizationStateMessage.value = 'Finished: ' + solverMessage.value;
      optimizationStateCode.value = 'success';
    })
    .catch((e: any) => {
      optimizationStateMessage.value = 'Error: ' + e?.message;
      optimizationStateCode.value = 'error';
      console.error(e);
    });
  }, 100);
}

onMounted(() => {
  getPyodide();
});

</script>

<template>
  <AppNavDrawer>
    <route-name
      name="bus"
      :params="{ id: bus.id }"
    >
      <v-list-item prepend-icon="mdi-arrow-left">
        Bus
      </v-list-item>
    </route-name>
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
      <h2>Overview</h2>
      <div>
        <v-list>
          <v-list-item
            title="Optimization Status"
          >
            <v-list-item-subtitle>
              {{ stateMessage }}&nbsp;
              <v-progress-circular
                v-if="showLoading"
                :size="25"
                color="primary"
                indeterminate
              />
            </v-list-item-subtitle>
          </v-list-item>
          <v-list-item
            title="Title"
            :subtitle="bus.title || bus.id"
          />
          <v-list-item
            v-if="currentResult"
            title="Version"
          >
            <v-list-item-subtitle>
              <a
                :href="blobUrl"
                :download="`bus-${bus.id}.json`"
                @click="exportModel()"
              >{{ currentResult?.id || '-' }} </a>
            </v-list-item-subtitle>
          </v-list-item>
        </v-list>
      </div>
      <h2>Optimization Results</h2>
      <div class="image-container">
        <template v-if="currentResult">
          <img :src="plot1Src">
        </template>
        <template v-else>
          -
        </template>
      </div>
      <div v-if="currentResult">
        <v-list-item>
          <v-list-item-title>Device Flows:</v-list-item-title>
          <v-list-item-subtitle>
            <pre class="table-data">{{ currentResult.data.flowData }}</pre>
          </v-list-item-subtitle>
        </v-list-item>
        <v-list-item>
          <v-list-item-title>Supply Device Flow Derivatives (Marginal Cost):</v-list-item-title>
          <v-list-item-subtitle>
            <pre class="table-data">{{ currentResult.data.flowDerivsData }}</pre>
          </v-list-item-subtitle>
        </v-list-item>
        <v-list-item>
          <v-list-item-title>Total Device Flows:</v-list-item-title>
          <v-list-item-subtitle>
            <pre class="table-data">{{ currentResult.data.totalFlowsData }}</pre>
          </v-list-item-subtitle>
        </v-list-item>
        <v-list-item>
          <v-list-item-title>Total Supply Device Costs:</v-list-item-title>
          <v-list-item-subtitle>
            <pre class="table-data">{{ currentResult.data.totalCostsData }}</pre>
          </v-list-item-subtitle>
        </v-list-item>
      </div>
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


