<template>
  <div class="dropdown" style="position:relative;width:10rem" ref="dropdownRef">
    <button
      class="btn btn-primary dropdown-toggle"
      type="button"
      id="dropdownMenuButton1"
      data-bs-toggle="dropdown"
      aria-expanded="false"
      @click.prevent="toggleOpen"
      style="width:10rem"
    >
      {{ title }}
    </button>
    <ul
      class="dropdown-menu"
      aria-labelledby="dropdownMenuButton"
      :style="{ display: 'block' }"
      v-if="isOpen"
      style="width:100%"
    >
      <slot></slot>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, ref } from 'vue'

export default defineComponent({
  name: 'Dropdown',
  components: {},
  props: {
    title: {
      type: String,
      required: true
    }
  },
  setup(props) {
    // 一开始dropdownRef的value为null,但是在dom真正挂载上去之后 dropdownRef的value就变成了dom元素
    // 所以这里采用了联合类型
    const dropdownRef = ref<null | HTMLElement>(null)
    const isOpen = ref(false)
    const toggleOpen = () => {
      isOpen.value = !isOpen.value
    }
    const handler = (e: MouseEvent) => {
      // 这里是TS的类型保护
      if (dropdownRef.value) {
        // console.log(dropdownRef.value)
        if (
          !dropdownRef.value.contains(e.target as HTMLElement) &&
          isOpen.value
        ) {
          isOpen.value = false
        }
      }
    }
    onMounted(() => {
      document.addEventListener('click', handler)
    })
    onUnmounted(() => {
      document.removeEventListener('click', handler)
    })
    return {
      isOpen,
      toggleOpen,
      dropdownRef
    }
  }
})
</script>

<style lang="" scoped></style>
