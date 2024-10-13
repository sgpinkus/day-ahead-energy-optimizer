<script setup lang="ts">
import { computed, defineProps } from 'vue';
import type { IBaseDevice } from '@/model/devices';
import { RunSpec } from '@/model/RunSpec';
import RunSpecView from './RunSpecView.vue';


const { device } = defineProps<{
  device: IBaseDevice,
}>();

const hBounds = device.cbounds ? device.cbounds[1].copy() : new RunSpec(device.basis, undefined, device.hardBounds);
const lBounds = device.cbounds ? device.cbounds[0].copy() : new RunSpec(device.basis, undefined, device.hardBounds);

function unSetCBounds() {
}

</script>

<template>
  <v-card>
    <h3>Upper cummulative bounds</h3>
    <RunSpecView :runSpec='hBounds'></RunSpecView>
    <v-card-actions class="d-flex justify-end align-baseline" style="gap: 1rem">
      <v-btn @click='unSetCBounds'>UNSET BOUNDS</v-btn>
    </v-card-actions>
  </v-card>
  <v-card>
    <h3>Lower cummulative bounds</h3>
    <RunSpecView :runSpec='lBounds'></RunSpecView>
    <v-card-actions class="d-flex justify-end align-baseline" style="gap: 1rem">
      <v-btn @click='unSetCBounds'>UNSET BOUNDS</v-btn>
    </v-card-actions>
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