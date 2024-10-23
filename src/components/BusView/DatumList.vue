<script setup lang="ts">
import { ref } from 'vue';

const datums: number[] = [];
const showObjectList = ref(false);

</script>

<template>
  <v-list class='flex-shrink-0' disabled>
    <v-list-item
      prepend-icon='mdi-chart-box-outline'
      :append-icon='showObjectList ? "mdi-chevron-up" : "mdi-chevron-down"'
      @click='showObjectList = !showObjectList'
    >
        <v-list-item-title>Data ({{ datums.length || 0 }})</v-list-item-title>
    </v-list-item>
    <v-divider></v-divider>
    <!-- <template v-if='showObjectList && datums.length'>
    </template> -->
  </v-list>
</template>

<style scoped>
  .item-list {
    overflow-y: scroll !important;
    font-size: smaller;
    min-height: 64px;
  }
</style>
