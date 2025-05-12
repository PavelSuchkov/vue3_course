<template>
  <input
    class="app-input"
    :type="type"
    :placeholder="placeholder"
    @input="updateValue"
    v-model="inputValue"
  />
</template>

<script setup>
import { defineProps, defineEmits, ref, watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'text',
    validator: (value) =>
      [
        'text',
        'password',
        'email',
        'number',
        'tel',
        'url',
        'search',
        'color',
        'date',
        'time',
        'datetime-local',
        'month',
        'week'
      ].includes(value)
  },
  placeholder: {
    type: String,
    required: true
  }
})
const emit = defineEmits(['update:modelValue'])

const inputValue = ref(props.modelValue)

watch(
  () => props.modelValue,
  (newValue) => {
    inputValue.value = newValue
  }
)

const updateValue = (event) => {
  emit('update:modelValue', event.target.value)
}
</script>

<style scoped>
.app-input {
  width: 100%;
  padding: 10px;
  border: 1px solid rgb(65, 72, 72);
  border-radius: 10px;
  padding: 10px 15px;
}
</style>
