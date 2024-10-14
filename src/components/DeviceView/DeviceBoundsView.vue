<script setup lang="ts">
import { computed, defineProps } from 'vue';
import type { IBaseDevice } from '@/model/devices';
import RunSpecView from './RunSpecView.vue';


const { device } = defineProps<{
  device: IBaseDevice,
}>();

// Just edit directly instead of a copy..
const lBounds = device.bounds[0];
const hBounds = device.bounds[1];

</script>

<template>
  <v-card>
    <h3>Upper bounds</h3>
    <RunSpecView :runSpec='hBounds'></RunSpecView>
  </v-card>
  <v-card>
    <h3>Lower bounds</h3>
    <RunSpecView :runSpec='lBounds'></RunSpecView>
  </v-card>
  <v-spacer></v-spacer>
</template>

<style scoped>
  .v-card {
    margin: 1em;
  }

  hr {
    padding: 1em;
    visibility: hidden;
  }
</style>