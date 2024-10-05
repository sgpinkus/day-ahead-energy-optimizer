<script setup lang="ts">
import type { IBaseDevice } from '@/model/devices';
import { deepDiffObjects2 } from '@/utils';
import { cloneDeep } from 'lodash';
import { ref, useTemplateRef, type Ref } from 'vue';

const { device } = defineProps<{ device: IBaseDevice }>();
const form: Ref<HTMLFormElement | null> = useTemplateRef('form');
const myObj = ref(cloneDeep(device));
const valid = ref(false);
const styleTypes = ['target', 'pin', 'circle'];

const titleMaxLength = 32;
const titleRules = [
  (v: any) => (!v || v && v.length <= titleMaxLength) || `title must be less than ${titleMaxLength} characters`,
];
const descriptionMaxLength = 2**10;
const descriptionRules = [
  (v: any) => (!v || v && v.length <= descriptionMaxLength) || `description must be less than ${descriptionMaxLength} characters`,
]

async function change() { // change(changeKey: string)
  form.value!.resetValidation();
  const { valid } = await form.value!.validate();
  const changes = deepDiffObjects2(myObj.value, device as any);
  console.log(changes);
}


</script>

<template>
  <v-form
    ref="form"
    v-model='valid'
  >
    <v-label>Title</v-label>
    <v-text-field
      v-model="device.title"
      :counter="titleMaxLength"
      :rules="titleRules"
      @change='change'
    ></v-text-field>
    <v-label>Description / Notes</v-label>
    <v-textarea
      v-model="device.description"
      :counter="descriptionMaxLength"
      :rules="descriptionRules"
      @change='change'
    ></v-textarea>
    <v-label>Shape</v-label>
    <v-select
      v-model="device.shape"
      :items="styleTypes"
      @update:model-value='change'
    ></v-select>
    <v-label>Color</v-label>
    <v-color-picker
      v-model="device.color"
      @change='change'
      hide-inputs
      hide-canvas
      show-swatches
    ></v-color-picker>
  </v-form>
</template>