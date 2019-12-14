<template>
  <div class="books">
    <div v-for="(book, index) in books" :key="'book-' + index">
      <Book :title="book.title" :author="book.author"
        :publisher="book.publisher" :thumbnailUrl="book.seriesImage"></Book>
    </div>
  </div>
</template>

<script>
import Book from '@/components/Book.vue';
import seriesApi from '@/modules/api/seriesApi';

export default {
  name: 'books',
  components: {
    Book,
  },
  data() {
    return {
      books: [],
    };
  },
  created() {
    seriesApi.getAllSeries()
      .then((res) => {
        this.books = res.data.data;
      });
  },
};
</script>

<style>
.books {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
