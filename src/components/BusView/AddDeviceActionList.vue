<script setup lang="ts">
import type { Bus } from '@/model';
import type { DeviceType } from '@/model/device';
import CellPlus from '@/components/icons/cellphone-plus';

const { bus } = defineProps<{ bus: Bus }>();

type TypeSpec = {
  type: DeviceType,
  [x: string]: any,
}


const addTypes: TypeSpec[] = [
  {
    title: 'Load Device',
    icon: CellPlus,
    type: 'load',
  },
  {
    title: 'Supply Device',
    icon: CellPlus,
    type: 'supply',
  },
  {
    title: 'Storage Device',
    icon: CellPlus,
    type: 'storage',
  },
  {
    title: 'Fixed Load Device',
    icon: CellPlus,
    type: 'fixed_load',
  },
];

</script>
<template>
  <v-list class="flex-shrink-0">
    <v-list-group>
      <template #activator="{ props }">
        <v-list-item v-bind="props" :prepend-icon="CellPlus" title="Add Device" />
      </template>
      <v-list class="item-list">
        <v-list-item v-for="spec in addTypes" :key="spec.type" :title="spec.title" :prepend-icon="spec.icon" @click="bus.addType(spec.type);" />
        <v-list-item v-tooltip="'not implemented yet'" title="Thermal Load Device" disabled :prepend-icon="CellPlus" />
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
