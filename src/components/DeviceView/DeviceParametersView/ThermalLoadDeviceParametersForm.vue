<script setup lang="ts">
import type { ThermalLoadDevice } from '@/model/device';
import { XYRunSpecAdaptor } from '@/model/runspec';
import { setDialog } from '@/model/infos';
import { deepDiffObjects2 } from '@/utils';
import { cloneDeep } from 'lodash';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { onMounted, ref, useTemplateRef, watch, type Ref } from 'vue';
import RunSpecTableView from '../RunSpecTableView.vue';
import MyNumberTextField from '@/components/components/MyNumberTextField';

const careFactorTableValueSpec = [
  { label: 'temp', min: 0.1, max: 1e2, step: 0.1 },
];
// const temperaturTableValueSpec = [
//   { label: 'temp', min: -100, max: 100, step: 0.5 },
// ];


const { device } = defineProps<{ device: ThermalLoadDevice }>();
const form: Ref<HTMLFormElement | null> = useTemplateRef('form');
const simpleWork = ref(newWork(device.parameters));
// Directly mutates model.
const temperatureVariationCareFactorWork = ref(new XYRunSpecAdaptor<number, [number]>(device.parameters.temperatureVariationCareFactor, (x) => [x], (x) => x[0]));
const initialValue = cloneDeep(simpleWork.value);
const valid = ref(false);

function newWork(parameters: typeof device['parameters']) {
  return {
    desiredTemperature: parameters.desiredTemperature,
    initialTemperature: parameters.initialTemperature,
    thermalSustainment: parameters.thermalSustainment,
    efficiencyFactor: parameters.thermalSustainment,
  };
}

async function update() { // change(changeKey: string)
  console.log('change');
  form.value!.resetValidation();
  const { valid } = await form.value!.validate();
  const changes = deepDiffObjects2(simpleWork.value, initialValue);
  console.log(changes);
  if (valid && changes) {
    Object.assign(device.parameters, changes);
  }
}

function externalTemperatureProfileUpdate(index: number, newValue: number) {
  device.parameters.externalTemperatureProfile[index] = Number(newValue); // eslint-disable-line vue/no-mutating-props
}

onMounted(() => {
  console.log(device.parameters);
});

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
      v-model.number="simpleWork.desiredTemperature"
      type="number"
      :min="-273"
      :max="1000"
      :step="0.5"
      placeholder="None"
      @change="update"
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
      v-model.number="simpleWork.initialTemperature"
      type="number"
      :min="-273"
      :max="1000"
      :step="0.5"
      placeholder="None"
      @change="update"
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
      v-model.number="simpleWork.thermalSustainment"
      type="number"
      :min="0"
      :max="1"
      :step="0.01"
      placeholder="None"
      @change="update"
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
      v-model.number="simpleWork.efficiencyFactor"
      type="number"
      :min="0"
      :max="10"
      :step="0.01"
      placeholder="None"
      @change="update"
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
      :run-spec="temperatureVariationCareFactorWork"
      :value-spec="careFactorTableValueSpec"
      :focusable="true"
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

    <v-table>
      <thead>
        <tr>
          <th>
            Time
          </th>
          <th>Temp</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="i in (device.basis -1)"
          :key="i"
        >
          <td class="temp-label">
            <v-label>{{ i }}</v-label>
          </td>
          <td class="temp-value">
            <MyNumberTextField
              :model-value="device.parameters.externalTemperatureProfile[i]"
              :min="-273"
              :max="1000"
              :step="0.5"
              @update:model-value="(v: number) => externalTemperatureProfileUpdate(i, v)"
            />
          </td>
        </tr>
      </tbody>
    </v-table>
  </v-form>
</template>

<style scoped>

td.temp-value {
  width: min-content;
}

</style>
