<script setup lang="ts">

export type Item = {
  id: string,
  title?: string,
}

defineEmits(['edit', 'delete']);

interface props {
  focused?: boolean,
  item: Item,
  icon?: string,
  title?: string,
  hasDelete?: boolean,
  hasEdit?: boolean,
}

const {
  item,
  focused = false,
  icon = 'mdi-folder',
  title,
  hasDelete = true,
  hasEdit = true,
} = defineProps<props>();
</script>

<template>
  <v-list-item
    :id="`list-item-${item.id}`"
    :prepend-icon="icon"
    :class="{ focused: focused }"
    @dblclick.stop="$emit('edit')"
  >
    <div class="d-flex flex-nowrap flex-row">
      <v-list-item-title>{{ title || item.title || item.id }}</v-list-item-title>
      <span style="flex: 1" />
      <v-btn
        v-if="hasEdit"
        flat
        density="compact"
        :block="false"
        @click.stop="$emit('edit')"
      >
        <v-icon>mdi-pencil</v-icon>
      </v-btn>&nbsp;
      <v-btn
        v-if="hasDelete"
        flat
        density="compact"
        :block="false"
        @click.stop="$emit('delete')"
      >
        <v-icon>mdi-delete</v-icon>
      </v-btn>
      <slot />
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