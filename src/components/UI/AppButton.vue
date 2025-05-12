<template>
  <button class="button">
    <slot></slot>
  </button>
</template>

<script setup>
import { defineProps } from 'vue'
defineProps({
  variant: {
    type: String,
    default: 'primary'
  }
})
</script>

<style scoped>
.button {
  width: 100%;
  padding: 10px;
  border: 1px solid rgb(65, 72, 72);
  border-radius: 10px;
  width: 30%;
  align-self: flex-end;
  color: teal;
  &:hover {
    background-color: rgb(65, 72, 72);
    color: #fff;
  }
}
.button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  background-color: #ccc;
  color: #666;
  &:hover {
    background-color: #ccc;
    color: #666;
  }
}
</style>
