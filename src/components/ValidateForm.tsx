import { defineComponent, onUnmounted, PropType } from '@vue/runtime-core'
import { mitter } from '@/utils/mitter'
import { withModifiers } from '@vue/runtime-dom'
type ValidateFunc = () => boolean
export default defineComponent({
  name: 'ValidateForm',
  props: {
    // 这是我觉得最恶心的地方
    // 对于自定义事件 父组件如果要设置对应的处理的函数
    // 需要在子组件的props里面设置这个属性
    // 详情(其实也不是完全相关)见:
    // https://github.com/vuejs/jsx-next/issues/266
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
