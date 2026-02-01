<script setup lang="ts">
import { computed } from 'vue';
import { values } from 'lodash';
import model, { Bus } from '@/model';
import router from '@/router';
import NetworkHubView from '@/components/components/NetworkHubView.vue';

const { bus } = defineProps<{ bus: Bus }>();

const deviceNodes = computed(() => values(bus?.devices || {}));
const focusedNodeId = computed(() => model.focusedDeviceId ?? undefined);

function onClick(id: string) {
  if (id !== undefined && id !== 'hub') model.focusedDeviceId = id;
  return true;
}

function onDoubleClick(id: string) {
  const name = model.busses[id] ? 'bus' : model.devices[id] ? 'device' : undefined; // TODO.
  if (name) router.push({ name, params: { id } });
}

</script>

<template>
  <NetworkHubView
    v-if="bus"
    :key="bus.id"
    :device-nodes="deviceNodes"
    :focused-node-id="focusedNodeId"
    :hub-node="bus"
    @click="onClick"
    @dblclick="onDoubleClick"
  />
</template>

<style scoped>
  :global(.focused-node) {
    stroke-width: 3;
  }
</style>