<template>
  <div class="file-upload">
    <div class="file-upload-container " @click.prevent="triggerUpload">
      <slot v-if="fileStatus === 'loading'" name="loading">
        <button class="btn btn-primary">正在上传...</button>
      </slot>
      <slot
        v-else-if="fileStatus === 'success'"
        name="uploaded"
        :uploadedData="uploadedData"
      >
        <button class="btn btn-primary">上传成功</button>
      </slot>
      <slot v-else name="default">
        <button class="btn btn-primary">点击上传</button>
      </slot>
    </div>
    <input
      type="file"
      class="file-input d-none"
      ref="fileInput"
      @change="handleFileChange"
    />
  </div>
</template>

<script lang="ts">
// const checkBeforeUpload = (file: File) => {
//   const isJPG = file.type === 'image/jpeg'
//   if (!isJPG) {
//     createMessage('上传图片只能是JPG格式', 'error')
//   }
//   return isJPG
// }

// const handleFileUploaded = (rawData: IResponseType<ImageProps>) => {
//   createMessage(`上传图片ID ${rawData.data._id}`, 'success')
// }

import { ImageProps } from '@/types/column-list'
import { IResponseType } from '@/types/response-type'
import { createMessage } from '@/utils/createMessage'
import axios from 'axios'
import { defineComponent, PropType, ref } from 'vue'
type UploadStatus = 'ready' | 'loading' | 'success' | 'error'
type CheckFunction = (file: File) => boolean

// 这个组件有个特点，在input上面添加了display:none来隐藏这个元素
// 但是通过另一个button，通过点击button来手动触发input元素的点击

// 这里有个有趣的地方，就是namedSlot的使用，配合着v-if使用，从而实现了父组件能灵活配置不同状态下的的样式
// 还有一点 就是这里使用了scoped-slots 很有教学意义

export default defineComponent({
  name: 'uploader',
  components: {},
  emits: ['file-uploaded', 'file-uploaded-error'],
  props: {
    action: {
      type: String,
      required: true
    },
    beforeUpload: {
      type: Function as PropType<CheckFunction>
    }
  },
  setup(props, { emit }) {
    const fileInput = ref<HTMLInputElement | null>(null)
    const fileStatus = ref<UploadStatus>('ready')
    const uploadedData = ref()
    const triggerUpload = () => {
      if (fileInput.value) {
        fileInput.value.click()
      }
    }

    const handleFileChange = (e: Event) => {
      const currentTarget = e.target as HTMLInputElement
      if (currentTarget.files) {
        const files = Array.from(currentTarget.files)
        if (props.beforeUpload) {
          const result = props.beforeUpload(files[0])
          if (!result) {
            return
          }
        }

        fileStatus.value = 'loading'
        // 将类数组对象转化为数组
        const formData = new FormData()
        formData.append('file', files[0])
        axios
          .post(props.action, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
          .then(res => {
            fileStatus.value = 'success'
            uploadedData.value = res.data
            emit('file-uploaded', res.data)
          })
          .catch(err => {
            fileStatus.value = 'error'
            emit('file-uploaded-error', { err })
          })
          .finally(() => {
            if (fileInput.value) {
              // 上传成功或者失败都清空文件
              fileInput.value.value = ''
            }
          })
      }
    }

    return {
      fileInput,
      triggerUpload,
      fileStatus,
      handleFileChange,
      uploadedData
    }
  }
})
</script>

<style lang="" scoped></style>
