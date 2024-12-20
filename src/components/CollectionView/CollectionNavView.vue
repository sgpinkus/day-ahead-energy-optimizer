<script setup lang="tsx">
import { Bus, Collection } from '@/model';
import BusList from './BusList.vue';
import HubPlus from '@/components/icons/hub-plus';
import { useTemplateRef } from 'vue';
import { ValidationError } from '@/errors';

const { collection } = defineProps<{ collection: Collection }>();

const importFileInput = useTemplateRef<HTMLInputElement>('importFileInput');

function importBus() {
  const files = importFileInput.value ? importFileInput.value.files : [undefined];
  if (files && files[0]) {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
        const bus = Bus.fromExportObject(reader.result);
        if (!(bus instanceof Bus)) throw new ValidationError();
        collection.add(bus);
      },
      false,
    );
    reader.readAsText(files[0]);
  }
}

</script>

<template>
  <v-list-item
    prepend-icon="mdi-refresh"
    @click="collection.reset()"
  >
    Reset DB
  </v-list-item>
  <v-divider />
  <v-list-item
    prepend-icon="mdi-application-import"
  >
    <v-list-item-title>
      <label for="bus-file">Import Bus</label>
    </v-list-item-title>
    <input
      id="bus-file"
      ref="importFileInput"
      type="file"
      style="display: none"
      @change="importBus"
    >
  </v-list-item>
  <v-divider />
  <v-list-item
    title="Add Bus"
    :prepend-icon="HubPlus"
    @click="collection.addNew()"
  />
  <v-divider />
  <BusList :collection="collection" />
</template>

<style scoped>
  .v-card { padding: 1em }

  .details-content {
    max-height: 100%;
    flex-flow: nowrap;
    display: flex;
    flex-direction: column;
  }

  .v-btn {
    min-width: 1em;
    padding: 0;
    margin: 0;
  }

  label:hover {
    cursor: inherit;
    text-decoration: underline;
  }
</style>