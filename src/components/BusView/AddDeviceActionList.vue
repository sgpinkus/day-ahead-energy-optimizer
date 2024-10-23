<script setup lang="ts">
import model from '@/model';
import type { DeviceType } from '@/model/devices';
const devices = model.devices;

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
  <v-list>
    <v-list-group value="Add Device">
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
        @click=devices.addDeviceType(spec.type);
      >
      </v-list-item>
    </v-list-group>
  </v-list>
</template>