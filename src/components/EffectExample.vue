<template>
  <div class="effect-example">
    <input v-model="userId" type="number" placeholder="Введите ID (1-10)" min="1" max="10" />

    <p v-if="loading">Загрузка...</p>
    <p v-else-if="user">
      <strong>{{ user.name }}</strong
      ><br />
      Email: {{ user.email }}<br />
      Телефон: {{ user.phone }}
    </p>
    <p v-else>Пользователь не найден.</p>
  </div>
</template>

<script setup>
import { ref, watchEffect } from 'vue'

const userId = ref(1)
const user = ref(null)
const loading = ref(false)
console.log(user)
watchEffect(async () => {
  if (!userId.value || userId.value > 15 || userId.value < 1) {
    user.value = null
    return
  }

  if (!userId.value) return

  loading.value = true
  user.value = null

  try {
    const res = await fetch(`https://jsonplaceholder.typicode.com/users/${userId.value}`)
    if (!res.ok) throw new Error('Ошибка при запросе')

    const data = await res.json()
    user.value = data
  } catch (err) {
    console.error(err)
  } finally {
    loading.value = false
  }
})
</script>

<style>
.effect-example {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #2c3e50;
  border-radius: 10px;
  margin-top: 20px;
}
input {
  width: 100%;
  padding: 10px 15px;
  border: 1px solid #2c3e50;
  border-radius: 10px;
  margin-bottom: 15px;
  transition: all 0.3s ease;
}

input:focus {
  outline: none;
  border-color: #27ae60;
  box-shadow: 0 0 0 2px rgba(39, 174, 96, 0.1);
}

p {
  padding: 15px;
  border: 2px solid #2c3e50;
  border-radius: 10px;
  margin-top: 15px;
  text-align: left;
  transition: all 0.3s ease;
}

p strong {
  color: #2c3e50;
  font-size: 1.2em;
  display: block;
  margin-bottom: 10px;
}

p:has(strong) {
  background-color: rgba(44, 62, 80, 0.05);
}

p:not(:has(strong)) {
  text-align: center;
  color: #7f8c8d;
}
</style>
