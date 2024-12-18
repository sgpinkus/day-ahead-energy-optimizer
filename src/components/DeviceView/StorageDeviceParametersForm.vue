<script setup lang="ts">
import type { StorageDevice } from '@/model/device';
import { setDialog } from '@/model/infos';
import { deepDiffObjects2 } from '@/utils';
import { cloneDeep } from 'lodash';
import { ref, useTemplateRef, type Ref } from 'vue';

const { device } = defineProps<{ device: StorageDevice }>();
const form: Ref<HTMLFormElement | null> = useTemplateRef('form');
const work = ref(cloneDeep(device.parameters));
const initialValue = cloneDeep(work.value);
const valid = ref(false);

async function change() { // change(changeKey: string)
  form.value!.resetValidation();
  const { valid } = await form.value!.validate();
  const changes = deepDiffObjects2(work.value, initialValue);
  if (valid && changes) {
    Object.assign(device.parameters, changes);
  }
}

</script>

<template>
  <v-form
    ref="form"
    v-model="valid"
  >
    <div class="d-flex flex-row justify-space-between">
      <v-label>Capacity</v-label>
      <v-icon
        size="18"
        @click="setDialog(&quot;StorageCapacity&quot;)"
      >
        mdi-information
      </v-icon>
    </div>
    <v-text-field
      v-model.number="work.capacity"
      type="number"
      :min="0"
      :max="100"
      :step="0.1"
      placeholder="None"
      @change="change"
    />

    <div class="d-flex flex-row justify-space-between">
      <v-label>Efficiency Factor</v-label>
      <v-icon
        size="18"
        @click="setDialog(&quot;StorageEfficiencyFactor&quot;)"
      >
        mdi-information
      </v-icon>
    </div>
    <v-text-field
      v-model.number="work.efficiencyFactor"
      type="number"
      :min="0"
      :max="1"
      :step="0.01"
      placeholder="None"
      @change="change"
    />

    <div class="d-flex flex-row justify-space-between">
      <v-label>Reserve Ratio</v-label>
      <v-icon
        size="18"
        @click="setDialog(&quot;ReserveRatio&quot;)"
      >
        mdi-information
      </v-icon>
    </div>
    <v-text-field
      v-model.number="work.reserveRatio"
      type="number"
      :min="0"
      :max="1"
      :step="0.01"
      placeholder="None"
      @update:model-value="change"
    />

    <div class="d-flex flex-row justify-space-between">
      <v-label>Starting Ratio</v-label>
      <v-icon
        size="18"
        @click="setDialog(&quot;StartingRatio&quot;)"
      >
        mdi-information
      </v-icon>
    </div>
    <v-text-field
      v-model.number="work.startingRatio"
      type="number"
      :min="0"
      :max="1"
      :step="0.01"
      placeholder="None"
      @update:model-value="change"
    />

    <div class="d-flex flex-row justify-space-between">
      <v-label>Fast Charge/Discharge Cost Factor</v-label>
      <v-icon
        size="18"
        @click="setDialog(&quot;FastChargeCostFactor&quot;)"
      >
        mdi-information
      </v-icon>
    </div>
    <v-text-field
      v-model.number="work.fastChargeCostFactor"
      type="number"
      :min="0"
      :max="10"
      :step="0.1"
      placeholder="None"
      @change="change"
    />

    <div class="d-flex flex-row justify-space-between">
      <v-label>Flip Flip Cost Factor</v-label>
      <v-icon
        size="18"
        @click="setDialog(&quot;StorageCycleCostFactor&quot;)"
      >
        mdi-information
      </v-icon>
    </div>
    <v-text-field
      v-model.number="work.flipFlopCostFactor"
      type="number"
      :min="0"
      :max="10"
      :step="0.1"
      placeholder="None"
      @change="change"
    />

    <div class="d-flex flex-row justify-space-between">
      <v-label>Deep Discharge Cost Factor</v-label>
      <v-icon
        size="18"
        @click="setDialog(&quot;StorageDepthCostFactor&quot;)"
      >
        mdi-information
      </v-icon>
    </div>
    <v-text-field
      v-model.number="work.deepDischargeCostFactor"
      type="number"
      :min="0"
      :max="10"
      :step="0.1"
      placeholder="None"
      @update:model-value="change"
    />

    <div class="d-flex flex-row justify-space-between">
      <v-label>Deep Depth</v-label>
      <v-icon
        size="18"
        @click="setDialog(&quot;StorageDeepDepthRatio&quot;)"
      >
        mdi-information
      </v-icon>
    </div>
    <v-text-field
      v-model.number="work.deepDepthRatio"
      type="number"
      :min="0"
      :max="1"
      :step="0.01"
      placeholder="None"
      @update:model-value="change"
    />

    <div class="d-flex flex-row justify-space-between">
      <v-label>Charge Rate Clipping Factor</v-label>
      <v-icon
        size="18"
        @click="setDialog(&quot;ChargeRateClippingFactor&quot;)"
      >
        mdi-information
      </v-icon>
    </div>
    <v-text-field
      v-model.number="work.chargeRateClippingFactor"
      type="number"
      :min="1"
      :max="10"
      :step="0.01"
      placeholder="None"
      @update:model-value="change"
    />

    <div class="d-flex flex-row justify-space-between">
      <v-label>Discharge Rate Clipping Factor</v-label>
      <v-icon
        size="18"
        @click="setDialog(&quot;DischargeRateClippingFactor&quot;)"
      >
        mdi-information
      </v-icon>
    </div>
    <v-text-field
      v-model.number="work.disChargeRateClippingFactor"
      type="number"
      :min="1"
      :max="10"
      :step="0.01"
      placeholder="None"
      @update:model-value="change"
    />
  </v-form>
</template>