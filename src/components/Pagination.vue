<template>
  <div v-if="totalPages > 1" class="page__wrapper">
    <div
      v-for="pageNumber in totalPages"
      :key="pageNumber"
      class="page"
      :class="{ page__current: currentPage === pageNumber }"
      @click="() => changePage(pageNumber)"
    >
      {{ pageNumber }}
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Pagination',
  props: {
    currentPage: {
      type: Number,
      required: true
    },
    totalPages: {
      type: Number,
      required: true
    }
  },
  methods: {
    changePage(pageNumber: number): void {
      this.$emit('changePage', pageNumber)
    }
  }
}
</script>

<style scoped>
.page__wrapper {
  display: flex;
  margin-top: 15px;
}

.page {
  border: 1px solid darkgray;
  padding: 10px;
  cursor: pointer;
}

.page__current {
  border: 2px solid teal;
  font-weight: bold;
}
</style>
