<script setup lang="ts">
import { ref, watch, type Ref } from 'vue';
import type { IBaseDevice } from '@/model/device';
import { XYRunSpecAdaptor } from '@/lib/runspec';
import RunSpecTableView from '@/components/components/RunSpecTableView.vue';
import RunSpecGraphView from '@/components/components/NumberRunSpecGraphView.vue';
import CsvNumberArrayInput from '@/components/components/CsvNumberArrayInput.vue';


const { device } = defineProps<{
  device: IBaseDevice,
}>();

// Computed doesn't work.
const numberRunSpecLow: Ref<XYRunSpecAdaptor<[number, number], [number]> | null> = ref(null);
const numberRunSpecGraph: Ref<XYRunSpecAdaptor<[number, number], number> | null> = ref(null);

watch(device.bounds, () => {
  console.log('watch triggered, setting new runSpec adaptor');
  numberRunSpecLow.value = new XYRunSpecAdaptor<[number, number], [number]>(device.bounds, (x) => [x[0]], (x) => [x[0], x[0]]);
  numberRunSpecGraph.value = new XYRunSpecAdaptor<[number, number], number>(device.bounds, (x) => x[0], (x) => [x, x]);
}, {
  immediate: true,
});

const tableValueSpec = [
  { label: 'value', min: device.hardBounds[0], max: device.hardBounds[1], step: 0.01 },
];

const tabs = ref('creator');

function boundsArrayUpdate(v: number[]) {
  if (v) {
    const _v: [number, number][] = v.map(x => [x,x]);
    device.bounds.setFromArray(_v);
  }
}


</script>

<template>
  <v-card>
    <h3>Device Load Profile</h3>
    <v-tabs v-model="tabs">
      <v-tab value="creator">
        Creator
      </v-tab>
      <v-tab value="csv">
        CSV
      </v-tab>
    </v-tabs>
    <v-tabs-window v-model="tabs">
      <v-tabs-window-item value="creator">
        <br>
        <RunSpecGraphView
          :run-spec="numberRunSpecGraph!"
          :options="{ hEditable: true, vEditable: true, yLabel: '°C' }"
        />
        <RunSpecTableView
          :run-spec="numberRunSpecLow!"
          :value-spec="tableValueSpec"
          :focusable="true"
        />
      </v-tabs-window-item>
      <v-tabs-window-item value="csv">
        <!-- TODO: Changing temperatureVariationCareFactor doesn't trigger update of initial-value -->
        <csv-number-array-input
          :min-length="48"
          :max-length="48"
          :min-value="-100"
          :max-value="100"
          :initial-value="numberRunSpecGraph!.toArray().join()"
          @change="boundsArrayUpdate"
        />
      </v-tabs-window-item>
    </v-tabs-window>
  </v-card>
</template>

<style scoped>
  .v-card {
    margin: 1em;

  }
</style>