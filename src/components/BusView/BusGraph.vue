<script setup lang="ts">
import model from '@/model';
import { computed, onMounted, ref, useTemplateRef, watch, type Ref } from 'vue';
import { DataSet, Network } from 'vis-network/standalone';

const deviceNodes = computed(() => Object.values(model.devices.getDevices())
    .map(v =>  ({ id: v.id, label: v.title || v.id, fixed: false }))
);

const busNode = { id: 0, label: 'bus', fixed: true };

const nodes = computed(() => new DataSet([{ id: 0, label: 'bus', fixed: true }, ... deviceNodes.value]));
const edges = computed(() => new DataSet(deviceNodes.value.map((v) => ({ from: 0, to: v.id })) as any));
const options = {
  autoResize: false,
  height: '100%',
  width: '100%',
  locale: 'en',
  physics: false,
};
const container: Ref<HTMLElement | null> = useTemplateRef('container');
let network: Network;

watch(nodes, (newComponentNodes) => {
  if(network) network.destroy();
  network = new Network(container.value!, { nodes: newComponentNodes, edges: edges.value as any }, options);
  network.on('click', onClick);
});

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

onMounted(() => {
  network = new Network(container.value!, { nodes: [busNode], edges: edges.value as any }, options);
});

</script>
<template>
  <v-container style='display: flex; flex-flow: column nowrap; height: 100vh'>
    <div ref='container' style='height: 100%'></div>
  </v-container>
</template>

<style scoped>
  .focused {
    background-color: lightgray;
  }
</style>