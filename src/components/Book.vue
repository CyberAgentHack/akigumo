<template>
  <div class="book">
    <div class="info-wrapper">
      <div class="title"> {{ title }}</div>
      <div class="sub-info">{{ author }}&nbsp;/&nbsp;{{ publisher }}</div>

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
    title: String,
    author: String,
    publisher: String,
    thumbnailUrl: String,
  },
};
</script>

<style>
.book {
  width: 300px;
  height: 150px;
  display: flex;
  align-items: center;
  margin: 10px;
  border-radius: 3px;
  box-shadow: 3px 3px 3px rgba(0,0,0,0.4);
}

.info-wrapper {
  flex-grow: 2;
}

.thumbnail-wrapper {
  width: 30%;
  padding: 5px;
}

.title {
  font-size: 1.2em;
}

img {
  width: 100%;
  vertical-align: bottom;
}
</style>
