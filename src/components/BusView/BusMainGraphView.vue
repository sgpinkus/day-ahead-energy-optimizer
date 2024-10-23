<script setup lang="ts">
import * as d3 from 'd3';
import { computed, onMounted, useTemplateRef, watch, watchEffect, type Ref } from 'vue';
import model from '@/model';
import router from '@/router';
import { draw, type Options } from '@/components/components/NetworkHub';

const nodeDefaults = {
  color: 'lightblue',
  shape: 'circle',
};

const deviceNodes = computed(() => Object.values(model.devices.getDevices()));
const busNode = { id: 'hub', title: 'Bus', ...nodeDefaults };

const options: Partial<Options> = {
  focusedNode: '',
};
const container: Ref<SVGSVGElement | null> = useTemplateRef('container');

function _draw() {
  if(!container.value) return;
  d3.select(container.value).selectAll('*').remove();
  draw(
    container.value!,
    {
      nodes: deviceNodes.value,
      hub: busNode,
    },
    options,
    onClick,
    onDoubleClick,
  );
}

function onClick(id: string) {
  console.log('onClick', id);
  if(id !== undefined && id !== 'hub')
  model.focusedDeviceId = id;
}

function onDoubleClick(id: string) {
  if(id !== undefined) router.dispatch({ name: 'devices', params: { id } });
}

watch(deviceNodes, () => _draw());

watchEffect(() => {
  console.log('watchEffect');
  options.focusedNode = model.focusedDeviceId || undefined;
  _draw();
});

onMounted(() => {
  _draw();
});

</script>

<template>
  <svg
    id='container'
    ref='container'
    viewBox="0 0 480 480"
    preserveAspectRatio="xMidYMid meet">
  </svg>
</template>

<style scoped>
  :global(.focused-node) {
    stroke-width: 3;
  }
</style>