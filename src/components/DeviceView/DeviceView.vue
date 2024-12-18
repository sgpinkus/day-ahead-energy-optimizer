<script setup lang='ts'>
import { ref, defineProps } from 'vue';
import AppNavDrawer from '@/components/AppNavDrawer.vue';
import DeviceDescriptorsView from './DeviceDescriptorsView.vue';
import DeviceBoundsView from './DeviceBoundsView.vue';
import FixedDeviceBoundsView from './FixedDeviceBoundsView.vue';
import DeviceCBoundsView from './DeviceCBoundsView.vue';
import DeviceFlowCostsView from './DeviceCostsFlowView.vue';
import DeviceCFlowCostsView from './DeviceCostsCFlowView.vue';
import DevicePFlowCostsView from './DeviceCostsPFlowView.vue';
import DeviceCostsBoundsRelativeFlow from './DeviceCostsBoundsRelativeFlow.vue';
import DeviceCostsCBoundsRelativeFlow from './DeviceCostsCBoundsRelativeFlow.vue';
import DeviceParametersView from './DeviceParametersView.vue';
import model from '@/model';
import type { ICosts } from '@/model/device';
import { NotFoundError } from '@/errors';

const tab = ref('descriptors');
const { id: deviceId } = defineProps<{ id: string }>();
const device = model.devices[deviceId];
if (!device) throw new NotFoundError();

function boundsView() {
  switch (device.type) {
    case 'fixed_load':
      return FixedDeviceBoundsView;
    default:
      return DeviceBoundsView;
  }
}

function costStatusIcon(type: keyof ICosts) {
  return device.costs[type] ? 'mdi-checkbox-outline' : '-';
}

</script>

<template>
  <AppNavDrawer>
    <route-name
      name="bus"
      :params="{ id: device.busId }"
    >
      <v-list-item prepend-icon="mdi-arrow-left">
        Bus
      </v-list-item>
    </route-name>
    <v-divider />
    <v-list class="flex-shrink-0 device-components">
      <template v-if="true">
        <v-list-item
          prepend-icon="mdi-text-box-edit"
          @click="tab = &quot;descriptors&quot;"
        >
          Descriptors
        </v-list-item>
        <v-divider />
      </template>
      <template v-if="!device.attrs.hideBounds">
        <v-list-item
          prepend-icon="mdi-minus-box"
          @click="tab = &quot;bounds&quot;"
        >
          Flow Bounds
        </v-list-item>
        <v-divider />
      </template>
      <template v-if="!device.attrs.hideCBounds">
        <v-list-item
          prepend-icon="mdi-equal-box"
          @click="tab = &quot;cbounds&quot;"
        >
          Cumulative Flow Bounds
        </v-list-item>
        <v-divider />
      </template>
      <template v-if="device.attrs.hasParameters">
        <v-list-item
          prepend-icon="mdi-code-braces"
          @click="tab = &quot;params&quot;"
        >
          Parameters
        </v-list-item>
        <v-divider />
      </template>
      <template v-if="!device.attrs.hideCosts">
        <v-list-group value="Costs">
          <template #activator="{ props }">
            <v-list-item
              v-bind="props"
              prepend-icon="mdi-function"
              title="Costs"
            />
          </template>
          <v-list-item
            prepend-icon="mdi-function"
            :append-icon="costStatusIcon(&quot;flow&quot;)"
            @click="tab = &quot;costs&quot;"
          >
            Flow Cost
          </v-list-item>
          <v-list-item
            prepend-icon="mdi-function"
            :append-icon="costStatusIcon(&quot;flow_bounds_relative&quot;)"
            @click="tab = &quot;brcosts&quot;"
          >
            Bounds Relative Flow Cost
          </v-list-item>
          <v-list-item
            prepend-icon="mdi-function"
            :append-icon="costStatusIcon(&quot;cumulative_flow&quot;)"
            @click="tab = &quot;ccosts&quot;"
          >
            Cumulative Flow Cost
          </v-list-item>
          <v-list-item
            prepend-icon="mdi-function"
            :append-icon="costStatusIcon(&quot;cumulative_flow_bounds_relative&quot;)"
            @click="tab = &quot;brccosts&quot;"
          >
            Cumulative Bounds Relative Flow Cost
          </v-list-item>
          <v-list-item
            prepend-icon="mdi-function"
            :append-icon="costStatusIcon(&quot;peak_flow&quot;)"
            @click="tab = &quot;pcosts&quot;"
          >
            Peak Flow Cost
          </v-list-item>
        </v-list-group>
      </template>
      <v-divider />
    </v-list>
  </AppNavDrawer>
  <v-main>
    <v-container class="container">
      <h2>{{ device.title }}</h2>
      <DeviceDescriptorsView
        v-if="tab === &quot;descriptors&quot;"
        :device="device"
      />
      <component
        :is="boundsView()"
        v-if="tab === &quot;bounds&quot; && !device.attrs.hideBounds"
        :device="device"
      />
      <DeviceCBoundsView
        v-if="tab === &quot;cbounds&quot; && !device.attrs.hideCBounds"
        :device="device"
      />
      <DeviceParametersView
        v-if="tab === &quot;params&quot; && device.attrs.hasParameters"
        :device="device"
      />
      <DeviceFlowCostsView
        v-if="tab === &quot;costs&quot; && !device.attrs.hideCosts"
        :device="device"
      />
      <DeviceCostsBoundsRelativeFlow
        v-if="tab === &quot;brcosts&quot; && !device.attrs.hideCosts"
        :device="device"
      />
      <DeviceCostsCBoundsRelativeFlow
        v-if="tab === &quot;brccosts&quot; && !device.attrs.hideCosts"
        :device="device"
      />
      <DeviceCFlowCostsView
        v-if="tab === &quot;ccosts&quot; && !device.attrs.hideCosts"
        :device="device"
      />
      <DevicePFlowCostsView
        v-if="tab === &quot;pcosts&quot; && !device.attrs.hideCosts"
        :device="device"
      />
    </v-container>
  </v-main>
</template>

<style scoped>
  .container {
    min-height: 100vh;
    max-width: 960px;
    display: flex;
    flex-flow: column nowrap;
    align-items: stretch;
    padding: 1em;
    justify-content: stretch;
  }
  /* .device-components > .v-list-item, .device-components > .v-list-group { border-bottom: solid 1px gray; } */
</style>
