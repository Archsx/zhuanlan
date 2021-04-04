import { mitter } from '@/utils/mitter'
import { RuleProps, Validation } from '@/utils/validate'
import {
  defineComponent,
  onMounted,
  PropType,
  reactive
} from '@vue/runtime-core'

export default defineComponent({
  // inheritAttrs: false,
  props: {
    rules: {
      type: Array as PropType<RuleProps>
    },
    modelValue: {
      type: String
    },
    // 这里需要注意 tsx 不允许 non-prop attribute的存在
    // 所以上面的inheritAttrs我都觉得不需要了
    // 这些属性都应该定义在props里面
    // 详情见:
    // https://github.com/vuejs/jsx-next/issues/313
    type: {
      type: String
    },
    placeholder: {
      type: String
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit, attrs }) {
    console.log(attrs)
    const inputRef = reactive({
      val: props.modelValue || '',
      error: false,
      message: ''
    })
    const validateInput = () => {
      if (props.rules) {
        const len = props.rules.length
        for (let i = 0; i < len; i++) {
          const rule = props.rules[i]
          if (!Validation[rule.type](inputRef.val)) {
            inputRef.error = true
            inputRef.message = rule.message
            return false
          }
        }
        inputRef.error = false
        inputRef.message = ''
      }
      return true
    }
    const handleInput = (e: Event) => {
      inputRef.val = (e.target as HTMLInputElement).value
      emit('update:modelValue', inputRef.val)
    }
    onMounted(() => {
      mitter.emit('form-item-created', validateInput)
    })
    const attrsObj = {
      type: props.type,
      placeholder: props.placeholder
    }
    return () => {
      return (
        <div class="validate-input-container pb-3">
          <input
            class={{ 'is-invalid': inputRef.error, 'form-control': true }}
            value={inputRef.val}
            onInput={handleInput}
            onBlur={validateInput}
            // 由于上面所提到的原因 这些本来的non-prop attributes都定义在了prop里面
            // 那么下面的attrs就拿不到任何值了
            // {...attrs}

            // type={props.type}
            // placeholder={props.placeholder}
            // 这个如果写的太长了的话 我个人还是比较喜欢下面的方式
            {...attrsObj}
          />
          {inputRef.error ? (
            <span class="invalid-feedback">{inputRef.message}</span>
          ) : null}
        </div>
      )
    }
  }
})
