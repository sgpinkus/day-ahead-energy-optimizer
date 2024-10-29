<script setup lang="tsx">
import { computed, defineComponent, defineProps, ref, watch } from 'vue';
import type { Ref } from 'vue';
import type { BaseDevice } from '@/model/devices';
import PlotView from '@/components/components/PlotView.vue';
import { boundsRelativeQuadratic, linspace } from '@/utils';

const costKey = 'cumulative_flow_bounds_relative';
const title = 'Cumulative Bounds Relative Flow Costs';

const { device } = defineProps<{
  device: BaseDevice,
}>();

function unSet() {
  device.costs.setPeakCumulativeFlowBoundsRelativeCost(undefined); // eslint-disable-line vue/no-mutating-props
}

function set() {
  device.costs.setPeakCumulativeFlowBoundsRelativeCost([0,0]); // eslint-disable-line vue/no-mutating-props
}

const tableValueSpec = [
  { label: 'price at min', min: -1e3, max: 1e3, step: 0.01 },
  { label: 'price at max', min: -1e3, max: 1e3, step: 0.01 },
];

const tableKeys = computed(() => {
  return tableValueSpec.map(v => v.label);
});

const domain = linspace(0, 1);
const data: Ref<Record<string | number, number> | null> = ref(Object.fromEntries(domain.map((v) => [v, 0])));

function setNumber(i: 0 | 1, v: number) {
  const x = [...device.costs[costKey]!]; // https://vuejs.org/guide/essentials/list.html#array-change-detection
  x[i] = Number(v);
  device.costs.setPeakCumulativeFlowBoundsRelativeCost(x as [number, number]);
}

watch(() => device.costs[costKey], () => {
  const params = device.costs[costKey] ? device.costs[costKey] : undefined;
  const f: (...a: any[]) => number = params ? boundsRelativeQuadratic(params[0], params[1], 0, 1) : () => 0;
  data.value = Object.fromEntries(domain.map(v => [v, f(v)]));
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
  <template v-if='device.costs[costKey]'>
    <v-card>
      <h3>{{ title }}</h3>
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
                    :model-value='device.costs[costKey]![i]'
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
      <v-btn @click='set'>Set {{ title }}</v-btn>
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