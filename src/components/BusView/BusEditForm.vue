<script setup lang="ts">
/* eslint-disable vue/no-mutating-props */
import { Bus } from '@/model';
import { ref, useTemplateRef, type Ref } from 'vue';

const { bus } = defineProps<{ bus: Bus }>();
const form: Ref<HTMLFormElement | null> = useTemplateRef('form');
const valid = ref(false);

const titleMaxLength = 32;
const titleRules = [
  (v: any) => (!v || v && v.length <= titleMaxLength) || `title must be less than ${titleMaxLength} characters`,
];

</script>

<template>
  <v-form
    v-if="bus"
    ref="form"
    v-model="valid"
    lazy-validation
  >
    <v-text-field
      v-model="bus.title"
      :counter="titleMaxLength"
      :rules="titleRules"
      :label="bus.title ? '' : 'Title'"
    />
    <v-text-field
      v-model="bus.id"
      label="ID"
      :readonly="true"
      :disabled="true"
    />
    <v-text-field
      v-model="bus.basis"
      label="Basis"
      :readonly="true"
      :disabled="true"
      type="nunber"
    />
    <v-text-field
      v-model="bus.intervalMinutes"
      label="Interval Length (minutes)"
      :readonly="true"
      :disabled="true"
    />
    <v-text-field
      v-model:model-value="bus.startTimeString"
      label="Start Time"
      :readonly="true"
      :disabled="true"
    />
  </v-form>
</template>

<style scoped>
</style>