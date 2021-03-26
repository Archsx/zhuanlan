<template>
  <nav class="navbar navbar-light bg-light d-flex justify-content-between p-3">
    <div>
      <span class="navbar-brand mb-0 h1">专栏</span>
    </div>
    <div>
      <div v-if="user.isLogin">你好 {{ user.name }}</div>
      <div v-else>
        <button class="btn btn-primary me-3" type="submit">注册</button>
        <button type="button" class="btn btn-outline-primary">登录</button>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { UserProps } from '@/types/global-header'
export default defineComponent({
  name: 'GlobalHeader',
  components: {},
  props: {
    user: {
      type: Object as PropType<UserProps>,
      required: true
    }
  },
  setup(props) {
    return {}
  }
})
</script>

<style lang="" scoped></style>
