<template>
  <div class="post">
    <div class="post-content">
      <div><strong>Название: </strong> {{ post.title }}</div>
      <div><strong>Описвние: </strong> {{ post.body }}</div>
    </div>
    <div class="post-btns">
      <AppButton variant="danger" class="btn" @click="$emit('remove', post.id)">Удалить</AppButton>
      <AppButton class="open-btn" @click="$router.push(`/posts/${post.id}`)">Открыть</AppButton>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import AppButton from '@/components/UI/AppButton.vue'

interface Post {
  userId: number
  id: number
  title: string
  body: string
}

export default Vue.extend({
  name: 'PostItem',
  components: {
    AppButton
  },
  props: {
    post: {
      type: Object as () => Post,
      required: true
    }
  }
})
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
}

.btn:hover {
  background-color: #e74c3c;
  color: white;
  border-color: #e74c3c;
}

.open-btn {
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
}

.open-btn:hover {
  background-color: teal;
  color: white;
}
</style>
