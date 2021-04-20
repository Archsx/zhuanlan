export interface ColumnProps {
  _id: string
  title: string
  avatar?: ImageProps
  description: string
}

export interface ImageProps {
  _id?: string
  url?: string
  createdAt?: string
}
