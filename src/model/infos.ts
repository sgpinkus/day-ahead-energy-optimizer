import { ref, type Ref } from 'vue';

const clippingFactor = 'If set must be >=1. 1 applies clipping at all SoC but decreases slowly. A large number kicks in later but clips harder.';

export const info = {
  StorageCapacity: 'The storage capacity of device in kWh.',
  StorageEfficiencyFactor: `The *single* trip efficiency factor. Applied symmetrically to in/out flow.
        This means the round-trip efficiency (RTEF) is 1/2 this: efficiency = 1-(1-RTEF)/2. Ex, if
        the RTEF=0.9 then efficiency should be set to 1-(1-0.9)/2 = 0.95.`,
  StartingRatio: 'How much charge the device starts with as a ratio of capacity',
  ReserveRatio: 'How much charge must be left in the device as a ratio of capacity',
  FastChargeCostFactor: 'Cost that is proportional to the rate of charge discharge to discourage fast charge/discharge',
  StorageCycleCostFactor: 'Every flip flop from charging to discharging and vice versa is penalized by this amount.',
  StorageDepthCostFactor: 'When charge reaches a certain threshold, start applying this cost factor to further discharging.',
  StorageDeepDepthRatio: 'At what ratio of charge remaining does depth damage factor kick. Has no effect if depth damage is zero.',
  CostsFlow: 'Applies at each time independently. Form is a*(x+o)**2 + b*(x+o). Use o parameter to make cost decreasing or increasing over the valid flow bounds depending on the type of device.',
  CostsCFlow: 'Same as flow costs but applies to the cumulative flow.',
  CostsBoundsRelativeFlow: `The price of flow is *price at min* at minimum flow, and *price at max* at maximum flow.
    For a demand response *load*, you typically want cost to decrease to a minimum (typically zero) at max-flow and both prices to be *negative* or at least non-positive.
    This is because "price" represents marginal utility cost.`,
  ChargeRateClippingFactor: `Linear clipping factor. Battery max charge rate tends to decrease as state of charge approaches capacity. ${clippingFactor}.`,
  DischargeRateClippingFactor: `Linear clipping factor. Battery max discharge rate tends to decrease as state of charge approaches 0. ${clippingFactor}.`,
  ThermalSustainmentFactor: 'How good a thermal mass is at retaining heat. 1 means perfect, 0 means internal temperature will match external temperature byt next time step.',
  ThermalEfficiencyFactor: 'Same as Coefficient of Performance but this number is assumed to include the (assumed temperature constant) conversion rate to degrees Celcius (which will depend on the size of a thermal mass and the type of mass itself).',
  InitiaTemperature: 'The temperature of the thermal mass at start time.',
  TemperatureRangeCareFactor: 'The cost gradient (price) is 1 when the actual temperature is this number away from desired temperature. If you dont care about the temperature at a given time set this to a very high number (100 mean practically dont care.',
  ExternalTemperature: 'The temperature outside',
  '': '',
};

export const dialog: Ref<keyof typeof info> = ref('');
export const showDialog = ref(false);

export function setDialog(x: keyof typeof info | '') {
  dialog.value = x;
  showDialog.value = true;
}