<script setup lang="ts">
import type { IBaseDevice, ContainerDevice } from '@/model/devices';
import { DataSet, Network } from 'vis-network/standalone';
import DeviceDescriptorsForm from './DeviceDescriptorsForm.vue';
import { computed, onMounted, useTemplateRef, watch, type Ref } from 'vue';

const { device } = defineProps<{ device: ContainerDevice }>();
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

const deviceNode = computed(() => ({
    id: device.id,
    label: device.title || device.id,
    title: device.description,
    fixed: false,
    shape: device.shape || 'circle',
    color: device.color
  })
);
const container: Ref<HTMLElement | null> = useTemplateRef('container');
let network: Network;

watch(deviceNode, (newDeviceNode) => {
  if(network) network.destroy();
  network = new Network(container.value!, { nodes: [newDeviceNode] }, options);
});

onMounted(() => {
  network = new Network(container.value!, { nodes: [deviceNode.value] }, options);
});

</script>

<template>
  <v-container>
    <v-sheet><div ref='container' class='container'></div></v-sheet>
    <v-sheet>
      <DeviceDescriptorsForm :device='device'></DeviceDescriptorsForm>
    </v-sheet>
  </v-container>
</template>

<style scoped lang='scss'>
@use '@/index.scss';

.v-sheet {
  max-width: 960px;
  margin: auto;
}

.container {
  min-height: 100px;
}

</style>
