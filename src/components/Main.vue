<script setup lang='ts'>
import { computed } from 'vue';
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

const doLocalStorageNotice = false;

</script>

<template>
  <system-bar></system-bar>
  <AppNavDrawer></AppNavDrawer>
  <v-main app>
    <action-bar></action-bar>
  </v-main>
</template>

<style scoped>
  .v-card { padding: 1em }
</style>
