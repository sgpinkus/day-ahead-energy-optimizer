<script setup lang='ts'>
import { computed, ref } from 'vue';
import LocalStorageNotice from './LocalStorageNotice.vue';
import SystemBar from './SystemBar.vue';
import AppNavDrawer from './AppNavDrawer.vue';
import ActionBar from './ActionBar.vue';
import AddDeviceActionList from './AddDeviceActionList.vue';
import DeviceList from './DeviceList.vue';
import Bus from './Bus.vue';
import model from '@/model';

const rail = computed(() => model.rail);
const devices = model.devices;
const showObjectList = ref(true);

</script>

<template>
  <system-bar></system-bar>
  <AppNavDrawer>
      <div class='details-content'>
        <AddDeviceActionList></AddDeviceActionList>
        <v-divider></v-divider>
        <DeviceList></DeviceList>
        <v-divider></v-divider>
      </div>
  </AppNavDrawer>
  <v-main>
    <v-container fluid class='d-flex align-content-center flex-column h-100 ma-auto'><Bus></Bus></v-container>
    <ActionBar></ActionBar>
  </v-main>
</template>

<style scoped>
  .v-card { padding: 1em }

  .details-content {
    max-height: 100%;
    flex-flow: nowrap;
    display: flex;
    flex-direction: column;
  }

  .v-divider {
    opacity: 50%;
  }

  .v-btn {
    min-width: 1em;
    padding: 0;
    margin: 0;
  }
</style>
