<script setup lang='ts'>
import AppNavDrawer from '@/components/AppNavDrawer.vue';
import About from './About.vue';

</script>

<template>
  <AppNavDrawer>
    <RouterLink to="/">
      <v-list-item prepend-icon="mdi-arrow-left" />
    </RouterLink>
    <v-divider />
  </AppNavDrawer>
  <v-main>
    <About />
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