<script setup lang="ts">
// (x_h - x_l)*np.poly1d([(d0 - d1)/2, d1, 0])((x - x_l)/(x_h - x_l))
import { computed, defineProps, ref, watch, type Ref } from 'vue';
import type { BaseDevice } from '@/model/devices';
import { RunSpec } from '@/model/RunSpec';
import RunSpecTableView from './RunSpecTableView.vue';
import PlotView from './PlotView.vue';
import { cloneDeep } from 'lodash';
import { linspace, boundsRelativeQuadratic } from '@/utils';

const { device } = defineProps<{
  device: BaseDevice,
}>();

function unSet() {
  device.costs.flow_bounds_relative = undefined; // eslint-disable-line vue/no-mutating-props
}

function set() {
  if(device.hardBounds[0] !== 0) throw new Error('Bounds relative costs not supported for this device type currently');
  device.costs.flow_bounds_relative = new RunSpec(device.basis, [0, 0, 0] as [number, number, number]); // eslint-disable-line vue/no-mutating-props
}

const tableValueSpec = [
  { label: 'price at min', min: -1e3, max: 1e3, step: 0.01 },
  { label: 'price at max', min: -1e3, max: 1e3, step: 0.01 },
  // { label: 'o', min: -1e3, max: 1e3, step: 0.01 },
];

const ranges = computed(() => device.costs.flow_bounds_relative?.toRanges() || null);
const selectedRow: Ref<number | null> = ref(null);
const selectedRange = computed(() => ranges.value && ranges.value.length && selectedRow.value !== null && ranges.value[selectedRow.value] || null);
const domain = linspace(0, 1);
const data: Ref<Record<string | number, number> | null> = ref(Object.fromEntries(domain.map((v) => [v, 0])));

watch(selectedRange, () => {
  const params = selectedRange.value ? selectedRange.value[0] : undefined;
  console.debug('selectedRange changed. New params', cloneDeep(params));
  const f: (...a: any[]) => number = params ? boundsRelativeQuadratic(params[1], params[0], 0, 1) : () => 0;
  data.value = Object.fromEntries(domain.map(v => [v, f(v)]));
}, {
  immediate: true
});

const dialog: Ref<keyof typeof info> = ref('');
const showDialog = ref(false);
function setDialog(x: keyof typeof info | '') {
  dialog.value = x;
  showDialog.value = true;
}

const info = {
  flowBoundsRelative: 'The price of flow is "price at min" at minimum flow of device and "price at max" at maximum flow.' +
  'For a demand respons load device, you generally want prices to be *negative* with the "price at min" less (more negative)' +
  'than "price at high" assuming the max flow is the most desirable state if price is not a factor'
  ,
  '': '',
};

</script>

<template>
  <v-dialog
    :model-value='showDialog'
  >
    <v-container class='ma-auto'>
      <v-card class='pa-4'>
        {{ info[dialog] }}
      </v-card>
    </v-container>
  </v-dialog>
  <template v-if='device.costs.flow_bounds_relative'>
    <v-card>
      <h3>Bounds Relative Flow Cost <v-icon @click='setDialog("flowBoundsRelative")' size='18'>mdi-information</v-icon></h3>
      <RunSpecTableView
        :run-spec='device.costs.flow_bounds_relative'
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
      <v-btn @click='set'>Set Bounds Relative Flow Costs</v-btn>
    </v-card>
  </template>
</template>

<style scoped>
  .v-card {
    margin: 1em;
  }
</style>