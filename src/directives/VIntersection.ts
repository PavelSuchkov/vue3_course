import Vue from 'vue'
import { DirectiveBinding } from 'vue/types/options'

const directive = Vue.directive('intersection', {
  inserted(el: HTMLElement, binding: DirectiveBinding): void {
    // console.log(el)
    // console.log(binding)
    const options = {
      rootMargin: '0px',
      threshold: 0.1
    }

    const callback = (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting) {
        binding.value()
      }
    }

    const observer = new IntersectionObserver(callback, options)
    observer.observe(el)
  }
})

export default directive
