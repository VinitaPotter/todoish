<template>
  <div class="flex bg-white h-screen" @click.capture="closeDropdowns">
    <div class="calendar w-2/5">
      <calendar @selected="filterDate = $event" />
    </div>

    <div
      class="todos bg-pink-100 w-3/5 rounded-lg m-4 relative overflow-x-auto overflow-x-hidden has-slimscroll"
    >
      <p
        v-if="filterDate"
        class="text-3xl text-center mt-5 font-medium text-blue-800"
      >{{filterDate.toLocaleString('default',{day:'2-digit', month: 'long', year: 'numeric'})}}</p>
      <p
        v-else
        class="text-3xl text-center mt-5 font-medium text-blue-800"
      >{{new Date().toLocaleString('default',{day:'2-digit', month: 'long', year: 'numeric'})}}</p>

      <p
        @click="$emit('create', filterDate)"
        class="cursor-pointer font-medium right-0 mt-5 absolute mr-5 border py-2 px-4 rounded-md bg-red-600 hover:bg-blue-700 text-white hover:shadow-md"
      >
        <icon icon="plus" />
        <span class="ml-2">Add new</span>
      </p>

      <div v-if="groupedTodos && Object.keys(groupedTodos).length">
        <div v-for="(todos, i) in groupedTodos" :key="i" class="m-3">
          <p
            class="font-medium text-xl mt-10 bg-red-400 inline-block h-10 text-white py-1 px-3 relative"
            style="top:7px"
            :class="[i == 'Todo' ? 'bg-indigo-300' : i == 'InProgress' ? 'bg-purple-300' : 'bg-pink-300']"
          >{{i}}</p>
          <div class="shadow-md rounded-lg" @click.capture="closeDropdowns">
            <div
              v-for="todo in todos"
              :key="todo.id"
              class="bg-white h-15 p-4 border-b"
              @mouseenter="hover = todo.id"
              @mouseleave="hover = -1"
              :class="[i == 'Todo' ? 'hover:bg-indigo-100' : i == 'InProgress' ? 'hover:bg-purple-100' : 'hover:bg-pink-100']"
            >
              <div class="flex justify-between">
                <div class="flex">
                  <p
                    class="mr-2 cursor-pointer"
                    title="Remove"
                    @click="deleteTodo(todo.id)"
                    :class="[hover == todo.id ? 'visible' : 'invisible']"
                  >
                    <icon icon="minus" />
                  </p>
                  <input
                    type="text"
                    v-if="editName == todo.id"
                    @keyup.enter="editName = -1;update(todo)"
                    v-model="todo.name"
                    v-focus
                    class="focus:outline-none w-48 mr-5"
                  />
                  <p
                    v-else
                    @click="editName = todo.id"
                    class="mr-5 cursor-pointer w-48 z-30 truncate"
                    title="Edit name"
                  >
                    <span class="block">{{todo.name}}</span>
                    <span
                      class="inline-block text-gray-600 text-xs"
                    >At {{todo.location ? todo.location : 'Anywhere'}}</span>
                  </p>

                  <div class="dropdown inline-block relative">
                    <button
                      class="focus:outline-none py-1 px-3 appearance-none leading-normal text-gray-800 rounded inline-flex items-center w-24"
                      :class="[todo.priority == 'Low' ? 'bg-gray-200' : todo.priority == 'Medium' ? 'bg-teal-200' : 'bg-red-300']"
                      @click="showPriority == todo.id ? showPriority = -1 : showPriority = todo.id"
                    >
                      <span class="mr-2">{{todo.priority}}</span>
                      <icon
                        icon="angle-down"
                        class="pt-1"
                        :class="[hover == todo.id ? 'visible' : 'invisible']"
                      />
                    </button>
                    <ul
                      class="dropdown-menu shadow-md absolute text-gray-700 pt-1 z-50"
                      :class="[showPriority == todo.id?  'visible' : 'hidden' ] "
                    >
                      <li class @click="todo.priority='Low';showPriority = -1;update(todo)">
                        <a
                          class="rounded-t bg-white hover:bg-red-100 py-2 px-4 block whitespace-no-wrap"
                          href="#"
                        >Low</a>
                      </li>
                      <li class @click="todo.priority='Medium';showPriority = -1;update(todo)">
                        <a
                          class="bg-white hover:bg-red-100 py-2 px-4 block whitespace-no-wrap"
                          href="#"
                        >Medium</a>
                      </li>
                      <li class @click="todo.priority='High';showPriority = -1;update(todo)">
                        <a
                          class="rounded-b bg-white hover:bg-red-100 py-2 px-4 block whitespace-no-wrap"
                          href="#"
                        >High</a>
                      </li>
                    </ul>
                  </div>
                </div>
                <input
                  type="date"
                  name="date"
                  :min="new Date()"
                  id
                  v-model="todo.endTime"
                  @input="update(todo);addDuedate = -1"
                  v-if="addDuedate == todo.id"
                />
                <div
                  :class=" [todo.endTime ? isOverdue(todo.endTime) ? 'text-red-500' : 'text-dark' : 'text-gray-400']"
                  v-else
                  class="w-32"
                  @click="addDuedate = todo.id"
                >{{todo.endTime ? new Date(todo.endTime).toLocaleString('default', {day: '2-digit', month: 'long', year: 'numeric'}) : 'Add duedate'}}</div>

                <div class="dropdown inline-block relative">
                  <button
                    class="bg-transparent focus:outline-none py-1 px-3 appearance-none leading-normal text-black rounded inline-flex items-center w-24"
                    @click="showStatus == todo.id ? showStatus = -1 : showStatus = todo.id"
                  >
                    <span class="mr-2">{{todo.status}}</span>
                    <icon
                      icon="angle-down"
                      class="pt-1"
                      :class="[hover == todo.id ? 'visible' : 'invisible']"
                    />
                  </button>
                  <ul
                    class="dropdown-menu shadow-md absolute text-gray-700 pt-1 z-50"
                    :class="[showStatus == todo.id?  'visible' : 'hidden' ] "
                  >
                    <li class @click="todo.status='Todo';showStatus = -1;update(todo)">
                      <a
                        class="rounded-t bg-white hover:bg-red-100 py-2 px-4 block whitespace-no-wrap"
                        href="#"
                      >Todo</a>
                    </li>
                    <li class @click="todo.status='InProgress';showStatus = -1;update(todo)">
                      <a
                        class="bg-white hover:bg-red-100 py-2 px-4 block whitespace-no-wrap"
                        href="#"
                      >In progress</a>
                    </li>
                    <li class @click="todo.status='Done';showStatus = -1;update(todo)">
                      <a
                        class="rounded-b bg-white hover:bg-red-100 py-2 px-4 block whitespace-no-wrap"
                        href="#"
                      >Done</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else-if="groupedTodos && !Object.keys(groupedTodos).length" class="w-3/4 m-auto">
        <img
          src="../../../assets/images/done.jpg"
          alt="<a href='https://www.freepik.com/free-photos-vectors/check'>Check vector created by stories - www.freepik.com</a>"
          class="bg-fixed h-auto"
        />
      </div>
      <div v-else>
        <img
          src="../../../assets/images/notfound.jpg"
          alt="<a href='https://www.freepik.com/free-photos-vectors/check'>Check vector created by stories - www.freepik.com</a>"
          class="bg-fixed h-auto"
        />
      </div>
    </div>
    <div class="absolute top-0">
      <todo :todo="show_todo" @close="show_todo = null" v-if="show_todo"></todo>
    </div>
  </div>
