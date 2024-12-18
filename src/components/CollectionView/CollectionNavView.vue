<script setup lang="tsx">
import { Collection } from '@/model';
import BusList from './BusList.vue';
const { collection } = defineProps<{ collection: Collection }>();
import HubPlus from '@/components/icons/hub-plus';

</script>

<template>
  <v-list-item
    prepend-icon="mdi-refresh"
    @click="collection.reset()"
  >
    Reset DB
  </v-list-item>
  <v-divider />
  <v-list-item
    title="Add Bus"
    :prepend-icon="HubPlus"
    @click="collection.addNew()"
  />
  <v-divider />
  <BusList :collection="collection" />
</template>

<style scoped>
  .v-card { padding: 1em }

  .details-content {
    max-height: 100%;
    flex-flow: nowrap;
    display: flex;
    flex-direction: column;
  }

  .v-btn {
    min-width: 1em;
    padding: 0;
    margin: 0;
  }
</style>