<script setup lang='ts'>
import { compact, isArray } from 'lodash';
import { computed } from 'vue';
import router from '@/router';

type props = {
  resource?: string;
}

const { resource } = defineProps<props>();

function back() {
  window.history.go(-2);
}

</script>

<template>
    <v-container>
      <v-row justify='space-around' class='main'>
        <v-col md='6' xs='12'>
          <h1>Resource Not Found</h1>
          <h3 class='path'><i>{{ resource }}</i></h3>
          <br>
          <i><a href="#" @click.stop="back">Go Back</a></i>&nbsp;|&nbsp;
          <i><a href="/">Go Home</a></i>
        </v-col>
      </v-row>
    </v-container>
</template>

<style scoped>
  .v-container {
    /* border: solid 1px red; */
    display: flex;
    flex-direction: column;
    height: 100%;
    text-align: center;
  }

  .v-row.main {
    flex-grow: 100;
    min-height: 50%;
    align-items: center;
  }

  .path {
    color: grey;
  }
</style>
