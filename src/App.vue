<template>
  <div>
    <Navbar />
    <div class="app">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import Navbar from '@/components/Navbar.vue'
export default {
  name: 'App',
  components: {
    Navbar
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
