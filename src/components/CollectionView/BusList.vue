<script setup lang="ts">
import { computed, ref } from 'vue';
import model, { Collection } from '@/model';
import router from '@/router';
import MyListItem from '../components/MyListItem.vue';

const { collection } = defineProps<{ collection: Collection }>();

const items = computed(() => collection.busses); // Needs to be computed (technically should be reactive?)
const showObjectList = ref(true);
const type = 'Busses';

</script>

<template>
  <v-list class="flex-shrink-0">
    <v-list-item
      prepend-icon="mdi-hub-outline"
      :append-icon="showObjectList ? 'mdi-chevron-up' : 'mdi-chevron-down'"
      @click="showObjectList = !showObjectList"
    >
      <v-list-item-title>{{ type }} ({{ items.length || 0 }})</v-list-item-title>
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
        @delete="() => collection.delete(item.id)"
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
