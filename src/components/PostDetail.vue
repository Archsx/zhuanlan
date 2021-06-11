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
    <div v-if="showEditArea" class="btn-group mt-5">
      <button @click="editPost" class="btn btn-primary">
        编辑
      </button>
      <button class="btn btn-danger" @click="check">删除</button>
    </div>
  </div>
</template>

<script lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { computed, defineComponent, ref, watch, watchEffect } from 'vue'
import { IPostDetail } from '@/types/post-detail'
import { addColumnAvatar, generateFitUrl } from '@/utils/helper'
import MarkdownIt from 'markdown-it'
import { useStore } from 'vuex'
import { GlobalDataProps } from '@/store'
import { createTransModal } from '@/utils/createModal'
import { createMessage } from '@/utils/createMessage'

export default defineComponent({
  name: 'PostDetail',
  components: {},
  setup() {
    const postDetail = ref({} as IPostDetail)
    const route = useRoute()
    const router = useRouter()
    const postId = route.params.id
    const md = new MarkdownIt()
    const store = useStore<GlobalDataProps>()
    const showEditArea = computed(() => {
      const { isLogin, _id } = store.state.user
      if (isLogin && getPostDetail.value) {
        const author = postDetail.value.author
        return author._id === _id
      }
      return false
      // return true
    })
    store.dispatch('fetchPost', postId).then(res => {
      const { data } = res
      postDetail.value = data as IPostDetail
      generateFitUrl(postDetail.value.image, 690, 400)
      addColumnAvatar(postDetail.value.author, 38, 38)
      if (!postDetail.value.isHTML) {
        postDetail.value.content = md.render(postDetail.value.content)
      }
    })

    const getPostDetail = computed(() => {
      return !!Object.keys(postDetail.value).length
    })

    const editPost = () => {
      store.commit('setToBeEditedPost', postDetail.value)
      router.push({
        name: 'CreatePost',
        query: {
          id: postDetail.value._id
        }
      })
    }

    const check = () => {
      const res = createTransModal({
        header: '确认要删除文章吗',
        content: '此操作不可撤回，请谨慎对待',
        show: true
      })

      watch(res, newVal => {
        if (newVal) {
          store.dispatch('deletePost', postId).then(res => {
            const { data } = res
            createMessage('删除成功,两秒后跳转首页', 'success', 2000)
            setTimeout(() => {
              router.push('/')
            }, 2000)
          })
        }
      })
    }

    return {
      postDetail,
      getPostDetail,
      showEditArea,
      editPost,
      check
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
