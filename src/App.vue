<template>
  <div class="wrapper">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { useStore } from 'vuex'
import { computed, defineComponent, watch } from 'vue'
import { GlobalDataProps } from './store'
import { createMessage } from './utils/createMessage'
export default defineComponent({
  name: '',
  components: {},
  setup() {
    const store = useStore<GlobalDataProps>()
    const error = computed(() => {
      return store.state.error
    })
    watch(
      () => error.value,
      newVal => {
        if (newVal) {
          createMessage(error.value.message!, 'error')
        }
      }
    )
    return {}
  }
})
</script>

<style lang="scss">
.btn {
  box-shadow: none !important;
}
.form-control:focus {
  box-shadow: none !important;
}
.wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
