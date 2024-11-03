<script setup lang="ts">
import { setupPyodide, type Pyodide } from '@/setup-pyodide';
import { onMounted, ref, computed, type Ref } from 'vue';
import model from '@/model';
import AppNavDrawer from '@/components/AppNavDrawer.vue';
import loadScript from '@/python-scripts/load.py?raw';
import solveScript from '@/python-scripts/solve.py?raw';
import tablesScript from '@/python-scripts/tables.py?raw';
import plotsScript from '@/python-scripts/plots.py?raw';
// import x from '@/assets/';

let pyodide: Pyodide;
const loadingStateMessage = ref('');
const loadingStateCode = ref(0);
const optimizationStateMessage = ref('');
const isWorking: Ref<boolean> = computed(() => loadingStateCode.value >= 0);
const tableData = ref('');
const cumulativeTableData = ref('');
const plot1Image = ref('');
const plot1Src = computed(() => `data:image/png;base64,${plot1Image.value}`);
const plot2Image = ref('');
const plot2Src = computed(() => `data:image/png;base64,${plot2Image.value}`);

function pyodideLoadingStateCallback(code: number, name: string) {
  loadingStateCode.value = code;
  loadingStateMessage.value = name;
}

function run() {
  const modelExport = model.toExportObject();
  const load = pyodide.runPython(loadScript);
  const solve = pyodide.runPython(solveScript);
  const plots = pyodide.runPython(plotsScript);
  const tables = pyodide.runPython(tablesScript);
  const deviceset = load(JSON.stringify(modelExport));
  const [x, solveMeta] = solve(deviceset);
  optimizationStateMessage.value = solveMeta.message;
  console.log(x, solveMeta);
  if(solveMeta.success) {
    [tableData.value, cumulativeTableData.value] = tables(deviceset, x);
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
  } catch(e: any) {
    loadingStateMessage.value = 'Error: ' + e?.message;
    loadingStateCode.value = -1;
  }
  loadingStateCode.value = -1;
});

</script>

<template>
  <AppNavDrawer>
    <route-path path='/'>
      <v-list-item prepend-icon='mdi-arrow-left'>Bus View</v-list-item>
    </route-path>
    <v-divider></v-divider>  </AppNavDrawer>
  <v-main>
    <v-container class='container'>
      <div>
        {{ loadingStateMessage }}
            <v-progress-circular v-if=isWorking
              :size="25"
              color="primary"
              indeterminate
            ></v-progress-circular>
      </div>
      <hr>
      <div v-if='tableData'>
        <h3>Results Data</h3>
        <div class='table-data'>
          {{ tableData }}
        </div>
        <h3>Cumulative Results Data</h3>
        <div class='table-data'>
          {{ cumulativeTableData }}
        </div>
      </div>
      <hr>
      <v-table>
        <tr>
          <td>
            <template v-if='plot1Image'>
              <img :src='plot1Src' />
            </template>
            <template v-else>
                -
            </template>
          </td>
          <td>
            <template v-if='plot2Image'>
              <img :src='plot2Src' />
            </template>
            <template v-else>
                -
            </template>
          </td>
        </tr>
      </v-table>
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
    border: solid 1px green;
  }
  .table-data {
    font: monospace;
    white-space: pre-wrap;
    overflow-x: scroll;
    margin-top: 1em;
    margin-bottom: 1em;
  }
</style>


