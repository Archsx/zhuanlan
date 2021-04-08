<template>
  <div class="create-post-page">
    <h4>新建文章</h4>
    <validate-form @form-submit="onFormSubmit">
      <div class="mb-3">
        <label for="" class="form-label">文章标题: </label>
        <validate-input
          :rules="titleRules"
          v-model="titleVal"
          placeholder="请输入文章标题"
          type="text"
        ></validate-input>
      </div>
      <div class="mb-3">
        <label for="" class="form-label">文章详情: </label>
        <validate-input
          type="password"
          placeholder="请输入文章内容"
          :rules="contentRules"
          v-model="contentVal"
        >
        </validate-input>
      </div>
      <template v-slot:submit>
        <button class="btn btn-primary btn-large">创建</button>
      </template>
    </validate-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import ValidateInput from '@/components/ValidateInput.vue'
import ValidateForm from '@/components/ValidateForm.vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { GlobalDataProps } from '@/store'
import { RuleProps } from '@/utils/validate'

export default defineComponent({
  name: 'CreatePost',
  components: { ValidateInput, ValidateForm },
  setup(props) {
    const titleVal = ref('')
    const contentVal = ref('')
    const router = useRouter()
    // const store = useStore<GlobalDataProps>()
    const titleRules: RuleProps = [
      {
        type: 'required',
        message: '文章标题不能为空'
      }
    ]
    const contentRules: RuleProps = [
      {
        type: 'required',
        message: '文章内容不能为空'
      }
    ]
    const onFormSubmit = (result: boolean) => {
      if (result) {
        router.push('/')
      }
    }
    return {
      titleVal,
      contentVal,
      titleRules,
      contentRules,
      onFormSubmit
    }
  }
})
</script>

<style lang="" scoped></style>
