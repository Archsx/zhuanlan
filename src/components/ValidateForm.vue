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
type ValidateFunc = () => boolean
export default defineComponent({
  name: 'ValidateForm',
  components: {},
  emits: ['form-submit'],
  setup(props, { slots, emit }) {
    let funcArr: Array<ValidateFunc> = []
    const submitForm = () => {
      const result = funcArr.map(func => func()).every(res => res)

      emit('form-submit', result)
    }
    const callback = (func?: ValidateFunc) => {
      funcArr.push(func!)
    }
    mitter.on('form-item-created', callback)
    onUnmounted(() => {
      mitter.off('form-item-created', callback)
      funcArr = []
    })
    return {
      submitForm
    }
  }
})
</script>

<style lang="" scoped></style>
