<template>
  <form>
    <slot name="default"></slot>
    <div class="submit-area" @click.prevent="submitForm">
      <slot name="submit">
        <button type="submit" class="btn btn-primary">
          提交
        </button>
      </slot>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ValidateForm',
  components: {},
  emits: ['form-submit'],
  setup(props, { slots, emit }) {
    const submitForm = () => {
      emit('form-submit', true)
    }
    return {
      submitForm
    }
  }
})
</script>

<style lang="" scoped></style>
