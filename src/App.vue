<template>
  <div class="app">
    <ToggleStatus />
    <PostForm @create="createPost" />
    <PostList v-if="posts.length > 0" :posts="posts" @remove="removePost" />
    <h2 v-else>Список постов пуст</h2>
    <!-- <EffectExample /> -->
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import PostForm from '@/components/PostForm.vue'
import PostList from '@/components/PostList.vue'
import ToggleStatus from '@/components/ToggleStatus.vue'
// import EffectExample from '@/components/EffectExample.vue'

const posts = reactive([
  // { id: 1, title: 'Javascript', body: 'Javascript универсальный язык программирования' },
  // { id: 2, title: 'Python', body: 'Python универсальный язык программирования' },
  // { id: 3, title: 'C#', body: 'C# универсальный язык программирования' }
])
console.log(posts)
const createPost = (post) => {
  posts.unshift(post)
}

const removePost = (post) => {
  const index = posts.findIndex((p) => p.id === post.id)
  if (index !== -1) {
    posts.splice(index, 1)
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.app {
  padding: 20px;
}
</style>
