<script setup lang="ts">
import { computed, ref } from 'vue';
import model, { Project } from '@/model';
import router from '@/router';
import MyListItem from '../components/MyListItem.vue';

const { project } = defineProps<{ project: Project }>();
const items = computed(() => project.busses); // Needs to be computed (technically should be reactive?)
const showObjectList = ref(true);

</script>

<template>
  <v-list class="flex-shrink-0">
    <v-list-item
      prepend-icon="mdi-hub-outline"
      :append-icon="showObjectList ? 'mdi-chevron-up' : 'mdi-chevron-down'"
      @click="showObjectList = !showObjectList"
    >
      <v-list-item-title>Models ({{ items.length || 0 }})</v-list-item-title>
    </v-list-item>
  </v-list>
  <v-divider />
  <template v-if="showObjectList && items.length">
    <v-list class="item-list">
      <MyListItem
        v-for="item in items"
        :key="item.id"
        :item="item"
        :focused="model.focusedBusId === item.id"
        icon="mdi-hub"
        @edit="() => router.push({ name: 'bus', params: { id: item.id } })"
        @click.stop="model.focusedBusId = item.id"
        @delete="() => project.delete(item.id)"
      />
    </v-list>
  </template>
</template>

<style scoped>
  .item-list {
    overflow-y: scroll !important;
    font-size: smaller;
  }
</style>
