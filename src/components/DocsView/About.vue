<script lang='ts' setup>
import { version as webVersion } from '@package';

// @ts-expect-error vite defined
const gitHash = __GIT_HASH__;

</script>

<template>
  <v-container fluid>
    <h1>About</h1>
    <dl>
      <dt>web-version</dt><dd>{{ webVersion || 'unknown' }} ({{ gitHash }})</dd><br>
    </dl>
  </v-container>
</template>

<style scoped lang="scss">
@use '@/styles/nav-dl.scss';
</style>