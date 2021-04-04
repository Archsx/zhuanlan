import { defineComponent, onUnmounted, PropType } from '@vue/runtime-core'
import { mitter } from '@/utils/mitter'
import { withModifiers } from '@vue/runtime-dom'
type ValidateFunc = () => boolean
export default defineComponent({
  name: 'ValidateForm',
  // emits: ['form-submit'],
  props: {
    onFormSubmit: {
      type: Function as PropType<(param: boolean) => void>
    }
  },

  emits: ['FormSubmit'],
  setup(props, { slots, emit }) {
    let funcArr: Array<ValidateFunc> = []
    const submitForm = () => {
      const result = funcArr.map(func => func()).every(res => res)
      emit('FormSubmit', result)
      // emit('form-submit', result)
    }
    const callback = (func?: ValidateFunc) => {
      funcArr.push(func!)
    }
    mitter.on('form-item-created', callback)
    onUnmounted(() => {
      mitter.off('form-item-created', callback)
      funcArr = []
    })

    return () => {
      return (
        <form>
          {slots.default && slots.default()}
          <div
            class="submit-area"
            onClick={withModifiers(submitForm, ['prevent'])}
          >
            {slots.submit ? (
              slots.submit()
            ) : (
              <button type="submit" class="btn btn-primary">
                提交
              </button>
            )}
          </div>
        </form>
      )
    }
  }
})
