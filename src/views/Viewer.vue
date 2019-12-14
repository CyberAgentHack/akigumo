<template>
  <div class="viewer-wrapper">
    <div class="viewer">
      <div class="img-wrapper" :class="{zoom: isZoom && (clickedIndex === index)}"
        @mousedown="onMouseDown($event, index)" @mouseup="onMouseUp"
        v-for="(page, index) in pages" :key = "'page-' + index">
        <img v-lazy="page" :key="'img-' + index" />
      </div>
    </div>
    <div class="controller-wapper" :style="{height: controllerWrapperHeight + 'px'}">
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
      beforeY: null,
      clickedIndex: null,
      isZoom: false,
      controllerWrapperHeight: null,
    };
  },
  created() {
    const id = this.$route.params.bookId;
    bookApi.getBookById(id)
      .then((res) => {
        const { imageData, height } = res.data;
        this.pages = imageData.map(image => image.imageUrl);
        this.controllerWrapperHeight = Math.floor(height / 3) * 2;
      });
  },
  methods: {
    onMouseDown(e, index) {
      console.log(e);
      this.isZoom = true;
      this.clickedIndex = index;
      this.beforeY = window.pageYOffset;
      window.scrollTo({ top: e.pageY });
    },
    onMouseUp() {
      this.isZoom = false;
      window.scrollTo({ top: this.beforeY });
    },
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

.zoom {
  width: 100%;
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

.controller-wapper {
  background-color: rgba(0, 0, 0, 0.8);
}

@media screen and (max-width: 1024px) {
  .img-wrapper {
    width: 100%;
  }
}
</style>
