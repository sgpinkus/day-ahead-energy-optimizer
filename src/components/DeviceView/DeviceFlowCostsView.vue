<script setup lang="ts">
import { computed, defineProps, onMounted, ref, type Ref } from 'vue';
import type { IBaseDevice } from '@/model/devices';
import { RunSpec, PolyRunSpecNumberView, type IRunSpec } from '@/model/RunSpec';
import RunSpecView from './RunSpecView.vue';
import { compact } from 'lodash';


const { device } = defineProps<{
  device: IBaseDevice,
}>();

type Triple = [number, number, number];

const costSpec: Ref<IRunSpec<Triple>> = ref(device.costs['flow'] ? device.costs['flow'].cost.copy() : new RunSpec<Triple>(device.basis, [0,0,0]));
const costSpecView: Ref<IRunSpec<number>> = ref(new PolyRunSpecNumberView(costSpec.value));

const isUnset = computed(() => !device.costs['flow']);

function unSet() {
  device.costs['flow'] = undefined; // eslint-disable-line vue/no-mutating-props
}

function dataChanged() {

}

onMounted(() => {
});


</script>

<template>
  <v-container>
    <v-row>
      <v-col cols='3'>
        <v-form>
          <v-text-field
            type="number"
            :min=0
            :max=100
            :step=0.1
            label='a'
          ></v-text-field>
          <v-text-field
            type="number"
            :min=0
            :max=100
            :step=0.1
          ></v-text-field>
        </v-form>
      </v-col>
      <v-col cols='9'>
        <div style='border: solid 1px salmon; align-self: stretch;'>
          <h3>Cost curve</h3>
          <p>Curve here.</p>
        </div>
      </v-col>
    </v-row>
  </v-container>
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
  <v-spacer></v-spacer>
</template>

<style scoped>
  .v-card {
    margin: 1em;
  }

  .v-container {
    max-width: 960px;
  }

  hr {
    padding: 1em;
    visibility: hidden;
  }
</style>