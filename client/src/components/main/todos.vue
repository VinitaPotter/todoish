<template>
  <div>
    <todo-list @create="createTodo"></todo-list>
    <create-todo @close="createnew = false" v-if="createnew" :date="defaultDate"></create-todo>
  </div>
</template>


<script lang="ts">
// @ts-nocheck
import { Component, Vue } from "vue-property-decorator";
import TodoService from "../../services/todoService";
import TodoList from "./components/list.vue";
import CreateTodo from "./components/create.vue";

@Component({
  components: {
    TodoList,
    CreateTodo
  }
})
export default class Todo extends Vue {
  createnew = false;
  defaultDate = null;
  async created() {
    const { data } = await TodoService.getAll();

    if (data) {
      this.$store.dispatch("addTodos", data.data.todos);
    }
  }
  createTodo(date) {
    (this.createnew = true), (this.defaultDate = date);
  }
}
</script>
<style></style>;
