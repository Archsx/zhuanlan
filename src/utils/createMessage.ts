import Message from '@/components/Message.vue'
import { IMessageType } from '@/types/message-type'
import { createApp } from '@vue/runtime-dom'

export const createMessage = (
  message: string,
  type: IMessageType,
  timeout = 2000
) => {
  const messageInstance = createApp(Message, {
    type,
    message
  })
  const div = document.createElement('div')
  document.body.appendChild(div)
  messageInstance.mount(div)
  setTimeout(() => {
    messageInstance.unmount()
    document.body.removeChild(div)
  }, timeout)
}
