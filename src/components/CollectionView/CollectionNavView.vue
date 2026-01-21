<script setup lang="ts">
import model, { Bus, Collection } from '@/model';
import BusList from './BusList.vue';
import HubPlus from '@/components/icons/hub-plus';
import AddDataActionList from '@/components/AddDataActionList.vue';
import DatumList from '@/components/DatumList.vue';
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

/**
 * TODO: This resets everything since collections aren't implemented yet.
 */
function reset() {
  model.reset();
}

</script>

<template>
  <div class="nav-container">
    <v-divider />
    <v-list-item
      prepend-icon="mdi-refresh"
      @click="reset"
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
    <v-divider />
    <AddDataActionList />
    <v-divider />
    <DatumList />
    <v-spacer style="flex-grow: 1;" />
    <v-divider />
    <RouterLink to="/docs">
      <v-list-item prepend-icon="mdi-text-box">
        Docs
      </v-list-item>
    </RouterLink>
  </div>
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

  .nav-container {
    height: 100%;
    flex-flow: nowrap;
    display: flex;
    flex-direction: column;
  }
</style>