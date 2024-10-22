<script setup lang="ts">
// (x_h - x_l)*np.poly1d([(d0 - d1)/2, d1, 0])((x - x_l)/(x_h - x_l))
import { computed, defineProps, ref, watch, type Ref } from 'vue';
import type { BaseDevice } from '@/model/devices';
import { setDialog } from '@/model/infos';
import { BoundsRunSpec } from '@/model/RunSpec';
import RunSpecTableView from './RunSpecTableView.vue';
import PlotView from './PlotView.vue';
import { cloneDeep } from 'lodash';
import { linspace, boundsRelativeQuadratic } from '@/utils';

const costKey = 'flow_bounds_relative';
const title = 'Bounds Relative Flow Costs';

const { device } = defineProps<{
  device: BaseDevice,
}>();

function unSet() {
  device.costs[costKey] = undefined; // eslint-disable-line vue/no-mutating-props
}

function set() {
  if(device.hardBounds[0] !== 0) throw new Error('Bounds relative costs not supported for this device type currently');
  device.costs[costKey] = new BoundsRunSpec(device.basis, [0, 0], priceHardBounds); // eslint-disable-line vue/no-mutating-props
}


const priceHardBounds: [number, number] = [-1e3, 1e3];
const tableValueSpec = [
  { label: 'price at min', min: -1e3, max: 1e3, step: 0.01 },
  { label: 'price at max', min: -1e3, max: 1e3, step: 0.01 },
  // { label: 'o', min: -1e3, max: 1e3, step: 0.01 },
];
const ranges = computed(() => device.costs[costKey]?.toRanges() || null);
const selectedRow: Ref<number | null> = ref(null);
const selectedRange = computed(() => ranges.value && ranges.value.length && selectedRow.value !== null && ranges.value[selectedRow.value] || null);
const domain = linspace(0, 1);
const data: Ref<Record<string | number, number> | null> = ref(Object.fromEntries(domain.map((v) => [v, 0])));

watch(selectedRange, () => {
  const params = selectedRange.value ? selectedRange.value[0] : undefined;
  console.debug('selectedRange changed. New params', cloneDeep(params));
  const f: (...a: any[]) => number = params ? boundsRelativeQuadratic(params[0], params[1], 0, 1) : () => 0;
  data.value = Object.fromEntries(domain.map(v => [v, f(v)]));
}, {
  immediate: true
});
</script>

<template>
  <template v-if='device.costs[costKey]'>
    <v-card>
      <h3>{{ title }}<v-icon @click='setDialog("FlowBoundsRelative")' size='18'>mdi-information</v-icon></h3>
      <RunSpecTableView
        :run-spec='device.costs[costKey]!'
        :value-spec='tableValueSpec'
        :focusable='true'
        @row-selected='(i: number | null) => selectedRow = i'
      >
        <template v-slot:globals>
          <v-btn flat size="small" @click='unSet' title='delete cost entirely'><v-icon>mdi-delete</v-icon></v-btn>
        </template>
      </RunSpecTableView>
    </v-card>
    <v-card>
      <PlotView v-if='data' :data='data'></PlotView>
    </v-card>
  </template>
  <template v-else>
    <v-card class='ma-auto'>
      <v-btn @click='set'>Set {{ title }}</v-btn>
    </v-card>
  </template>
</template>

<style scoped>
  .v-card {
    margin: 1em;
  }
</style>