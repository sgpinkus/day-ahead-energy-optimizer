<script setup lang="ts">
import { onMounted, useTemplateRef, computed, watch } from 'vue';
import { draw, type Options } from '@/components/components/NumberRunSpecEditor';
import * as d3 from 'd3';
import type { IRunSpec } from '@/model/runspec';

const emit = defineEmits(['data-changed']);

const { runSpec, width = 1280, height = 360, options = {} } = defineProps<{
  runSpec: IRunSpec<number>,
  width?: number | string,
  height?: number | string,
  options?: Partial<Options>
}>();


const container = useTemplateRef('container');
const _options: Partial<Options> = {
  autoPaddingFactor: [0.5, 0.5],
  xFormatter: (n: number) => d3.format('02d')(Math.floor(n/2)) + ':' + d3.format('02d')((n % 2)*30),
  ...options,
};
const viewBox = computed(() => `0 0 ${width} ${height}`);

// This doesn't react.
watch(()=> runSpec, () => _draw());
// This is makes this component react to changes properly - no idea why. Maybe props are shallow by def?
const ranges = computed(() =>  runSpec.toRanges());
watch(ranges, () => _draw());

function _draw() {
  if(!container.value) return;
  d3.select(container.value).selectAll('*').remove();
  draw(
    container.value,
    runSpec,
    onDataChange,
    _options
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
      preserveAspectRatio="xMidYMid meet"
    >
    </svg>
  </div>
</template>

<style scoped>
  /** TODO: get this to stretch! */
  div {
    min-width: 480px;
    min-height: 100px;
    flex: 1;
  }
</style>