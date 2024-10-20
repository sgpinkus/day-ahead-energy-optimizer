<script setup lang="tsx">
/**
 * Takes a RunSpec whose value is a number[] and renders it as an editable table
 * with value editor specified by ValueSpec prop.
 */
import { computed, defineComponent, defineProps, ref, type Ref } from 'vue';
import type { IRunSpec } from '@/model/RunSpec';

type ValueSpec = {
  label: string,
  min?: number,
  max?: number,
  step?: number,
}

const { runSpec, valueSpec, focusable = false } = defineProps<{
  runSpec: IRunSpec<number[]>,
  valueSpec: ValueSpec[],
  focusable?: boolean,
}>();

const emit = defineEmits(['rowSelected']);

// Just edit directly instead of a copy..
const ranges = computed(() =>  runSpec.toRanges().map(v => ({ value: v[0], range: v[1] })));

const tableKeys = computed(() => {
  return ['start', 'end', ...valueSpec.map(v => v.label)];
});

const focusedRow: Ref<number | null> = ref(null);

function unsetIndex(i: number) {
  runSpec.unsetIndex(i);
}

function splitIndex(i: number) {
  runSpec.split(i);
}

function move(i: number, newStart: any) {
  runSpec.move(i, newStart);
}

function setNumber(i: number, oldValue: number[], j: number, v: number) {
  const newValue = [...oldValue];
  newValue[j] = Number(v);
  runSpec.set(i, newValue);
}

const MyNumberTextField = defineComponent({
  name: 'MyNumberTextField',
  setup(_props, { slots, attrs }) {
    return () =>
      <v-text-field
        type='number'
        hide-details
        rounded='0'
        label=''
        density='compact'
        flat
        {...attrs}
      >{slots.default && slots.default()}</v-text-field>;
  },
});

function setFocused(i: number | null) {
  if(!focusable) return;
  focusedRow.value = i;
  emit('rowSelected', i);
}

</script>

<template>
    <v-table
      @keyup.escape='setFocused(null)'
    >
      <thead>
        <tr>
          <th v-for='h in tableKeys' :key='h'>
          {{ h }}
          </th>
          <th style='text-align: right'><slot name="globals"></slot></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for='(row, i) in ranges' :key='i' @click='setFocused(i)' :class='{ focused: i === focusedRow }'>
          <td>
            <MyNumberTextField
              min=1
              :max='runSpec.length-1'
              step=1
              :disabled='i === 0'
              :hide-spin-buttons='i ===0'
              :model-value='row.range[0]'
              @update:modelValue='(newValue: number) => move(row.range[0], newValue)'
            >
            </MyNumberTextField>
          </td>
          <td>
            <MyNumberTextField
              disabled
              :model-value='row.range[1]'
            ></MyNumberTextField>
          </td>
          <template v-for='(spec, i) in valueSpec' :key=i>
            <td>
              <MyNumberTextField
                  :min='spec.min ?? null'
                  :max='spec.max ?? null'
                  :step='spec.step ?? null'
                  :model-value='row.value[i]'
                  @update:modelValue='(newValue: number) => setNumber(row.range[0], row.value, i, newValue)'
                >
              </MyNumberTextField>
            </td>
          </template>
          <td style='text-align: right'>
            <v-btn title='delete' v-if='i' flat size="small" @click='() => unsetIndex(i)'>
              <v-icon>mdi-delete-circle</v-icon>
            </v-btn>
            <v-btn title='split' v-if='row.range[1] > row.range[0] + 1' flat size="small" @click='() => splitIndex(i)'>
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