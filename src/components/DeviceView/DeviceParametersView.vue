<script setup lang="ts">
import { computed } from 'vue';
import type { Device } from '@/model/device';
import StorageDeviceParametersForm from './StorageDeviceParametersForm.vue';

const { device } = defineProps<{
  device: Device,
}>();

const component = computed(() => {
  switch (device.type) {
    case 'storage': return StorageDeviceParametersForm;
    default: return '';
  }
});
</script>

<template>
  <component
    :is="component"
    :device="device"
  />
</template>