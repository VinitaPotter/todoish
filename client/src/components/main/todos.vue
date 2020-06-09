<template>
  <div>
    <todo-list @create="create_new = true"></todo-list>
    <create-todo @close="create_new = false" v-if="create_new"></create-todo>
  </div>
</template>


<script lang="ts">
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
  create_new = false;
  async created() {
    const res = await TodoService.getAll();
    console.log(res);
  }
}
</script>
<style></style>;
