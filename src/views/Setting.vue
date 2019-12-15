<template>
  <div class="setting">
    <h2>スクロール方向</h2>
    <label>
      <input type="radio" v-model.number="scrollType" value="0" /> 縦スクロール
    </label>
    <label>
      <input type="radio" v-model.number="scrollType" value="1" /> 横スクロール
    </label>
    <div>
      <router-link to="/series" @click.native="setSetting()">決定</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'setting',
  data() {
    return {
      scrollType: 0,
    };
  },
  created() {
    this.scrollType = this.$store.state.scrollType;
  },
  methods: {
    setSetting() {
      this.$store.dispatch('doSetScrollType', this.scrollType);
      this.$store.dispatch('doSave');
    },
  },
};
</script>

<style scoped>

</style>
