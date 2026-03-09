<script setup lang="ts">
import { computed, ref, watch, type Ref } from 'vue';
import { cloneDeep } from 'lodash';

const emit = defineEmits(['change']);
const { minLength, maxLength, minValue = -Infinity, maxValue = Infinity, initialValue = '' } = defineProps<{
  minLength: number,
  maxLength: number,
  minValue?: number,
  maxValue?: number,
  initialValue?: string,
}>();

const csv: Ref<string> = ref(initialValue);

const parsed: Ref<{ error: string | undefined, value: number[] | undefined }> = computed(() => {
  if (!csv.value.trim()) return { error: 'Value is required', value: undefined };
  const a = csv.value.replace(/^([\s,])|([\s,])$/, '').split(/\s*,\s*/).map(v => v === '' ? NaN : Number(v));
  if (a.length < minLength) return { error: `Too short (${a.length} < ${minLength})`, value: undefined };
  if (a.length > maxLength) return { error: `Too long (${a.length} > ${maxLength})`, value: undefined };
  const eI = a.findIndex(v => Number.isNaN(v));
  if (eI >= 0) return { error: `Invalid value at index ${eI}`, value: undefined };
  const eMinVal = a.findIndex(v => v < minValue);
  if (eMinVal >= 0) return { error: `Value too small at index ${eMinVal}`, value: undefined };
  const eMaxVal = a.findIndex(v => v > maxValue);
  if (eMaxVal >= 0) return { error: `Value too large at index ${eMaxVal}`, value: undefined };
  return { value: a, error: undefined };
});

watch(parsed, () => {
  if (parsed.value.value) emit('change', cloneDeep(parsed.value.value));
});

</script>

<template>
  <v-textarea
    v-model:model-value="csv"
    placeholder="Enter data as CSV"
    :required="true"
    :error-messages="parsed.error"
  />
</template>