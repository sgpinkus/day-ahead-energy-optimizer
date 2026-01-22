<script setup lang='ts'>
import model from '@/model';
import AppNavDrawer from '@/components/AppNavDrawer.vue';
import CollectionNavView from './CollectionNavView.vue';
import BusMainGraphView from '../BusView/BusMainGraphView.vue';

const collection = model.collection;
</script>

<template>
  <AppNavDrawer>
    <CollectionNavView :collection="collection" />
  </AppNavDrawer>
  <v-main>
    <v-container class="container">
      <BusMainGraphView
        v-if="model.focusedBus"
        :bus="model.focusedBus"
      />
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