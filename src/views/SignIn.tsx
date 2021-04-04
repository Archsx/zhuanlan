import { defineComponent, ref } from '@vue/runtime-core'
import ValidateForm from '@/components/ValidateForm'
import ValidateInput from '@/components/ValidateInput'
import { RuleProps } from '@/utils/validate'
export default defineComponent({
  name: 'SignIn',
  setup() {
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
    // 可以使用ref的形式获取组件实例
    // const inputRef = ref<any>()
    // console.log(inputRef.value)
    // console.log(inputRef.value.validateInput())
    const handleFormSubmit = (result: boolean) => {
      console.log('111111')
      console.log(result)
    }
    return () => {
      return (
        <div class="signPage">
          <div class="signContent">
            <div class="signFormWrapper">
              <ValidateForm onFormSubmit={handleFormSubmit}>
                {{
                  default: () => (
                    <>
                      <div class="mb-2">
                        <label for="exampleInputEmail" class="form-label">
                          邮箱地址
                        </label>
                        <ValidateInput
                          placeholder="请输入邮箱地址"
                          rules={emailRule}
                          v-model={email.value}
                        ></ValidateInput>
                      </div>
                      <div class="mb-2">
                        <label for="exampleInputPassword" class="form-label">
                          密码
                        </label>
                        <ValidateInput
                          rules={passwordRule}
                          v-model={password.value}
                          placeholder="请输入密码"
                          type="password"
                        ></ValidateInput>
                      </div>
                    </>
                  ),
                  submit: () => <span class="btn btn-danger">Submit</span>
                }}
              </ValidateForm>
            </div>
          </div>
          <div class="signFooter">
            <div class="links"></div>
            <div class="rights"></div>
          </div>
        </div>
      )
    }
  }
})
