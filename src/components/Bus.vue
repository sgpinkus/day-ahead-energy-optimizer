<script setup lang="ts">
import model from '@/model';
import { computed, ref, useTemplateRef, watch, type Ref } from 'vue';
import { DataSet, Network } from 'vis-network/standalone';

const componentNodes = computed(() => Object.values(model.components.getComponents())
    .map(v =>  ({ id: v.id, label: v.name || v.id, fixed: false }))
);

const nodes = computed(() => new DataSet([{ id: 0, label: 'bus', fixed: true }, ... componentNodes.value]));
const edges = computed(() => new DataSet(componentNodes.value.map((v) => ({ from: 0, to: v.id })) as any));
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
})

watch(model, () => {
  if(model.focusedComponentId) network.selectNodes([model.focusedComponentId]);
});

function onClick(params: any) {
  const clickedNodeId = String(network.getNodeAt(params.pointer.DOM));
  model.focusedComponentId = clickedNodeId;
}

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

  div {
    border: solid 1px salmon;
  }
</style>