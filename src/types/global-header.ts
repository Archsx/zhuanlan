import { ImageProps } from './column-list'

export interface UserProps {
  isLogin: boolean
  nickName?: string
  _id?: string
  column?: string
  email?: string
  avatar?: ImageProps
  description?:string
}
