<template>
  <div class="dropdown" style="position:relative;width:10rem">
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
      v-show="isOpen"
      style="width:100%"
    >
      <li><a class="dropdown-item" href="#">Action</a></li>
      <li><a class="dropdown-item" href="#">Another action</a></li>
      <li><a class="dropdown-item text-truncate" href="#">Something else here</a></li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

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
    const isOpen = ref(false)
    const toggleOpen = () => {
      isOpen.value = !isOpen.value
    }
    return {
      isOpen,
      toggleOpen
    }
  }
})
</script>

<style lang="" scoped></style>
