<script setup lang='ts'>
import { ref, defineProps } from 'vue';
import AppNavDrawer from '@/components/AppNavDrawer.vue';
import DeviceDescriptorsView from './DeviceDescriptorsView.vue';
import DeviceBoundsView from './DeviceBoundsView.vue';
import DeviceCBoundsView from './DeviceCBoundsView.vue';
import DeviceFlowCostsView from './DeviceFlowCostsView.vue';
import DeviceParametersView from './DeviceParametersView.vue';
import model from '@/model';
import router from '@/router';

type props = {
  id: string;
}
const tab = ref('descriptors');
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
        <v-list-item prepend-icon='mdi-text-box-edit' @click='tab = "descriptors"'>Descriptors</v-list-item>
        <v-list-item v-if='!device.attrs.hideBounds' prepend-icon='mdi-minus-box' @click='tab = "bounds"'>Flow Bounds</v-list-item>
        <v-list-item v-if='!device.attrs.hideCBounds' prepend-icon='mdi-equal-box' @click='tab = "cbounds"'>Cumulative Flow Bounds</v-list-item>
        <v-list-item v-if='device.attrs.hasParameters' prepend-icon='mdi-function' @click='tab = "costs"'>Parameters</v-list-item>
        <v-list-group value="Costs">
          <template v-slot:activator="{ props }">
            <v-list-item
              v-bind="props"
              prepend-icon='mdi-function'
              title="Costs"
            ></v-list-item>
          </template>
          <v-list-item v-if='!device.attrs.hideCosts' prepend-icon='mdi-function' @click='tab = "costs"'>Flow Cost</v-list-item>
          <v-list-item v-if='!device.attrs.hideCosts' prepend-icon='mdi-function' @click='tab = "costs"'>Cumulative Flow Cost</v-list-item>
          <v-list-item v-if='!device.attrs.hideCosts' prepend-icon='mdi-function' @click='tab = "costs"'>Peak Flow Cost</v-list-item>
        </v-list-group>
      </v-list>
  </AppNavDrawer>
  <v-main>
    <v-container class='container'>
      <h2>{{ device.title }}</h2>
      <DeviceDescriptorsView v-if='tab === "descriptors"' :device='device'></DeviceDescriptorsView>
      <DeviceBoundsView v-if='tab === "bounds" && !device.attrs.hideBounds' :device='device'></DeviceBoundsView>
      <DeviceCBoundsView v-if='tab === "cbounds" && !device.attrs.hideCBounds' :device='device'></DeviceCBoundsView>
      <DeviceFlowCostsView v-if='tab === "costs" && !device.attrs.hideCosts' :device='device'></DeviceFlowCostsView>
      <DeviceParametersView v-if='tab === "costs" && device.attrs.hasParameters' :device='device'></DeviceParametersView>
    </v-container>
  </v-main>
</template>

<style scoped>
  .v-divider {
    opacity: 50%;
  }

  .container {
    min-height: 100vh;
    max-width: 960px;
    display: flex;
    flex-flow: column nowrap;
    align-items: stretch;
    padding: 1em;
    justify-content: stretch;
  }

  .v-list-group__items .v-list-item {
    padding-inline-start: calc(0px + var(--indent-padding)) !important;
  }
</style>
