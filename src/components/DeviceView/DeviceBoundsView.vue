<script setup lang="ts">
import { ref, watch, type Ref } from 'vue';
import type { IBaseDevice } from '@/model/device';
import { NumberRunSpecAdaptor } from '@/lib/runspec';
import RunSpecTableView from '@/components/components/RunSpecTableView.vue';
import RunSpecGraphView from '@/components/components/NumberRunSpecGraphView.vue';
import CsvNumberArrayInput from '@/components/components/CsvNumberArrayInput.vue';


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
  immediate: true,
});

const tableValueSpec = [
  { label: 'low', min: device.hardBounds[0], max: device.hardBounds[1], step: 0.01 },
  { label: 'high', min: device.hardBounds[0], max: device.hardBounds[1], step: 0.01 },
];

const tabsUpper = ref('creator');
const tabsLower = ref('creator');

function boundsUpperArrayUpdate(v: number[]) {
  if (v) {
    const lowerArray = device.bounds.toArray().map(x => x[0]);
    const _v: [number, number][] = v.map((x, i) => [lowerArray[i]!,x]);
    device.bounds.setFromArray(_v);
  }
}

function boundsLowerArrayUpdate(v: number[]) {
  if (v) {
    const upperArray = device.bounds.toArray().map(x => x[0]);
    const _v: [number, number][] = v.map((x, i) => [x, upperArray[i]!]);
    device.bounds.setFromArray(_v);
  }
}

</script>

<template>
  <v-card>
    <h3>Upper bounds</h3>
    <v-tabs v-model="tabsUpper">
      <v-tab value="creator">
        Creator
      </v-tab>
      <v-tab value="csv">
        CSV
      </v-tab>
    </v-tabs>
    <v-tabs-window v-model="tabsUpper">
      <v-tabs-window-item value="creator">
        <br>
        <RunSpecGraphView
          :run-spec="numberRunSpecHigh!"
          :options="{ hEditable: true, vEditable: true }"
        />
      </v-tabs-window-item>
      <v-tabs-window-item value="csv">
        <!-- TODO: .. -->
        <csv-number-array-input
          :min-length="48"
          :max-length="48"
          :min-value="-100"
          :max-value="100"
          :initial-value="numberRunSpecHigh!.toArray().join()"
          @change="boundsUpperArrayUpdate"
        />
      </v-tabs-window-item>
    </v-tabs-window>

    <h3>Lower bounds</h3>
    <v-tabs v-model="tabsLower">
      <v-tab value="creator">
        Creator
      </v-tab>
      <v-tab value="csv">
        CSV
      </v-tab>
    </v-tabs>
    <v-tabs-window v-model="tabsLower">
      <v-tabs-window-item value="creator">
        <br>
        <RunSpecGraphView
          :run-spec="numberRunSpecLow!"
          :options="{ hEditable: true, vEditable: true }"
        />
      </v-tabs-window-item>
      <v-tabs-window-item value="csv">
        <!-- TODO: .. -->
        <csv-number-array-input
          :min-length="48"
          :max-length="48"
          :min-value="-100"
          :max-value="100"
          :initial-value="numberRunSpecLow!.toArray().join()"
          @change="boundsLowerArrayUpdate"
        />
      </v-tabs-window-item>
    </v-tabs-window>

    <h3>Bounds</h3>
    <RunSpecTableView
      :run-spec="device.bounds"
      :value-spec="tableValueSpec"
    />
  </v-card>
</template>

<style scoped>
  .v-card {
    margin: 1em;

  }
</style>