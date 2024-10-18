<script setup lang="ts">
import { computed, defineProps, onMounted, ref, useTemplateRef, type Ref } from 'vue';
import * as d3 from 'd3';
import type { IBaseDevice } from '@/model/devices';
import { RunSpec, PolyRunSpecNumberView, type IRunSpec } from '@/model/RunSpec';
import RunSpecView from './RunSpecView.vue';
import { draw } from '@/components/components/Plot';

const { device, width = 960, height = 360 } = defineProps<{
  device: IBaseDevice,
  width?: number,
  height?: number,
}>();

const plot = useTemplateRef('plot');

type Triple = [number, number, number];

const costSpec: Ref<IRunSpec<Triple>> = ref(device.costs['flow'] ? device.costs['flow'].cost.copy() : new RunSpec<Triple>(device.basis, [0,0,0]));
const costSpecView: Ref<IRunSpec<number>> = ref(new PolyRunSpecNumberView(costSpec.value));

const isUnset = computed(() => !device.costs['flow']);
const viewBox = computed(() => `0 0 ${width} ${height}`);

function unSet() {
  device.costs['flow'] = undefined; // eslint-disable-line vue/no-mutating-props
}

function dataChanged() {

}

function _draw() {
  if(!plot.value) return;
  d3.select(plot.value).selectAll('*').remove();
  draw(plot.value, Array.from(Array(20)).map((v, k) => k));
}

onMounted(() => {
  _draw();
});


</script>

<template>
  <div class='container'>
    <div class='w-100'>
      <div style='border: solid 1px salmon; align-self: stretch;'>
        <h3>Cost curve</h3>
        <svg
          ref='plot'
          :viewBox=viewBox
          preserveAspectRatio="xMidYMid meet"
        >
        </svg>
      </div>
    </div>
    <div>
      <v-form>
        <v-card class="d-flex flex-row w-100 justify-space-between">
          <v-text-field
            type="number"
            :min=0
            :max=100
            :step=0.1
            label='a'
          ></v-text-field>
          <v-spacer></v-spacer>
          <v-text-field
            type="number"
            :min=0
            :max=100
            :step=0.1
            label='b'
          ></v-text-field>
          <v-spacer></v-spacer>
          <v-text-field class='flex-1-1'
            type="number"
            :min=0
            :max=100
            :step=0.1
            label='offset'
          ></v-text-field>
        </v-card>
      </v-form>
    </div>
    <v-card>
      <h3></h3>
      <RunSpecView :runSpec='costSpecView' @data-changed='dataChanged'></RunSpecView>
      <v-card-actions class="d-flex justify-end align-baseline" style="gap: 1rem">
        <v-btn
          :disabled='isUnset'
          @click='unSet'
          :style='{ textDecoration: isUnset ? "line-through" : "initial" }'
        >
          UNSET COST
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<style scoped>
  .v-card {
    margin: 1em;
  }

  .container {
    max-width: 960px;
  }

  hr {
    padding: 1em;
    visibility: hidden;
  }
</style>