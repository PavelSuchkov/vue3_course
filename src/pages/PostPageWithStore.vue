<template>
  <div>
    <!-- <ToggleStatus /> -->
    <h1>Страница с постами</h1>

    <div class="search__wrapper">
      <AppInput :value="searchQuery" @input="setSearchQuery" placeholder="Поиск..." v-focus />
    </div>
    <div class="app__btns">
      <AppButton @click="showDialog" style="margin: 18px 0">Создать пост</AppButton>
      <AppSelect :value="selectedSort" @input="setSelectedSort" :options="sortOptions" />
    </div>

    <DialogWindow :show.sync="dialogVisible">
      <PostForm @create="addPost" />
    </DialogWindow>
    <div v-if="isLoading" class="spinner"></div>
    <PostList v-else :posts="sortedAndSearchedPosts" @remove="removePost" />
    <div v-if="newPostsLoading" class="spinner-bottom">
      <div class="spinner-bottom__loader"></div>
      <div>Загрузка постов...</div>
    </div>
    <div v-intersection="loadMorePosts" style="height: 30px"></div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { PostState } from '@/store/types/types'
import PostForm from '@/components/PostForm.vue'
import PostList from '@/components/PostList.vue'
import DialogWindow from '@/components/UI/DialogWindow.vue'
import AppButton from '@/components/UI/AppButton.vue'
import AppSelect from '@/components/UI/AppSelect.vue'
import AppInput from '@/components/UI/AppInput.vue'
import { PostType } from '@/store/types/types'
import { mapGetters, mapActions, mapState, mapMutations } from 'vuex'

export default Vue.extend({
  name: 'PostPageWithStore',
  components: {
    PostForm,
    PostList,
    DialogWindow,
    AppButton,
    AppSelect,
    AppInput
    // Paginationx
  },
  data() {
    return {
      dialogVisible: false
    }
  },
  methods: {
    showDialog() {
      this.dialogVisible = true
    },
    addPost(post: PostType) {
      this.createPost(post)
      this.dialogVisible = false
    },
    ...mapMutations('posts', {
      setSearchQuery: 'setSearchQuery',
      setSelectedSort: 'setSelectedSort',
      setPage: 'setPage',
      createPost: 'createPost',
      removePost: 'removePost'
    }),
    ...mapActions('posts', {
      fetchPosts: 'fetchPosts',
      loadMorePosts: 'loadMorePosts'
    })
  },
  computed: {
    ...mapGetters('posts', {
      sortedAndSearchedPosts: 'sortedAndSearchedPosts',
      sortedPosts: 'sortedPosts'
    }),
    ...mapState('posts', {
      isLoading: (state: PostState) => state.isLoading,
      page: (state: PostState) => state.page,
      limit: (state: PostState) => state.limit,
      totalPages: (state: PostState) => state.totalPages,
      posts: (state: PostState) => state.posts,
      selectedSort: (state: PostState) => state.selectedSort,
      searchQuery: (state: PostState) => state.searchQuery,
      sortOptions: (state: PostState) => state.sortOptions,
      newPostsLoading: (state: PostState) => state.newPostsLoading
    })
  },
  mounted() {
    this.fetchPosts()
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
