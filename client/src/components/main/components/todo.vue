<template>
  <div class="absolute h-full w-full z-50 bg-red-200 bg-opacity-50" style="top:50%">
    <div
      v-on-clickaway="() => $emit('close')"
      class="w-1/2 m-auto absolute bg-white p-10 shadow-md rounded-md"
      style="top:50%;left:50%;transform: translate(-50%, -50%);"
    >
      <p class="font-medium text-2xl">{{todo.name}}</p>
      <p class="font-medium text-red-400">{{todo.details}}</p>
      <p class="absolute cursor-pointer" @click="deleteTodo" style="top:3rem;right:3rem">
        <icon icon="trash-alt" />
      </p>
      <div class="mt-8">
        <p class="text-gray-600" for="title">Priority</p>
        <div class="dropdown inline-block relative">
          <button
            class="bg-white focus:outline-none border border-gray-300 p-2 w-full appearance-none leading-normal text-gray-700 rounded inline-flex items-center"
          >
            <span class="mr-1">{{todo.priority}}</span>
            <icon icon="angle-down" />
          </button>
          <ul class="dropdown-menu shadow-md absolute hidden text-gray-700 pt-1 z-50">
            <li class @click="todo.priority='low'">
              <a
                class="rounded-t bg-white hover:bg-red-100 py-2 px-4 block whitespace-no-wrap"
                href="#"
              >Low</a>
            </li>
            <li class @click="todo.priority='medium'">
              <a
                class="bg-white hover:bg-red-100 py-2 px-4 block whitespace-no-wrap"
                href="#"
              >Medium</a>
            </li>
            <li class @click="todo.priority='high'">
              <a
                class="rounded-b bg-white hover:bg-red-100 py-2 px-4 block whitespace-no-wrap"
                href="#"
              >High</a>
            </li>
          </ul>
        </div>
      </div>
      <div class="mt-8">
        <p class="text-gray-600" for="title">Status</p>

        <div class="dropdown inline-block relative">
          <button
            class="bg-white focus:outline-none border border-gray-300 p-2 w-full appearance-none leading-normal text-gray-700 rounded inline-flex items-center"
          >
            <span class="mr-1">{{todo.status}}</span>
            <icon icon="angle-down" />
          </button>
          <ul class="dropdown-menu shadow-md absolute hidden text-gray-700 pt-1">
            <li class @click="todo.status='Todo'">
              <a
                class="rounded-t bg-white hover:bg-red-100 py-2 px-4 block whitespace-no-wrap"
                href="#"
              >Todo</a>
            </li>
            <li class @click="todo.status='InProgress'">
              <a
                class="bg-white hover:bg-red-100 py-2 px-4 block whitespace-no-wrap"
                href="#"
              >In Progress</a>
            </li>
            <li class @click="todo.status='Done'">
              <a
                class="select-none cursor-not-allowed rounded-b bg-white hover:bg-red-100 py-2 px-4 block whitespace-no-wrap"
                href="#"
              >Done</a>
            </li>
          </ul>
        </div>
      </div>
      <!-- <div class="mt-8">
        <label class="text-gray-600" for="title">Start Time</label>
        <input
          type="time"
          class="bg-white focus:outline-none border border-gray-300 rounded-lg p-2 block w-full appearance-none leading-normal"
          v-model="todo.startTime"
          placeholder="Start Time"
        />
      </div>
      <div class="mt-8">
        <label class="text-gray-600" for="title">End time</label>
        <input
          type="time"
          class="bg-white focus:outline-none border border-gray-300 rounded-lg p-2 block w-full appearance-none leading-normal"
          v-model="todo.endTime"
          placeholder="End Time"
        />
      </div>-->
      <div class="mt-8">
        <label class="text-gray-600" for="title">Location</label>
        <input
          v-model="todo.location"
          class="bg-white focus:outline-none border border-gray-300 rounded-lg p-2 block w-full appearance-none leading-normal"
          type="text"
          placeholder="Location"
        />
      </div>
      <!-- <p class="text-gray-700">
        <input type="checkbox" v-model="todo.reminder" name="remember" id="remember" class="mr-2" />
        <label for="remember">Reminder</label>
      </p>-->

      <div
        @click="update"
        class="bg-red-400 h-10 w-32 rounded-md text-center text-white p-2 mt-8 ml-auto cursor-pointer"
      >Update</div>
    </div>
  </div>
</template>
<script lang="ts">
// @ts-nocheck
import { Component, Vue } from "vue-property-decorator";
import { directive as onClickaway } from "vue-clickaway";
import TodoService from "../../../services/todoService";

@Component({
  props: ["todo"],
  directives: {
    onClickaway: onClickaway
  }
})
export default class Todo extends Vue {
  todoService = new TodoService();
  async deleteTodo() {
    const body = { id: this.todo.id };
    this.$store.dispatch("removeTodo", this.todo.id);
    const res = await this.todoService.deleteTodo({ req: body });
    this.$emit("close");
  }
  async update() {
    this.$store.dispatch("removeTodo", this.todo);
    const res = await this.todoService.update({ req: this.todo });
    this.$emit("close");
  }
}
</script>