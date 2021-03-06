<template>
  <validate-form @form-submit="onFormSubmit">
    <div class="mb-2">
      <label for="exampleInputEmail" class="form-label">邮箱地址</label>
      <validate-input
        type="text"
        placeholder="请输入邮箱地址"
        :rules="emailRule"
        v-model="email"
      ></validate-input>
    </div>
    <div class="mb-2">
      <label for="exampleInputPassword" class="form-label">密码</label>
      <validate-input
        :rules="passwordRule"
        v-model="password"
        placeholder="请输入密码"
        type="password"
      ></validate-input>
    </div>
    <template v-slot:submit>
      <span class="btn btn-primary submit-btn">提交</span>
    </template>
  </validate-form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import ValidateInput from '@/components/ValidateInput.vue'
import ValidateForm from '@/components/ValidateForm.vue'
import { RuleProps } from '@/utils/validate'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { GlobalDataProps } from '@/store'
import { createMessage } from '@/utils/createMessage'

export default defineComponent({
  name: 'login',
  components: {
    ValidateInput,
    ValidateForm
  },
  setup() {
    const router = useRouter()
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
    const store = useStore<GlobalDataProps>()
    // 可以使用ref的形式获取组件实例
    // const inputRef = ref<any>()
    // console.log(inputRef.value)
    // console.log(inputRef.value.validateInput())
    const onFormSubmit = (result: boolean) => {
      if (result) {
        // 使用store.commit来调用mutations里面的方法
        // 需要注意的是 只有state里面的数据有代码提示
        // 而这些comit的事件名是没有提示的
        // 不知道哪个版本的vuex能添加支持
        const payload = {
          email: email.value,
          password: password.value
        }
        // 注意 下面的这个例子演示了如何在组件中使用某个action的结果
        // 而相应的action里面需要return结果 否则then里面就拿不到响应的数据
        store
          .dispatch('loginAndFetch', payload)
          .then(data => {
            createMessage('登录成功 2秒后跳转首页', 'success')
            setTimeout(() => {
              router.push({
                name: 'Index'
              })
            }, 2000)
          })
          .catch(err => {
            console.log(err)
          })
      }
    }
    return {
      emailRule,
      passwordRule,
      email,
      password,
      onFormSubmit
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
