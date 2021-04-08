import { ColumnProps } from './types/column-list'

export const testData: Array<ColumnProps> = [
  {
    id: 1,
    title: 'test1专栏',
    description: '这是test1专栏的简介',
    avatar: 'https://i.loli.net/2021/03/25/OxNmBTtkbHYyG3o.jpg'
  },
  {
    id: 2,
    title: 'test2专栏',
    description: '这是test2专栏的简介',
    avatar: 'https://i.loli.net/2021/03/25/OxNmBTtkbHYyG3o.jpg'
  },
  {
    id: 3,
    title: 'test3专栏',
    description: '这是test3专栏的简介'
    // avatar: 'https://i.loli.net/2021/03/25/OxNmBTtkbHYyG3o.jpg'
  },
  {
    id: 4,
    title: 'test4专栏',
    description: '这是test4专栏的简介',
    avatar: 'https://i.loli.net/2021/03/25/OxNmBTtkbHYyG3o.jpg'
  },
  {
    id: 5,
    title: 'test5专栏',
    description: '这是test5专栏的简介',
    avatar: 'https://i.loli.net/2021/03/25/OxNmBTtkbHYyG3o.jpg'
  },
  {
    id: 6,
    title: 'test6专栏',
    description: '这是test6专栏的简介',
    avatar: 'https://i.loli.net/2021/03/25/OxNmBTtkbHYyG3o.jpg'
  }
]
export interface PostProps {
  id: number
  title: string
  content: string
  image?: string
  createdAt: string
  columnId: number
}

export const testPosts: PostProps[] = [
  {
    id: 1,
    title: '这是我的第一篇文章',
    content:
      '"this is a new post you Very often we will need to map routes with the given pattern to the same component. For example we may have a User component which should be rendered for all users but with dif..."',
    image:
      'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee1980819f4ae08ac78d458.png?x-oss-process=image/resize,m_fill,m_pad,w_200,h_110',
    createdAt: '2020-06-11 10:34:22',
    columnId: 1
  },
  {
    id: 2,
    title: '这是我的第二篇文章',
    content:
      '"this is a new post you Very often we will need to map routes with the given pattern to the same component. For example we may have a User component which should be rendered for all users but with dif..."',
    createdAt: '2020-06-11 10:34:22',
    columnId: 1
  },
  {
    id: 3,
    title: '这是我的第三篇文章',
    content:
      '"this is a new post you Very often we will need to map routes with the given pattern to the same component. For example we may have a User component which should be rendered for all users but with dif..."',
    image:
      'https://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5edcc2329f2b4e28352b75eb.jpg?x-oss-process=image/resize,m_fill,m_pad,w_200,h_110',
    createdAt: '2020-06-11 10:34:22',
    columnId: 1
  }
]