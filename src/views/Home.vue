<template>
  <global-header :user="testUser"></global-header>
  <div class="container">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { UserProps } from '@/types/global-header'
import GlobalHeader from '@/components/GlobalHeader.vue'

export default defineComponent({
  name: 'Home',
  components: { GlobalHeader },
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

<style lang="" scoped></style>
