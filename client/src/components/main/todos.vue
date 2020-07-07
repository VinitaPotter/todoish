<template>
  <div>
    <div class="z-50 bg-red-200 text-red-900 w-full h-16 lg:h-8 text-center m-auto">
      <p
        class="font-medium"
      >Your email is unverified. Please confirm you email for the same benefits as unverified emails 😝!</p>
    </div>
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
