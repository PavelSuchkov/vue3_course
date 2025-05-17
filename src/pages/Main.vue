<template>
  <div class="main">
    <h1>Добро пожаловать на главную страницу</h1>
    <!-- <div class="main__links">
      <router-link to="/posts" class="main__link">Посмотреть посты</router-link>
      <router-link to="/about" class="main__link">О приложении</router-link>
    </div> -->
  </div>
</template>

<script lang="ts">
export default {
  name: 'Main'
}
</script>

<style scoped>
.main {
  /* background-color: #f0f0f0; */
  padding: 20px;
  display: flex;
  flex-direction: column;
}
</style>
