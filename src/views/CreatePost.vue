<template>
  <div class="create-post-page">
    <uploader :action="'upload'">
      <template v-slot:uploaded="dataProps">
        <img :src="dataProps.uploadedData.data.url" alt="" width="500"/>
      </template>
    </uploader>
    <h4>新建文章</h4>
    <validate-form @form-submit="onFormSubmit">
      <div class="mb-3">
        <label for="" class="form-label">文章标题: </label>
        <validate-input
          :rules="titleRules"
          v-model="titleVal"
          placeholder="请输入文章标题"
          :tag="'input'"
        ></validate-input>
      </div>
      <div class="mb-3">
        <label for="" class="form-label">文章详情: </label>
        <validate-input
          type="text"
          rows="10"
          placeholder="请输入文章内容"
          :rules="contentRules"
          v-model="contentVal"
          tag="textarea"
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
import store, { GlobalDataProps } from '@/store'
import { RuleProps } from '@/utils/validate'
import { IPostProps } from '@/types/column-detail'
import Uploader from '@/components/Uploader.vue'






export default defineComponent({
  name: 'CreatePost',
  components: { ValidateInput, ValidateForm, Uploader },
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
        const { column } = store.state.user
        if (column) {
          const newPost: Partial<IPostProps> = {
            // _id: new Date().getTime() + '',
            title: titleVal.value,
            content: contentVal.value,
            column
            // createdAt: new Date().toLocaleString()
          }
          store.commit('createPost', newPost)
          router.push({ name: 'ColumnDetail', params: { id: column } })
        }
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
