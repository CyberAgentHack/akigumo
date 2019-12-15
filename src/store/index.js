import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isRegistered: false,
    nextStory: {},
    scrollType: 0,
  },
  mutations: {
    save(state) {
      localStorage.setItem('store', JSON.stringify(state));
    },
    load(state) {
      if (localStorage.getItem('store')) {
        const store = JSON.parse(localStorage.getItem('store'));
        this.replaceState(Object.assign(state, store));
      }
    },
    setNextStory(state, val) {
      state.nextStory[val.seriesId] = {
        index: val.index,
        bookId: val.bookId,
      };
    },
    setScrollType(state, type) {
      state.scrollType = type;
    },
  },
  actions: {
    doSave({ commit }) {
      commit('save');
    },
    doLoad({ commit }) {
      commit('load');
    },
    doSetNextStory({ commit }, val) {
      commit('setNextStory', val);
    },
    doSetScrollType({ commit }, type) {
      commit('setScrollType', type);
    },
  },
  modules: {
  },
});
