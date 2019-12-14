<template>
  <div class="viewer">
    <div class="img-wrapper" v-for="(page, index) in pages" :key = "'page-' + index">
      <img v-lazy="page" />
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import VueLazyload from 'vue-lazyload';
import bookApi from '@/modules/api/bookApi';

Vue.use(VueLazyload, {
  preLoad: 2,
  attempt: 3,
});

export default {
  name: 'viewer',
  data() {
    return {
      pages: [],
    };
  },
  created() {
    const id = 'v5pk62cy';
    bookApi.getBookById(id)
      .then((res) => {
        const { imageData } = res.data;
        this.pages = imageData.map(image => image.imageUrl);
      });
  },
};
</script>

<style>
.viewer {
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.img-wrapper {
  width: 60%;
}

img {
  width: 100%;
}

.v-lazy-image {
  filter: blur(10px);
  transition: filter 0.7s;
}

.v-lazy-image-loaded {
  filter: blur(0);
}
</style>
