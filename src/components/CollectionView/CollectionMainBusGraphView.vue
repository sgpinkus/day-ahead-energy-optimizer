<script setup lang="ts">
import { Bus } from '@/model';
import BusMainGraphView from '../BusView/BusMainGraphView.vue';

const { bus = undefined } = defineProps<{ bus?: Bus }>();

</script>

<template>
  <template v-if=bus>
    <BusMainGraphView :bus=bus />
  </template>
</template>