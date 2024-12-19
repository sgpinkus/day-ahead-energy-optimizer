<script setup lang="ts">
import { BaseDevice } from '@/model/device';
import DeviceDescriptorsForm from './DeviceDescriptorsForm.vue';
import NetworkHubView from '../components/NetworkHubView.vue';

const { device } = defineProps<{ device: BaseDevice }>();

</script>

<template>
  <v-sheet>
    <div class="container">
      <NetworkHubView
        :device-nodes="[]"
        :hub-node="device"
        :height="480/4"
        :width="480"
      />
    </div>
  </v-sheet>
  <v-sheet>
    <DeviceDescriptorsForm :device="device" />
  </v-sheet>
</template>

<style scoped lang='scss'>
.v-sheet {
  max-width: 960px;
}
// .container {
//   max-width: 0
// }
</style>
