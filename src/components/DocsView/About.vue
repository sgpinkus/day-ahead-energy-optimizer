<script lang='ts' setup>
import { version as webVersion } from '@package';

const build = import.meta.env.__BUILD_COMMAND__ || 'unknown';

</script>

<template>
  <v-container fluid>
    <h1>About</h1>
    <dl>
      <dt>web-version</dt><dd>{{ webVersion }}</dd><br>
      <dt>biuld</dt><dd>{{ build }}</dd><br>
      <!-- <dt>api-version</dt><dd>{{ model.connection.apiVersion?.version || 'unknown' }}</dd> -->
    </dl>
  </v-container>
</template>

<style scoped lang="scss">
// @use './styles.scss';
</style>