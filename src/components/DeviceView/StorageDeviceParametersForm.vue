<script setup lang="ts">
import type { StorageDevice } from '@/model/devices';
import { setDialog } from '@/model/infos';
import { deepDiffObjects2 } from '@/utils';
import { cloneDeep } from 'lodash';
import { ref, useTemplateRef, type Ref } from 'vue';

const { device } = defineProps<{ device: StorageDevice }>();
const form: Ref<HTMLFormElement | null> = useTemplateRef('form');
const work = ref(cloneDeep(device.parameters));
const initialValue = cloneDeep(work.value);
const valid = ref(false);

async function change() { // change(changeKey: string)
  form.value!.resetValidation();
  const { valid } = await form.value!.validate();
  const changes = deepDiffObjects2(work.value, initialValue);
  if(valid && changes) {
    Object.assign(device.parameters, changes);
  }
}

</script>

<template>
  <v-form
    ref="form"
    v-model='valid'
  >
    <div class="d-flex flex-row justify-space-between">
      <v-label>Capacity</v-label>
      <v-icon @click='setDialog("StorageCapacity")' size='18'>mdi-information</v-icon>
    </div>
    <v-text-field
      v-model.number="work.capacity"
      type="number"
      :min=0
      :max=100
      :step=0.1
      @change='change'
    ></v-text-field>
    <div class="d-flex flex-row justify-space-between">
      <v-label>Efficiency Factor</v-label>
      <v-icon @click='setDialog("StorageEfficiencyFactor")' size='18'>mdi-information</v-icon>
    </div>
    <v-text-field
      v-model.number="work.efficiencyFactor"
      type="number"
      :min=0
      :max=1
      :step=0.01
      @change='change'
    ></v-text-field>
    <div class="d-flex flex-row justify-space-between">
      <v-label>Cycle Cost Factor</v-label>
      <v-icon @click='setDialog("StorageCycleCostFactor")' size='18'>mdi-information</v-icon>
    </div>
    <v-text-field
      v-model.number="work.cycleCostFactor"
      type="number"
      :min=0
      :max=10
      :step=0.1
      @change='change'
    ></v-text-field>
    <div class="d-flex flex-row justify-space-between">
      <v-label>Deep Discharge Cost Factor</v-label>
      <v-icon @click='setDialog("StorageDepthCostFactor")' size='18'>mdi-information</v-icon>
    </div>
    <v-text-field
      v-model.number="work.depthCostFactor"
      type="number"
      :min=0
      :max=10
      :step=0.1
      @update:model-value='change'
    ></v-text-field>
    <div class="d-flex flex-row justify-space-between">
      <v-label>Deep Depth</v-label>
      <v-icon @click='setDialog("StorageDeepDepthRatio")' size='18'>mdi-information</v-icon>
    </div>
    <v-text-field
      v-model.number="work.deepDepthRatio"
      type="number"
      :min=0
      :max=1
      :step=0.01
      @update:model-value='change'
    ></v-text-field>
  </v-form>
</template>