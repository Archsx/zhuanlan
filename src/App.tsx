import { defineComponent } from '@vue/runtime-core'
export default defineComponent({
  setup() {
    return () => {
      return <router-view></router-view>
    }
  }
})
