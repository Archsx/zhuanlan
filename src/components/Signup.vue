<template>
  <div class="signinFormWrapper">
    <validate-form @form-submit="handleFormSubmit">
      <div class="mb-2">
        <label class="form-label">邮箱</label>
        <validate-input
          type="text"
          placeholder="请输入邮箱"
          v-model="email"
          :rules="emailRule"
        ></validate-input>
      </div>
      <div class="mb-2">
        <label class="form-label">昵称</label>
        <validate-input
          type="text"
          placeholder="请输入昵称"
          v-model="nickName"
          :rules="nickNameRule"
        ></validate-input>
      </div>
      <div class="mb-2">
        <label class="form-label">密码</label>
        <validate-input
          :rules="passwordRule"
          v-model="password"
          placeholder="请输入密码"
          type="password"
        ></validate-input>
      </div>
      <div class="mb-2">
        <label class="form-label">确认密码</label>
        <validate-input
          :rules="passwordCheckRule"
          v-model="passwordCheck"
          placeholder="请再次输入密码"
          type="password"
        ></validate-input>
      </div>
      <template v-slot:submit>
        <span class="btn btn-primary submit-btn">提交</span>
      </template>
    </validate-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import ValidateForm from '@/components/ValidateForm.vue'
import ValidateInput from '@/components/ValidateInput.vue'
import { RuleProps } from '@/utils/validate'

export default defineComponent({
  name: 'signup',
  components: { ValidateForm, ValidateInput },
  setup(props) {
    const email = ref('')
    const emailRule: RuleProps = [
      {
        type: 'required',
        message: '邮箱地址不能为空'
      },
      {
        type: 'email',
        message: '请输入正确格式的邮箱'
      }
    ]
    const nickName = ref('')
    const password = ref('')
    const passwordCheck = ref('')
    const nickNameRule: RuleProps = [
      {
        type: 'required',
        message: '昵称不能为空'
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
    const passwordCheckRule: RuleProps = [
      {
        type: 'custom',
        message: '两次密码不一致',
        custom: () => {
          return password.value === passwordCheck.value
        }
      }
    ]
    const handleFormSubmit = (result: boolean) => {
      if (result) {
        const payload = {
          email: email.value,
          nickName: nickName.value,
          password: password.value
        }
      }
    }

    return {
      email,
      emailRule,
      password,
      passwordCheck,
      passwordRule,
      passwordCheckRule,
      nickName,
      nickNameRule,
      handleFormSubmit
    }
  }
})
</script>

<style lang="scss" scoped>
.submit-btn {
  width: 100%;
  height: 36px;
  font-size: 14px;
  line-height: 36px;
  padding: 0;
}
</style>
