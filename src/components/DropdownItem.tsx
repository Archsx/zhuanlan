import { defineComponent } from '@vue/runtime-core'

export default defineComponent({
  props: {
    disabled: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { slots }) {
    return () => {
      return (
        <li class={{ 'is-disabled': props.disabled }}>{slots.default!()}</li>
      )
    }
  }
})

// 一下是css内容 暂时没找到合适解决办法
// .dropdown-option.is-disabled {
//   color: #6c757d;
//   pointer-events: none;
//   background-color: transparent;
// }