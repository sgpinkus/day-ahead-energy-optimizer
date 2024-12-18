<script setup lang="ts">
import { setupPyodide, type Pyodide } from '@/setup-pyodide';
import { onMounted, ref, computed, type Ref } from 'vue';
import AppNavDrawer from '@/components/AppNavDrawer.vue';
import loadScript from '@/python-scripts/load.py?raw';
import solveScript from '@/python-scripts/solve.py?raw';
import tablesScript from '@/python-scripts/tables.py?raw';
import plotsScript from '@/python-scripts/plots.py?raw';
import { NotFoundError } from '@/errors';
import model from '@/model';

const { id } = defineProps<{ id: string }>();
const bus = model.busses[id];
if (!bus) throw new NotFoundError();

let pyodide: Pyodide;
const loadingStateMessage = ref('');
const loadingStateCode = ref(0);
const optimizationStateMessage = ref('');
const isWorking: Ref<boolean> = computed(() => loadingStateCode.value >= 0);
const flowData = ref('');
const totalFlowsData = ref('');
const totalCostsData = ref('');
const flowDerivsData = ref('');
const plot1Image = ref('');
const plot1Src = computed(() => `data:image/png;base64,${plot1Image.value}`);
const plot2Image = ref('');

function pyodideLoadingStateCallback(code: number, name: string) {
  loadingStateCode.value = code;
  loadingStateMessage.value = name;
}

function run() {
  const modelExport = bus.toExportObject();
  const load = pyodide.runPython(loadScript);
  const solve = pyodide.runPython(solveScript);
  const plots = pyodide.runPython(plotsScript);
  const tables = pyodide.runPython(tablesScript);
  const deviceset = load(JSON.stringify(modelExport));
  const [x, solveMeta] = solve(deviceset);
  optimizationStateMessage.value = solveMeta.message;
  console.log(x, solveMeta);
  if (solveMeta.success) {
    [flowData.value, totalFlowsData.value, totalCostsData.value, flowDerivsData.value] = tables(deviceset, x);
    [plot1Image.value, plot2Image.value] = plots(deviceset, x);
  }
  // console.log(imageString.value);
}

onMounted(async () => {
  try {
    pyodide = await setupPyodide(pyodideLoadingStateCallback);
    loadingStateMessage.value = 'Running Optimization';
    run();
    loadingStateMessage.value = 'Finished: ' + optimizationStateMessage.value;
  } catch (e: any) {
    loadingStateMessage.value = 'Error: ' + e?.message;
    loadingStateCode.value = -1;
  }
  loadingStateCode.value = -1;
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
  </AppNavDrawer>
  <v-main>
    <v-container class="container">
      <div>
        {{ loadingStateMessage }}
        <v-progress-circular
          v-if="isWorking"
          :size="25"
          color="primary"
          indeterminate
        />
      </div>
      <div class="image-container">
        <template v-if="plot1Image">
          <img :src="plot1Src">
        </template>
        <template v-else>
          -
        </template>
      </div>
      <hr>
      <div v-if="flowData">
        <h3>Device Flows:</h3>
        <div class="table-data">
          {{ flowData }}
        </div>
        <h3>Supply Device Flow Derivatives (Marginal Cost):</h3>
        <div class="table-data">
          {{ flowDerivsData }}
        </div>
        <h3>Total Device Flows:</h3>
        <div class="table-data">
          {{ totalFlowsData }}
        </div>
        <h3>Total Supply Device Costs:</h3>
        <div class="table-data">
          {{ totalCostsData }}
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


