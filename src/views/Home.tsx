import { defineComponent } from '@vue/runtime-core'
import GlobalHeader from '@/components/GlobalHeader'
import { UserProps } from '@/types/global-header'
export default defineComponent({
  setup() {
    const testUser: UserProps = {
      isLogin: true,
      name: 'zoidberg'
    }
    return () => {
      return (
        <>
          <GlobalHeader user={testUser}></GlobalHeader>
          <div class="container">
            <router-view></router-view>
          </div>
        </>
      )
    }
  }
})
