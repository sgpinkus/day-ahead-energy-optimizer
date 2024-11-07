import { defineComponent } from 'vue';
import { VTextField } from 'vuetify/components';

export default defineComponent({
  name: 'MyNumberTextField',
  setup(_props, { slots, attrs }) {
    return () =>
      <VTextField
        type='number'
        hide-details
        rounded='0'
        label=''
        density='compact'
        flat
        {...attrs}
      >{slots.default && slots.default()}</VTextField>;
  },
});