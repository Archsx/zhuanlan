<template>
  <div v-if="getPostDetail">
    <div class="banner">
      <img :src="postDetail.image.fitUrl" alt="" />
    </div>
    <article>
      <header>
        <h1 class="post-title">{{ postDetail.title }}</h1>
        <div class="post-author">
          <div class="author-avatar">
            <img
              :src="postDetail.author.avatar && postDetail.author.avatar.fitUrl"
              alt=""
            />
          </div>
          <div class="author-info">
            <span class="author-name">{{ postDetail.author.nickName }}</span>
            <p class="author-desc">{{ postDetail.author.description }}</p>
          </div>
        </div>
      </header>
      <div class="post-content" v-html="postDetail.content"></div>
    </article>
  </div>
</template>

<script lang="ts">
import { IPostProps } from '@/types/column-detail'
import { useRoute } from 'vue-router'
import { computed, defineComponent, popScopeId, reactive, ref } from 'vue'
import axios from 'axios'
import { IResponseType } from '@/types/response-type'
import { IPostDetail } from '@/types/post-detail'
import { addColumnAvatar, generateFitUrl } from '@/utils/helper'
import MarkdownIt from 'markdown-it'

export default defineComponent({
  name: 'PostDetail',
  components: {},
  setup(props) {
    const postDetail = ref({} as IPostDetail)
    const route = useRoute()
    const postId = route.params.id
    const md = new MarkdownIt()
    const getPostDetail = computed(() => {
      return !!Object.keys(postDetail.value).length
    })
    axios.get(`posts/${postId}`).then(res => {
      const { data } = res
      postDetail.value = data.data as IPostDetail
      generateFitUrl(postDetail.value.image, 690, 400)
      addColumnAvatar(postDetail.value.author, 38, 38)
      if (!postDetail.value.isHTML) {
        postDetail.value.content = md.render(postDetail.value.content)
      }
    })

    return {
      postDetail,
      getPostDetail
    }
  }
})
</script>

<style lang="scss" scoped>
.banner img {
  width: 100%;
  max-height: 387px;
}
.post-title {
  font-size: 24px;
  line-height: 1.22;
  margin: 24px 0;
  word-wrap: break-word;
  font-weight: 600;
}
.post-author {
  display: flex;
  align-items: center;
  img {
    border-radius: 50%;
  }
  .author-info {
    margin-left: 14px;
    .author-name {
      font-size: 15px;
      line-height: 1.1;
      color: #444;
      font-weight: 600;
    }
    .author-desc {
      font-size: 14px;
      margin: 0 0 8px 0;
    }
  }
}
.post-content {
  margin-top: 20px;
}
</style>
