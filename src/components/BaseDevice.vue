<script setup lang="ts">
import { defineProps } from 'vue';
import type { IBaseDevice } from '@/model/devices';

interface Props {
  device: IBaseDevice,
}

const { device } = defineProps<Props>()


</script>

<template>
  <pre>{{ device }}</pre>
</template>