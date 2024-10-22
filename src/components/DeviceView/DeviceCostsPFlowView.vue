<script setup lang="tsx">
import { computed, defineComponent, defineProps, ref, watch, type ComputedRef, type Ref } from 'vue';
import type { BaseDevice } from '@/model/devices';
import PlotView from './PlotView.vue';
import { linspace, quadratic } from '@/utils';

const { device } = defineProps<{
  device: BaseDevice,
}>();

function unSet() {
  device.costs.setPeakFlow(undefined); // eslint-disable-line vue/no-mutating-props
}

function set() {
  device.costs.setPeakFlow([0,0,0]); // eslint-disable-line vue/no-mutating-props
}

const tableValueSpec = [
  { label: 'a', min: 0, max: 1e3, step: 0.01 },
  { label: 'b', min: 0, max: 1e3, step: 0.01 },
  { label: 'o', min: -1e3, max: 1e3, step: 0.01 },
];

const tableKeys = computed(() => {
  return tableValueSpec.map(v => v.label);
});

const domainBounds: ComputedRef<number[]> = computed(() => device.softBounds('bounds'));
const domain = computed(() => linspace(...(domainBounds.value as [number, number])));
const data: Ref<Record<string | number, number> | null> = ref(Object.fromEntries(domain.value.map((v) => [v, 0])));

function setNumber(i: 0 | 1 | 2, v: number) {
  const x = [...device.costs.peak_flow!]; // https://vuejs.org/guide/essentials/list.html#array-change-detection
  x[i] = v;
  device.costs.setPeakFlow(x as [number, number, number]);
}

watch(() => device.costs.peak_flow, () => {
  const params = device.costs.peak_flow ? device.costs.peak_flow : undefined;
  const f: (...a: any[]) => number = params ? quadratic(...params, 0) : () => 0;
  data.value = Object.fromEntries(domain.value.map(v => [v, f(v)]));
}, {
  immediate: true,
});


const MyNumberTextField = defineComponent({
  name: 'MyNumberTextField',
  setup(_props, { slots, attrs }) {
    return () =>
      <v-text-field
        type='number'
        hide-details
        rounded='0'
        label=''
        density='compact'
        flat
        {...attrs}
      >{slots.default && slots.default()}</v-text-field>;
  },
});

</script>

<template>
  <template v-if='device.costs.peak_flow'>
    <v-card>
      <h3>Peak Flow Cost</h3>
      <v-table>
        <thead>
          <tr>
            <th v-for='h in tableKeys' :key='h'>
            {{ h }}
            </th>
            <th style='text-align: right'><slot name="globals"></slot></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <template v-for='(spec, i) in tableValueSpec' :key=i>
              <td>
                <MyNumberTextField
                    :min='spec.min ?? null'
                    :max='spec.max ?? null'
                    :step='spec.step ?? null'
                    :model-value='device.costs.peak_flow[i]'
                    @update:modelValue='(newValue: number) => setNumber(i as any, newValue)'
                  >
                </MyNumberTextField>
              </td>
            </template>
            <td style='text-align: right'>
              <v-btn title='delete' flat size="small" @click='unSet'>
                <v-icon>mdi-delete-circle</v-icon>
              </v-btn>
            </td>
          </tr>
        </tbody>
      </v-table>
    </v-card>
    <v-card>
      <PlotView v-if='data' :data='data'></PlotView>
    </v-card>
  </template>
  <template v-else>
    <v-card class='ma-auto'>
      <v-btn @click='set'>Set Peak Flow Cost</v-btn>
    </v-card>
  </template>
</template>

<style scoped>
.v-card {
  margin: 1em;
}

td {
  padding: 0;
}
</style>