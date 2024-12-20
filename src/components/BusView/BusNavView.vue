<script setup lang="ts">
import { Bus } from '@/model';
import { BaseDevice } from '@/model';
import AddDeviceActionList from './AddDeviceActionList.vue';
import BusDeviceList from './DeviceList.vue';
import { jsonStringify, jsonParse } from '@/model/importlib';
import { ref, useTemplateRef } from 'vue';
import { ValidationError } from '@/errors';
import { TypeGuardError } from 'typia';
import { typeGuardErrorToString } from '@/utils';

const { bus } = defineProps<{ bus: Bus }>();

const importFileInput = useTemplateRef<HTMLInputElement>('importFileInput');

const blobUrl = ref('');
function exportModel() {
  const data = jsonStringify(bus.toExportObject());
  const blob = new Blob([data], { type: 'application/json' });
  blobUrl.value = URL.createObjectURL(blob);
}

function importDevice() {
  const files = importFileInput.value ? importFileInput.value.files : [undefined];
  if (files && files[0]) {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
        try {
          const device = jsonParse(reader.result); // is ~sanitized via Device.reviver.
          if (!(device instanceof BaseDevice)) throw new ValidationError();
          bus.add(device.clone());
        } catch (e) {
          if (e instanceof TypeGuardError) {
            throw new ValidationError(typeGuardErrorToString(e));
          }
          else {
            throw e;
          }
        }
      },
      false,
    );
    reader.readAsText(files[0]);
  }
}

</script>

<template>
  <v-list class="flex-shrink-0 details-content">
    <v-list class="flex-shrink-0">
      <v-list-item
        prepend-icon="mdi-refresh"
        @click="bus.reset()"
      >
        Reset Bus Data
      </v-list-item>
      <v-divider />
      <v-list-item
        prepend-icon="mdi-application-export"
        @click="exportModel()"
      >
        <a
          :href="blobUrl"
          :download="`bus-${bus.id}.json`"
        >Export Bus</a>
      </v-list-item>
      <v-divider />
      <v-list-item
        prepend-icon="mdi-application-import"
      >
        <v-list-item-title>
          <label for="device-file">Import Device</label>
        </v-list-item-title>
        <input
          id="device-file"
          ref="importFileInput"
          type="file"
          style="display: none"
          @change="importDevice"
        >
      </v-list-item>
      <v-list-item
        prepend-icon="mdi-play-box"
      >
        <route-name
          name="run"
          :params="{ id: bus.id }"
        >
          Run Optimization
        </route-name>
      </v-list-item>
    </v-list>
    <v-divider />
    <AddDeviceActionList :bus="bus" />
    <v-divider />
    <BusDeviceList :bus="bus" />
    <!-- <v-divider></v-divider>
    <AddDataActionList></AddDataActionList>
    <v-divider></v-divider>
    <DatumList></DatumList> -->
  </v-list>
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