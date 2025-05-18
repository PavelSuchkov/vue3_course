import Vue from 'vue'

const directive = Vue.directive('focus', {
  inserted(el: HTMLElement) {
    el.focus()
  }
})

export default directive
