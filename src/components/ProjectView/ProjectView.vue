<script setup lang='ts'>
import model from '@/model';
import AppNavDrawer from '@/components/AppNavDrawer.vue';
import ProjectNavView from './ProjectNavView.vue';
import BusMainGraphView from '../BusView/BusMainGraphView.vue';

const project = model.project;

</script>

<template>
  <AppNavDrawer>
    <ProjectNavView :project="project" />
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