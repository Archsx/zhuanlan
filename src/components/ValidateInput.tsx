import { mitter } from '@/utils/mitter'
import { RuleProps, Validation } from '@/utils/validate'
import {
  defineComponent,
  onMounted,
  PropType,
  reactive
} from '@vue/runtime-core'

export default defineComponent({
  inheritAttrs: false,
  props: {
    rules: {
      type: Array as PropType<RuleProps>
    },
    modelValue: {
      type: String
    },
    type: {
      type: String
    },
    placeholder: {
      type: String
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit, attrs }) {
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
            // type={props.type}
            // placeholder={props.placeholder}
            // {...attrs}
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
