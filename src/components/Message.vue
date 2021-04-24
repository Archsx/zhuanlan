<template>
  <teleport to="#message">
    <div
      class="alert message-info fixed-top w-50 mx-auto d-flex justify-content-between mt-2"
      role="alert"
      :class="classObject"
      v-if="isVisible"
    >
      <span>{{ message }}</span>
      <button
        type="button"
        class="btn-close"
        aria-label="Close"
        @click.prevent="hide"
      ></button>
    </div>
  </teleport>
</template>

<script lang="ts">
import { useDivCreate } from '@/hooks/useDivCreate'
import { IMessageType } from '@/types/message-type'
import { defineComponent, onMounted, onUnmounted, PropType, ref } from 'vue'
export default defineComponent({
  name: 'Message',
  components: {},
  props: {
    message: String,
    type: {
      type: String as PropType<IMessageType>,
      default: 'default'
    }
  },
  emits: ['close-message'],
  setup(props, { emit }) {
    const node = useDivCreate('message')
    const isVisible = ref(true)
    const classObject = {
      'alert-success': props.type === 'success',
      'alert-danger': props.type === 'error',
      'alert-primary': props.type === 'default'
    }
    const hide = () => {
      isVisible.value = false
      emit('close-message')
    }
    return {
      hide,
      isVisible,
      classObject
    }
  }
})
</script>

<style lang="" scoped></style>
