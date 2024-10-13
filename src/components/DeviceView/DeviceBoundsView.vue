<script setup lang="ts">
import { defineProps } from 'vue';
import * as d3 from 'd3';
import type { IBaseDevice } from '@/model/devices';
import { RunSpec } from '@/model/RunSpec';
import RunSpecView from './RunSpecView.vue';


const { device, type } = defineProps<{
  device: IBaseDevice,
  type: 'bounds' | 'cbounds'
}>();

// const hBounds = device[type]?[1] ? device[type]?[1] : new RunSpec;

</script>

<template>
  <div>
    <h3>Upper bounds</h3>
    <RunSpecView :runSpec='device.bounds[1]'></RunSpecView>
  </div>
  <div>
    <h3>Lower bounds</h3>
    <RunSpecView :runSpec='device.bounds[0]'></RunSpecView>
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