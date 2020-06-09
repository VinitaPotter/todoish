import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    token: null
  },
  mutations: {
    ADD_USER(state, payload) {
      state.user = (payload);
    },
    ADD_TOKEN(state, payload) {
      state.token = payload
    }
  },
  actions: {
    addAuthentication(context, payload) {
      context.commit('ADD_USER', payload.data.user);
      context.commit('ADD_TOKEN', payload.token);
    }
  },
  modules: {

  }
});
