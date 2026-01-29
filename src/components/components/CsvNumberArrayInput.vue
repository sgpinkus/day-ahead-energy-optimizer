<script setup lang="ts">
import { computed, ref, watch, type Ref } from 'vue';
import { cloneDeep } from 'lodash';

const emit = defineEmits(['change']);
const { minLength, maxLength, minValue = -Infinity, maxValue = Infinity, initialValue = [] } = defineProps<{
  minLength: number,
  maxLength: number,
  minValue?: number,
  maxValue?: number,
  initialValue?: number[],
}>();

const csv: Ref<string> = ref(initialValue.join());

const parsed: Ref<{ error: string | undefined, value: number[] | undefined }> = computed(() => {
  if (!csv.value.trim()) return { error: 'Value is required', value: undefined };
  const a = csv.value.replace(/^([\s,])|([\s,])$/, '').split(/\s*,\s*/).map(v => Number(v));
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

const arr = computed(() => parsed.value.value);
const message = computed(() => parsed.value.error);

watch(arr, () => emit('change', cloneDeep(arr.value)));

</script>

<template>
  <v-textarea
    v-model:model-value="csv"
    placeholder="Enter data as CSV"
    :required="true"
    :error-messages="message"
  />
</template>