<script setup lang="ts">
import type { ThermalLoadDevice } from '@/model/device';
import { XYRunSpecAdaptor } from '@/model/runspec';
import { setDialog } from '@/model/infos';
import { deepDiffObjects2 } from '@/utils';
import { cloneDeep } from 'lodash';

import { ref, useTemplateRef, watch, type Ref } from 'vue';
import RunSpecTableView from '../RunSpecTableView.vue';
import CsvNumberArrayInput from '@/components/components/CsvNumberArrayInput.vue';

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
const temperatureVariationCareFactorWork = ref(device.parameters.temperatureVariationCareFactor.copy());
const _temperatureVariationCareFactorWork = ref(new XYRunSpecAdaptor<number, [number]>(temperatureVariationCareFactorWork.value, (x) => [x], (x) => x[0]));
const externalTemperatureProfileWork = ref([...device.parameters.externalTemperatureProfile]);

watch(externalTemperatureProfileWork, () => {
  console.log('externalTemperatureProfile', externalTemperatureProfileWork.value);
});

watch(_temperatureVariationCareFactorWork, () => {
  console.log('temperatureVariationCareFactor', temperatureVariationCareFactorWork.value);
});

const valid = ref(false);

async function simpleValuesUpdate() {
  form.value!.resetValidation();
  const { valid } = await form.value!.validate();
  const changes = deepDiffObjects2(simpleValues.value, initialSimpleValues);
  if (valid && changes) {
    Object.assign(device.parameters, changes);
  }
}

function temperatureVariationCareFactorUpdate() {
  device.parameters.temperatureVariationCareFactor = temperatureVariationCareFactorWork.value.copy(); // eslint-disable-line
}

function externalTemperatureProfileUpdate(v: number[]) {
  device.parameters.externalTemperatureProfile = v; // eslint-disable-line
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

    <hr>
    <br>

    <div class="d-flex flex-row justify-space-between">
      <v-label>Temperature Variation Care Factor</v-label>
      <v-icon
        size="18"
        @click="setDialog('TemperatureRangeCareFactor')"
      >
        mdi-information
      </v-icon>
    </div>

    <br>

    <RunSpecTableView
      :run-spec="_temperatureVariationCareFactorWork"
      :value-spec="careFactorTableValueSpec"
      :focusable="true"
      @change="temperatureVariationCareFactorUpdate"
    />

    <br><hr><br>

    <div class="d-flex flex-row justify-space-between">
      <v-label>External Temperature</v-label>
      <v-icon
        size="18"
        @click="setDialog('ExternalTemperature')"
      >
        mdi-information
      </v-icon>
    </div>
    <br>
    <csv-number-array-input
      :min-length="48"
      :max-length="48"
      :min-value="-100"
      :max-value="100"
      :initial-value="externalTemperatureProfileWork"
      @change="externalTemperatureProfileUpdate"
    />
  </v-form>
</template>

<style scoped>

td.temp-value {
  width: min-content;
}

</style>
