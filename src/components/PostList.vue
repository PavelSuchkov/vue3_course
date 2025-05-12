<template>
  <div class="post-list">
    <h3>{{ posts.length > 0 ? 'Список постов' : 'Список постов пуст' }}</h3>
    <PostItem v-for="post in posts" :key="post.id" :post="post" @remove="$emit('remove', post)" />
  </div>
</template>

<script setup>
import PostItem from '@/components/PostItem.vue'
import { defineEmits, defineProps } from 'vue'

defineProps({
  posts: {
    type: Array,
    required: true
  }
})
defineEmits(['remove'])
</script>

<style scoped>
.post {
  padding: 15px;
  border: 2px solid teal;
  border-radius: 10px;
  margin-top: 15px;
}
</style>
