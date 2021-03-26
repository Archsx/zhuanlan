<template>
  <div class="container">
    <column-list :list="testData"></column-list>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import ColumnList from './components/ColumnList.vue'
import { ColumnProps } from './types/column-list'
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
    description: '这是test3专栏的简介',
    avatar: 'https://i.loli.net/2021/03/25/OxNmBTtkbHYyG3o.jpg'
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
  name: '',
  components: { ColumnList },
  setup() {
    return {
      testData
    }
  }
})
</script>

<style lang="" scoped></style>
