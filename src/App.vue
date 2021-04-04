<template>
  <div class="wrapper">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: '',
  components: {},
  setup() {
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
