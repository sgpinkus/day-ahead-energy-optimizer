<script setup lang="ts">
import model from '@/model';
import router from '@/router';
import { ref } from 'vue';
import DeviceListItem from './DeviceListItem.vue';

const devices = model.devices;
const showObjectList = ref(false);

function editDevice(id: string) {
  router.dispatch({ name: 'devices', params: { id } });
}

</script>

<template>
  <v-list class='flex-shrink-0'>
    <v-list-item
      prepend-icon='mdi-map-marker'
      :append-icon='showObjectList ? "mdi-chevron-up" : "mdi-chevron-down"'
      @click='showObjectList = !showObjectList'
    >
        <v-list-item-title>Devices ({{ devices.length || 0 }})</v-list-item-title>
    </v-list-item>
    <v-divider></v-divider>
    <template v-if='showObjectList && devices.length'>
      <DeviceListItem v-for='item in devices.getDevices()' :key='item.id'
        :item=item
        @edit='() => editDevice(item.id)'
        @delete='() => model.devices.deleteDevice(item.id)'
        :focused='model.focusedDeviceId === item.id'
        @click.stop='model.focusedDeviceId = item.id'
      >
      </DeviceListItem>
    </template>
  </v-list>
</template>

<style scoped>
  .item-list {
    overflow-y: scroll !important;
    font-size: smaller;
    min-height: 64px;
  }
</style>
