<template>
  <div class="post">
    <div class="post-content">
      <div><strong>Название: </strong> {{ post.title }}</div>
      <div><strong>Описвние: </strong> {{ post.body }}</div>
    </div>
    <div class="post-btns">
      <AppButton variant="danger" class="btn" @click="$emit('remove', post.id)">Удалить</AppButton>
      <AppButton class="edit-btn">Изменить</AppButton>
    </div>
  </div>
</template>

<script setup>
import AppButton from '@/components/UI/AppButton.vue'
import { defineProps, defineEmits } from 'vue'

defineProps({
  post: { type: Object, required: true }
})
defineEmits(['remove'])
</script>

<style scoped>
.post {
  padding: 15px;
  border: 2px solid teal;
  border-radius: 10px;
  margin-top: 15px;
  display: flex;
  justify-content: space-between;
}

.post-content {
  display: flex;
  flex-direction: column;
  gap: 10px;
  /* align-items: center; */
  justify-content: center;
}

.post-btns {
  display: flex;
  gap: 10px;
  align-items: center;
  flex-direction: column;
}

.btn {
  display: flex;
  justify-content: center;
  align-items: center;
  background: none;
  border: 1px solid teal;
  border-radius: 10px;
  padding: 5px 10px;
  color: teal;
  cursor: pointer;
  width: 100px;
  transition: all 0.3s ease;
  &:hover {
    background-color: #e74c3c;
    color: white;
    border-color: #e74c3c;
  }
}

.edit-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  background: none;
  border: 1px solid teal;
  border-radius: 10px;
  padding: 5px 10px;
  color: teal;
  cursor: pointer;
  width: 100px;
  transition: all 0.3s ease;
  &:hover {
    background-color: teal;
    color: white;
  }
}
</style>
