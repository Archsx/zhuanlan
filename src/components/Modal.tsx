import useClickOutside from '@/hooks/useClickOutside'
import { defineComponent, nextTick, ref, watch } from '@vue/runtime-core'
import { Transition } from '@vue/runtime-dom'
export default defineComponent({
  name: 'Modal',
  props: {
    confirmText: {
      type: String
    },
    show: {
      type: Boolean,
      default: true
    },
    cancelText: {
      type: String
    },
    onModalShow: {
      type: Function
    },
    onModalHide: {
      type: Function
    },
    onConfirm: {
      type: Function
    },
    onCancel: {
      type: Function
    },
    header: {},
    content: {}
  },
  setup(props, { slots, emit }) {
    const show = ref(props.show)
    const modal = ref<HTMLElement | null>(null)
    const test = () => {
      console.log(111111)
      const clickOutside = useClickOutside(modal)
      watch(clickOutside, newVal => {
        if (newVal) {
          closeModal()
        }
      })
    }
    console.log(props)
    // if (props.show === false) {
    //   show.value = false
    // }
    const closeModal = () => {
      show.value = false
      emit('destroy')
    }
    const handleCancel = () => {
      props.onCancel && props.onCancel()
      closeModal()
    }
    const handleConfirm = () => {
      props.onConfirm && props.onConfirm()
      closeModal()
    }

    return () => {
      const showVal = show.value
      const test1 = () => {
        console.log(123)
      }
      return (
        <Transition name="modal-fade" onEnter={test} onLeave={test1}>
          {showVal ? (
            <div
              class="modal fade show"
              id="exampleModal"
              tabindex={-1}
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
              style={{
                display: 'block',
                backgroundColor: 'rgba(0, 0, 0, .5)'
              }}
            >
              <div class="modal" style={{ display: 'block' }} ref={modal}>
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      {props.header}
                      {/* {slots.header ? slots.header() : null} */}
                      <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                        onClick={handleCancel}
                      ></button>
                    </div>
                    <div class="modal-body">
                      {props.content}
                      {/* {slots.content ? slots.content() : null} */}
                    </div>
                    <div class="modal-footer">
                      <button
                        type="button"
                        class="btn btn-secondary"
                        data-bs-dismiss="modal"
                        onClick={handleCancel}
                      >
                        {props.cancelText || '取消'}
                      </button>
                      <button
                        type="button"
                        class="btn btn-primary"
                        onClick={handleConfirm}
                      >
                        {props.confirmText || '确定'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </Transition>
      )
    }
  }
})
