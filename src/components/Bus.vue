<script setup lang="ts">
import model from '@/model';
</script>
<template>
  <v-list>
    <v-list-item v-for='component in model.components.getComponents()' :key='component.id'
    :class='{ focused: model.focusedComponentId === component.id }'
    >
      {{ component }}
    </v-list-item>
  </v-list>
</template>

<style>
  .focused {
    background-color: lightgray;
  }
</style>