<template>
  <div class="navbar">
    <div class="navbar__logo" @click="$router.push('/')">Vue 2</div>
    <div class="navbar__btns">
      <AppButton
        class="navbar__btn"
        :class="{ active: $route.path === '/posts' }"
        @click="$router.push('/posts')"
        >Посты</AppButton
      >
      <AppButton
        class="navbar__btn"
        :class="{ active: $route.path === '/about' }"
        @click="$router.push('/about')"
        >О приложении</AppButton
      >
    </div>
  </div>
</template>

<script lang="ts">
import AppButton from './UI/AppButton.vue'
export default {
  name: 'Navbar',
  components: {
    AppButton
  }
}
</script>

<style scoped>
.navbar {
  background-color: lightgray;
  height: 50px;
  box-shadow: 2px 2px 4px rgba(75, 74, 74, 0.5);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
}

.navbar__logo {
  font-weight: bold;
  font-size: 20px;
  color: teal;
  cursor: pointer;
}

.navbar__btns {
  display: flex;
  gap: 15px;
}

.navbar__btn {
  padding: 8px 15px;
  /* background-color: teal; */
  border: 1px solid teal;
  color: teal;
  border-radius: 4px;
  transition: all 0.3s ease;
  font-size: 14px;
  height: 35px;
  display: flex;
  align-items: center;
  min-width: 120px;
  justify-content: center;
}

.navbar__btn:hover {
  background-color: white;
  color: teal;
  transform: translateY(-2px);
}

.navbar__btn:active {
  transform: translateY(0);
}
.navbar__btn.active {
  background-color: teal;
  color: white;
}
</style>
