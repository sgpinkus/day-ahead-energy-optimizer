<script setup lang="ts">
import type { Device } from '@/model/devices';
import { deepDiffObjects2 } from '@/utils';
import { cloneDeep } from 'lodash';
import { ref, useTemplateRef, type Ref } from 'vue';

const { device } = defineProps<{ device: Device }>();
const form: Ref<HTMLFormElement | null> = useTemplateRef('form');
const work = ref(device.toObject());
const initialValue = cloneDeep(work.value);
const valid = ref(false);
const shapeTypes = ['ellipse', 'circle', 'database', 'box', 'text'];

const titleMaxLength = 32;
const titleRules = [
  (v: any) => (!v || v && v.length <= titleMaxLength) || `title must be less than ${titleMaxLength} characters`,
];
const descriptionMaxLength = 2**10;
const descriptionRules = [
  (v: any) => (!v || v && v.length <= descriptionMaxLength) || `description must be less than ${descriptionMaxLength} characters`,
];

async function change() { // change(changeKey: string)
  form.value!.resetValidation();
  const { valid } = await form.value!.validate();
  const changes = deepDiffObjects2(work.value, initialValue);
  console.log('changes', changes);
  if(changes) {
    device.updateDescriptors(changes);
  }
}


</script>

<template>
  <v-form
    ref="form"
    v-model='valid'
  >
    <v-card>
      <v-label>Title</v-label>
      <v-text-field
        v-model="work.title"
        :counter="titleMaxLength"
        :rules="titleRules"
        @change='change'
      ></v-text-field>
      <v-label>Description / Notes</v-label>
      <v-textarea
        v-model="work.description"
        :counter="descriptionMaxLength"
        :rules="descriptionRules"
        @change='change'
      ></v-textarea>
      <v-label>Shape</v-label>
      <v-select
        v-model="work.shape"
        :items="shapeTypes"
        @update:model-value='change'
      ></v-select>
      <v-label>Color</v-label>
      <v-color-picker
        v-model="work.color"
        @update:model-value='change'
        hide-inputs
        hide-canvas
        show-swatches
      ></v-color-picker>
    </v-card>
  </v-form>
</template>

<style scoped>
.v-card {
  padding: 1em;
}
</style>