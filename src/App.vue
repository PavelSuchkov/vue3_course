<template>
  <div class="app">
    <!-- <ToggleStatus /> -->
    <h1>Страница с постами</h1>
    <input type="text" v-model="modifcatorValue" placeholder="some placeholder" />
    <AppButton @click="showDialog" style="margin: 18px 0">Создать пост</AppButton>
    <DialogWindow :show.sync="dialogVisible">
      <PostForm @create="createPost" />
    </DialogWindow>
    <PostList v-if="posts.length > 0" :posts="posts" @remove="removePost" />
    <h2 v-else>Список постов пуст</h2>

    <!-- <EffectExample /> -->
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import PostForm from '@/components/PostForm.vue'
import PostList from '@/components/PostList.vue'
import DialogWindow from '@/components/UI/DialogWindow.vue'
import AppButton from '@/components/UI/AppButton.vue'
import axios from 'axios'
// import EffectExample from '@/components/EffectExample.vue'

interface Post {
  id: number
  title: string
  body: string
}

export default Vue.extend({
  name: 'App',
  components: {
    PostForm,
    PostList,
    DialogWindow,
    AppButton
  },
  data() {
    return {
      posts: [] as Post[],
      dialogVisible: false,
      modifcatorValue: ''
    }
  },
  methods: {
    createPost(post: Post): void {
      // debugger
      this.posts.unshift(post)
      this.dialogVisible = false
    },
    removePost(id: number): void {
      const index = this.posts.findIndex((p) => p.id === id)
      if (index !== -1) {
        this.posts.splice(index, 1)
      }
    },
    showDialog(): void {
      console.log('showDialog')
      this.dialogVisible = true
    },
    async fetchPosts(): Promise<void> {
      try {
        const response = await axios.get<Post[]>(
          'https://jsonplaceholder.typicode.com/posts?_limit=10'
        )
        this.posts = [...response.data, ...this.posts]
      } catch (error) {
        alert('Ошибка при получении постов')
      }
    }
  },
  mounted() {
    this.fetchPosts()
  }
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
