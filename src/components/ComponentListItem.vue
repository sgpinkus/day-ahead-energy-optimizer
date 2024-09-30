<script setup lang="ts">
import type { ContainerComponent } from '@/model/components';
import { computed } from 'vue';

defineEmits(['edit', 'delete']);

const icons = {
  flexibleload: 'mdi-map-marker',
  profile: 'mdi-vector-polyline',
}

interface props {
  focused?: boolean,
  item: ContainerComponent,
}

const { item, focused = false } = defineProps<props>();
const icon = computed(() => icons[item.type]);
</script>

<template>
    <v-list-item
      :prepend-icon='icon'
      :class='{ focused: focused }'
      :id="`list-item-${item.id}`"
    >
      <div class='d-flex flex-nowrap flex-row'>
        <v-list-item-title>{{ item.name || item.id }}</v-list-item-title>
        <span style="flex: 1"></span>
        <!-- <v-btn flat density="compact" :block="false" @click.stop='activateItem'><v-icon>mdi-vector-polyline-edit</v-icon></v-btn>&nbsp; -->
        <v-btn flat density="compact" :block="false" @click.stop='$emit("edit")'><v-icon>mdi-pencil</v-icon></v-btn>&nbsp;
        <v-btn flat density="compact" :block="false" @click.stop='$emit("delete")'><v-icon>mdi-delete</v-icon></v-btn>
      </div>
    </v-list-item>
</template>

<style scoped>
  .focused {
    background-color: lightgray;
  }

  .v-btn {
    min-width: 1em;
    padding: 0;
    margin: 0;
  }
</style>