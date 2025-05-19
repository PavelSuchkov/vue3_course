import Vue from 'vue'
import Vuex from 'vuex'
import { postsModule } from './postsModule'
import { PostState } from './types/types'

Vue.use(Vuex)

export interface RootState {
  posts: PostState
}
// export interface RootState {
//   posts: ReturnType<typeof postsModule.state>
// }

export default new Vuex.Store<RootState>({
  modules: {
    posts: postsModule
  }
})
