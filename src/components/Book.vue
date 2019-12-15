<template>
  <div class="book">
    <div class="info-wrapper">
      <div class="title"> {{ title }}</div>
      <div class="sub-info">{{ author }}&nbsp;/&nbsp;{{ publisher }}</div>
      <div class="link-button">
        <router-link :to="`/series/${seriesId}`">詳細</router-link>
      </div>
      <div class="link-button">
        <router-link :to="`/series/${seriesId}/books/${getFirstBookId}/viewer`">
          1話を読む
        </router-link>
      </div>
      <div class="link-button">
        <router-link :to="`/series/${seriesId}/books/${getNextBookId}/viewer`">
          続き({{ getNextNum }}話)を読む
        </router-link>
      </div>
      <div class="link-button">
        <router-link :to="`/series/${seriesId}/books/${getLeatestBookId}/viewer`">
          最新話を読む
        </router-link>
      </div>
    </div>
    <div class="thumbnail-wrapper">
      <img v-lazy="thumbnailUrl" />
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import VueLazyload from 'vue-lazyload';

Vue.use(VueLazyload, {
  preLoad: 2,
  attempt: 3,
});

export default {
  name: 'book',
  props: {
    seriesId: String,
    title: String,
    author: String,
    publisher: String,
    thumbnailUrl: String,
    books: Object,
  },
  computed: {
    getBooks() {
      return this.books[this.seriesId];
    },
    getFirstBookId() {
      const books = this.getBooks;
      return books ? books[0].id : '';
    },
    getLeatestBookId() {
      const books = this.getBooks;
      return books ? books[books.length - 1].id : '';
    },
    getNextNum() {
      return this.$store.state.nextStory[this.seriesId]
        ? this.$store.state.nextStory[this.seriesId].index + 1 : 1;
    },
    getNextBookId() {
      return this.$store.state.nextStory[this.seriesId]
        ? this.$store.state.nextStory[this.seriesId].bookId : '';
    },
  },
};
</script>

<style scoped>
.book {
  width: 300px;
  min-height: 150px;
  display: flex;
  align-items: center;
  margin: 10px;
  border-radius: 3px;
  box-shadow: 3px 3px 3px rgba(0,0,0,0.4);
}

.info-wrapper {
  flex-grow: 2;
  padding: 5px;
}

.thumbnail-wrapper {
  width: 30%;
  padding: 5px;
}

.title {
  font-size: 1.2em;
}

.link-button > a {
  display: block;
  margin: 10px 5px;
}

img {
  width: 100%;
  vertical-align: bottom;
}
</style>
