<script setup lang='ts'>
import { computed, ref } from 'vue';
import LocalStorageNotice from './LocalStorageNotice.vue';
import SystemBar from './SystemBar.vue';
import AppNavDrawer from './AppNavDrawer.vue';
import ActionBar from './ActionBar.vue';
import ComponentListItem from './ComponentListItem.vue';
import Bus from './Bus.vue';
import model from '@/model';

const rail = computed(() => model.rail);
const components = model.components;
const showObjectList = ref(true);
const focusedComponentId = ref('');

</script>

<template>
  <system-bar></system-bar>
  <AppNavDrawer>
      <div class='details-content'>
        <v-list class='flex-shrink-0'>
          <v-list-subheader>Add Components</v-list-subheader>
              <v-list-item
                title='Profile'
                prepend-icon='mdi-map-marker-plus'
              >
              </v-list-item>
              <v-list-item
                prepend-icon='mdi-vector-polyline-plus'
                title='Flexible Load'
                @click='components.addComponentType("flexibleload")'
              >
              <!-- </v-list-item>
              <v-list-item
                prepend-icon='mdi-vector-polyline-plus'
                title='Solar (Classic)'
              >
              </v-list-item>
              <v-list-item
                prepend-icon='mdi-vector-polyline-plus'
                title='Generator (Classic)'
              >
              </v-list-item>
              <v-list-item
                prepend-icon='mdi-vector-polyline-plus'
                title='Battery Storage'
              >
              </v-list-item>
              <v-list-item
                prepend-icon='mdi-vector-polyline-plus'
                title='Thermal Load'
              >
              </v-list-item>
              <v-list-item
                prepend-icon='mdi-vector-polyline-plus'
                title='Custom Device'
              > -->
              </v-list-item>
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
            <ComponentListItem v-for='item in components.getComponents()' :key='item.id'
              :item=item
              @edit='() => model.editingComponentId = item.id'
              @delete='() => model.components.deleteComponent(item.id)'
              :focused='model.focusedComponentId === item.id'
              @click.stop='model.focusedComponentId = item.id'
            >
            </ComponentListItem>
          </v-list>
          <v-divider></v-divider>
        </template>
      </div>
  </AppNavDrawer>
  <v-main>
    <v-container fluid class='d-flex align-content-center flex-column h-100 ma-auto'><Bus></Bus></v-container>
    <ActionBar></ActionBar>
  </v-main>
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
