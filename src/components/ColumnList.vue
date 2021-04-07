<template>
  <div class="row">
    <div v-for="column in columnList" :key="column.id" class="col-4 mb-3">
      <div class="card h-100 shadow-sm">
        <div class="card-body text-center">
          <img
            :src="column.avatar"
            class="rounded-circle border border-light my-3"
            alt=""
            style="width:5rem;height:5rem"
          />
          <h5 class="card-title">{{ column.title }}</h5>
          <p class="card-text text-start">
            {{ column.description }}
          </p>
          <router-link
            :to="`/columnDetail/${column.id}`"
            class="btn btn-outline-primary"
            >进入专栏</router-link
          >
          <!-- 也可以使用下面的写法 -->
          <!-- <router-link
            :to="{ name: 'ColumnDetail', params: { id: column.id } }"
            class="btn btn-outline-primary"
            >进入专栏</router-link
          > -->
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import { ColumnProps } from '../types/column-list'
export default defineComponent({
  name: 'ColumnList',
  components: {},
  props: {
    list: {
      type: Array as PropType<Array<ColumnProps>>,
      required: true
    }
  },
  setup(props) {
    // 注意这里使用computed对于props数据的处理
    const columnList = computed(() => {
      return props.list.map(item => {
        if (!item.avatar) {
          // 注意这里使用require对本地资源进行使用
          item.avatar = require('@/assets/column.jpg')
        }
        return item
      })
    })
    return {
      columnList
    }
  }
})
</script>

<style lang="" scoped></style>
