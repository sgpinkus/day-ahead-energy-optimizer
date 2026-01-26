<script setup lang="ts">
import model, { Bus, Project } from '@/model';
import ModelList from './ModelList.vue';
import HubPlus from '@/components/icons/hub-plus';
import ProjectEditForm from './ProjectEditForm.vue';
import AddDataActionList from '@/components/AddDataActionList.vue';
import DatumList from '@/components/DatumList.vue';
import { useTemplateRef } from 'vue';
import { ValidationError } from '@/errors';

const { project } = defineProps<{ project: Project }>();
const importFileInput = useTemplateRef<HTMLInputElement>('importFileInput');

function importBus() {
  const files = importFileInput.value ? importFileInput.value.files : [undefined];
  if (files && files[0]) {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
        const bus = Bus.fromExportObject(reader.result);
        if (!(bus instanceof Bus)) throw new ValidationError();
        project.add(bus);
      },
      false,
    );
    reader.readAsText(files[0]);
  }
}

/**
 * TODO: This resets everything since plural projects aren't implemented yet.
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
    <v-dialog>
      <template #activator="{ props }">
        <v-list-item
          prepend-icon="mdi-cog"
          v-bind="props"
        >
          Settings
        </v-list-item>
      </template>
      <template #default="{ isActive }">
        <v-container fluid>
          <v-row>
            <v-col
              xs="12"
              md="6"
              offset-md="3"
            >
              <v-card>
                <ProjectEditForm :project="project" />
                <template #actions>
                  <v-btn
                    density="compact"
                    class="ml-auto"
                    text="Close"
                    @click="isActive.value = false"
                  />
                </template>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </template>
    </v-dialog>
    <v-divider />
    <v-list-item
      prepend-icon="mdi-application-import"
    >
      <v-list-item-title>
        <label for="bus-file">Import Model</label>
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
      title="Add Model"
      :prepend-icon="HubPlus"
      @click="project.addNew()"
    />
    <v-divider />
    <ModelList :project="project" />
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