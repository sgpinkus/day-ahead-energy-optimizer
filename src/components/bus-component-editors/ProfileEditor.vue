<script setup lang="ts">
import model from '@/model';
const basis = model.basis;

</script>
<template>
  <v-table class="mx-auto my-table">
    <thead>
      <tr>
        <th v-for='h in model.basis' :key='h'>
        {{ h }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td v-for='h in model.basis' :key='h'>0</td>
      </tr>
    </tbody>
  </v-table>
</template>