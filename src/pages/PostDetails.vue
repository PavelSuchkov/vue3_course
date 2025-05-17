<template>
  <div v-if="post && author" class="post-details">
    <!-- <h1>Post Details of post {{ $route.params.id }}</h1> -->
    <h2 class="post-details__title">{{ post.title }}</h2>
    <div class="post-details__content">
      <p class="post-details__body">{{ post.body }}</p>
      <div class="post-details__author">
        <h3>Author Info:</h3>
        <div class="author-info">
          <p><strong>Name:</strong> {{ author.name }}</p>
          <p><strong>Email:</strong> {{ author.email }}</p>
          <p><strong>Company:</strong> {{ author.company.name }}</p>
          <p><strong>City:</strong> {{ author.address.city }}</p>
        </div>
      </div>
      <div class="post-details__info">
        <span class="post-details__id">Пост #{{ post.id }}</span>
      </div>
    </div>
  </div>
  <div v-else class="spinner"></div>
</template>

<script lang="ts">
// import Vue from 'vue'
import axios from 'axios'

interface Address {
  street: string
  city: string
  zipcode: string
}

interface Company {
  name: string
  catchPhrase: string
}

interface Author {
  id: number
  name: string
  email: string
  address: Address
  company: Company
}

interface Post {
  id: number
  title: string
  body: string
  userId: number
}

export default {
  name: 'PostDetails',
  data() {
    return {
      post: null as Post | null,
      author: null as Author | null
    }
  },
  methods: {
    async fetchPost() {
      const response = await axios.get<Post>(
        `https://jsonplaceholder.typicode.com/posts/${this.$route.params.id}`
      )
      this.post = response.data
      await this.fetchAuthor(this.post.userId)
    },
    async fetchAuthor(userId: number) {
      const response = await axios.get<Author>(
        `https://jsonplaceholder.typicode.com/users/${userId}`
      )
      this.author = response.data
    }
  },
  mounted() {
    // console.log(this.$route.params)
    this.fetchPost()
  }
}
</script>

<style scoped>
.post-details {
  max-width: 800px;
  margin: 20px auto;
  padding: 25px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
}

.post-details__title {
  color: #2c3e50;
  font-size: 24px;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 2px solid teal;
}

.post-details__content {
  padding: 10px 0;
}

.post-details__body {
  font-size: 16px;
  line-height: 1.6;
  color: #34495e;
  margin-bottom: 20px;
  text-align: justify;
}

.post-details__author {
  margin-top: 20px;
  padding: 15px;
  background: #f8f9fa;
  border-radius: 6px;
}

.author-info {
  margin-top: 10px;
}

.author-info p {
  margin: 8px 0;
  color: #2c3e50;
}

.author-info strong {
  color: teal;
  margin-right: 8px;
}

.post-details__info {
  display: flex;
  justify-content: flex-end;
  padding-top: 15px;
  border-top: 1px solid #eee;
}

.post-details__id {
  background-color: teal;
  color: white;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 14px;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 5px solid #f3f3f3;
  border-top: 5px solid teal;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  /* Центрирование */
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* Добавим адаптивность */
@media (max-width: 768px) {
  .post-details {
    margin: 10px;
    padding: 15px;
  }

  .post-details__title {
    font-size: 20px;
  }

  .post-details__body {
    font-size: 14px;
  }
}
</style>
