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
import { defineComponent, onUnmounted } from 'vue'
import mitt, { Emitter } from 'mitt'
export const mitter: Emitter = mitt()

export default defineComponent({
  name: 'ValidateForm',
  components: {},
  emits: ['form-submit'],
  setup(props, { slots, emit }) {
    const submitForm = () => {
      emit('form-submit', true)
    }
    const callback = (str?: string) => {
      console.log(str)
    }
    mitter.on('form-item-created', callback)
    onUnmounted(() => {
      mitter.off('form-item-created', callback)
    })
    return {
      submitForm
    }
  }
})
</script>

<style lang="" scoped></style>
