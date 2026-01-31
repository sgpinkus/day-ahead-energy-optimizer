import { defineComponent } from 'vue'
import { VTextField } from 'vuetify/components'

const commonProps = {
  type: 'number',
  hideDetails: true,
  rounded: 0,
  label: '',
  density: 'compact',
  flat: true
} as const

export default defineComponent({
  name: 'MyNumberTextField',
  setup(_props, { slots, attrs }) {
    return () => (
      <VTextField
        {...commonProps}
        {...attrs}
      >
        {slots.default?.()}
      </VTextField>
    )
  },
})
