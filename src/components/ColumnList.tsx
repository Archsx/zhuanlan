import { ColumnProps } from '@/types/column-list'
import { computed, defineComponent, PropType } from '@vue/runtime-core'

export default defineComponent({
  props: {
    list: {
      type: Array as PropType<Array<ColumnProps>>,
      required: true
    }
  },
  setup(props) {
    const columnList = computed(() => {
      return props.list.map(item => {
        if (!item.avatar) {
          item.avatar = require('@/assets/column.jpg')
        }
        return item
      })
    })
    return () => {
      return (
        <div class="row">
          {columnList.value.map(item => {
            return (
              <div class="col-4 mb-3">
                <div class="card h-100 shadow-sm">
                  <div class="card-body text-center">
                    <img
                      src={item.avatar}
                      class="rounded-circle border border-light my-3"
                      alt=""
                      style="width:5rem;height:5rem"
                    />
                    <h5 class="card-title">{item.title}</h5>
                    <p class="card-text text-start">{item.description}</p>
                    <a href="#" class="btn btn-outline-primary">
                      进入专栏
                    </a>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )
    }
  }
})
