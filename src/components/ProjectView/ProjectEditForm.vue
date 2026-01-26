<script setup lang="ts">
/* eslint-disable vue/no-mutating-props */
import { type Project } from '@/model';
import { ref, useTemplateRef, type Ref } from 'vue';

const { project } = defineProps<{ project: Project }>();
const form: Ref<HTMLFormElement | null> = useTemplateRef('form');
const valid = ref(false);

const titleMaxLength = 32;
const titleRules = [
  (v: any) => (!v || v && v.length <= titleMaxLength) || `title must be less than ${titleMaxLength} characters`,
];

</script>

<template>
  <v-form
    v-if="project"
    ref="form"
    v-model="valid"
    lazy-validation
  >
    <v-text-field
      v-model="project.title"
      :counter="titleMaxLength"
      :rules="titleRules"
      :label="project.title ? '' : 'Title'"
    />
    <v-text-field
      v-model="project.id"
      label="ID"
      :readonly="true"
      :disabled="true"
    />
    <v-text-field
      v-model="project.basis"
      label="Basis"
      :readonly="true"
      :disabled="true"
      type="nunber"
    />
    <v-text-field
      v-model="project.interval"
      label="Interval Length (minutes)"
      :readonly="true"
      :disabled="true"
    />
    <v-text-field
      v-model:model-value="project.startTime"
      label="Start Time"
      :readonly="true"
      :disabled="true"
    />
  </v-form>
</template>

<style scoped>
</style>