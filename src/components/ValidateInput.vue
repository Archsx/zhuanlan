<template>
  <div class="validate-input-container pb-3">
    <input
      class="form-control"
      :value="inputRef.val"
      @input="handleInput"
      @blur="validateInput"
      :class="{ 'is-invalid': inputRef.error }"
      v-bind="$attrs"
    />
    <span v-if="inputRef.error" class="invalid-feedback">
      {{ inputRef.message }}
    </span>
  </div>
</template>

<script lang="ts">
import { RuleProps, Validation } from '@/utils/validate'
import { defineComponent, PropType, reactive } from 'vue'

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
    const handleInput = (e: InputEvent) => {
      inputRef.val = (e.target as HTMLInputElement).value
      emit('update:modelValue', inputRef.val)
    }
    return {
      inputRef,
      validateInput,
      handleInput
    }
  }
})
</script>

<style lang="scss" scoped>
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
