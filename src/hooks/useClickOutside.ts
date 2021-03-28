import { Ref, ref } from '@vue/reactivity'
import { onMounted, onUnmounted } from '@vue/runtime-core'

const useClickOutside = (elementRef: Ref<null | HTMLElement>) => {
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
  return isClickOutside
}

export default useClickOutside
