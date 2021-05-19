import { VNode } from '@vue/runtime-core'

export interface IModalProps {
  show?: boolean
  confirmText?: string
  concelText?: string
  onConfirm?: (...args: any[]) => any
  onCancel?: (...args: any[]) => any
  header?: string | VNode
  content?: string | VNode
}
