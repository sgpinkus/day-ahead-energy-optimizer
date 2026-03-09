<script setup lang="ts">
import type { ThermalLoadDevice } from '@/model/device';
import { NumberRunSpec, XYRunSpecAdaptor } from '@/lib/runspec';
import { setDialog } from '@/model/infos';
import { deepDiffObjects2 } from '@/utils';
import { cloneDeep } from 'lodash';

import { computed, ref, useTemplateRef, type Ref } from 'vue';
import RunSpecTableView from '@/components/components/RunSpecTableView.vue';
import CsvNumberArrayInput from '@/components/components/CsvNumberArrayInput.vue';
import RunSpecGraphView from '@/components/components/NumberRunSpecGraphView.vue';

const careFactorTableValueSpec = [
  { label: 'temp', min: 0.1, max: 1e2, step: 0.1 },
];
// const temperaturTableValueSpec = [
//   { label: 'temp', min: -100, max: 100, step: 0.5 },
// ];


const { device } = defineProps<{ device: ThermalLoadDevice }>();
const form: Ref<HTMLFormElement | null> = useTemplateRef('form');
  const simpleValues = ref({
    desiredTemperature: device.parameters.desiredTemperature,
    initialTemperature: device.parameters.initialTemperature,
    thermalSustainment: device.parameters.thermalSustainment,
    efficiencyFactor: device.parameters.efficiencyFactor,
  });
const initialSimpleValues = cloneDeep(simpleValues.value);
const temperatureVariationCareFactorArrayAdaptor = computed(() => new XYRunSpecAdaptor<number, [number]>(device.parameters.temperatureVariationCareFactor, (x) => [x], (x) => x[0]));
const externalTemperatureProfileArrayAdaptor =  computed(() => new XYRunSpecAdaptor<number, [number]>(device.parameters.externalTemperatureProfile, (x) => [x], (x) => x[0]));


const valid = ref(false);
const temperatureVariationTabs = ref('creator');
const externalTemperatureTabs = ref('creator');

async function simpleValuesUpdate() {
  form.value!.resetValidation();
  const { valid } = await form.value!.validate();
  const changes = deepDiffObjects2(simpleValues.value, initialSimpleValues);
  if (valid && changes) {
    Object.assign(device.parameters, changes);
  }
}

function temperatureVariationCareFactorArrayUpdate(v: number[]) {
  if (v) device.parameters.temperatureVariationCareFactor = NumberRunSpec.fromArray(v); // eslint-disable-line
}

function externalTemperatureProfileArrayUpdate(v: number[]) {
  if(v) device.parameters.externalTemperatureProfile = NumberRunSpec.fromArray(v); // eslint-disable-line
}

</script>

<template>
  <v-form
    ref="form"
    v-model="valid"
  >
    <div class="d-flex flex-row justify-space-between">
      <v-label>Desired Temperature</v-label>
      <v-icon
        size="18"
      >
        mdi-information
      </v-icon>
    </div>

    <v-text-field
      v-model.number="simpleValues.desiredTemperature"
      type="number"
      :min="-273"
      :max="1000"
      :step="0.5"
      placeholder="None"
      @change="simpleValuesUpdate"
    />

    <div class="d-flex flex-row justify-space-between">
      <v-label>Initial Temperature</v-label>
      <v-icon
        size="18"
        @click="setDialog('InitiaTemperature')"
      >
        mdi-information
      </v-icon>
    </div>

    <v-text-field
      v-model.number="simpleValues.initialTemperature"
      type="number"
      :min="-273"
      :max="1000"
      :step="0.5"
      placeholder="None"
      @change="simpleValuesUpdate"
    />

    <div class="d-flex flex-row justify-space-between">
      <v-label>Sustainment Factor</v-label>
      <v-icon
        size="18"
        @click="setDialog('ThermalSustainmentFactor')"
      >
        mdi-information
      </v-icon>
    </div>

    <v-text-field
      v-model.number="simpleValues.thermalSustainment"
      type="number"
      :min="0"
      :max="1"
      :step="0.01"
      placeholder="None"
      @change="simpleValuesUpdate"
    />

    <div class="d-flex flex-row justify-space-between">
      <v-label>Efficiency Factor</v-label>
      <v-icon
        size="18"
        @click="setDialog('ThermalEfficiencyFactor')"
      >
        mdi-information
      </v-icon>
    </div>

    <v-text-field
      v-model.number="simpleValues.efficiencyFactor"
      type="number"
      :min="0"
      :max="10"
      :step="0.01"
      placeholder="None"
      @change="simpleValuesUpdate"
    />

    <div class="d-flex flex-row justify-space-between">
      <v-label>Temperature Variation Care Factor</v-label>
      <v-icon
        size="18"
        @click="setDialog('TemperatureRangeCareFactor')"
      >
        mdi-information
      </v-icon>
    </div>
    <v-tabs v-model="temperatureVariationTabs">
      <v-tab value="creator">
        Creator
      </v-tab>
      <v-tab value="csv">
        CSV
      </v-tab>
    </v-tabs>
    <v-tabs-window v-model="temperatureVariationTabs">
      <v-tabs-window-item value="creator">
        <br>
        <RunSpecGraphView
          :run-spec="device.parameters.temperatureVariationCareFactor"
          :options="{ hEditable: true, vEditable: true, yLabel: '°C' }"
        />
        <RunSpecTableView
          :run-spec="temperatureVariationCareFactorArrayAdaptor"
          :value-spec="careFactorTableValueSpec"
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
          :initial-value="device.parameters.temperatureVariationCareFactor.toArray().join()"
          @change="temperatureVariationCareFactorArrayUpdate"
        />
      </v-tabs-window-item>
    </v-tabs-window>
    <br>

    <div class="d-flex flex-row justify-space-between">
      <v-label>External Temperature</v-label>
      <v-icon
        size="18"
        @click="setDialog('ExternalTemperature')"
      >
        mdi-information
      </v-icon>
    </div>
    <v-tabs v-model="externalTemperatureTabs">
      <v-tab value="creator">
        Creator
      </v-tab>
      <v-tab value="csv">
        CSV
      </v-tab>
    </v-tabs>
    <v-tabs-window v-model="externalTemperatureTabs">
      <v-tabs-window-item value="creator">
        <br>
        <RunSpecGraphView
          :run-spec="device.parameters.externalTemperatureProfile"
          :options="{ hEditable: true, vEditable: true, yLabel: '°C' }"
        />
        <RunSpecTableView
          :run-spec="externalTemperatureProfileArrayAdaptor"
          :value-spec="careFactorTableValueSpec"
          :focusable="true"
        />
      </v-tabs-window-item>
      <v-tabs-window-item value="csv">
        <!-- TODO: Changing externalTemperatureProfile doesn't trigger update of initial-value -->
        <csv-number-array-input
          :min-length="48"
          :max-length="48"
          :min-value="-100"
          :max-value="100"
          :initial-value="device.parameters.externalTemperatureProfile.toArray().join()"
          @change="externalTemperatureProfileArrayUpdate"
        />
      </v-tabs-window-item>
    </v-tabs-window>
  </v-form>
</template>

<style scoped>

td.temp-value {
  width: min-content;
}

</style>
