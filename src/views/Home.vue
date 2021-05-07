<template>
  <global-header :user="user"></global-header>
  <div class="container">
    <Loader v-if="isLoading" text="拼命加载中" background="rgba(0,0,0,.8)" />
    <router-view></router-view>
  </div>
  <global-footer></global-footer>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from 'vue'
import GlobalHeader from '@/components/GlobalHeader.vue'
import GlobalFooter from '@/components/GlobalFooter.vue'
import Loader from '@/components/Loader.vue'
import { useStore } from 'vuex'
import { GlobalDataProps } from '@/store'
import axios from 'axios'

export default defineComponent({
  name: 'Home',
  components: { GlobalHeader, GlobalFooter, Loader },
  setup() {
    const store = useStore<GlobalDataProps>()
    const user = computed(() => store.state.user)
    const isLoading = computed(() => store.state.loading)
    const error = computed(() => store.state.error)

    // 以下部分代码逻辑已经在router的beforeEach部分进行了处理，故注释
    // const token = computed(() => store.state.token)
    // onMounted(() => {
    //   // 说明用户登录过
    //   if (!user.value.isLogin && token.value) {
    //     // 此时根据token去获取用户的信息
    //     // 假如token过期，那么在localStorage里面清除相应的存储
    //     axios.defaults.headers.common.Authorization = `Bearer ${token.value}`
    //     store.dispatch('fetchCurrentUser')
    //   }
    // })
    return {
      user,
      isLoading,
      error
    }
  }
})
</script>

<style lang="scss" scoped>
.container {
  flex-grow: 1;
}
</style>
