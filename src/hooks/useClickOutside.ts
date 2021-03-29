import { Ref, ref } from '@vue/reactivity'
import { onMounted, onUnmounted } from '@vue/runtime-core'

// 这个功能相对简单 但是确实第一个hooks函数
// 这里面的小知识点很重要

// 1 这个函数的功能是什么？ 返回一个Ref<Boolean>类型的值来表示是否点击到某个元素的外面
// 那么如何知道到底要判断哪个dom元素呢？
// 当然是使用这个函数的时候把对应的值传过来啊 注意我们在这里定义的elementRef的类型
// 我们在dropdown这个组件里面获取dom元素的时候 也是采用ref的形式
// 那么参数的类型就应该是这个类型
const useClickOutside = (elementRef: Ref<null | HTMLElement>): Ref<boolean> => {
  const isClickOutside = ref(false)
  const handler = (e: MouseEvent) => {
    if (elementRef.value) {
      if (elementRef.value.contains(e.target as HTMLElement)) {
        isClickOutside.value = false
      } else {
        isClickOutside.value = true
      }
    }
  }
  onMounted(() => {
    document.body.addEventListener('click', handler)
  })

  onUnmounted(() => {
    document.body.removeEventListener('click', handler)
  })

  // vue3里面 我觉得这个很棒 ref类型的响应式对象
  // 这个是Ref<boolean>类型的 试想假如我们只能返回一个原始类型的布尔值
  // 上面的函数能改变一个原始类型的布尔值又有什么意义呢
  // 新的ref类型的值我觉得很有意思 直接从字面上体现这个值是可变的
  // 我们在Dropdown组件里面也可以通过watch的形式 来采取相应的措施

  return isClickOutside
}

export default useClickOutside
