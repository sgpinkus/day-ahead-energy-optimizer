<script setup lang='ts'>
import { ref, defineProps } from 'vue';
import AppNavDrawer from '@/components/AppNavDrawer.vue';
import DeviceDescriptorsView from './DeviceDescriptorsView.vue';
import DeviceBoundsView from './DeviceBoundsView.vue';
import DeviceCBoundsView from './DeviceCBoundsView.vue';
import model from '@/model';
import router from '@/router';

type props = {
  id: string;
}
const tab = ref('bounds');
const { id: deviceId } = defineProps<props>();
const device = model.devices.getDevice(deviceId);
if(!device) router.dispatch({ name: 'resource-not-found', params: { resource: deviceId } });

</script>

<template>
  <AppNavDrawer>
    <route-path path='/'>
      <v-list-item prepend-icon='mdi-arrow-left'>Bus</v-list-item>
    </route-path>
    <v-divider></v-divider>
      <v-list class='flex-shrink-0'>
        <v-list-subheader>Device Components</v-list-subheader>
        <v-list-item prepend-icon='mdi-text-box-edit' @click='tab = "edit"'>Descriptors</v-list-item>
        <v-list-item prepend-icon='mdi-minus-box' @click='tab = "bounds"'>Bounds</v-list-item>
        <v-list-item prepend-icon='mdi-equal-box' @click='tab = "cbounds"'>CBounds</v-list-item>
        <v-list-item prepend-icon='mdi-function' @click='tab = "costs"'>Costs</v-list-item>
      </v-list>
  </AppNavDrawer>
  <v-main>
    <v-container class='container'>
      <h2>{{ device.title }}</h2>
      <DeviceDescriptorsView v-if='tab === "edit"' :device='device'></DeviceDescriptorsView>
      <DeviceBoundsView v-if='tab === "bounds"' :device='device'></DeviceBoundsView>
      <DeviceCBoundsView v-if='tab === "cbounds"' :device='device'></DeviceCBoundsView>
    </v-container>
  </v-main>
</template>

<style scoped>
  .v-divider {
    opacity: 50%;
  }

  .container {
    min-height: 100vh;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    padding: 1em;
    justify-content: stretch;
  }

  .bar-bar, .bar, .bar-circle {
    fill: steelblue;
  }
  .bar-active {
    fill: brown;
  }
  .axis--x path {
    display: none;
  }
</style>
