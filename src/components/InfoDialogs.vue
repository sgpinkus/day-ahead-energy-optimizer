<script setup lang="ts">
import { info, dialog, showDialog } from '@/model/infos';

</script>

<template>
  <v-dialog
    v-model='showDialog'
  >
    <v-container class='ma-auto'>
      <v-card class='pa-4'>
        {{ info[dialog] }}
      </v-card>
    </v-container>
  </v-dialog>
</template>