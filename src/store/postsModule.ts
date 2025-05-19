import { PostState, PostType } from './types/types'
import { Module } from 'vuex'
import { RootState } from './index'
import axios from 'axios'

export const postsModule: Module<PostState, RootState> = {
  namespaced: true,
  state: (): PostState => ({
    posts: [],
    selectedSort: '',
    searchQuery: '',
    page: 1,
    limit: 10,
    totalPages: 0,
    sortOptions: [
      { value: 'title', name: 'По названию' },
      { value: 'body', name: 'По содержимому' }
    ],
    isLoading: false,
    newPostsLoading: false
  }),
  getters: {
    sortedPosts(state) {
      return [...state.posts].sort((post1, post2) => {
        return post1[state.selectedSort]?.localeCompare(post2[state.selectedSort])
      })
    },
    sortedAndSearchedPosts(state, getters) {
      return getters.sortedPosts.filter((post) => {
        return post.title.toLowerCase().includes(state.searchQuery.toLowerCase())
      })
    }
  },
  mutations: {
    setPosts(state, posts: PostType[]) {
      state.posts = posts
    },
    createPost(state, post: PostType) {
      state.posts.unshift(post)
    },
    removePost(state, id: number) {
      state.posts = state.posts.filter((p) => p.id !== id)
    },
    addPosts(state, posts: PostType[]) {
      state.posts = [...state.posts, ...posts]
    },
    setIsLoading(state, isLoading: boolean) {
      state.isLoading = isLoading
    },
    setNewPostsLoading(state, newPostsLoading: boolean) {
      state.newPostsLoading = newPostsLoading
    },
    setSelectedSort(state, selectedSort) {
      state.selectedSort = selectedSort
    },
    setSearchQuery(state, searchQuery) {
      state.searchQuery = searchQuery
    },
    setPage(state, page) {
      state.page = page
    },
    setTotalPages(state, totalPages) {
      state.totalPages = totalPages
    }
  },
  actions: {
    async fetchPosts({ state, commit }) {
      setTimeout(async () => {
        try {
          commit('setIsLoading', true)
          const response = await axios.get<PostType[]>(
            'https://jsonplaceholder.typicode.com/posts',
            {
              params: {
                _limit: state.limit,
                _page: state.page
              }
            }
          )
          // state.totalPages = Math.ceil(response.headers['x-total-count'] / state.limit)
          commit('setTotalPages', Math.ceil(response.headers['x-total-count'] / state.limit))
          commit('setPosts', response.data)
        } catch (error) {
          console.error('Error fetching posts:', error)
          alert('Ошибка при получении постов')
        } finally {
          commit('setIsLoading', false)
        }
      }, 500)
    },
    async loadMorePosts({ state, commit }) {
      try {
        commit('setNewPostsLoading', true)
        // state.page += 1
        commit('setPage', state.page + 1)
        const response = await axios.get<PostType[]>(`https://jsonplaceholder.typicode.com/posts`, {
          params: {
            _limit: state.limit,
            _page: state.page
          }
        })
        // state.totalPages = Math.ceil(response.headers['x-total-count'] / state.limit)
        commit('setTotalPages', Math.ceil(response.headers['x-total-count'] / state.limit))
        commit('addPosts', response.data)
      } catch (error) {
        alert('Ошибка при получении постов')
      } finally {
        commit('setNewPostsLoading', false)
      }
    }
  },
  modules: {}
}
