<script setup lang="tsx">
import { computed, defineProps, ref, watch } from 'vue';
import type { ComputedRef, Ref } from 'vue';
import type { BaseDevice } from '@/model/device';
import PlotView from '@/components/components/PlotView.vue';
import { linspace, quadratic } from '@/utils';
import MyNumberTextField from '@/components/components/MyNumberTextField';


const costKey = 'peak_flow';
const title = 'Peak Flow Cost';

const { device } = defineProps<{
  device: BaseDevice,
}>();

function unSet() {
  device.costs.setPeakFlowCost(undefined);  
}

function set() {
  device.costs.setPeakFlowCost([0,0,0]);  
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
  const x = [...device.costs[costKey]!]; // https://vuejs.org/guide/essentials/list.html#array-change-detection
  x[i] = Number(v);
  device.costs.setPeakFlowCost(x as [number, number, number]);
}

watch(() => device.costs[costKey], () => {
  const params = device.costs[costKey] ? device.costs[costKey] : undefined;
  const f: (...a: any[]) => number = params ? quadratic(params[0], params[1], 0, params[2]) : () => 0;
  data.value = Object.fromEntries(domain.value.map(v => [v, f(v)]));
}, {
  immediate: true,
});




</script>

<template>
  <template v-if="device.costs[costKey]">
    <v-card>
      <h3>{{ title }}</h3>
      <v-table>
        <thead>
          <tr>
            <th
              v-for="h in tableKeys"
              :key="h"
            >
              {{ h }}
            </th>
            <th style="text-align: right">
              <slot name="globals" />
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <template
              v-for="(spec, i) in tableValueSpec"
              :key="i"
            >
              <td>
                <MyNumberTextField
                  :min="spec.min ?? null"
                  :max="spec.max ?? null"
                  :step="spec.step ?? null"
                  :model-value="device.costs[costKey]![i]"
                  @update:model-value="(newValue: number) => setNumber(i as any, newValue)"
                />
              </td>
            </template>
            <td style="text-align: right">
              <v-btn
                title="delete"
                flat
                size="small"
                @click="unSet"
              >
                <v-icon>mdi-delete-circle</v-icon>
              </v-btn>
            </td>
          </tr>
        </tbody>
      </v-table>
    </v-card>
    <v-card>
      <PlotView
        v-if="data"
        :data="data"
      />
    </v-card>
  </template>
  <template v-else>
    <v-card class="ma-auto">
      <v-btn @click="set">
        Set {{ title }}
      </v-btn>
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