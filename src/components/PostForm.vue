<template>
  <form class="form" @submit.prevent>
    <h4 class="form-title">Создание поста</h4>
    <AppInput
      v-model="post.title"
      type="text"
      :update:modelValue="updateTitle"
      placeholder="Название"
    />
    <AppInput
      v-model="post.body"
      type="text"
      :update:modelValue="updateBody"
      placeholder="Описание"
    />
    <!-- <input v-model="post.title" class="form-input" type="text" placeholder="Название" /> -->
    <!-- <input v-model="post.body" class="form-input" type="text" placeholder="Описание" /> -->
    <AppButton @click="createPost" class="form-button" :disabled="!post.title || !post.body">
      Добавить пост
    </AppButton>
  </form>
</template>

<script setup>
import { reactive, defineEmits } from 'vue'
import AppButton from '@/components/UI/AppButton.vue'
import AppInput from '@/components/UI/AppInput.vue'
const post = reactive({
  title: '',
  body: ''
})
const updateTitle = (value) => {
  post.title = value
}
const updateBody = (value) => {
  post.body = value
}
console.log(post)

const createPost = () => {
  post.id = Date.now()
  emit('create', { ...post })
  post.title = ''
  post.body = ''
}

const emit = defineEmits(['create'])
</script>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.form-input {
  width: 100%;
  padding: 10px;
  border: 1px solid rgb(65, 72, 72);
  border-radius: 10px;
  padding: 10px 15px;
}

.form-title {
  text-align: center;
  margin-bottom: 10px;
  margin-top: 10px;
}

.form-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  background-color: #ccc;
  color: #666;
}

.form-button:disabled:hover {
  background-color: #ccc;
  color: #666;
}
</style>
