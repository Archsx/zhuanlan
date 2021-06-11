import { IModalProps } from '@/types/modal-props'
import {
  createApp,
  createVNode,
  mergeProps,
  nextTick,
  ref,
  render,
  Transition
} from '@vue/runtime-dom'
// import Modal from '@/components/Modal'
import Modal from '@/components/Modal.vue'
import { AnyFunction } from '@/types/custom-type'

export const createModal = (config: IModalProps) => {
  // const modalApp = createApp(Modal, {
  //   ...config
  // })
  // const div = document.createElement('div')
  // document.body.append(div)
  // modalApp._props!.onDestroy = () => {
  //   modalApp.unmount()
  //   document.body.removeChild(div)
  // }
  // const modalVm = modalApp.mount(div)

  const container = document.createElement('div')
  const vnode = createVNode(Modal, {
    ...config,
    onDestroy: () => {
      render(null, container)
    }
  })
  render(vnode, container)
  document.body.appendChild(container.firstElementChild!)
}

function createPromise(handler?: AnyFunction) {
  let resolveFn, rejectFn
  const promise = new Promise((resolve, reject) => {
    resolveFn = resolve
    rejectFn = resolve
    if (handler) {
      handler(resolve, reject)
    }
  })
  return {
    promise,
    resolveFn,
    rejectFn
  }
  // ;(promise as any).resolve = resolve
  // ;(promise as any).reject = reject
  // return promise
}

export const createTransModal = (config: IModalProps) => {
  // let { promise, resolveFn, rejectFn } = createPromise()
  const result = ref()
  const { onCancel: propsOnCancel, onConfirm: propsOnConfirm } = config
  const container = document.createElement('div')
  const vnode = createVNode(
    Transition,
    {
      name: 'modal-fade',
      appear: true
    },
    {
      default: () => {
        const vn = createVNode(Modal, {
          ...config,
          onDestroy: () => {
            // vn.component!.props.show = false
            // vn.props!.show = false
            nextTick(() => {
              render(null, container)
            })
          },
          onConfirm: () => {
            propsOnConfirm && propsOnConfirm()
            result.value = true
            console.log(result)
            // ;(resolveFn as any)(true)
          },
          onCancel: () => {
            propsOnCancel && propsOnCancel()
            result.value = false
            // ;(rejectFn as any)(false)
          }
        })
        return vn
      }
    }
  )
  render(vnode, container)
  document.body.appendChild(container.firstElementChild!)
  // return promise
  return result
}
