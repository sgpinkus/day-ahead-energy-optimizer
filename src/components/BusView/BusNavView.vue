<script setup lang="ts">
import { Bus } from '@/model';
import AddDeviceActionList from './AddDeviceActionList.vue';
import BusDeviceList from './DeviceList.vue';
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

function importDevice() {
}

</script>

<template>
  <v-list class="flex-shrink-0 details-content">
    <v-list class="flex-shrink-0">
      <v-list-item
        prepend-icon="mdi-refresh"
        @click="bus.reset()"
      >
        Reset Bus Data
      </v-list-item>
      <v-divider />
      <v-list-item
        prepend-icon="mdi-application-export"
        @click="exportModel()"
      >
        <a
          :href="blobUrl"
          :download="`bus-${bus.id}.json`"
        >Export Bus</a>
      </v-list-item>
      <v-divider />
      <v-list-item
        prepend-icon="mdi-application-import"
        @click="importDevice()"
      >
        Import Device
      </v-list-item>
      <v-list-item
        prepend-icon="mdi-play-box"
      >
        <route-name
          name="run"
          :params="{ id: bus.id }"
        >
          Run Optimization
        </route-name>
      </v-list-item>
    </v-list>
    <v-divider />
    <AddDeviceActionList :bus="bus" />
    <v-divider />
    <BusDeviceList :bus="bus" />
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