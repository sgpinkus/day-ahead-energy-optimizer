<script lang='ts'>
import { isArray } from 'lodash';
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    pathMatch: { type: String, default: '' },
    resource: { type: String },
  },
  computed: {
    _pathMatch() {
      return isArray(this.pathMatch) ? '/' + this.pathMatch.join('/') : this.pathMatch;
    },
  },
  data(): any { return {}; } // "Property '$route' does not exist on .." Yes it does!
});
</script>


<template>
    <v-container>
      <v-row justify='space-around' class='main'>
        <v-col md='6' xs='12'>
          <h1>{{ resource && 'Resource'}} Not Found</h1>
          <h3 class='path'><i>{{ _pathMatch || resource }}</i></h3>
          <br>
          <i><a href="#" @click.stop="$router.go(-1)">Go Back</a></i>&nbsp;|&nbsp;
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
