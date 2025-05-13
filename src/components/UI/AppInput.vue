<template>
  <input
    class="app-input"
    :type="type"
    :placeholder="placeholder"
    :value="value"
    @input="updateValue"
  />
</template>

<script>
export default {
  name: 'AppInput',
  props: {
    value: {
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
  },
  methods: {
    updateValue(event) {
      this.$emit('input', event.target.value)
    }
  }
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

.app-input:focus {
  border-color: #42b883;
  box-shadow: 0 0 0 1px rgba(70, 130, 180, 0.5);
  outline: none;
}
</style>
