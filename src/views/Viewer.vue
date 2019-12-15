<template>
  <div class="viewer-wrapper">
    <div class="viewer-header">
      <router-link to="/series">&lt;作品一覧へ</router-link>
      <div class="page-count">
        {{ title }} ( {{ currentPage }} / {{ getPageCount }} )
      </div>
      <router-link to="/series">次の話&gt;</router-link>
    </div>
    <div class="viewer">
      <div class="img-wrapper" :class="{zoom: isZoom && (clickedIndex === index)}"
        @mousedown="onMouseDown($event, index)" @mouseup="onMouseUp"
        v-for="(page, index) in pages" :key = "'page-' + index" :imgindex="index + 1">
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

let observer;

export default {
  name: 'viewer',
  data() {
    return {
      title: '',
      pages: [],
      beforeY: null,
      clickedIndex: null,
      isZoom: false,
      controllerWrapperHeight: null,
      currentPage: 1,
    };
  },
  created() {
    const id = this.$route.params.bookId;
    bookApi.getBookById(id)
      .then((res) => {
        const { title, imageData, height } = res.data;
        this.pages = imageData.map(image => image.imageUrl);
        this.title = title;
        this.controllerWrapperHeight = Math.floor(height / 3) * 2;
      });
  },
  updated() {
    const targets = document.querySelectorAll('.img-wrapper');
    observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.intersectionRatio <= 0) {
          return;
        }
        this.currentPage = Number(entry.target.getAttribute('imgindex'));
      });
    });
    targets.forEach(target => observer.observe(target));
  },
  methods: {
    onMouseDown(e, index) {
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
  computed: {
    getPageCount() {
      return this.pages.length;
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

.viewer-header {
  width: 100vw;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.9);
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

.page-count {
  color: white;
}

@media screen and (max-width: 1024px) {
  .img-wrapper {
    width: 100%;
  }
}
</style>
