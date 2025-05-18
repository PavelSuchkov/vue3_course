<template>
  <div>
    <!-- <ToggleStatus /> -->
    <h1>Страница с постами</h1>
    <div class="search__wrapper">
      <AppInput v-model="searchQuery" placeholder="Поиск..." v-focus />
    </div>
    <div class="app__btns">
      <AppButton @click="showDialog" style="margin: 18px 0">Создать пост</AppButton>
      <AppSelect v-model="selectedSort" :options="sortOptions" />
    </div>

    <DialogWindow :show.sync="dialogVisible">
      <PostForm @create="createPost" />
    </DialogWindow>
    <!-- <h2 v-if="posts.length === 0">Список постов пуст</h2> -->
    <div v-if="isLoading" class="spinner"></div>
    <PostList v-else :posts="sortedAndSearchedPosts" @remove="removePost" />
    <div v-if="newPostsLoading" class="spinner-bottom">
      <div class="spinner-bottom__loader"></div>
      <div>Загрузка постов...</div>
    </div>
    <div v-intersection="loadMorePosts" style="height: 30px"></div>
    <!-- <Pagination :currentPage="page" :totalPages="totalPages" @changePage="changePage" /> -->
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import PostForm from '@/components/PostForm.vue'
import PostList from '@/components/PostList.vue'
import DialogWindow from '@/components/UI/DialogWindow.vue'
import AppButton from '@/components/UI/AppButton.vue'
import AppSelect from '@/components/UI/AppSelect.vue'
import AppInput from '@/components/UI/AppInput.vue'
// import Pagination from '@/components/Pagination.vue'
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
    AppSelect,
    AppInput
    // Pagination
  },
  data() {
    return {
      posts: [] as Post[],
      dialogVisible: false,
      selectedSort: '',
      searchQuery: '',
      page: 1,
      limit: 10,
      totalPages: 0,
      sortOptions: [
        { value: 'title', name: 'По названию' },
        { value: 'body', name: 'По содержимому' }
      ],
      isLoading: true,
      newPostsLoading: false
    }
  },
  methods: {
    createPost(post: Post): void {
      this.posts.unshift(post)
      this.dialogVisible = false
    },
    removePost(id: number): void {
      this.posts = this.posts.filter((p) => p.id !== id)
    },
    showDialog(): void {
      console.log('showDialog')
      // debugger
      this.dialogVisible = true
    },
    changePage(pageNumber: number): void {
      console.log('changePage', pageNumber)
      this.page = pageNumber
    },
    async fetchPosts(): Promise<void> {
      setTimeout(async () => {
        try {
          this.isLoading = true
          const response = await axios.get<Post[]>(`https://jsonplaceholder.typicode.com/posts`, {
            params: {
              _limit: this.limit,
              _page: this.page
            }
          })
          this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit)
          this.posts = [...response.data]
        } catch (error) {
          alert('Ошибка при получении постов')
        } finally {
          this.isLoading = false
        }
      }, 500)
    },
    async loadMorePosts() {
      try {
        this.newPostsLoading = true
        this.page += 1
        const response = await axios.get<Post[]>(`https://jsonplaceholder.typicode.com/posts`, {
          params: {
            _limit: this.limit,
            _page: this.page
          }
        })
        this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit)
        this.posts = [...this.posts, ...response.data]
      } catch (error) {
        alert('Ошибка при получении постов')
      } finally {
        this.newPostsLoading = false
      }
    }
  },
  computed: {
    sortedPosts() {
      return [...this.posts].sort((post1, post2) => {
        return post1[this.selectedSort]?.localeCompare(post2[this.selectedSort])
      })
    },
    sortedAndSearchedPosts() {
      return this.sortedPosts.filter((post) => {
        return post.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      })
    }
  },
  watch: {
    // page() {
    //   this.fetchPosts()
    // }
  },
  mounted() {
    this.fetchPosts()

    // const options = {
    //   rootMargin: '0px',
    //   threshold: 0.1
    // }

    // const callback = (entries: IntersectionObserverEntry[]) => {
    //   if (entries[0].isIntersecting && this.page < this.totalPages) {
    //     this.loadMorePosts()
    //   }
    // }

    // const observer = new IntersectionObserver(callback, options)
    // observer.observe(this.$refs.observer)
  }
})
</script>

<style>
.app {
  padding: 20px;
}

.app__btns {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.search__wrapper {
  margin: 15px 0;
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
.spinner-bottom {
  text-align: center;
  padding: 15px;
  color: teal;
  font-weight: bold;
}
.spinner-bottom__loader {
  width: 30px;
  height: 30px;
  border: 3px solid #f3f3f3;
  border-top: 3px solid teal;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 10px auto;
}
</style>
