<template>
  <div class="validate-input-container pb-3">
    <input
      :type="type"
      class="form-control"
      v-model="inputRef.val"
      @blur="validateInput"
      :class="{ 'is-invalid': inputRef.error }"
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
  props: {
    rules: {
      type: Array as PropType<RuleProps>
    },
    type: {
      type: String,
      default: 'text'
    }
  },
  setup(props) {
    const inputRef = reactive({
      val: '',
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
            return
          }
        }
        inputRef.error = false
        inputRef.message = ''
      }
    }
    return {
      inputRef,
      validateInput
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
