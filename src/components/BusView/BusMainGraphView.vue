<script setup lang="ts">
import model from '@/model';
import router from '@/router';
import { computed, onMounted, ref, useTemplateRef, watch, type Ref, inject } from 'vue';
import { DataSet, Network } from 'vis-network/standalone';
import { pick } from 'lodash';

const nodeDefaults = {
  color: 'lightblue',
  shape: 'circle',
}


const deviceNodes = computed(() => Object.values(model.devices.getDevices())
  .map(v => ({
    ...nodeDefaults,
    id: v.id,
    label: v.title || v.id,
    title: v.description,
    fixed: false,
    ...pick(v, ['shape', 'color']),
  }))
);

const busNode = { id: 0, label: 'bus', fixed: true, ...nodeDefaults };

const nodes = computed(() => new DataSet([busNode, ... deviceNodes.value]));
const edges = computed(() => new DataSet(deviceNodes.value.map((v) => ({ from: 0, to: v.id })) as any));
const options = {
  autoResize: false,
  height: '100%',
  width: '100%',
  locale: 'en',
  physics: false,
  interaction: {
    dragView: false,
    zoomView: false,
  },
};
const container: Ref<HTMLElement | null> = useTemplateRef('container');
let network: Network;

watch(nodes, (newComponentNodes) => {
  if(network) network.destroy();
  network = new Network(container.value!, { nodes: newComponentNodes, edges: edges.value as any }, options);
  network.on('click', onClick);
  network.on('doubleClick', onDoubleClick);
},
);

watch(model, () => {
  try {
    if(model.focusedDeviceId) network.selectNodes([model.focusedDeviceId]);
  } catch {
  }
});

function onClick(params: any) {
  const clickedNodeId = String(network.getNodeAt(params.pointer.DOM));
  model.focusedDeviceId = clickedNodeId;
}

function onDoubleClick(params: any) {
  const clickedNodeId = String(network.getNodeAt(params.pointer.DOM));
  router.dispatch({ name: 'devices', params: { id: clickedNodeId } });
}

onMounted(() => {
  network = new Network(container.value!, { nodes: nodes.value, edges: edges.value as any }, options);
  network.on('click', onClick);
  network.on('doubleClick', onDoubleClick);
});

</script>
<template>
  <div ref='container' class='container'></div>
</template>

<style scoped>
  .focused {
    background-color: lightgray;
  }

  .container {
    height: 100%;
    border: 0;
    padding: 0;
    margin: 0;
  }
</style>