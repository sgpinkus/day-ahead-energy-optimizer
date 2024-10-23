<script setup lang="ts">
import { computed, defineProps, ref, useTemplateRef, watch } from 'vue';
import * as d3 from 'd3';
import { draw } from '@/components/components/Plot';

const { data, width = 1280, height = 480 } = defineProps<{
  data: Record<number | string, number>,
  width?: number,
  height?: number,
}>();

const plot = useTemplateRef('plot');

function _draw() {
  if(!plot.value) return console.debug('Not drawing because plot container ref is null!');
  if(!data) return console.debug('Not drawing because data is null!');
  d3.select(plot.value).selectAll('*').remove();
  draw(plot.value, data);
}

const viewBox = computed(() => `0 0 ${width} ${height}`);

watch(() => data, () => {
  if(data) _draw();
}, {
  immediate: true
});

watch(plot, () => _draw());

</script>

<template>
  <svg
    ref='plot'
    :viewBox=viewBox
    preserveAspectRatio="xMidYMid meet"
  >
  </svg>
</template>
