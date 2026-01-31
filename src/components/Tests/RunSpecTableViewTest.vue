<script setup lang="ts">
import { ref, toRaw, watch } from 'vue';
import RunSpecTableView from '@/components/components/RunSpecTableView.vue';
import { RunSpec, XYRunSpecAdaptor } from '@/lib/runspec';

const formValid = ref(false);
const data = ref(new RunSpec<number>(48, 0));
const _data = new XYRunSpecAdaptor<number, [number]>(data.value, (x) => [x], (x) => x[0]);

watch(data, (n,v ) => console.log('w', n,v));

const careFactorTableValueSpec = [
  { label: 'temp', min: 0.1, max: 1e2, step: 0.1 },
];

function change() {
  console.log(toRaw(data.value.runs));
}

function move(i: number, newStart: number) {
  console.log('move', i, newStart);
}

</script>

<template>
  <div>
    <v-form
      ref="form"
      v-model="formValid"
    >
      <RunSpecTableView
        :run-spec="_data"
        :value-spec="careFactorTableValueSpec"
        :focusable="true"
        @move="move"
        @change="change"
      />
    </v-form>
  </div>
</template>

<style scoped>

td.temp-value {
  width: min-content;
}

</style>
