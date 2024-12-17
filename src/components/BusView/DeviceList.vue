<script setup lang="ts">
import { computed, ref } from 'vue';
import { values } from 'lodash';
import model, { Bus } from '@/model';
import router from '@/router';
import DeviceListItem from '../components/MyListItem.vue';

const { bus } = defineProps<{ bus: Bus }>();

const items = computed(() => values(model.bus.devices));
const showObjectList = ref(false);

const icons = {
  load: 'mdi-cellphone-settings',
  supply: 'mdi-generator-stationary',
  storage: 'mdi-battery-charging',
  fixed_load: 'mdi-cellphone-settings',
};

</script>

<template>
  <v-list class='flex-shrink-0'>
    <v-list-item
      prepend-icon='mdi-cellphone-settings'
      :append-icon='showObjectList ? "mdi-chevron-up" : "mdi-chevron-down"'
      @click='showObjectList = !showObjectList'
    >
        <v-list-item-title>Devices ({{ items.length || 0 }})</v-list-item-title>
    </v-list-item>
  </v-list>
  <v-divider></v-divider>
  <template v-if='showObjectList && items.length'>
    <v-list class='item-list'>
      <DeviceListItem v-for='item in items' :key='item.id'
        :item=item
        :focused='model.focusedDeviceId === item.id'
        :icon='icons[item.type]'
        @edit='() => router.dispatch({ name: "device", params: { id: item.id } })'
        @delete='() => bus.delete(item.id)'
        @click.stop='model.focusedDeviceId = item.id'
      >
      </DeviceListItem>
    </v-list>
  </template>

</template>

<style scoped>
  .item-list {
    overflow-y: scroll !important;
    font-size: smaller;
  }
</style>
