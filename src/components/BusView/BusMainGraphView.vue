<script setup lang="ts">
import { computed } from 'vue';
import { values } from 'lodash';
import model from '@/model';
import router from '@/router';
import NetworkHubView from '@/components/components/NetworkHubView.vue';

const deviceNodes = computed(() => values(model.bus.devices));
// const busNode = { id: 'hub', title: 'Bus' };
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