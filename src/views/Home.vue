<template>
  <global-header :user="user"></global-header>
  <div class="container">
    <router-view></router-view>
  </div>
  <global-footer></global-footer>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { UserProps } from '@/types/global-header'
import GlobalHeader from '@/components/GlobalHeader.vue'
import GlobalFooter from '@/components/GlobalFooter.vue'
import { useStore } from 'vuex'
import { GlobalDataProps } from '@/store'

export default defineComponent({
  name: 'Home',
  components: { GlobalHeader, GlobalFooter },
  setup() {
    const store = useStore<GlobalDataProps>()
    const user = computed(() => store.state.user)
    return {
      user
    }
  }
})
</script>

<style lang="scss" scoped>
.container {
  flex-grow: 1;
}
</style>
