<script setup lang="tsx">
/**
 * Takes a RunSpec whose value is a number[] and renders it as an editable table
 * with value editor specified by ValueSpec prop.
 */
import { computed, defineProps, onMounted, ref } from 'vue';
import type { Ref } from 'vue';
import type { IRunSpec } from '@/model/runspec';
import MyNumberTextField from '@/components/components/MyNumberTextField';

type ValueSpec = {
  label: string,
  min?: number,
  max?: number,
  step?: number,
}

const { runSpec, valueSpec, focusable = false, initialRowSelected = true } = defineProps<{
  runSpec: IRunSpec<number[]>,
  valueSpec: ValueSpec[],
  focusable?: boolean,
  initialRowSelected?: boolean,
}>();

const emit = defineEmits(['rowSelected', 'unset', 'split', 'move', 'set', 'change']);

// Just edit directly instead of a copy..
const ranges = computed(() =>  runSpec.toRanges().map(v => ({ value: v[0], range: v[1] })));

const tableKeys = computed(() => {
  return ['start', 'end', ...valueSpec.map(v => v.label)];
});

const focusedRow: Ref<number | null> = ref(null);

function setNumber(i: number, oldValue: number[], j: number, v: number) {
  const newValue = [...oldValue];
  newValue[j] = Number(v);
  runSpec.set(i, newValue);
  emit('set', i, newValue);
  emit('change');
}

function unsetIndex(i: number) {
  runSpec.unsetIndex(i);
  emit('unset', i);
  emit('change');
}

function splitIndex(i: number) {
  runSpec.split(i);
  emit('split', i);
  emit('change');
}

function move(i: number, newStart: any) {
  runSpec.move(i, newStart);
  emit('move', i, newStart);
  emit('change');
}

function setFocused(i: number | null) {
  if (!focusable) return;
  focusedRow.value = i;
  emit('rowSelected', i);
  emit('change');
}

onMounted(() => {
  if (focusable && initialRowSelected) {
    setFocused(0);
  }
});

</script>

<template>
  <!-- @keyup.escape='setFocused(null)' -->
  <v-table>
    <thead>
      <tr>
        <th
          v-for="h in tableKeys"
          :key="h"
        >
          {{ h }}
        </th>
        <th style="text-align: right">
          <slot name="globals" />
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(row, i) in ranges"
        :key="i"
        :class="{ focused: i === focusedRow }"
        @click="setFocused(i)"
      >
        <td>
          <MyNumberTextField
            min="1"
            :max="runSpec.length-1"
            step="1"
            :disabled="i === 0"
            :hide-spin-buttons="i ===0"
            :model-value="row.range[0]"
            @update:model-value="(newValue: number) => move(row.range[0], newValue)"
          />
        </td>
        <td>
          <MyNumberTextField
            disabled
            :model-value="row.range[1]"
          />
        </td>
        <template
          v-for="(spec, i) in valueSpec"
          :key="i"
        >
          <td>
            <MyNumberTextField
              :min="spec.min ?? null"
              :max="spec.max ?? null"
              :step="spec.step ?? null"
              :model-value="row.value[i]"
              @update:model-value="(newValue: number) => setNumber(row.range[0], row.value, i, newValue)"
            />
          </td>
        </template>
        <td style="text-align: right">
          <v-btn
            v-if="i"
            title="delete"
            flat
            size="small"
            @click="() => unsetIndex(i)"
          >
            <v-icon>mdi-delete-circle</v-icon>
          </v-btn>
          <v-btn
            v-if="row.range[1] > row.range[0] + 1"
            title="split"
            flat
            size="small"
            @click="() => splitIndex(i)"
          >
            <v-icon>mdi-table-split-cell</v-icon>
          </v-btn>
        </td>
      </tr>
    </tbody>
  </v-table>
</template>

<style scoped>
td {
  padding: 0;
}
.focused {
  background-color: lightgray;
}
</style>