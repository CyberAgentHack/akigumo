<template>
  <div class="books">
    <div v-for="(series, index) in seriesList" :key="'book-' + index">
      <Book :seriesId="series.seriesId" :title="series.title" :author="series.author"
        :publisher="series.publisher" :thumbnailUrl="series.seriesImage"
        :books="books"></Book>
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
      seriesList: [],
      books: {},
    };
  },
  created() {
    seriesApi.getAllSeries()
      .then((res) => {
        this.seriesList = res.data.data;
        this.seriesList.forEach((series) => {
          seriesApi.getSeriesById(series.seriesId)
            .then((seriesRes) => {
              this.$set(this.books, series.seriesId, seriesRes.data.books);
            });
        });
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
