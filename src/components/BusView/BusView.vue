<script setup lang='ts'>
import model from '@/model';
import AppNavDrawer from '@/components/AppNavDrawer.vue';
import BusNavView from './BusNavView.vue';
import BusMainGraphView from './BusMainGraphView.vue';
import { NotFoundError } from '@/errors';

const { id } = defineProps<{ id: string }>();
const bus = model.busses[id];
if (!bus) throw new NotFoundError();

</script>

<template>
  <AppNavDrawer>
    <RouterLink to="/">
      <v-list-item prepend-icon="mdi-arrow-left">
        Collection
      </v-list-item>
    </RouterLink>
    <v-divider />
    <BusNavView :bus="bus" />
  </AppNavDrawer>
  <v-main>
    <v-container class="container">
      <BusMainGraphView :bus="bus" />
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
