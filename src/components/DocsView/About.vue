<script lang='ts' setup>
import { version as webVersion } from '@package';

// @ts-expect-error vite defined
const gitHash = __GIT_HASH__;

</script>

<template>
  <v-container fluid>
    <h1>About</h1>
    <p>
      Proof of concept convex device model builder and optimizer for low-voltage energy devices. Devices all have zero or more constraints and zero or more costs over a finite day-ahead time-horizon. What kind of constraints and costs are available depends on device type. *Lots* of features missing.

      <a href="https://github.com/sgpinkus/day-ahead-energy-optimizer/tree/master/samples">Sample projects</a>

      <a href="https://github.com/sgpinkus/convex_device_kit">sgpinkus/convex_device_kit</a> is used for optimization step via Pyodide.
    </p>
    <dl>
      <dt>web-version</dt><dd>{{ webVersion || 'unknown' }} ({{ gitHash }})</dd><br>
    </dl>
  </v-container>
</template>

<style scoped lang="scss">
@use '@/styles/nav-dl.scss';
</style>