<template>
  <column-list :list="testData"></column-list>
</template>

<script lang="ts">
// 这个组件纯粹是当时对路由结构考虑不周的产物
// 之前只考虑了所有的页面都有header组件 所以把它放在了App.vue里面
// 但是后来考虑到signin这个页面应该是没有header组件的 所以改写了路由的结构
// 另外, 假如ColumnList组件的数据可以自己去发送请求来获取的话 我觉得这个组件没有存在的意义
import { ColumnProps } from '@/types/column-list'
import { defineComponent } from 'vue'
import ColumnList from './ColumnList.vue'

const testData: Array<ColumnProps> = [
  {
    id: 1,
    title: 'test1专栏',
    description: '这是test1专栏的简介',
    avatar: 'https://i.loli.net/2021/03/25/OxNmBTtkbHYyG3o.jpg'
  },
  {
    id: 2,
    title: 'test2专栏',
    description: '这是test2专栏的简介',
    avatar: 'https://i.loli.net/2021/03/25/OxNmBTtkbHYyG3o.jpg'
  },
  {
    id: 3,
    title: 'test3专栏',
    description: '这是test3专栏的简介'
    // avatar: 'https://i.loli.net/2021/03/25/OxNmBTtkbHYyG3o.jpg'
  },
  {
    id: 4,
    title: 'test4专栏',
    description: '这是test4专栏的简介',
    avatar: 'https://i.loli.net/2021/03/25/OxNmBTtkbHYyG3o.jpg'
  },
  {
    id: 5,
    title: 'test5专栏',
    description: '这是test5专栏的简介',
    avatar: 'https://i.loli.net/2021/03/25/OxNmBTtkbHYyG3o.jpg'
  },
  {
    id: 6,
    title: 'test6专栏',
    description: '这是test6专栏的简介',
    avatar: 'https://i.loli.net/2021/03/25/OxNmBTtkbHYyG3o.jpg'
  }
]
export default defineComponent({
  name: 'Columns',
  components: {
    ColumnList
  },
  setup(props) {
    return {
      testData
    }
  }
})
</script>

<style lang="" scoped></style>
