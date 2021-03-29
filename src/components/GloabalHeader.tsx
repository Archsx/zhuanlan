import { defineComponent, PropType } from 'vue'
import Dropdown from './Dropdown'
import DropdownItem from './DropdownItem'

import { UserProps } from '@/types/global-header'

const userHasLogined = (userProps: UserProps) => {
  return (
    <div style="position:relative;width:10rem">
      <Dropdown title={`你好 ${userProps.name}`}>
        <DropdownItem>
          <a class="dropdown-item text-truncate" href="#">
            Action
          </a>
        </DropdownItem>
        <DropdownItem>
          <a class="dropdown-item text-truncate" href="#">
            Another Action
          </a>
        </DropdownItem>
        <DropdownItem>
          <a class="dropdown-item text-truncate" href="#">
            Something else here
          </a>
        </DropdownItem>
      </Dropdown>
    </div>
  )
}

const userNotLogin = (
  <div>
    <button class="btn btn-primary me-3" type="submit">
      注册
    </button>
    <button type="button" class="btn btn-outline-primary">
      登录
    </button>
  </div>
)

export default defineComponent({
  props: {
    user: {
      type: Object as PropType<UserProps>,
      required: true
    }
  },
  setup(props) {
    return () => {
      return (
        <nav class="navbar navbar-light bg-light d-flex justify-content-between p-3">
          <div>
            <span class="navbar-brand mb-0 h1">专栏</span>
          </div>
          <div>
            {props.user.isLogin ? userHasLogined(props.user) : userNotLogin}
          </div>
        </nav>
      )
    }
  }
})
