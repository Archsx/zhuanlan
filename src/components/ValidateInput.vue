<template>
  <div class="validate-input-container pb-3">
    <component
      :value="inputRef.val"
      @input="handleInput"
      class="form-control"
      @blur="validateInput"
      :class="{ 'is-invalid': inputRef.error }"
      v-bind="$attrs"
      :is="tag === 'input' ? 'input' : 'textarea'"
    ></component>
    <span v-if="inputRef.error" class="invalid-feedback">
      {{ inputRef.message }}
    </span>
  </div>
</template>

<script lang="ts">
import { RuleProps, Validation } from '@/utils/validate'
import {
  computed,
  defineComponent,
  onMounted,
  PropType,
  reactive,
  watch
} from 'vue'
import { mitter } from './ValidateForm.vue'
export type InputOrText = 'input' | 'textarea'

export default defineComponent({
  name: '',
  components: {},
  // 设置这个属性可以使根元素不直接添加attributes,这样可以不再使用下面的type这个prop
  inheritAttrs: false,
  props: {
    rules: {
      type: Array as PropType<RuleProps>
    },
    // type: {
    //   type: String,
    //   default: 'text'
    // },
    modelValue: {
      type: String
    },
    tag: {
      type: String as PropType<InputOrText>,
      default: 'input'
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit, attrs }) {
    // watch(
    //   () => props.modelValue,
    //   val => {
    //     console.log('--------', val)
    //   }
    // )
    const inputRef = reactive({
      // val: props.modelValue || '',
      val: computed({
        get: () => {
          return props.modelValue || ''
        },
        set: val => {
          emit('update:modelValue', val)
        }
      }),
      error: false,
      message: ''
    })
    const validateInput = () => {
      if (props.rules) {
        const len = props.rules.length
        for (let i = 0; i < len; i++) {
          const rule = props.rules[i]
          if (rule.type === 'custom') {
            if (!rule.custom()) {
              inputRef.error = true
              inputRef.message = rule.message
              return false
            }
          } else if (!Validation[rule.type](inputRef.val)) {
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
    const handleInput = (e: InputEvent) => {
      inputRef.val = (e.target as HTMLInputElement).value
      // emit('update:modelValue', inputRef.val)
    }
    onMounted(() => {
      mitter.emit('form-item-created', validateInput)
    })
    return {
      inputRef,
      validateInput,
      handleInput
    }
  }
})
</script>

<style lang="scss" scoped>
.form-control {
  font-size: 14px !important;
}
.validate-input-container {
  position: relative;
  .invalid-feedback {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    font-size: 12px;
    color: red;
  }
}
</style>
