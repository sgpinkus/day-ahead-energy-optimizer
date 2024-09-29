<script setup lang='ts'>
import { computed } from 'vue';
import model from '@/model';
import { cloneDeep } from 'lodash';

const actions = computed(() => model.messages.actions);
const show = computed(() => !!model.messages.actions.length);

function removeAction(id: string) {
  model.messages.removeAction(id);
}
</script>

<template>
  <template v-if="show">
    <v-snackbar
      :timeout='-1'
      :model-value='show'
      :multi-line='true'
      location='bottom'
    >
      <div class='my-snacks'>
        <template v-for='({ state, message, id }) in model.messages.actions' :key='id'>
            <p
              class='alert-message'
              @click="() => removeAction(id)"
            >{{ message }}&nbsp;<span style='flex: 1'></span>
              <v-icon class='boot' v-if='state === "started"'>mdi-shoe-sneaker</v-icon>
              <v-icon v-else-if='state === "success"'>mdi-check-circle</v-icon>
              <v-icon v-else-if='state === "warning"'>mdi-sign-caution</v-icon>
              <v-icon v-else-if='state === "error"'>mdi-alert-circle</v-icon>
            </p>
        </template>
      </div>
    </v-snackbar>
  </template>
</template>

<style scoped>
  .my-snacks {
    text-align: center !important;
    /* font-size: smaller; */
  }

  .my-snacks p:last-child {
    margin-bottom: 0;
  }

  .alert-message {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items:flex-end;
  }

  @keyframes boot {
    100% { transform: rotate(360deg); }
  }

  .boot {
    animation: boot 4s linear infinite;
  }
</style>