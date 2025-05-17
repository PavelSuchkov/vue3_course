import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
// import store from "./store";

Vue.config.productionTip = false
if (process.env.NODE_ENV === 'development') {
  Vue.config.devtools = true
}

new Vue({
  router,
  render: (h) => h(App)
}).$mount('#app')
