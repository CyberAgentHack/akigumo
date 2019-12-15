<template>
  <div class="detail">
    <div class="thumbnail">
      <img :src="imgUrl" />
    </div>
    <div class="info">
      <div class="title">
        {{ title }}
      </div>
      <div class="author">
        著者名：{{ author }}
      </div>
      <div class="publisher">
        出版社：{{ publisher }}
      </div>
      <div class="description">
        {{ description }}
      </div>
      <div class="links">
        <div class="link" v-for="(book, index) in books" :key="'book-' + index">
          <router-link :to="`/series/${seriesId}/books/${book.id}/viewer`">
            第 {{ index + 1 }} 話を読む
          </router-link>
        </div>
      </div>
      <div>
        <router-link to="/series">
          一覧に戻る
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import seriesApi from '@/modules/api/seriesApi';

export default {
  name: 'detail',
  data() {
    return {
      seriesId: '',
      title: '',
      author: '',
      publisher: '',
      description: '',
      imgUrl: '',
      books: [],
    };
  },
  created() {
    this.seriesId = this.$route.params.id;
    seriesApi.getSeriesById(this.seriesId)
      .then((res) => {
        const {
          title,
          author,
          publisher,
          description,
          seriesImage,
          books,
        } = res.data;

        this.title = title;
        this.author = author;
        this.publisher = publisher;
        this.description = description;
        this.imgUrl = seriesImage;
        this.books = books;
      });
  },
};
</script>

<style scoped>
.detail {
  padding: 10px;
  display: flex;
  justify-content: center;
}

.thumbnail {
  height: 300px;
}

.thumbnail > img {
  height: 100%;
  width: auto;
}

.title {
  padding: 10px;
  font-size: 2em;
}

.description {
  padding: 10px;
  margin: auto;
  width: 80%;
}

.links {
  margin: 10px;
}

.link {
  margin: 5px;
}

</style>
