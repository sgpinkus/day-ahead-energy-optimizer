<script setup lang="ts">
import { defineProps, onMounted, useTemplateRef, computed, defineEmits } from 'vue';
import { draw, type Options } from '@/components/components/RunSpecEditor';
import * as d3 from 'd3';
import { RunSpec } from '@/model/RunSpec';

const emit = defineEmits(['data-changed']);

const { runSpec, width = 1280, height = 480 } = defineProps<{
  runSpec: RunSpec,
  width?: number | string,
  height?: number | string,
}>();
const container = useTemplateRef('container');
const options: Partial<Options> =     {
  // range: [0, undefined],
  autoPaddingFactor: [0.5, 0.5],
  xFormatter: (n: number) => d3.format('02d')(Math.floor(n/2)) + ':' + d3.format('02d')((n % 2)*30),
};
const viewBox = computed(() => `0 0 ${width} ${height}`);

function _draw() {
  if(!container.value) return;
  d3.select(container.value).selectAll('*').remove();
  draw(
    container.value,
    runSpec,
    onDataChange,
    options
  );
}

function onDataChange() {
  emit('data-changed');
  _draw();
}

onMounted(() => {
  _draw();
});
</script>

<template>
  <div>
    <svg
      ref='container'
      :viewBox=viewBox
      preserveAspectRatio="xMidYMid meet">
    </svg>
  </div>
</template>

<style scoped>
  /** TODO: get this to stretch! */
  div {
    min-width: 400px;
    /* max-width: 960px; */
    width: 960px;
    min-height: 100px;
    flex: 1;
  }
</style>