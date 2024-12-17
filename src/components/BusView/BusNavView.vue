<script setup lang="ts">
import { Bus } from '@/model';
import AddDeviceActionList from './AddDeviceActionList.vue';
import BusDeviceList from './DeviceList.vue';
// import AddDataActionList from './AddDataActionList.vue';
// import DatumList from './DatumList.vue';
import { jsonStringify } from '@/model/importlib';
import { ref } from 'vue';

const { bus } = defineProps<{ bus: Bus }>();

const blobUrl = ref('');

function exportModel() {
  const data = jsonStringify(bus.toExportObject());
  const blob = new Blob([data], { type: 'application/json' });
  blobUrl.value = URL.createObjectURL(blob);
  // window.location.href = blobUrl;
}

</script>

<template>
    <v-list class='flex-shrink-0 details-content' >
      <v-list class='flex-shrink-0'>
          <v-list-item
            @click='bus.reset()'
            prepend-icon="mdi-refresh"
          >
          Reset Local Data
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item
            @click='exportModel()'
            prepend-icon="mdi-export"
          >
          <a :href='blobUrl' download='model.json'>Export Data</a>
          </v-list-item>
          <v-list-item
            prepend-icon="mdi-play-box"
          >
          <route-name name='run'>Run Optimization</route-name>
          </v-list-item>
      </v-list>
      <v-divider></v-divider>
      <AddDeviceActionList :bus=bus></AddDeviceActionList>
      <v-divider></v-divider>
      <BusDeviceList :bus=bus></BusDeviceList>
      <!-- <v-divider></v-divider>
      <AddDataActionList></AddDataActionList>
      <v-divider></v-divider>
      <DatumList></DatumList> -->
    </v-list>
</template>

<style scoped>
  .v-card { padding: 1em }

  .details-content {
    max-height: 100%;
    flex-flow: nowrap;
    display: flex;
    flex-direction: column;
  }

  .v-btn {
    min-width: 1em;
    padding: 0;
    margin: 0;
  }
</style>