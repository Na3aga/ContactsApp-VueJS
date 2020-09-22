import Vue from 'vue';
import Vuex from 'vuex';
import contacts from './modules/contacts'; // store module for whole app  

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    contacts,
  }
})
