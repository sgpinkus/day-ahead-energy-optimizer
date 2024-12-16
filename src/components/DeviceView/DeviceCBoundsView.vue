<script setup lang="ts">
import { defineProps, ref, watch, type Ref } from 'vue';
import type { IBaseDevice } from '@/model/device';
import { BoundsRunSpec, NumberRunSpecAdaptor } from '@/model/runspec';
import RunSpecGraphView from '@/components/components/RunSpecGraphView.vue';
import RunSpecTableView from './RunSpecTableView.vue';

const { device } = defineProps<{
  device: IBaseDevice,
}>();

// Computed doesn't work.
const numberRunSpecLow: Ref<NumberRunSpecAdaptor<[number, number]> | null> = ref(null);
const numberRunSpecHigh: Ref<NumberRunSpecAdaptor<[number, number]> | null> = ref(null);

function unSet() {
  device.cumulative_bounds = undefined; // eslint-disable-line vue/no-mutating-props
  numberRunSpecLow.value = null;
  numberRunSpecHigh.value = null;
}

function set() {
    device.cumulative_bounds = new BoundsRunSpec(device.basis, [0, 0] as [number, number], device.hardBounds); // eslint-disable-line vue/no-mutating-props
    numberRunSpecLow.value = new NumberRunSpecAdaptor<[number, number]>(device.cumulative_bounds, (x) => x[0], (y, i) => [y, device.cumulative_bounds!.get(i)[1]] as [number, number]);
    numberRunSpecHigh.value = new NumberRunSpecAdaptor<[number, number]>(device.cumulative_bounds, (x) => x[1], (y, i) => [device.cumulative_bounds!.get(i)[0], y] as [number, number]);
}

// This should fire when ever device.cbounds is mutated but doesn't
watch(ref(device.cumulative_bounds), () => {
  if(device.cumulative_bounds) {
    numberRunSpecLow.value = new NumberRunSpecAdaptor<[number, number]>(device.cumulative_bounds, (x) => x[0], (y, i) => [y, device.cumulative_bounds!.get(i)[1]] as [number, number]);
    numberRunSpecHigh.value = new NumberRunSpecAdaptor<[number, number]>(device.cumulative_bounds, (x) => x[1], (y, i) => [device.cumulative_bounds!.get(i)[0], y] as [number, number]);
  } else {
    numberRunSpecLow.value = null;
    numberRunSpecHigh.value = null;
  }
}, {
  immediate: true
});

const tableValueSpec = [
  { label: 'low', min: device.hardBounds[0], max: device.hardBounds[1], step: 0.01 },
  { label: 'high', min: device.hardBounds[0], max: device.hardBounds[1], step: 0.01 },
];

</script>

<template>
  <template v-if='device.cumulative_bounds'>
    <v-card>
      <h3>Cumulative Bounds</h3>
      <RunSpecTableView :run-spec=device.cumulative_bounds :value-spec='tableValueSpec'>
        <template v-slot:globals>
          <v-btn flat size="small" @click='unSet' title='delete bounds entirely'><v-icon>mdi-delete</v-icon></v-btn>
        </template>
      </RunSpecTableView>
    </v-card>
    <v-card>
      <h3>Cumulative upper bounds</h3>
      <RunSpecGraphView v-if='numberRunSpecHigh' :run-spec='numberRunSpecHigh' :options='{ hEditable: true, vEditable: true }' ></RunSpecGraphView>
    </v-card>
    <v-card>
      <h3>Cumulative lower bounds</h3>
      <RunSpecGraphView v-if='numberRunSpecLow' :run-spec='numberRunSpecLow' :options='{ hEditable: true, vEditable: true }' ></RunSpecGraphView>
    </v-card>
  </template>
  <template v-else>
    <v-card class='ma-auto'>
      <v-btn @click='set'>Set Cumulative Bounds</v-btn>
    </v-card>
  </template>
</template>

<style scoped>
  .v-card {
    margin: 1em;

  }
</style>