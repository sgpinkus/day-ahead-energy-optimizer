<script setup lang='ts'>
import { computed, ref } from 'vue';
import LocalStorageNotice from './LocalStorageNotice.vue';
import SystemBar from './SystemBar.vue';
import AppNavDrawer from './AppNavDrawer.vue';
import ActionBar from './ActionBar.vue';
import model from '@/model';

const rail = computed(() => model.ui.rail);
const components = ref([]);
const showObjectList = ref(false);


</script>

<template>
  <system-bar></system-bar>
  <AppNavDrawer>
      <div class='details-content'>
        <!-- <router-link to='/spaces'>
          <v-list-item prepend-icon='mdi-arrow-left'>Spaces</v-list-item>
        </router-link>
        <v-divider></v-divider> -->
        <v-list class='flex-shrink-0'>
          <v-list-subheader v-if='!rail'>Actions</v-list-subheader>
            <div title='New Device'>
              <v-list-item
                prepend-icon='mdi-map-marker-plus'
              >
                <div class='d-flex flex-nowrap flex-row'>
                  <v-list-item-title>New Profile</v-list-item-title>
                </div>
              </v-list-item>
            </div>
            <div title='New Device'>
              <v-list-item
                prepend-icon='mdi-vector-polyline-plus'
              >
                <div class='d-flex flex-nowrap flex-row'>
                  <v-list-item-title>New Device</v-list-item-title>
                </div>
              </v-list-item>
            </div>
            <!-- <div title='Add Polygon'>
              <v-list-item
                prepend-icon='mdi-shape-polygon-plus'
              >
                <div class='d-flex flex-nowrap flex-row'>
                  <v-list-item-title>Add Polygon</v-list-item-title>
                </div>
              </v-list-item>
            </div> -->
        </v-list>
        <v-divider></v-divider>
        <v-list class='flex-shrink-0'>
          <v-list-item
            prepend-icon='mdi-map-marker'
            @click='showObjectList = !showObjectList'
          >
            <div class='d-flex flex-nowrap flex-row'>
              <v-list-item-title>Components ({{ components.length || 0 }})</v-list-item-title>
              <span style="flex: 1"></span>
            </div>
          </v-list-item>
        </v-list>
        <v-divider></v-divider>
        <template v-if='showObjectList && components.length'>
          <v-list class='item-list'>
          </v-list>
          <v-divider></v-divider>
        </template>
      </div>
  </AppNavDrawer>
</template>

<style scoped>
  .v-card { padding: 1em }

  .details-content {
    max-height: 100%;
    flex-flow: nowrap;
    display: flex;
    flex-direction: column;
  }

  .item-list {
    overflow-y: scroll;
    font-size: smaller;
    min-height: 64px;
  }

  .v-divider {
    opacity: 50%;
  }

  .info {
    padding: 2em;
    margin: 2em;
  }

  dt, dd {
    font: small;
    color: gray;
    display: inline-block;
  }

  dt {
    font-weight: bolder;
    padding-right: 0.5em;
  }

  dt::after {
    content: ": ";
  }

  .v-btn {
    min-width: 1em;
    padding: 0;
    margin: 0;
  }
</style>
