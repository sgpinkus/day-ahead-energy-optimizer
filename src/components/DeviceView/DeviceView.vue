<script setup lang='ts'>
import { computed, ref, defineProps, onMounted, inject } from 'vue';
import AppNavDrawer from '@/components/AppNavDrawer.vue';
import DeviceDescriptorsView from './DeviceDescriptorsView.vue';
import model from '@/model';
import router from '@/router';

type props = {
  id: string;
}
const tab = ref('edit');
const { id: deviceId } = defineProps<props>();
const device = model.devices.getDevice(deviceId);

if(!device) router.dispatch({ name: 'resource-not-found', params: { resource: deviceId } });

</script>

<template>
  <AppNavDrawer>
    <route-path path='/'>
      <v-list-item prepend-icon='mdi-arrow-left'>Bus</v-list-item>
    </route-path>
    <v-divider></v-divider>
      <v-list class='flex-shrink-0'>
        <v-list-subheader>Device Components</v-list-subheader>
        <v-list-item prepend-icon='mdi-text-box-edit' @click='tab = "edit"'>Descriptors</v-list-item>
        <v-list-item prepend-icon='mdi-minus-box' @click='tab = "bounds"'>Bounds</v-list-item>
        <v-list-item prepend-icon='mdi-equal-box' @click='tab = "cbounds"'>CBounds</v-list-item>
        <v-list-item prepend-icon='mdi-function' @click='tab = "costs"'>Costs</v-list-item>
      </v-list>
  </AppNavDrawer>
  <v-main>
    <v-container fluid class='d-flex align-content-center flex-column h-100 ma-auto'>
      <DeviceDescriptorsView v-if='tab === "edit"' :device='device'></DeviceDescriptorsView>
    </v-container>
  </v-main>
</template>

<style scoped>
  .v-card { padding: 1em }

  .details-content {
    max-height: 100%;
    flex-flow: nowrap;
    display: flex;
    flex-direction: column;
  }

  .v-divider {
    opacity: 50%;
  }

  .v-btn {
    min-width: 1em;
    padding: 0;
    margin: 0;
  }
</style>
