<template>
  <global-header :user="testUser"></global-header>
  <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import GlobalHeader from './components/GlobalHeader.vue'
import { UserProps } from './types/global-header'
export default defineComponent({
  name: '',
  components: { GlobalHeader },
  setup() {
    const testUser: UserProps = {
      isLogin: false
    }
    return {
      testUser
    }
  }
})
</script>

<style lang="" scoped></style>
