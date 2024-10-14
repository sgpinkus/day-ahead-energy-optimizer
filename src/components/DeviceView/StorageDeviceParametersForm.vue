<script setup lang="ts">
import type { StorageDevice } from '@/model/devices';
import { deepDiffObjects2 } from '@/utils';
import { cloneDeep } from 'lodash';
import { ref, useTemplateRef, type Ref } from 'vue';

const { device } = defineProps<{ device: StorageDevice }>();
const form: Ref<HTMLFormElement | null> = useTemplateRef('form');
const work = ref({
  capacity: device.capacity,
  efficiencyFactor: device.efficiencyFactor,
  cycleCostFactor: device.cycleCostFactor,
  depthCostFactor: device.depthCostFactor,
  deepDepthRatio: device.deepDepthRatio
});
  const initialValue = cloneDeep(work.value);
  const valid = ref(false);

async function change() { // change(changeKey: string)
  form.value!.resetValidation();
  const { valid } = await form.value!.validate();
  const changes = deepDiffObjects2(work.value, initialValue);
  console.log('changes', changes);
  if(changes) {
    Object.assign(device, cloneDeep(work.value));
  }
}

const dialog: Ref<keyof typeof info> = ref('');
const showDialog = ref(false);
function setDialog(x: keyof typeof info | '') {
  dialog.value = x;
  showDialog.value = true;
}

const info = {
  capacity: 'The storage capacity of device in kWh.',
  efficiencyFactor: `The *single* trip efficiency factor. Applied symmetrically to in/out flow.
        This means the round-trip efficiency (RTEF) is 1/2 this: efficiency = 1-(1-RTEF)/2. Ex, if
        the RTEF=0.9 then efficiency should be set to 1-(1-0.9)/2 = 0.95.`,
  cycleCostFactor: 'Every flip flop from charging to discharging and vice versa is penalized by this amount.',
  depthCostFactor: 'When charge reaches a certain threshold, start applying this cost factor to further discharging.',
  deepDepthRatio: 'At what ratio of charge remaining does depth damage factor kick. Has no effect if depth damage is zero.',
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
  <v-form
    ref="form"
    v-model='valid'
  >
    <div class="d-flex flex-row justify-space-between">
      <v-label>Capacity</v-label>
      <v-icon @click='setDialog("capacity")' size='18'>mdi-information</v-icon>
    </div>
    <v-text-field
      v-model="work.capacity"
      type="number"
      :min=0
      :max=100
      :step=0.1
      @change='change'
    ></v-text-field>
    <div class="d-flex flex-row justify-space-between">
      <v-label>Efficiency Factor</v-label>
      <v-icon @click='setDialog("efficiencyFactor")' size='18'>mdi-information</v-icon>
    </div>
    <v-text-field
      v-model="work.efficiencyFactor"
      type="number"
      :min=0
      :max=1
      :step=0.01
      @change='change'
    ></v-text-field>
    <div class="d-flex flex-row justify-space-between">
      <v-label>Cycle Cost Factor</v-label>
      <v-icon @click='setDialog("cycleCostFactor")' size='18'>mdi-information</v-icon>
    </div>
    <v-text-field
      v-model="work.cycleCostFactor"
      type="number"
      :min=0
      :max=10
      :step=0.1
      @change='change'
    ></v-text-field>
    <div class="d-flex flex-row justify-space-between">
      <v-label>Deep Discharge Cost Factor</v-label>
      <v-icon @click='setDialog("depthCostFactor")' size='18'>mdi-information</v-icon>
    </div>
    <v-text-field
      v-model="work.depthCostFactor"
      type="number"
      :min=0
      :max=10
      :step=0.1
      @update:model-value='change'
    ></v-text-field>
    <div class="d-flex flex-row justify-space-between">
      <v-label>Deep Depth</v-label>
      <v-icon @click='setDialog("deepDepthRatio")' size='18'>mdi-information</v-icon>
    </div>
    <v-text-field
      v-model="work.deepDepthRatio"
      type="number"
      :min=0
      :max=1
      :step=0.01
      @update:model-value='change'
    ></v-text-field>
  </v-form>
</template>