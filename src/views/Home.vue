<template>
  <global-header :user="user"></global-header>
  <div class="container">
    <Loader v-if="isLoading" text="拼命加载中" background="rgba(0,0,0,.8)" />
    <router-view></router-view>
  </div>
  <global-footer></global-footer>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import GlobalHeader from '@/components/GlobalHeader.vue'
import GlobalFooter from '@/components/GlobalFooter.vue'
import Loader from '@/components/Loader.vue'
import { useStore } from 'vuex'
import { GlobalDataProps } from '@/store'

export default defineComponent({
  name: 'Home',
  components: { GlobalHeader, GlobalFooter, Loader },
  setup() {
    const store = useStore<GlobalDataProps>()
    const user = computed(() => store.state.user)
    const isLoading = computed(() => store.state.loading)
    return {
      user,
      isLoading
    }
  }
})
</script>

<style lang="scss" scoped>
.container {
  flex-grow: 1;
}
</style>
