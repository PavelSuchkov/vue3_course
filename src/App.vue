<template>
  <div class="app">
    <!-- <ToggleStatus /> -->
    <h1>Страница с постами</h1>
    <div class="app__btns">
      <AppButton @click="showDialog" style="margin: 18px 0">Создать пост</AppButton>
      <AppSelect v-model="selectedSort" :options="sortOptions" />
    </div>

    <DialogWindow :show.sync="dialogVisible">
      <PostForm @create="createPost" />
    </DialogWindow>
    <!-- <h2 v-if="posts.length === 0">Список постов пуст</h2> -->
    <div v-if="isLoading" class="spinner"></div>
    <PostList v-else :posts="sortedPosts" @remove="removePost" />
    <!-- <EffectExample /> -->
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import PostForm from '@/components/PostForm.vue'
import PostList from '@/components/PostList.vue'
import DialogWindow from '@/components/UI/DialogWindow.vue'
import AppButton from '@/components/UI/AppButton.vue'
import AppSelect from '@/components/UI/AppSelect.vue'
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
    AppButton,
    AppSelect
  },
  data() {
    return {
      posts: [] as Post[],
      dialogVisible: false,
      selectedSort: '',
      sortOptions: [
        { value: 'title', name: 'По названию' },
        { value: 'body', name: 'По содержимому' }
      ],
      isLoading: true
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
      // debugger
      this.dialogVisible = true
    },
    async fetchPosts(): Promise<void> {
      setTimeout(async () => {
        try {
          this.isLoading = true
          const response = await axios.get<Post[]>(
            'https://jsonplaceholder.typicode.com/posts?_limit=10'
          )
          this.posts = [...response.data, ...this.posts]
        } catch (error) {
          alert('Ошибка при получении постов')
        } finally {
          this.isLoading = false
        }
      }, 1500)
    }
  },
  computed: {
    sortedPosts() {
      return [...this.posts].sort((post1, post2) => {
        return post1[this.selectedSort]?.localeCompare(post2[this.selectedSort])
      })
    }
  },
  watch: {
    // selectedSort(newValue) {
    //   this.posts.sort((post1, post2) => {
    //     return post1[newValue]?.localeCompare(post2[newValue])
    //   })
    // }
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

.app__btns {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 5px solid #f3f3f3;
  border-top: 5px solid teal;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 20px auto;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
