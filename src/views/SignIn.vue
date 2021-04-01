<template>
  <div class="signPage">
    <div class="signContent">
      <div class="signFormWrapper">
        {{ password }}
        {{ email }}
        <form>
          <div class="mb-2">
            <label for="exampleInputEmail" class="form-label">邮箱地址</label>
            <validate-input :rules="emailRule" v-model="email"></validate-input>
          </div>
          <div class="mb-2">
            <label for="exampleInputPassword" class="form-label">密码</label>
            <validate-input
              :rules="passwordRule"
              v-model="password"
              type="password"
            ></validate-input>
          </div>
          <!-- <div class="mb-3 form-check">
            <input
              type="checkbox"
              class="form-check-input"
              id="exampleCheck1"
            />
            <label class="form-check-label" for="exampleCheck1"
              >Check me out</label
            >
          </div> -->
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
import { defineComponent, reactive, ref } from 'vue'
import ValidateInput from '@/components/ValidateInput.vue'
import { RuleProps } from '@/utils/validate'
export default defineComponent({
  name: 'SignIn',
  components: {
    ValidateInput
  },
  setup(props) {
    const emailRule: RuleProps = [
      {
        type: 'required',
        message: '邮箱地址不能为空'
      },
      {
        type: 'email',
        message: '请输入合法的邮箱地址'
      }
    ]
    const passwordRule: RuleProps = [
      {
        type: 'required',
        message: '密码不能为空'
      },
      {
        type: 'password',
        message: '请输入长度至少为8位并且包含数字和字母的密码'
      }
    ]
    const email = ref('')
    const password = ref('')
    return {
      emailRule,
      passwordRule,
      email,
      password
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
