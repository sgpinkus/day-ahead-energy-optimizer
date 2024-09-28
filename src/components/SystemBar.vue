<script lang='ts'>
import { defineComponent } from 'vue';
import model from '@/model';

export default defineComponent({
  components: {
  },
  data(): any {
    return {
      model,
    };
  },
  methods: {
    removeAlert(id: string) {
      model.messages.removeAlert(id);
    },
    clearAlerts() {
      model.messages.clearAlerts();
    },
    clearSuccessMessage() {
      model.messages.clearSuccessMessage();
    },
  },
});
</script>

<template>
  <template v-if=model.messages.alerts.length>
    <v-system-bar app window color='error'>
      <v-chip
        v-for='(alert) in model.messages.alerts.slice(-3)'
        :key='alert.id'
        :title='alert.title'
        :type='alert.type'
        closable
        density='compact'
        @click:close='() => removeAlert(alert.id)'
        order='0'
      >
        ERROR: {{ alert.message }}
      </v-chip>
      <v-spacer></v-spacer>
      <v-btn icon="mdi-close" variant="text" class="ml-2" @click='clearAlerts'></v-btn>
    </v-system-bar>
  </template>
  <template v-if=model.messages.successMessage>
    <v-system-bar app window color='success'>
      <v-chip
        closable
        @click:close='() => model.messages.clearSuccessMessage()'
        order='0'
      >
        {{ model.messages.successMessage }}
      </v-chip>
      <v-spacer></v-spacer>
      <v-btn icon="mdi-close" variant="text" class="ml-2" @click='clearSuccessMessage'></v-btn>
    </v-system-bar>
  </template>
</template>