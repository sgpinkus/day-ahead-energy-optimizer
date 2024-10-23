<script setup lang="ts">

type TypeSpec = {
  type: string,
  [x: string]: any,
}

const addTypes: TypeSpec[] = [
  {
    title: 'Profile',
    icon: 'mdi-chart-bar',
    type: 'profile'
  },
  {
    title: 'Meter Data',
    icon: 'mdi-chart-bar-stacked',
    type: 'meter_data'
  },
];

function addDataType(type: string) {
  console.log('Not implemented', type);
}

</script>
<template>
  <v-list disabled class='flex-shrink-0'>
    <v-list-group>
      <template v-slot:activator="{ props }">
        <v-list-item
          v-bind="props"
          prepend-icon='mdi-chart-box-plus-outline'
          title="Add Data"
        ></v-list-item>
      </template>
      <v-list-item v-for='spec in addTypes' :key='spec.type'
        :title=spec.title
        :prepend-icon=spec.icon
        @click=addDataType(spec.type);
      >
      </v-list-item>
    </v-list-group>
  </v-list>
</template>