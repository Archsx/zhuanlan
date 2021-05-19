<template>
  <button @click="handleClick">Click</button>
</template>

<script lang="ts">
import { createModal } from '@/utils/createModal'
import { createVNode, defineComponent } from 'vue'

export default defineComponent({
  name: '',
  components: {},
  setup(props) {
    const handleClick = () => {
      createModal({
        show: true,
        concelText: '取消',
        confirmText: '确定',
        content: '这是内容部分',
        header: '这是头部'
        // header: createVNode('p', {}, 'this is header')
      })
    }
    return {
      handleClick
    }
  }
})
</script>

<style lang="" scoped></style>
