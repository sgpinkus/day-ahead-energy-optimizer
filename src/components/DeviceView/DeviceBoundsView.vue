<script setup lang="ts">
import { defineProps, onMounted, useTemplateRef } from 'vue';
import type { IBaseDevice } from '@/model/devices';
import EditableBarChart from './EditableBarChart';
import * as d3 from 'd3';

const { device, width = 960, height = 200 } = defineProps<{
  device: IBaseDevice,
  width?: number | string,
  height?: number | string,
}>();

const data = [10.57, 0.14, 0.17, 0.49, 0.29, 0.22, 0.01, 0.27, 0.57, 0.2, 0.19, 0.05, 0.8, 0.49, 0.31, 0.56, 0.75, 0.66, 0.67, 0.37, 0.62, 0.5, 0.82, 0.31, 0.57, 0.25, 0.87, 0.24, 0.89, 0.73, 0.76, 0.53, 0.79, 0.95, 0.31, 0.18, 0.56, 0.11, 0.87, 0.26, 0.22, 0.65, 0.13, 0.21, 0.96, 0.92, 0.61, 0.45];

const container = useTemplateRef('container');

onMounted(() => {
  if(!container.value) return;
  const x = new EditableBarChart(container.value, {
    range: [0,1],
    xFormatter: (n: number) => { return d3.format('02d')(Math.floor(n/2)) + ':' + d3.format('02d')((n % 2)*30); }
  });
  x.draw(data);
});
</script>

<template>
  <svg ref='container' :width='width' :height='height'></svg>
</template>