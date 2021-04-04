import { ColumnProps } from '@/types/column-list'
import { defineComponent } from '@vue/runtime-core'

import ColumnList from './ColumnList'
export default defineComponent({
  setup() {
    const testData: Array<ColumnProps> = [
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
    return () => {
      return <ColumnList list={testData}></ColumnList>
    }
  }
})
