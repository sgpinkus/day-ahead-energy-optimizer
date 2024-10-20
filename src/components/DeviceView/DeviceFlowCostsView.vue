<script setup lang="ts">
import { computed, defineProps, nextTick, onMounted, ref, shallowRef, toRaw, useTemplateRef, watch, type ComputedRef, type Ref } from 'vue';
import * as d3 from 'd3';
import type { IBaseDevice } from '@/model/devices';
import { RunSpec } from '@/model/RunSpec';
// import RunSpecGraphView from './RunSpecGraphView.vue';
import RunSpecTableView from './RunSpecTableView.vue';
import { draw } from '@/components/components/Plot';
import { cloneDeep } from 'lodash';

const { device } = defineProps<{
  device: IBaseDevice,
}>();

function unSet() {
  device.costs.flow = undefined; // eslint-disable-line vue/no-mutating-props
}

function set() {
  device.costs.flow = new RunSpec(device.basis, [0, 0, 0] as [number, number, number]); // eslint-disable-line vue/no-mutating-props
}

const plot = useTemplateRef('plot');

function _draw() {
  if(!plot.value) return console.debug('Not drawing because plot container ref is null!');
  if(!data.value) return console.debug('Not drawing because data is null!');
  d3.select(plot.value).selectAll('*').remove();
  draw(plot.value, data.value);
}

onMounted(() => {
  _draw();
});

const viewBox = '0 0 1280 480';

const tableValueSpec = [
  { label: 'a', min: 0, max: 1e3, step: 0.01 },
  { label: 'b', min: 0, max: 1e3, step: 0.01 },
  { label: 'o', min: -1e3, max: 1e3, step: 0.01 },
];

const ranges = computed(() => device.costs.flow?.toRanges() || null);
const selectedRow: Ref<number | null> = ref(null);
const selectedRange = computed(() => ranges.value && ranges.value.length && selectedRow.value !== null && ranges.value[selectedRow.value] || null);
const domainBounds: ComputedRef<number[]> = computed(() => {
  if(device.bounds) {
    const values = device.bounds.toRanges().map(([_v, ranges]) => ranges).flat();
    return [Math.min(...values), Math.max(...values)];
  }
  return device.hardBounds;
});
const domain = computed(() => linspace(...(domainBounds.value as [number, number])));
const data: Ref<number[] | null> = ref(domain.value.map(() => 0));

watch(selectedRange, () => {
  const params = selectedRange.value ? selectedRange.value[0] : undefined;
  console.debug('selectedRange changed. New params', cloneDeep(params));
  const f: (...a: any[]) => number = params ? fx(params) : () => 0;
  data.value = domain.value.map(v => f(v));
});

watch(ranges, (_n, o) => {
  if(!o) nextTick(_draw);
});

watch(data, () => {
  if(data.value) _draw();
});

function linspace(a: number, b: number, n = 50) {
  // If a === b we get a repeated n times.
  if(!n) return [];
  const delta = (b - a)/n;
  const domain = [];
  for(let i = 0; i < n; i++) {
    domain.push(a + i*delta);
  }
  return domain;
}

function fx([a, b, o]: [number, number, number]) {
  return (x: number) => a*(x + o)**2 + b*(x + o);
}

</script>

<template>
  <template v-if='device.costs.flow'>
    <v-card>
      <h3>Flow Cost</h3>
      <RunSpecTableView
        :run-spec='device.costs.flow'
        :value-spec='tableValueSpec'
        :focusable='true'
        @row-selected='(i: number | null) => selectedRow = i'
      >
        <template v-slot:globals>
          <v-btn flat size="small" @click='unSet' title='delete bounds entirely'><v-icon>mdi-delete</v-icon></v-btn>
        </template>
      </RunSpecTableView>
    </v-card>
    <v-card>
      <svg
        ref='plot'
        :viewBox=viewBox
        preserveAspectRatio="xMidYMid meet"
      >
      </svg>
    </v-card>
  </template>
  <template v-else>
    <v-card class='ma-auto'>
      <v-btn @click='set'>Set Flow Costs</v-btn>
    </v-card>
  </template>
</template>

<style scoped>
  .v-card {
    margin: 1em;
  }
</style>