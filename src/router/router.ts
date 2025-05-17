import Main from '@/pages/Main.vue'
import PostPage from '@/pages/PostPage.vue'
import About from '@/pages/About.vue'
import VueRouter from 'vue-router'
import Vue from 'vue'
import PostDetails from '@/pages/PostDetails.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Main
  },
  {
    path: '/posts',
    component: PostPage
  },
  {
    path: '/about',
    component: About
  },
  {
    path: '/posts/:id',
    component: PostDetails
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
