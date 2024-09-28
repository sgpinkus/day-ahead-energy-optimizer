<script lang='ts'>
import { defineComponent } from 'vue';
import SystemBar from './SystemBar.vue';
import model from '@/model';

type DataType = {
  model: typeof model
  alerts: string[]
}

export default defineComponent({
  components: {
    SystemBar
  },
  data: function(): DataType {
    return {
      model,
      alerts: [],
    };
  },
  computed: {
    activeSpace() {
      return this.model.spaces.getSpace(String(this.$route?.params?.spaceId));
    },
    doLocalStorageNotice: {
      get() {
        return !this.model.doneLocalStorageNotice;
      },
      set(v: boolean) {
        this.model.doneLocalStorageNotice = !v;
      }
    },
  },
  methods: {
    // Progressively clear things starting with active alerts/messages.
    stagedClearAll() {
      if(this.model.messages.isMessages()) {
        return this.model.messages.clearAll();
      }
      this.activeSpace?.clearAll();
    },
    undo(e: KeyboardEvent) {
      if(e.key === 'z') {
        if(this.activeSpace) {
          this.activeSpace.undoActionStack.undoAction();
        }
      }
    }
  },
  mounted() {
    this.model.ui.rail = this.$vuetify.display.mobile;
  }
});
</script>

<template>
  <v-app
    @keyup.escape='stagedClearAll'
    @keyup.ctrl.stop='undo'
  >
  <v-dialog
    v-model='doLocalStorageNotice'
  >
    <v-container class='justify-center'>
      <v-row justify='space-around'>
        <v-col xs=6 md=6>
          <v-card style='text-align: center;'>
          <v-card-title>NOTICE</v-card-title>
          This web app uses local browser storage. <br>
          This means you don't have to be logged in to work with your data. <br>
          When you login local storage is synchronized to your account on a remote server. <br>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-dialog>
  <system-bar></system-bar>
  <suspense>
    <router-view></router-view>
  </suspense>
  </v-app>
</template>

<style scoped>
  .v-card { padding: 1em }
</style>
