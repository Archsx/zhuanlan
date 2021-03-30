<template>
  <div class="signPage">
    <div class="signContent">
      <div class="signFormWrapper">
        <form>
          <div class="mb-3">
            <label for="exampleInputEmail" class="form-label">邮箱地址</label>
            <input
              type="email"
              class="form-control"
              id="exampleInputEmail"
              aria-describedby="emailHelp"
              v-model="emailRef.val"
              @blur="validateEmail"
            />
            <div id="emailError" v-if="emailRef.error" class="form-text">
              {{ emailRef.message }}
            </div>
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword" class="form-label">密码</label>
            <input
              type="password"
              class="form-control"
              id="exampleInputPassword"
            />
          </div>
          <div class="mb-3 form-check">
            <input
              type="checkbox"
              class="form-check-input"
              id="exampleCheck1"
            />
            <label class="form-check-label" for="exampleCheck1"
              >Check me out</label
            >
          </div>
          <button type="submit" class="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
    <div class="signFooter">
      <div class="links"></div>
      <div class="rights"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { isValidEmail } from '@/utils/validate'
import { defineComponent, reactive } from 'vue'

export default defineComponent({
  name: 'SignIn',
  components: {},
  setup(props) {
    const emailRef = reactive({
      val: '',
      error: false,
      message: ''
    })
    const validateEmail = () => {
      if (!emailRef.val.trim()) {
        emailRef.error = true
        emailRef.message = '邮箱不能为空'
        return
      }
      if (!isValidEmail(emailRef.val)) {
        emailRef.error = true
        emailRef.message = '请输入合法的邮箱地址'
      }
    }
    return {
      emailRef,
      validateEmail
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
