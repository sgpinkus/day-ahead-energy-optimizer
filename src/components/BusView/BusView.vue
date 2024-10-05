<script setup lang='ts'>
import AppNavDrawer from '@/components/AppNavDrawer.vue';
import BusNavView from './BusNavView.vue';
import BusMainView from './BusMainGraphView.vue';
</script>

<template>
  <AppNavDrawer>
    <BusNavView></BusNavView>
  </AppNavDrawer>
  <v-main>
    <v-container class='d-flex align-content-center flex-column h-100 ma-0 pa-0'>
      <BusMainView></BusMainView>
    </v-container>
  </v-main>
</template>
