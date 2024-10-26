<script setup lang="ts">
import model from '@/model';
import AddDeviceActionList from './AddDeviceActionList.vue';
import AddDataActionList from './AddDataActionList.vue';
import DeviceList from './DeviceList.vue';
import DatumList from './DatumList.vue';
import { jsonStringify } from '@/model/importlib';


function exportModel() {
  const data = jsonStringify(model.devices.toExportObject());
  const blob = new Blob([data], { type: 'application/json' });
  const blobUrl = URL.createObjectURL(blob);
  window.location.href = blobUrl;
}

</script>

<template>
    <v-list class='flex-shrink-0 details-content' >
      <v-list class='flex-shrink-0'>
          <v-list-item
            @click='model.reset()'
            prepend-icon="mdi-refresh"
          >
          Reset Local Data
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item
            @click='exportModel()'
            prepend-icon="mdi-export"
          >
          Export Data
          </v-list-item>
      </v-list>
      <v-divider></v-divider>
      <AddDeviceActionList></AddDeviceActionList>
      <v-divider></v-divider>
      <DeviceList></DeviceList>
      <v-divider></v-divider>
      <AddDataActionList></AddDataActionList>
      <v-divider></v-divider>
      <DatumList></DatumList>
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