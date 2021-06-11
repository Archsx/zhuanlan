<template>
  <div
    class="modal "
    v-if="showRef"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
    ref="modal"
    :style="{
      display: 'block',
      backgroundColor: 'rgba(0, 0, 0, .5)'
    }"
  >
    <div class="modal" :style="{ display: 'block' }" ref="modal">
      <div class="modal-dialog">
        <div class="modal-content">
          <slot name="header"></slot>
          <div class="modal-header">
            <slot name="header" v-if="!header">
              这是modal的标题
            </slot>
            <template v-else>
              {{ header }}
            </template>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              @click="handleCancel"
            ></button>
          </div>
          <div class="modal-body">
            <slot name="content" v-if="!content">
              这是modal的内容
            </slot>
            <template v-else>
              {{ content }}
            </template>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
              @click="handleCancel"
            >
              {{ cancelText || '取消' }}
            </button>
            <button
              type="button"
              class="btn btn-primary"
              @click="handleConfirm"
            >
              {{ confirmText || '确定' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, PropType, VNode, onMounted } from 'vue'

export default defineComponent({
  name: '',
  components: {},
  props: {
    confirmText: {
      type: String
    },
    show: {
      type: Boolean,
      default: false
    },
    cancelText: {
      type: String
    },
    onConfirm: {
      type: Function
    },
    onCancel: {
      type: Function
    },
    header: {
      type: [Object, String] as PropType<VNode | string>
    },
    content: {
      type: [Object, String] as PropType<VNode | string>
    }
  },

  setup(props, { emit }) {
    const showRef = ref(props.show)
    const modal = ref<HTMLElement | null>(null)
    const fn = (e: Event) => {
      if (!modal.value?.contains(e.target as HTMLElement)) {
        closeModal()
      }
    }
    const listenClick = () => {
      window.addEventListener('click', fn)
    }
    onMounted(() => {
      setTimeout(() => {
        listenClick()
      })
    })
    const closeModal = () => {
      showRef.value = false
      window.removeEventListener('click', fn)
      emit('destroy')
    }
    const handleConfirm = () => {
      props.onConfirm && props.onConfirm()
      console.log(11)
      closeModal()
    }
    const handleCancel = () => {
      props.onCancel && props.onCancel()
      console.log(22)
      closeModal()
    }
    return {
      showRef,
      handleConfirm,
      handleCancel
    }
  }
})
</script>

<style lang="scss" scoped></style>
