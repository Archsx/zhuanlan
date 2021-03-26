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
      isLogin: true,
      name: 'zoidberg'
    }
    return {
      testUser
    }
  }
})
</script>

<style lang="scss">
  .btn{
    box-shadow: none  !important;
  }

</style>
