<template>
  <transition name="modal-fade" @after-enter="listenClick" appear>
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
              <slot name="header" v-if="header">
                这是modal的标题
              </slot>
              <template v-else>
                {{ headerRef }}
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
              <slot name="content" v-if="content"></slot>
              <template v-else>
                {{ contentRef }}
              </template>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
                @click="handleCancel"
              >
                {{ cancelTextRef || '取消' }}
              </button>
              <button
                type="button"
                class="btn btn-primary"
                @click="handleConfirm"
              >
                {{ confirmTextRef || '确定' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent, ref, watch, PropType, VNode } from 'vue'

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
    console.log(props)
    const headerRef = ref(props.header)
    const contentRef = ref(props.content)
    const confirmTextRef = ref(props.confirmText)
    const cancelTextRef = ref(props.cancelText)
    const showRef = ref(props.show)
    const modal = ref<HTMLElement | null>(null)
    const fn = (e: Event) => {
      if (!modal.value?.contains(e.target as HTMLElement)) {
        closeModal()
      }
    }
    const listenClick = () => {
      // const isClickOutside = useClickOutside(modal)
      // watch(isClickOutside, val => {
      //   if (val) {
      //     closeModal()
      //   }
      // })

      window.addEventListener('click', fn)
    }
    const closeModal = () => {
      props.onCancel && props.onCancel()
      showRef.value = false
      window.removeEventListener('click', fn)
      emit('destroy')
    }
    const handleConfirm = () => {
      props.onConfirm && props.onConfirm()
      closeModal()
    }
    const handleCancel = () => {
      closeModal()
    }
    return {
      headerRef,
      contentRef,
      confirmTextRef,
      cancelTextRef,
      showRef,
      handleConfirm,
      handleCancel,
      listenClick
    }
  }
})
</script>

<style lang="scss" scoped>
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.5s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}
</style>
