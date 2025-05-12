<template>
  <div class="app">
    <!-- <ToggleStatus /> -->
    <h1>Страница с постами</h1>
    <input type="text" v-model="modifcatorValue" placeholder="some placeholder" />
    <AppButton @click="showDialog" style="margin: 18px 0">Создать пост</AppButton>
    <DialogWindow v-model:show="dialogVisible">
      <PostForm @create="createPost" />
    </DialogWindow>
    <PostList v-if="posts.length > 0" :posts="posts" @remove="removePost" />
    <h2 v-else>Список постов пуст</h2>

    <!-- <EffectExample /> -->
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue'
import PostForm from '@/components/PostForm.vue'
import PostList from '@/components/PostList.vue'
import ToggleStatus from '@/components/ToggleStatus.vue'
import DialogWindow from '@/components/UI/DialogWindow.vue'
import AppButton from '@/components/UI/AppButton.vue'
import axios from 'axios'
// import EffectExample from '@/components/EffectExample.vue'

const posts = ref([])
const dialogVisible = ref(false)
const modifcatorValue = ref('')
const createPost = (post) => {
  posts.value.unshift(post)
  dialogVisible.value = false
}

const removePost = (id) => {
  const index = posts.value.findIndex((p) => p.id === id)
  if (index !== -1) {
    posts.value.splice(index, 1)
  }
}
const showDialog = () => {
  dialogVisible.value = true
}

const fetchPosts = async () => {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=10')
    posts.value = [...response.data, ...posts.value]
  } catch (error) {
    alert('Ошибка при получении постов')
  }
}

onMounted(() => {
  fetchPosts()
})
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
