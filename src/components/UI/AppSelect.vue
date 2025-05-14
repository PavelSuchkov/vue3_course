<template>
  <select :value="modelValue" @change="updateModelValue" class="app-select">
    <option disabled value="">Выберите из списка</option>
    <option v-for="option in options" :key="option.value" :value="option.value">
      {{ option.name }}
    </option>
  </select>
</template>

<script>
export default {
  name: 'AppSelect',
  props: {
    modelValue: {
      type: String,
      default: ''
    },
    options: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    updateModelValue(event) {
      this.$emit('input', event.target.value)
    }
  }
}
</script>

<style scoped>
.app-select {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
</style>
