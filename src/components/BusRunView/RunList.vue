<script setup lang="ts">
import { computed } from 'vue';
import { values } from 'lodash';
import model, { Bus } from '@/model';
import MyListItem from '../components/MyListItem.vue';

const emit = defineEmits(['focused']);

const { bus, focusedId } = defineProps<{ bus: Bus, focusedId?: string }>();

const items = computed(() => values(model.optimizationResults).filter(v => v.busId === bus.id));


</script>

<template>
  <v-list class="flex-shrink-0">
    <v-list-group>
      <template #activator="{ props }">
        <v-list-item
          v-bind="props"
          prepend-icon="mdi-folder"
        >
          <v-list-item-title>Previous Results ({{ items.length || 0 }})</v-list-item-title>
        </v-list-item>
      </template>
      <v-list class="item-list">
        <MyListItem
          v-for="item in items"
          :key="item.id"
          :item="item"
          :title="item.createdAt"
          :has-edit="false"
          :focused="focusedId === item.id"
          @delete="() => bus.delete(item.id)"
          @click.stop="emit('focused', item.id)"
        />
      </v-list>
    </v-list-group>
  </v-list>
</template>

<style scoped>
  .item-list {
    overflow-y: scroll !important;
    font-size: smaller;
    padding-left: 0.5em;
  }
</style>
