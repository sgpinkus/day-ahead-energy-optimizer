<script setup lang="ts">
import model from '@/model';
import AddDeviceActionList from './AddDeviceActionList.vue'
import DeviceList from './DeviceList.vue';
</script>

<template>
  <div class='details-content'>
    <v-list class='flex-shrink-0'>
      <v-list-subheader>OtherActions</v-list-subheader>
            <v-list-item
              @click='model.reset()'
              prepend-icon="mdi-refresh"
            >
            Reset Local Data
            </v-list-item>
      </v-list>
    <v-divider></v-divider>
    <AddDeviceActionList></AddDeviceActionList>
    <v-divider></v-divider>
    <DeviceList></DeviceList>
    <v-divider></v-divider>
  </div>
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