</template>

<script lang="ts">
import { mapState } from "vuex";
import { Component, Vue } from "vue-property-decorator";
import { directive as onClickaway } from "vue-clickaway";
import calendar from "./calendar.vue";
import TodoService from "../../../services/todoService";

import todo from "./todo.vue";
import _ from "lodash";

@Component({
  directives: {
    onClickaway: onClickaway
  },

  computed: {
    ...mapState(["todos"]),
    groupedTodos() {
      if (this.todos && this.todos.length) {
        if (this.filterDate) {
          return _.groupBy(
            _.filter(
              this.todos,
              todo =>
                new Date(todo.endTime).toLocaleDateString() ==
                new Date(this.filterDate).toLocaleDateString()
            ),
            "status"
          );
        } else {
          return _.groupBy(this.todos, "status");
        }
      } else {
        return null;
      }
    }
  },

  components: {
    todo,
    calendar
  }
})
export default class Todos extends Vue {
  editName = -1;
  showPriority = -1;
  showStatus = -1;
  addDuedate = -1;
  todoService = new TodoService();
  show_todo = null;
  filterDate = null;
  hover = -1;

  async deleteTodo(id) {
    const body = { id: id };
    this.$store.dispatch("removeTodo", id);
    const res = await this.todoService.deleteTodo({ req: body });
    this.$emit("close");
  }
  async update(todo) {
    this.$store.dispatch("updateTodo", todo);
    const res = await this.todoService.update({ req: todo });
  }
  isOverdue(time) {
    if (time) {
      return (
        new Date(time).getDate() > new Date().getDate() &&
        new Date(time).getMonth() < new Date().getMonth()
      );
    } else {
      return false;
    }
  }
  closeDropdowns() {
    this.editName != -1 ? (this.editName = -1) : null;
    this.showStatus != -1 ? (this.showStatus = -1) : null;
    this.addDuedate != -1 ? (this.addDuedate = -1) : null;
    this.showPriority != -1 ? (this.showPriority = -1) : null;
  }
}
</script>

<style>
.has-slimscroll ::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  background-color: #f5f5f5;
}

.has-slimscroll::-webkit-scrollbar {
  width: 2px;
  background-color: #f5f5f5;
}

.has-slimscroll::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #fbb6ce;
}
</style>