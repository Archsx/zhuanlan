import { UserProps } from './global-header'
import { ImageProps } from './column-list'

export interface IPostDetail {
  _id: string
  title: string
  content: string
  author: UserProps
  column: string
  image: ImageProps
  updatedAt: string
  isHTML: boolean
  createdAt: string
}
