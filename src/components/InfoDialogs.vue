<script setup lang="ts">
import { info, dialog, showDialog } from '@/model/infos';

</script>

<template>
  <v-dialog
    v-model="showDialog"
  >
    <v-container class="ma-auto">
      <v-row>
        <v-col
          xs="12"
          md="6"
          offset-md="3"
        >
          <v-card class="pa-4">
            {{ info[dialog] }}
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-dialog>
</template>

<style scoped>
  .v-card { background-color: white; }
</style>