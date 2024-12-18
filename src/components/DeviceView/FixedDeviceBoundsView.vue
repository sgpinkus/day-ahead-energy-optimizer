<script setup lang="ts">
import { defineProps, ref, watch, type Ref } from 'vue';
import type { IBaseDevice } from '@/model/device';
import { NumberRunSpecAdaptor } from '@/model/runspec';
import RunSpecTableView from './RunSpecTableView.vue';
import RunSpecGraphView from '@/components/components/RunSpecGraphView.vue';

const { device } = defineProps<{
  device: IBaseDevice,
}>();

// Computed doesn't work.
const numberRunSpecLow: Ref<NumberRunSpecAdaptor<[number, number]> | null> = ref(null);
const numberRunSpecHigh: Ref<NumberRunSpecAdaptor<[number, number]> | null> = ref(null);
watch(device.bounds, () => {
  console.log('watch triggered, setting new runSpec adaptros');
  numberRunSpecLow.value = new NumberRunSpecAdaptor<[number, number]>(device.bounds, (x) => x[0], (y) => [y, y] as [number, number]);
  numberRunSpecHigh.value = new NumberRunSpecAdaptor<[number, number]>(device.bounds, (x) => x[1], (y) => [y, y] as [number, number]);
}, {
  immediate: true,
});

const tableValueSpec = [
  { label: 'low', min: device.hardBounds[0], max: device.hardBounds[1], step: 0.01 },
  { label: 'value', min: device.hardBounds[0], max: device.hardBounds[1], step: 0.01 },
];

</script>

<template>
  <v-card>
    <h3>Device Load Profile</h3>
    <RunSpecTableView
      :run-spec="device.bounds"
      :value-spec="tableValueSpec"
    />
    <br>
    <RunSpecGraphView
      :run-spec="numberRunSpecHigh!"
      :options="{ hEditable: true, vEditable: true }"
    />
  </v-card>
</template>

<style scoped>
  .v-card {
    margin: 1em;

  }
</style>