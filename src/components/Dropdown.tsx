import useClickOutside from '@/hooks/useClickOutside'
import { defineComponent, ref, watch } from '@vue/runtime-core'
import { withModifiers } from '@vue/runtime-dom'

export default defineComponent({
  props: {
    title: {
      type: String,
      required: true
    }
  },
  setup(props, { slots }) {
    const dropdownRef = ref<null | HTMLElement>(null)
    const isOpen = ref(false)
    const toggleOpen = () => {
      isOpen.value = !isOpen.value
    }
    const isClickOutside = useClickOutside(dropdownRef)
    watch(isClickOutside, newVal => {
      if (isOpen.value && newVal) {
        isOpen.value = false
      }
    })
    return () => {
      const isOpenValue = isOpen.value
      return (
        <div
          class="dropdown"
          style="position:relative;width:10rem"
          // 注意这里不能写作ref="dropdownRef"
          ref={dropdownRef}
        >
          <button
            class="btn btn-primary dropdown-toggle"
            type="button"
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            style="width:10rem"
            onClick={withModifiers(toggleOpen, ['prevent'])}
          >
            {props.title}
          </button>
          <ul
            class="dropdown-menu"
            aria-labelledby="dropdownMenuButton"
            style={{ width: '100%', display: 'block' }}
            // 下面也可以写作
            // v-show={isOpen.value}
            // 但是不能写作isOpen 这和SFC的写法还是有区别的
            v-show={isOpenValue}
          >
            {slots.default && slots.default()}
          </ul>
        </div>
      )
    }
  }
})
