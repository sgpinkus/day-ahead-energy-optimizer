<script setup lang="ts">
import { computed } from 'vue';
import { BaseDevice } from '@/model/device';
import StorageDeviceParametersForm from './StorageDeviceParametersForm.vue';
import ThermalLoadDeviceParametersForm from './ThermalLoadDeviceParametersForm.vue';

const { device } = defineProps<{
  device: BaseDevice,
}>();

const component = computed(() => {
  switch (device.type) {
    case 'storage': return StorageDeviceParametersForm;
    case 'thermal_load': return ThermalLoadDeviceParametersForm;
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