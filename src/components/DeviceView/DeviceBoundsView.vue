<script setup lang="ts">
import { defineProps, onMounted, useTemplateRef } from 'vue';
import type { IBaseDevice } from '@/model/devices';
import { draw } from '@/components/components/RunSpecEditor';
import * as d3 from 'd3';

const { device } = defineProps<{
  device: IBaseDevice,
  width?: number | string,
  height?: number | string,
}>();
const container = useTemplateRef('container');

function _draw() {
  if(!container.value) return;
  draw(
    container.value,
    device.bounds,
    onDataChange,
    {
      // range: [0,1],
      xFormatter: (n: number) => d3.format('02d')(Math.floor(n/2)) + ':' + d3.format('02d')((n % 2)*30),
    }
  );
}

function onDataChange() {
  d3.select(container.value).selectAll('*').remove();
  _draw();
}

onMounted(() => {
  _draw();
});
</script>

<template>
  <svg
    ref='container'
    viewBox="0 0 960 480"
    preserveAspectRatio="xMidYMid meet">></svg>
</template>