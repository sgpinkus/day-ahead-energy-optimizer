import { ref, type Ref } from 'vue';

export const info = {
  StorageCapacity: 'The storage capacity of device in kWh.',
  StorageEfficiencyFactor: `The *single* trip efficiency factor. Applied symmetrically to in/out flow.
        This means the round-trip efficiency (RTEF) is 1/2 this: efficiency = 1-(1-RTEF)/2. Ex, if
        the RTEF=0.9 then efficiency should be set to 1-(1-0.9)/2 = 0.95.`,
  StorageCycleCostFactor: 'Every flip flop from charging to discharging and vice versa is penalized by this amount.',
  StorageDepthCostFactor: 'When charge reaches a certain threshold, start applying this cost factor to further discharging.',
  StorageDeepDepthRatio: 'At what ratio of charge remaining does depth damage factor kick. Has no effect if depth damage is zero.',
  FlowBoundsRelative: `The price of flow is "price at min" at minimum flow of device and "price at max" at maximum flow.
    For a demand response load device, you generally want prices to be *negative*.`,
  '': '',
};

export const dialog: Ref<keyof typeof info> = ref('');
export const showDialog = ref(false);

export function setDialog(x: keyof typeof info | '') {
  dialog.value = x;
  showDialog.value = true;
}