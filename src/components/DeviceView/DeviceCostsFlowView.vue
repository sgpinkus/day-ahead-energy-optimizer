<script setup lang="ts">
import { computed, defineProps, ref, watch } from 'vue';
import type { ComputedRef, Ref } from 'vue';
import type { BaseDevice } from '@/model/device';
import { RunSpec } from '@/model/runspec';
import RunSpecTableView from './RunSpecTableView.vue';
import PlotView from '@/components/components/PlotView.vue';
import { cloneDeep } from 'lodash';
import { linspace, quadratic } from '@/utils';

const { device } = defineProps<{
  device: BaseDevice,
}>();

function unSet() {
  device.costs.flow = undefined; // eslint-disable-line vue/no-mutating-props
}

function set() {
  device.costs.flow = new RunSpec(device.basis, [0, 0, 0] as [number, number, number]); // eslint-disable-line vue/no-mutating-props
}

const tableValueSpec = [
  { label: 'a', min: 0, max: 1e3, step: 0.01 },
  { label: 'b', min: 0, max: 1e3, step: 0.01 },
  { label: 'o', min: -1e3, max: 1e3, step: 0.01 },
];

const ranges = computed(() => device.costs.flow?.toRanges() || null);
const selectedRow: Ref<number | null> = ref(null);
const selectedRange = computed(() => ranges.value && ranges.value.length && selectedRow.value !== null && ranges.value[selectedRow.value] || null);
const domainBounds: ComputedRef<number[]> = computed(() => device.softBounds('bounds'));
const domain = computed(() => linspace(...(domainBounds.value as [number, number])));
const data: Ref<Record<string | number, number> | null> = ref(Object.fromEntries(domain.value.map((v) => [v, 0])));

watch(selectedRange, () => {
  const params = selectedRange.value ? selectedRange.value[0] : undefined;
  console.debug('selectedRange changed. New params', cloneDeep(params));
  const f: (...a: any[]) => number = params ? quadratic(params[0], params[1], 0, params[2]) : () => 0;
  data.value = Object.fromEntries(domain.value.map(v => [v, f(v)]));
}, {
  immediate: true
});

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
      <v-btn @click='set'>Set Flow Costs</v-btn>
    </v-card>
  </template>
</template>

<style scoped>
  .v-card {
    margin: 1em;
  }
</style>