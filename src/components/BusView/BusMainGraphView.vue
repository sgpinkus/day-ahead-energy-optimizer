<script setup lang="ts">
import { computed } from 'vue';
import { values } from 'lodash';
import model from '@/model';
import router from '@/router';
import requireBus from './requireBus';
import NetworkHubView from '@/components/components/NetworkHubView.vue';

const bus = requireBus();

const deviceNodes = computed(() => values(bus.devices));
const focusedNodeId = computed(() => model.focusedDeviceId ?? undefined);

function onClick(id: string) {
  if(id !== undefined && id !== 'hub')
  model.focusedDeviceId = id;
}

function onDoubleClick(id: string) {
  if(id !== undefined) router.dispatch({ name: 'device', params: { id } });
}

</script>

<template>
  <NetworkHubView
    :deviceNodes=deviceNodes
    :focusedNodeId='focusedNodeId'
    :hubNode='{ title: "Network" }'
    @click='onClick'
    @dblclick='onDoubleClick'
  ></NetworkHubView>
</template>

<style scoped>
  :global(.focused-node) {
    stroke-width: 3;
  }
</style>