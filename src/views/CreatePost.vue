<template>
  <div class="create-post-page">
    <h4>{{ isEditMode ? '编辑文章' : '新建文章' }}</h4>
    <uploader
      action="upload"
      class="d-flex align-items-center justify-content-center bg-light text-secondary w-100 my-4"
      :beforeUpload="uploadCheck"
      @file-uploaded="handleFileUploaded"
      :uploaded="uploadedData"
    >
      <h2>点击上传图片</h2>
      <!-- 以下是scopedSlot的例子
      <template v-slot:uploaded="dataProps">
        <img :src="dataProps.uploadedData.data.url" alt="" width="500" />
      </template> -->
      <template v-slot:loading>
        <div class="d-flex align-items-center">
          <div class="spinner-border text-secondary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <h2 class="mb-0">正在上传</h2>
        </div>
      </template>
      <template #uploaded="dataProps">
        <!-- <img :src="dataProps.uploadedData.image.fitUrl" alt="" /> -->
        <img :src="dataProps.uploadedData.data.url" alt="" />
      </template>
    </uploader>
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
        <button class="btn btn-primary btn-large">
          {{ isEditMode ? '修改' : '新建' }}
        </button>
      </template>
    </validate-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import ValidateInput from '@/components/ValidateInput.vue'
import ValidateForm from '@/components/ValidateForm.vue'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'
import store, { GlobalDataProps } from '@/store'
import { RuleProps } from '@/utils/validate'
import { IPostProps } from '@/types/column-detail'
import Uploader from '@/components/Uploader.vue'
import { beforeUploadCheck } from '@/utils/helper'
import { createMessage } from '@/utils/createMessage'
import { ImageProps } from '@/types/column-list'
import { IPostDetail } from '@/types/post-detail'
import { IResponseType } from '@/types/response-type'

export default defineComponent({
  name: 'CreatePost',
  components: { ValidateInput, ValidateForm, Uploader },
  setup(props) {
    const titleVal = ref('')
    const contentVal = ref('')
    const router = useRouter()
    const route = useRoute()
    const isEditMode = !!route.query.id
    const store = useStore<GlobalDataProps>()
    const toBeEditedPost = store.state.toBeEditedPost
    let imageId = ''
    const uploadedData = ref()
    const handleFileUploaded = (rawData: IResponseType<ImageProps>) => {
      if (rawData.data._id) {
        imageId = rawData.data._id
      }
    }
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
        const { column, _id } = store.state.user
        if (column) {
          const newPost: Partial<IPostProps> = {
            // _id: new Date().getTime() + '',
            title: titleVal.value,
            content: contentVal.value,
            column,
            author: _id
            // createdAt: new Date().toLocaleString()
          }
          if (imageId) {
            newPost.image = imageId
          }
          const actionName = isEditMode ? 'updatePost' : 'createPost'
          const sendData = isEditMode
            ? { id: route.query.id, payload: newPost }
            : newPost
          store.dispatch(actionName, sendData).then(() => {
            createMessage('操作成功,两秒后跳转到文章', 'success', 2000)
            setTimeout(() => {
              router.push({ name: 'ColumnDetail', params: { id: column } })
            }, 2000)
          })
        }
      }
    }

    onMounted(() => {
      if (isEditMode) {
        // titleVal.value = toBeEditedPost!.title
        // contentVal.value = toBeEditedPost!.content!
        // imageId = toBeEditedPost!.image.url!
        // uploadedData = {
        //   data: {
        //     url: imageId
        //   }
        // }
        store
          .dispatch('fetchPost', route.query.id)
          .then((rawData: IResponseType<IPostDetail>) => {
            const currentPost = rawData.data
            if (currentPost.image) {
              uploadedData.value = {
                data: currentPost.image
              }
            }
            titleVal.value = currentPost.title
            contentVal.value = currentPost.content
          })
      }
    })

    const uploadCheck = (file: File) => {
      const result = beforeUploadCheck(file, {
        size: 5,
        format: ['image/png', 'image/jpg']
      })
      const { passed, error } = result
      if (error === 'format') {
        createMessage('请选择正确格式的图片', 'error')
      }
      if (error === 'size') {
        createMessage('图片的大小不得大于5M', 'error')
      }
      return passed
    }
    return {
      titleVal,
      contentVal,
      titleRules,
      contentRules,
      onFormSubmit,
      uploadCheck,
      handleFileUploaded,
      toBeEditedPost,
      uploadedData,
      isEditMode
    }
  }
})
</script>

<style lang="scss" scoped>
.create-post-page .file-upload-container {
  height: 200px;
  cursor: pointer;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>
