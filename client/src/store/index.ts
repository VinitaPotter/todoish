import Vue from "vue";
import Vuex from "vuex";
import _ from "lodash";

Vue.use(Vuex);



export default new Vuex.Store({
  state: {
    user: null,
    token: null,
    todos: new Array()
  },
  mutations: {
    ADD_USER(state, payload) {
      state.user = (payload);
    },
    ADD_TOKEN(state, payload) {
      state.token = payload
    },
    ADD_TODO(state, payload) {
      state.todos.push(payload)
    },
    ADD_TODOS(state, payload) {
      state.todos = payload

    },
    REMOVE_TODO(state, payload) {
      state.todos = _.remove(state.todos, (todo) => todo.id != payload)

    },
    UPDATE_TODO(state, payload) {
      const index = _.findIndex(state.todos, function (todo) { return todo.id == payload.id; });
      state.todos[index] = payload;
      state.todos = Object.assign(state.todos)
    }
  },
  actions: {
    addAuthentication(context, payload) {
      context.commit('ADD_USER', payload.data.user);
      context.commit('ADD_TOKEN', payload.token);
    },
    addTodo(context, payload) {
      context.commit('ADD_TODO', payload);
    },
    addTodos(context, payload) {
      context.commit('ADD_TODOS', payload)
    },
    removeTodo(context, payload) {
      context.commit('REMOVE_TODO', payload)
    },
    updateTodo(context, payload) {
      context.commit('UPDATE_TODO', payload)
    }
  },

  modules: {

  }
});
