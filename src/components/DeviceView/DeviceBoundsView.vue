<script setup lang="ts">
import { defineProps, ref, watch, type Ref } from 'vue';
import type { IBaseDevice } from '@/model/devices';
import { NumberRunSpecAdaptor } from '@/model/RunSpec';
import RunSpecTableView from './RunSpecTableView.vue';
import RunSpecGraphView from './RunSpecGraphView.vue';

const { device } = defineProps<{
  device: IBaseDevice,
}>();

// Computed doesn't work.
const numberRunSpecLow: Ref<NumberRunSpecAdaptor<[number, number]> | null> = ref(null);
const numberRunSpecHigh: Ref<NumberRunSpecAdaptor<[number, number]> | null> = ref(null);
watch(device.bounds, () => {
  numberRunSpecLow.value = new NumberRunSpecAdaptor<[number, number]>(device.bounds, (x) => x[0], (y, i) => [y, device.bounds.get(i)[1]] as [number, number]);
  numberRunSpecHigh.value = new NumberRunSpecAdaptor<[number, number]>(device.bounds, (x) => x[1], (y, i) => [device.bounds.get(i)[0], y] as [number, number]);
}, {
  immediate: true
});


</script>

<template>
  <v-card>
    <h3>Bounds</h3>
    <RunSpecTableView :device=device></RunSpecTableView>
  </v-card>
  <v-card>
    <h3>Upper bounds</h3>
    <RunSpecGraphView :run-spec='numberRunSpecHigh!' :options='{ hEditable: true, vEditable: true }' ></RunSpecGraphView>
  </v-card>
  <v-card>
    <h3>Lower bounds</h3>
    <RunSpecGraphView :run-spec='numberRunSpecLow!' :options='{ hEditable: true, vEditable: true }' ></RunSpecGraphView>
  </v-card>
</template>

<style scoped>
  .v-card {
    margin: 1em;

  }

  hr {
    padding: 1em;
    visibility: hidden;
  }
</style>