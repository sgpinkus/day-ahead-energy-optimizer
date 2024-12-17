<script setup lang='ts'>
import model, { Bus } from '@/model';
import AppNavDrawer from '@/components/AppNavDrawer.vue';
import BusNavView from './BusNavView.vue';
import BusMainGraphView from './BusMainGraphView.vue';
// import NotFoundError from '@/errors';

// const { id } = defineProps<{ id: string }>();
// const bus: Bus = model.collection.busses[id];
// if(!bus) throw new NotFoundError();
const bus = model.bus;

</script>

<template>
  <AppNavDrawer>
    <BusNavView :bus=bus></BusNavView>
  </AppNavDrawer>
  <v-main>
    <v-container class='container'>
      <BusMainGraphView :bus=bus></BusMainGraphView>
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
