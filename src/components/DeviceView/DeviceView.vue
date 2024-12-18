<script setup lang='ts'>
import { ref, defineProps } from 'vue';
import AppNavDrawer from '@/components/AppNavDrawer.vue';
import DeviceDescriptorsView from './DeviceDescriptorsView.vue';
import DeviceBoundsView from './DeviceBoundsView.vue';
import FixedDeviceBoundsView from './FixedDeviceBoundsView.vue';
import DeviceCBoundsView from './DeviceCBoundsView.vue';
import DeviceFlowCostsView from './DeviceCostsFlowView.vue';
import DeviceCFlowCostsView from './DeviceCostsCFlowView.vue';
import DevicePFlowCostsView from './DeviceCostsPFlowView.vue';
import DeviceCostsBoundsRelativeFlow from './DeviceCostsBoundsRelativeFlow.vue';
import DeviceCostsCBoundsRelativeFlow from './DeviceCostsCBoundsRelativeFlow.vue';
import DeviceParametersView from './DeviceParametersView.vue';
import model from '@/model';
import type { ICosts } from '@/model/device';
import { NotFoundError } from '@/errors';

const tab = ref('descriptors');
const { id: deviceId } = defineProps<{ id: string }>();
const device = model.devices[deviceId];
if(!device) throw new NotFoundError();

function boundsView() {
  switch(device.type) {
    case 'fixed_load':
      return FixedDeviceBoundsView;
    default:
      return DeviceBoundsView;
  }
}

function costStatusIcon(type: keyof ICosts) {
  return device.costs[type] ? 'mdi-checkbox-outline' : '-';
}

</script>

<template>
  <AppNavDrawer>
    <route-name name='bus' :params="{ id: device.busId }">
      <v-list-item prepend-icon='mdi-arrow-left'>Bus</v-list-item>
    </route-name>
    <v-divider></v-divider>
    <v-list class='flex-shrink-0 device-components'>
      <template v-if=true>
        <v-list-item prepend-icon='mdi-text-box-edit' @click='tab = "descriptors"'>Descriptors</v-list-item>
        <v-divider></v-divider>
      </template>
      <template v-if='!device.attrs.hideBounds'>
        <v-list-item prepend-icon='mdi-minus-box' @click='tab = "bounds"'>Flow Bounds</v-list-item>
        <v-divider></v-divider>
      </template>
      <template v-if='!device.attrs.hideCBounds'>
        <v-list-item prepend-icon='mdi-equal-box' @click='tab = "cbounds"'>Cumulative Flow Bounds</v-list-item>
        <v-divider></v-divider>
      </template>
      <template v-if='device.attrs.hasParameters'>
        <v-list-item prepend-icon='mdi-code-braces' @click='tab = "params"'>Parameters</v-list-item>
        <v-divider></v-divider>
      </template>
      <template v-if='!device.attrs.hideCosts'>
        <v-list-group value="Costs" >
          <template v-slot:activator="{ props }">
            <v-list-item
              v-bind="props"
              prepend-icon='mdi-function'
              title="Costs"
            ></v-list-item>
          </template>
          <v-list-item prepend-icon='mdi-function' :append-icon='costStatusIcon("flow")' @click='tab = "costs"'>Flow Cost</v-list-item>
          <v-list-item prepend-icon='mdi-function' :append-icon='costStatusIcon("flow_bounds_relative")' @click='tab = "brcosts"'>Bounds Relative Flow Cost</v-list-item>
          <v-list-item prepend-icon='mdi-function' :append-icon='costStatusIcon("cumulative_flow")' @click='tab = "ccosts"'>Cumulative Flow Cost</v-list-item>
          <v-list-item prepend-icon='mdi-function' :append-icon='costStatusIcon("cumulative_flow_bounds_relative")' @click='tab = "brccosts"'>Cumulative Bounds Relative Flow Cost</v-list-item>
          <v-list-item prepend-icon='mdi-function' :append-icon='costStatusIcon("peak_flow")' @click='tab = "pcosts"'>Peak Flow Cost</v-list-item>
        </v-list-group>
      </template>
      <v-divider></v-divider>
    </v-list>
  </AppNavDrawer>
  <v-main>
    <v-container class='container'>
      <h2>{{ device.title }}</h2>
      <DeviceDescriptorsView v-if='tab === "descriptors"' :device='device'></DeviceDescriptorsView>
      <component :is='boundsView()' v-if='tab === "bounds" && !device.attrs.hideBounds' :device='device'></component>
      <DeviceCBoundsView v-if='tab === "cbounds" && !device.attrs.hideCBounds' :device='device'></DeviceCBoundsView>
      <DeviceParametersView v-if='tab === "params" && device.attrs.hasParameters' :device='device'></DeviceParametersView>
      <DeviceFlowCostsView v-if='tab === "costs" && !device.attrs.hideCosts' :device='device'></DeviceFlowCostsView>
      <DeviceCostsBoundsRelativeFlow v-if='tab === "brcosts" && !device.attrs.hideCosts' :device='device'></DeviceCostsBoundsRelativeFlow>
      <DeviceCostsCBoundsRelativeFlow v-if='tab === "brccosts" && !device.attrs.hideCosts' :device='device'></DeviceCostsCBoundsRelativeFlow>
      <DeviceCFlowCostsView v-if='tab === "ccosts" && !device.attrs.hideCosts' :device='device'></DeviceCFlowCostsView>
      <DevicePFlowCostsView v-if='tab === "pcosts" && !device.attrs.hideCosts' :device='device'></DevicePFlowCostsView>
    </v-container>
  </v-main>
</template>

<style scoped>
  .container {
    min-height: 100vh;
    max-width: 960px;
    display: flex;
    flex-flow: column nowrap;
    align-items: stretch;
    padding: 1em;
    justify-content: stretch;
  }
  /* .device-components > .v-list-item, .device-components > .v-list-group { border-bottom: solid 1px gray; } */
</style>
