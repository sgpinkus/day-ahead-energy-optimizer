<script setup lang="ts">
import { defineProps, ref, watch, type Ref } from 'vue';
import type { IBaseDevice } from '@/model/devices';
import { BoundsRunSpec, NumberRunSpecAdaptor } from '@/model/RunSpec';
import RunSpecGraphView from './RunSpecGraphView.vue';
import RunSpecTableView from './RunSpecTableView.vue';

const { device } = defineProps<{
  device: IBaseDevice,
}>();

// Computed doesn't work.
const numberRunSpecLow: Ref<NumberRunSpecAdaptor<[number, number]> | null> = ref(null);
const numberRunSpecHigh: Ref<NumberRunSpecAdaptor<[number, number]> | null> = ref(null);

function unSetCBounds() {
  device.cbounds = undefined; // eslint-disable-line vue/no-mutating-props
  numberRunSpecLow.value = null;
  numberRunSpecHigh.value = null;
}

function setCBounds() {
    device.cbounds = new BoundsRunSpec(device.basis, [0, 0] as [number, number], device.hardBounds); // eslint-disable-line vue/no-mutating-props
    numberRunSpecLow.value = new NumberRunSpecAdaptor<[number, number]>(device.cbounds, (x) => x[0], (y, i) => [y, device.cbounds!.get(i)[1]] as [number, number]);
    numberRunSpecHigh.value = new NumberRunSpecAdaptor<[number, number]>(device.cbounds, (x) => x[1], (y, i) => [device.cbounds!.get(i)[0], y] as [number, number]);
}

// This should fire when ever device.cbounds is mutated but doesn't
watch(ref(device.cbounds), () => {
  if(device.cbounds) {
    numberRunSpecLow.value = new NumberRunSpecAdaptor<[number, number]>(device.cbounds, (x) => x[0], (y, i) => [y, device.cbounds!.get(i)[1]] as [number, number]);
    numberRunSpecHigh.value = new NumberRunSpecAdaptor<[number, number]>(device.cbounds, (x) => x[1], (y, i) => [device.cbounds!.get(i)[0], y] as [number, number]);
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
  <template v-if='device.cbounds'>
    <v-card>
      <h3>Bounds</h3>
      <RunSpecTableView :run-spec=device.cbounds :value-spec='tableValueSpec'>
        <template v-slot:globals>
          <v-btn flat size="small" @click='unSetCBounds' title='delete bounds entirely'><v-icon>mdi-delete</v-icon></v-btn>
        </template>
      </RunSpecTableView>
    </v-card>
    <v-card>
      <h3>Upper bounds</h3>
      <RunSpecGraphView v-if='numberRunSpecHigh' :run-spec='numberRunSpecHigh' :options='{ hEditable: true, vEditable: true }' ></RunSpecGraphView>
    </v-card>
    <v-card>
      <h3>Lower bounds</h3>
      <RunSpecGraphView v-if='numberRunSpecLow' :run-spec='numberRunSpecLow' :options='{ hEditable: true, vEditable: true }' ></RunSpecGraphView>
    </v-card>
  </template>
  <template v-else>
    <v-card class='ma-auto'>
      <v-btn @click='setCBounds'>Set Cummulative Bounds</v-btn>
    </v-card>
  </template>
</template>

<style scoped>
  .v-card {
    margin: 1em;

  }
</style>