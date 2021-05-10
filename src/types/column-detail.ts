import { ImageProps } from './column-list'

export interface IPostProps {
  _id: string
  title: string
  excerpt?: string
  content?: string
  image?: ImageProps | string
  createdAt: string
  column: string
  author?: string
}
