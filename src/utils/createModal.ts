import { IModalProps } from '@/types/modal-props'
import { createApp, createVNode, render } from '@vue/runtime-dom'
// import Modal from '@/components/Modal'
import Modal from '@/components/Modal.vue'

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
