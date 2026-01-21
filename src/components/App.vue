<script setup lang='ts'>
import { ref } from 'vue';
import LocalStorageNotice from './LocalStorageNotice.vue';
import InfoDialogs from './InfoDialogs.vue';
import SystemBar from './SystemBar.vue';
import ActionBar from './ActionBar.vue';

function stagedClearAll() {
  // null;
}

function undo() {
  // null;
}

const doLocalStorageNotice = ref(false);

</script>

<template>
  <v-app
    @keyup.escape="stagedClearAll"
    @keyup.ctrl.stop="undo"
  >
    <v-dialog
      v-model="doLocalStorageNotice"
    >
      <local-storage-notice />
    </v-dialog>
    <InfoDialogs />
    <SystemBar />
    <RouterView />
    <ActionBar />
  </v-app>
</template>

<style scoped>
  .v-card { padding: 1em }
</style>
