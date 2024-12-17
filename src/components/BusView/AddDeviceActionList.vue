<script setup lang="ts">
import type { DeviceType } from '@/model/device';
import requireBus from './requireBus';

const bus = requireBus();

type TypeSpec = {
  type: DeviceType,
  [x: string]: any,
}


const addTypes: TypeSpec[] = [
  {
    title: 'Load Device',
    icon: 'mdi-vector-polyline-plus',
    type: 'load'
  },
  {
    title: 'Supply Device',
    icon: 'mdi-vector-polyline-plus',
    type: 'supply'
  },
  {
    title: 'Storage Device',
    icon: 'mdi-vector-polyline-plus',
    type: 'storage'
  },
  {
    title: 'Fixed Load Device',
    icon: 'mdi-vector-polyline-plus',
    type: 'fixed_load'
  },
];

</script>
<template>
  <v-list class='flex-shrink-0'>
    <v-list-group>
      <template v-slot:activator="{ props }">
        <v-list-item
          v-bind="props"
          prepend-icon='mdi-vector-polyline-plus'
          title="Add Device"
        ></v-list-item>
      </template>
      <v-list-item v-for='spec in addTypes' :key='spec.type'
        :title=spec.title
        :prepend-icon=spec.icon
        @click=bus.addType(spec.type);
      >
      </v-list-item>
    </v-list-group>
  </v-list>
</template>