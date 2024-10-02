<script setup lang="ts">
import model from '@/model';
import { ref } from 'vue';
import DeviceListItem from './DeviceListItem.vue'

const devices = model.devices;
const showObjectList = ref(false);

</script>
<template>
  <v-list class='flex-shrink-0'>
    <v-list-item
      prepend-icon='mdi-map-marker'
      @click='showObjectList = !showObjectList'
    >
      <div class='d-flex flex-nowrap flex-row'>
        <v-list-item-title>Devices ({{ devices.length || 0 }})</v-list-item-title>
        <span style="flex: 1"></span>
      </div>
    </v-list-item>
  </v-list>
  <v-divider></v-divider>
  <v-list v-if='showObjectList && devices.length' class='item-list'>
    <DeviceListItem v-for='item in devices.getDevices()' :key='item.id'
      :item=item
      @edit='() => model.editingDeviceId = item.id'
      @delete='() => model.devices.deleteDevice(item.id)'
      :focused='model.focusedDeviceId === item.id'
      @click.stop='model.focusedDeviceId = item.id'
    >
    </DeviceListItem>
  </v-list>
</template>

<style scoped>
  .item-list {
    overflow-y: scroll;
    font-size: smaller;
    min-height: 64px;
  }
</style>