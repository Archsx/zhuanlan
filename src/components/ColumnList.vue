<template>
  <div class="row">
    <div v-for="column in columnList" :key="column._id" class="col-4 mb-3">
      <div class="card h-100 shadow-sm">
        <div class="card-body text-center">
          <img
            :src="column.avatar && column.avatar.url"
            class="rounded-circle border border-light my-3"
            alt=""
            style="width:50px;height:50px"
          />
          <h5 class="card-title">{{ column.title }}</h5>
          <p class="card-text text-start">
            {{ column.description }}
          </p>
          <router-link
            :to="`/columnDetail/${column._id}`"
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
          item.avatar = {
            url: require('@/assets/column.jpg')
          }
        } else {
          item.avatar.url =
            item.avatar.url + '?x-oss-process=image/resize,m_pad,h_50,w_50'
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
