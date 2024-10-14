<script setup lang="ts">
import { computed, defineProps, onMounted, ref } from 'vue';
import type { IBaseDevice } from '@/model/devices';
import { RunSpec } from '@/model/RunSpec';
import RunSpecView from './RunSpecView.vue';
import { cloneDeep } from 'lodash';


const { device } = defineProps<{
  device: IBaseDevice,
}>();

const lBounds = ref(device.cbounds[0] ? device.cbounds[0].copy() : new RunSpec(device.basis, undefined, device.hardBounds));
const hBounds = ref(device.cbounds[1] ? device.cbounds[1].copy() : new RunSpec(device.basis, undefined, device.hardBounds));

const isUnSetLBounds = computed(() => !device.cbounds[0]);
const isUnSetHBounds = computed(() => !device.cbounds[1]);

function unSetCBoundsLow() {
  device.cbounds[0] = undefined; // eslint-disable-line vue/no-mutating-props
  lBounds.value = new RunSpec(device.basis, undefined, device.hardBounds);
}

function unSetCBoundsHigh() {
  device.cbounds[1] = undefined; // eslint-disable-line vue/no-mutating-props
  hBounds.value = new RunSpec(device.basis, undefined, device.hardBounds);
}

/**
 * Update the model value from copy. Not using watchEffect because setting the copy initially or on reset triggers
 * the watchEffect.
 */
function lBoundsDataChanged() {
  device.cbounds[0] = lBounds.value.copy(); // eslint-disable-line vue/no-mutating-props
}

function hBoundsDataChanged() {
  device.cbounds[1] = hBounds.value.copy(); // eslint-disable-line vue/no-mutating-props
}

onMounted(() => {
  console.log(cloneDeep(device.cbounds));
});


</script>

<template>
  <v-card>
    <h3>Upper cummulative bounds</h3>
    <RunSpecView :runSpec='hBounds' @data-changed='hBoundsDataChanged'></RunSpecView>
    <v-card-actions class="d-flex justify-end align-baseline" style="gap: 1rem">
      <v-btn
        :disabled='isUnSetHBounds'
        @click='unSetCBoundsHigh'
        :style='{ textDecoration: isUnSetHBounds ? "line-through" : "initial" }'
      >
        UNSET BOUNDS
      </v-btn>    </v-card-actions>
  </v-card>
  <v-card>
    <h3>Lower cummulative bounds</h3>
    <RunSpecView :runSpec='lBounds' @data-changed='lBoundsDataChanged'></RunSpecView>
    <v-card-actions class="d-flex justify-end align-baseline" style="gap: 1rem">
      <v-btn
        :disabled='isUnSetLBounds'
        @click='unSetCBoundsLow'
        :style='{ textDecoration: isUnSetLBounds ? "line-through" : "initial" }'
      >
        UNSET BOUNDS
      </v-btn>
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