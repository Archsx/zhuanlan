<template>
  <nav class="navbar navbar-light bg-light d-flex justify-content-between p-3">
    <div>
      <span class="navbar-brand mb-0 h1">专栏</span>
    </div>
    <div>
      <div v-if="user.isLogin" style="position:relative;width:10rem">
        <!-- <button
          type="button"
          class="btn btn-primary dropdown-toggle text-truncate"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          @click="toggle"
          style="width:100%"
        >
          你好 {{ user.name }}
        </button>
        <ul
          :class="['dropdown-menu', spread ? 'show' : '']"
          aria-labelledby="dropdownMenuLink"
          style="width:100%"
        >
          <li><a class="dropdown-item" href="#">Action</a></li>
          <li><a class="dropdown-item" href="#">Another action</a></li>
          <li>
            <a class="dropdown-item text-truncate" href="#"
              >Something else here</a
            >
          </li>
        </ul> -->
        <Dropdown :title="`你好 ${user.name}`">
          <dropdown-item>
            <a class="dropdown-item text-truncate" href="#">Action</a>
          </dropdown-item>
          <dropdown-item>
            <a class="dropdown-item text-truncate" href="#">Another Action</a>
          </dropdown-item>
          <dropdown-item disabled>
            <a class="dropdown-item text-truncate" href="#"
              >Something else here</a
            >
          </dropdown-item>
        </Dropdown>
      </div>
      <div v-else>
        <button class="btn btn-primary me-3" type="submit">注册</button>
        <button type="button" class="btn btn-outline-primary">登录</button>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
import { UserProps } from '@/types/global-header'
import Dropdown from './Dropdown.vue'
import DropdownItem from './DropdownItem.vue'
export default defineComponent({
  name: 'GlobalHeader',
  components: { Dropdown, DropdownItem },
  props: {
    user: {
      type: Object as PropType<UserProps>,
      required: true
    }
  },
  setup(props) {
    // const spread = ref(false)
    // const toggle = () => {
    //   spread.value = !spread.value
    // }
    return {
      // spread,
      // toggle
    }
  }
})
</script>

<style lang="scss">
// .show {
//   display: block !important;
// }
</style>
