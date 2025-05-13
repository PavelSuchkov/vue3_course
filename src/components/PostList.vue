<template>
  <div class="post-list">
    <h3>{{ posts.length > 0 ? 'Список постов' : 'Список постов пуст' }}</h3>
    <PostItem
      v-for="post in posts"
      :key="post.id"
      :post="post"
      @remove="$emit('remove', post.id)"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import PostItem from '@/components/PostItem.vue'

interface Post {
  id: number
  title: string
  body: string
}

export default Vue.extend({
  name: 'PostList',
  components: {
    PostItem
  },
  props: {
    posts: {
      type: Array as () => Post[],
      required: true
    }
  }
})
</script>

<style scoped>
.post {
  padding: 15px;
  border: 2px solid teal;
  border-radius: 10px;
  margin-top: 15px;
}
</style>
