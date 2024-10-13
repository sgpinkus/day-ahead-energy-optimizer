<script setup lang="ts">
import { defineProps, onMounted, useTemplateRef, computed } from 'vue';
import type { IBaseDevice } from '@/model/devices';
import { draw, type Options } from '@/components/components/RunSpecEditor';
import * as d3 from 'd3';

const { device, width = 1280, height = 480 } = defineProps<{
  device: IBaseDevice,
  type: 'bounds' | 'cbounds'
  width?: number | string,
  height?: number | string,
}>();
const containerHigh = useTemplateRef('container-high');
const containerLow = useTemplateRef('container-low');
const options: Partial<Options> =     {
  // range: [0, undefined],
  autoPaddingFactor: [0.5, 0.5],
  xFormatter: (n: number) => d3.format('02d')(Math.floor(n/2)) + ':' + d3.format('02d')((n % 2)*30),
};
const viewBox = computed(() => `0 0 ${width} ${height}`);


function _draw() {
  if(!containerHigh.value) return;
  if(!containerLow.value) return;
  draw(
    containerLow.value,
    device.bounds[0],
    onDataChange,
    options
  );
  draw(
    containerHigh.value,
    device.bounds[1],
    onDataChange,
    options,
  );
}

function onDataChange() {
  d3.select(containerHigh.value).selectAll('*').remove();
  d3.select(containerLow.value).selectAll('*').remove();
  _draw();
}

onMounted(() => {
  _draw();
});
</script>

<template>
  <div>
    <h3>Upper bounds</h3>
    <svg
      ref='container-high'
      :viewBox=viewBox
      preserveAspectRatio="xMidYMid meet">
    </svg>
  </div>
  <div>
    <h3>Lower bounds</h3>
    <svg
      ref='container-low'
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

  hr {
    padding: 1em;
    visibility: hidden;
  }
</style>