<script setup lang="tsx">
import { computed, defineComponent, defineProps } from 'vue';
import type { IBaseDevice } from '@/model/devices';

const { device } = defineProps<{
  device: IBaseDevice,
}>();

// Just edit directly instead of a copy..
const ranges = computed(() =>  device.bounds.toRanges());

const tableItems = computed(() => {
  return ranges.value.map(([v, range]) => ({ start: range[0], end: range[1], low: v[0], high: v[1] }));
});

const tableKeys = computed(() => {
  return Object.keys(tableItems.value[0]);
});

function unsetIndex(i: number) {
  device.bounds.unsetIndex(i);
}

function splitIndex(i: number) {
  device.bounds.split(i);
}

function move(i: number, newStart: any) {
  device.bounds.move(i, newStart);
}

function set(i: number, v: [number, number]) {
  device.bounds.set(i, v);
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

</script>

<template>
    <v-table
    >
      <thead>
        <tr>
          <th v-for='h in tableKeys' :key='h'>
          {{ h }}
          <!-- <v-btn flat size="small" @click='() => sortTable(h)'><v-icon>mdi-sort</v-icon></v-btn> -->
          </th>
          <th>&nbsp;</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for='(row, i) in tableItems' :key='i'>
          <td>
            <MyNumberTextField
              min=1
              :max='device.basis-1'
              step=1
              :disabled='i === 0'
              :hide-spin-buttons='i ===0'
              :model-value='row.start'
              @update:modelValue='(newValue: number) => move(row.start, newValue)'
            >
            </MyNumberTextField>
          </td>
          <td>
            <MyNumberTextField
              disabled
              :model-value='row.end'
            ></MyNumberTextField>
          </td>
          <td>
            <MyNumberTextField
              :min=device.hardBounds[0]
              :max=device.hardBounds[1]
              step=0.01
              :model-value='row.low'
              @update:modelValue='(newValue: number) => set(row.start, [newValue, row.high])'
            >
            </MyNumberTextField>
          </td>
          <td>
            <MyNumberTextField
              :min=device.hardBounds[0]
              :max=device.hardBounds[1]
              step=0.01
              :model-value='row.high'
              @update:modelValue='(newValue: number) => set(row.start, [row.low, newValue])'
            >
            </MyNumberTextField>
          </td>
          <td style='text-align: right'>
            <v-btn title='delete' v-if='i' flat size="small" @click='() => unsetIndex(i)'>
              <v-icon>mdi-delete-circle</v-icon>
            </v-btn>
            <v-btn title='split' v-if='row.end > row.start + 1' flat size="small" @click='() => splitIndex(i)'>
              <v-icon>mdi-table-split-cell</v-icon>
            </v-btn>
          </td>
        </tr>
      </tbody>
    </v-table>
</template>

<style scoped>
td { padding: 0; }
</style>