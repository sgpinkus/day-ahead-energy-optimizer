<script setup lang='ts'>
import { computed, ref } from 'vue';
import LocalStorageNotice from './LocalStorageNotice.vue';
import SystemBar from './SystemBar.vue';
import AppNavDrawer from './AppNavDrawer.vue';
import ActionBar from './ActionBar.vue';
import model from '@/model';

type DataType = {
  model: typeof model
  alerts: string[]
}

function stagedClearAll() {
  null;
}

function undo() {
  null;
}

let doLocalStorageNotice = ref(false);

</script>

<template>
  <v-app
    @keyup.escape='stagedClearAll'
    @keyup.ctrl.stop='undo'
  >
  <v-dialog
    v-model='doLocalStorageNotice'
  >
    <local-storage-notice></local-storage-notice>
  </v-dialog>
  <SystemBar></SystemBar>
  <RouteView></RouteView>
  <ActionBar></ActionBar>
  </v-app>
</template>

<style scoped>
  .v-card { padding: 1em }
</style>
