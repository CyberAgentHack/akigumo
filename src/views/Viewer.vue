<template>
  <div class="viewer-wrapper">
    <div class="viewer-header">
      <router-link class="link" to="/series">&lt;作品一覧へ</router-link>
      <div class="page-count">
        {{ title }} ( {{ currentPage }} / {{ getPageCount }} )
      </div>
      <div></div>
    </div>
    <div class="viewer">
      <div class="vertical-scroll" v-if="isVerticalScroll">
        <div class="img-wrapper-v" :class="{zoom: isZoom && (clickedIndex === index)}"
          @mousedown="onMouseDown($event, index)" @mouseup="onMouseUp"
          v-for="(page, index) in pages" :key = "'page-' + index" :imgindex="index + 1">
          <img v-lazy="page" :key="'img-' + index" />
        </div>
      </div>
      <div class="horizon-scroll" v-else>
        <div class="img-wrapper-h" :class="{zoom: isZoom}"
          @mousedown="onMouseDown($event)" @mouseup="onMouseUp"
          :imgindex="currentPage - 1">
          <img v-lazy="getCurrentPage" />
        </div>
      </div>
    </div>
    <div v-if="isVerticalScroll" class="controller-wapper"
      :style="{height: controllerWrapperHeight + 'px'}">
    </div>
    <div v-if="!isVerticalScroll">
      <div class="next" @click="nextPage()">
      </div>
      <div class="prev" @click="prevPage()">
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import VueLazyload from 'vue-lazyload';
import seriesApi from '@/modules/api/seriesApi';
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
      seriesId: '',
      title: '',
      pages: [],
      books: [],
      beforeY: null,
      clickedIndex: null,
      isZoom: false,
      controllerWrapperHeight: null,
      currentPage: 1,
      isRead: false,
      isVerticalScroll: true,
    };
  },
  created() {
    this.isVerticalScroll = this.$store.state.scrollType === 0;
    const id = this.$route.params.bookId;
    bookApi.getBookById(id)
      .then((res) => {
        const {
          title,
          seriesId,
          imageData,
          height,
        } = res.data;
        this.pages = imageData.map(image => image.imageUrl);
        this.title = title;
        this.controllerWrapperHeight = Math.floor(height / 3) * 2;
        this.seriesId = seriesId;
        return seriesApi.getSeriesById(seriesId);
      })
      .then((res) => {
        this.books = res.data.books;
      });
  },
  updated() {
    if (!this.isVerticalScroll) {
      return;
    }
    const targetClass = this.isVerticalScroll ? '.img-wrapper-v' : '.img-wrapper-h';
    const targets = document.querySelectorAll(targetClass);
    observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.intersectionRatio <= 0) {
          return;
        }
        this.currentPage = Number(entry.target.getAttribute('imgindex'));
        // つづきを更新
        if (this.currentPage === this.pages.length && !this.isRead) {
          const currentStory = this.$store.state.nextStory[this.seriesId];
          const index = currentStory.index !== this.books.length - 1 ? currentStory.index + 1 : 0;
          this.$store.dispatch('doSetNextStory', {
            seriesId: this.seriesId,
            index,
            bookId: this.books[index].id,
          });
          this.isRead = true;
        }
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
    updateNextStory() {
      if (!this.isRead) {
        const currentStory = this.$store.state.nextStory[this.seriesId];
        const index = currentStory.index !== this.books.length - 1 ? currentStory.index + 1 : 0;
        this.$store.dispatch('doSetNextStory', {
          seriesId: this.seriesId,
          index,
          bookId: this.books[index].id,
        });
        this.isRead = true;
      }
    },
    nextPage() {
      if (this.currentPage === this.pages.length) {
        return;
      }
      this.currentPage += 1;
      if (this.currentPage === this.pages.length) {
        this.updateNextStory();
      }
    },
    prevPage() {
      if (this.currentPage === 1) {
        return;
      }
      this.currentPage -= 1;
    },
  },
  computed: {
    getPageCount() {
      return this.pages.length;
    },
    getNextStoryUrl() {
      const currentStory = this.$store.state.nextStory[this.seriesId];
      if (!currentStory) {
        return '';
      }
      const index = currentStory.index !== this.books.length - 1 ? currentStory.index + 1 : 0;
      if (!this.books[index]) {
        return '';
      }
      return `/series/${this.seriesId}/books/${this.books[index].id}/viewer`;
    },
    getCurrentPage() {
      return this.pages[this.currentPage - 1] ? this.pages[this.currentPage - 1] : '';
    },
  },
  beforeRouteUpdate(to, from, next) {
    next();
  },
};
</script>

<style scoped>
.viewer, .vertical-scroll {
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
  z-index: 1000;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.9);
}

.img-wrapper-v {
  width: 60%;
}

.img-wrapper-h {
  margin-top: 50px;
  height: calc(100vh - 50px);
}

.zoom {
  height: auto;
  width: 100vw;
}

.img-wrapper-v > img {
  width: 100%;
}

.img-wrapper-h > img {
  height: 100%;
  width: auto;
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

.page-count, .link {
  color: white;
}

.link {
  padding-left: 10px;
}

.next {
  width: 20vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0);
  position: fixed;
  left: 0;
  top: 0;
}

.next:hover {
  background-color: rgba(0, 0, 0, 0.9);
}

.prev {
  width: 20vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0);
  position: fixed;
  right: 0;
  top: 0;
}

.prev:hover {
  background-color: rgba(0, 0, 0, 0.9);
}

@media screen and (max-width: 1024px) {
  .img-wrapper {
    width: 100%;
  }
}
</style>
