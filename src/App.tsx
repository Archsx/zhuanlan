import { defineComponent } from '@vue/runtime-core'
import GlobalHeader from '@/components/GloabalHeader'
import { UserProps } from './types/global-header'
export default defineComponent({
  setup() {
    const testUser: UserProps = {
      isLogin: true,
      name: 'Archer'
    }
    return () => {
      return (
        <>
          <GlobalHeader user={testUser}></GlobalHeader>
          <router-view></router-view>
        </>
      )
    }
  }
})
