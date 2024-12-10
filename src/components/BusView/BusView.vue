<script setup lang='ts'>
import AppNavDrawer from '@/components/AppNavDrawer.vue';
import BusNavView from './BusNavView.vue';
import BusMainGraphView from './BusMainGraphView.vue';
</script>

<template>
  <AppNavDrawer>
    <BusNavView></BusNavView>
  </AppNavDrawer>
  <v-main>
    <v-container class='container'>
      <BusMainGraphView></BusMainGraphView>
    </v-container>
  </v-main>
</template>

<style scoped>
  .container {
    min-height: 100vh;
    max-width: 900px;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: center;
    padding: 1em;
  }
</style>
