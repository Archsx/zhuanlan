<template>
  <div class="post-list">
    <article v-for="post in list" :key="post._id" class="card mb-3 shadow-sm">
      <div class="card-body" @click="jump(post._id)">
        <h4>{{ post.title }}</h4>
        <div class="row my-3 align-items-center">
          <div v-if="post.image" class="col-3">
            <img
              :src="
                typeof post.image === 'string' ? post.image : post.image.url
              "
              alt=""
              class="rounded-lg w-100 "
            />
          </div>
          <p :class="{ 'col-9': post.image }">
            {{ post.excerpt }}
          </p>
        </div>
        <span class="text-muted">{{ post.createdAt }}</span>
      </div>
    </article>
  </div>
</template>

<script lang="ts">
import { IPostProps } from '@/types/column-detail'
import { useRouter } from 'vue-router'
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'PostList',
  components: {},
  props: {
    list: {
      required: true,
      type: Array as PropType<Array<IPostProps>>
    }
  },
  setup(props) {
    const router = useRouter()
    const jump = (id: string) => {
      router.push({
        name: 'postDetail',
        params: {
          id
        }
      })
    }
    return {
      jump
    }
  }
})
</script>

<style lang="" scoped></style>
