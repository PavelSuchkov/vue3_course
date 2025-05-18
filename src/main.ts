import Vue from 'vue'
import App from './App.vue'
import router from '@/router/router'
import directives from '@/directives'

Vue.config.productionTip = false
if (process.env.NODE_ENV === 'development') {
  Vue.config.devtools = true
}

directives.forEach(({ name, directive }) => {
  Vue.directive(name, directive)
})

new Vue({
  router,
  render: (h) => h(App)
}).$mount('#app')
