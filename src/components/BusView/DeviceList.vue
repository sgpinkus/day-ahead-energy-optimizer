<script setup lang="ts">
import { computed, ref } from 'vue';
import { values } from 'lodash';
import model, { Bus } from '@/model';
import router from '@/router';
import DeviceListItem from '../components/MyListItem.vue';

const { bus } = defineProps<{ bus: Bus }>();

const items = computed(() => values(bus.devices));
const showObjectList = ref(false);

const icons = {
  load: 'mdi-cellphone-settings',
  supply: 'mdi-generator-stationary',
  storage: 'mdi-battery-charging',
  fixed_load: 'mdi-cellphone-settings',
};

</script>

<template>
  <v-list class="flex-shrink-0">
    <v-list-group>
      <template #activator="{ props }">
        <v-list-item
          v-bind="props"
          prepend-icon="mdi-cellphone-settings"
        >
          <v-list-item-title>Devices ({{ items.length || 0 }})</v-list-item-title>
        </v-list-item>
      </template>
      <v-list class="item-list">
        <DeviceListItem
          v-for="item in items"
          :key="item.id"
          :item="item"
          :focused="model.focusedDeviceId === item.id"
          :icon="icons[item.type]"
          @edit="() => router.dispatch({ name: &quot;device&quot;, params: { id: item.id } })"
          @delete="() => bus.delete(item.id)"
          @click.stop="model.focusedDeviceId = item.id"
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
