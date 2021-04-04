<template>
  <global-header :user="testUser"></global-header>
  <div class="container">
    <router-view></router-view>
  </div>
  <global-footer></global-footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { UserProps } from '@/types/global-header'
import GlobalHeader from '@/components/GlobalHeader.vue'
import GlobalFooter from '@/components/GlobalFooter.vue'

export default defineComponent({
  name: 'Home',
  components: { GlobalHeader, GlobalFooter },
  setup() {
    const testUser: UserProps = {
      isLogin: true,
      name: 'zoidberg'
    }
    return {
      testUser
    }
  }
})
</script>

<style lang="scss" scoped>
.container {
  flex-grow: 1;
}
</style>
