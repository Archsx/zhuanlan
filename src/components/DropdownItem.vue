<template>
  <li class="dropdown-option" :class="{ 'is-disabled': disabled }">
    <slot></slot>
  </li>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'DropdownItem',
  components: {},
  props: {
    disabled: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    return {}
  }
})
</script>

<style lang="scss" scoped>
.dropdown-option.is-disabled {
  color: #6c757d;
  pointer-events: none;
  background-color: transparent;
}
</style>
