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
  if (id !== undefined && id !== 'hub')
  model.focusedDeviceId = id;
}

function onDoubleClick(id: string) {
  if (id !== undefined) router.dispatch({ name: 'device', params: { id } });
}

</script>

<template>
  <NetworkHubView
    v-if="bus"
    :device-nodes="deviceNodes"
    :focused-node-id="focusedNodeId"
    :hub-node="{ title: &quot;Network&quot; }"
    @click="onClick"
    @dblclick="onDoubleClick"
  />
</template>

<style scoped>
  :global(.focused-node) {
    stroke-width: 3;
  }
</style>