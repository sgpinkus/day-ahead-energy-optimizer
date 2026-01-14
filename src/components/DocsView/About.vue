<script lang='ts'>
import { defineComponent } from 'vue';
import { version as webVersion } from '@package';

export default defineComponent({
  data(): any {
    return {
      webVersion,
    };
  },
});
</script>

<template>
  <v-container fluid>
    <h1>About</h1>
    <dl>
      <dt>web-version</dt><dd>{{ webVersion }}</dd><br>
      <!-- <dt>api-version</dt><dd>{{ model.connection.apiVersion?.version || 'unknown' }}</dd> -->
    </dl>
  </v-container>
</template>

<style scoped lang="scss">
// @use './styles.scss';
</style>