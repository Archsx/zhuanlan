<template>
  <section class="py-5 text-center container">
    <div class="row py-lg-5">
      <div class="col-lg-6 col-md-8 mx-auto">
        <img src="../assets/callout.svg" alt="" class="w-50" />
        <h2 class="font-weight-light">随心写作，自由表达</h2>
        <p>
          <a href="" class="btn btn-primary my-2">开始写文章</a>
        </p>
      </div>
    </div>
  </section>
  <h4 class="font-weight-bold text-center">发现精彩</h4>
  <column-list :list="list"></column-list>
  <div class="text-center mt-2 mb-5 ">
    <button class="btn btn-outline-primary  btn-block w-50">
      加载更多
    </button>
  </div>
</template>

<script lang="ts">
// 这个组件纯粹是当时对路由结构考虑不周的产物
// 之前只考虑了所有的页面都有header组件 所以把它放在了App.vue里面
// 但是后来考虑到signin这个页面应该是没有header组件的 所以改写了路由的结构
// 另外, 假如ColumnList组件的数据可以自己去发送请求来获取的话 我觉得这个组件没有存在的意义
import { GlobalDataProps } from '@/store'
import { useStore } from 'vuex'
import { computed, defineComponent } from 'vue'
import ColumnList from './ColumnList.vue'

export default defineComponent({
  name: 'Columns',
  components: {
    ColumnList
  },
  setup(props) {
    const store = useStore<GlobalDataProps>()
    // 注意这里用computed来获取vuex里面的数据
    const list = computed(() => {
      return store.state.columns
    })
    return {
      list
    }
  }
})
</script>

<style lang="" scoped></style>
