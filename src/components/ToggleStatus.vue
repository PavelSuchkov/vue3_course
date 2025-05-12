<template>
  <div>
    <button @click="toggleStatus">Переключить статус</button>
    <p :class="'status-' + status">
      <span v-if="status === 'online'">Пользователь в сети</span>
      <span v-else-if="status === 'away'">Пользователь отошёл</span>
      <span v-else>Пользователь офлайн</span>
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      status: 'online'
    }
  },
  methods: {
    toggleStatus() {
      if (this.status === 'online') {
        this.status = 'away'
      } else if (this.status === 'away') {
        this.status = 'offline'
      } else {
        this.status = 'online'
      }
    }
  }
}
</script>

<style>
button {
  padding: 10px;
  border: 1px solid #2c3e50;
  border-radius: 10px;
  color: #2c3e50;
  cursor: pointer;
  width: 30%;
  transition: all 0.3s ease;
}

button:hover {
  background-color: #2c3e50;
  color: #fff;
}

p {
  padding: 15px;
  border: 2px solid;
  border-radius: 10px;
  margin-top: 15px;
  text-align: center;
  transition: all 0.3s ease;
}

.status-online {
  border-color: #27ae60;
  color: #27ae60;
  background-color: rgba(39, 174, 96, 0.1);
}

.status-away {
  border-color: #f39c12;
  color: #f39c12;
  background-color: rgba(243, 156, 18, 0.1);
}

.status-offline {
  border-color: #7f8c8d;
  color: #7f8c8d;
  background-color: rgba(127, 140, 141, 0.1);
}
</style>
