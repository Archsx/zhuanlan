<template>
  <div class="signPage">
    <div class="signContent">
      <div class="signFormWrapper">
        <div class="tabs">
          <span
            v-for="(tab, index) in tabs"
            :key="index"
            :class="{ active: tab.name === activeTabName }"
            @click="changeActiveTab(tab.name)"
            class="tab"
          >
            {{ tab.des }}
          </span>
        </div>
        <component :is="activeTabName" class="custom-form"></component>
      </div>
    </div>
    <div class="signFooter">
      <div class="links"></div>
      <div class="rights"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from '@vue/runtime-core'
import Login from '@/components/Login.vue'
import Signup from '@/components/Signup.vue'

export default defineComponent({
  name: 'signin',
  components: {
    Login,
    Signup
  },
  setup() {
    const tabs = [
      {
        name: 'login',
        des: '登录',
        idx: 0
      },
      {
        name: 'signup',
        des: '注册',
        idx: 1
      }
    ]
    const activeTabName = ref('login')
    const changeActiveTab = (name: string) => {
      activeTabName.value = name
    }
    return {
      tabs,
      activeTabName,
      changeActiveTab
    }
  }
})
</script>

<style lang="scss" scoped>
.signPage {
  display: flex;
  flex-direction: column;
  background: url('../assets/sign_bg.png');
  width: 100%;
  height: 100vh;
  background-size: cover;
  overflow: hidden;
  .signContent {
    // flex-flow: 1;
    height: calc(100% - 42px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .signFormWrapper {
      width: 400px;
      background-color: #fff;
      border-radius: 2px;
      overflow: hidden;
      padding: 24px;
      .custom-form {
        font-size: 14px;
      }
      .tabs {
        margin-bottom: 24px;
        .tab {
          font-size: 16px;
          display: inline-block;
          line-height: 60px;
          height: 60px;
          margin-right: 24px;
          cursor: pointer;
          position: relative;
          &.active {
            font-weight: 600;
            color: #121212;
            &:after {
              display: block;
              position: absolute;
              bottom: 0;
              content: '';
              width: 100%;
              height: 3px;
              background: #06f;
            }
          }
        }
      }
    }
  }
  .signFooter {
    padding-bottom: 20px;
    font-size: 12px;
    line-height: 20px;
    color: #fff;
  }
}
</style>
