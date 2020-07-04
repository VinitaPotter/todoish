<template>
  <div class="absolute h-full w-screen top-0 z-50 bg-pink-100">
    <img src="../../../assets/images/create.svg" alt class="bg-fixed h-screen lg:visible invisible" />
    <div
      class="lg:w-2/5 w-full m-auto fixed overflow-x-auto h-screen has-slimscroll"
      style="top:50%;left:50%;transform: translate(-50%, -50%);"
    >
      <div class="bg-white rounded-lg border p-6">
        <div class="flex justify-between align-middle">
          <p class="font-semibold text-center h-8 leading-10 text-2xl">Create a new item</p>
          <p @click="$emit('close')">
            <icon icon="times" />
          </p>
        </div>

        <div class="mt-8">
          <label class="text-gray-600" for="title">What do you want to do?</label>
          <input
            class="bg-white focus:outline-none border border-gray-300 rounded-lg p-2 block w-full appearance-none leading-normal"
            type="text"
            placeholder="Title"
            id="title"
            v-model="name"
          />
        </div>
        <div class="mt-8">
          <label class="text-gray-600" for="title">Describe what you want to accomplish</label>
          <input
            class="bg-white focus:outline-none border border-gray-300 rounded-lg p-2 block w-full appearance-none leading-normal"
            type="text"
            v-model="details"
            placeholder="Description"
          />
        </div>
        <div class="mt-8">
          <p class="text-gray-600" for="title">How urgent is it?</p>
          <div class="dropdown inline-block relative">
            <button
              class="bg-white focus:outline-none border border-gray-300 p-2 w-full appearance-none leading-normal text-gray-700 rounded inline-flex items-center"
            >
              <span class="mr-1">{{priority}}</span>
              <icon icon="angle-down" />
            </button>
            <ul class="dropdown-menu shadow-md absolute hidden text-gray-700 pt-1 z-50">
              <li class @click="priority='low'">
                <a
                  class="rounded-t bg-white hover:bg-red-100 py-2 px-4 block whitespace-no-wrap"
                  href="#"
                >Low</a>
              </li>
              <li class @click="priority='medium'">
                <a
                  class="bg-white hover:bg-red-100 py-2 px-4 block whitespace-no-wrap"
                  href="#"
                >Medium</a>
              </li>
              <li class @click="priority='high'">
                <a
                  class="rounded-b bg-white hover:bg-red-100 py-2 px-4 block whitespace-no-wrap"
                  href="#"
                >High</a>
              </li>
            </ul>
          </div>
        </div>
        <div class="mt-8">
          <p class="text-gray-600" for="title">What stage are you currently on?</p>

          <div class="dropdown inline-block relative">
            <button
              class="bg-white focus:outline-none border border-gray-300 p-2 w-full appearance-none leading-normal text-gray-700 rounded inline-flex items-center"
            >
              <span class="mr-1">{{status}}</span>
              <icon icon="angle-down" />
            </button>
            <ul class="dropdown-menu shadow-md absolute hidden text-gray-700 pt-1">
              <li class @click="status='Todo'">
                <a
                  class="rounded-t bg-white hover:bg-red-100 py-2 px-4 block whitespace-no-wrap"
                  href="#"
                >Todo</a>
              </li>
              <li class @click="status='InProgress'">
                <a
                  class="bg-white hover:bg-red-100 py-2 px-4 block whitespace-no-wrap"
                  href="#"
                >In Progress</a>
              </li>
              <li class>
                <a
                  class="select-none cursor-not-allowed rounded-b bg-white hover:bg-red-100 py-2 px-4 block whitespace-no-wrap"
                  href="#"
                >Done</a>
              </li>
            </ul>
          </div>
        </div>
        <!-- <div class="mt-8">
          <p class="text-gray-600" for="title">What stage are you currently on?</p>

          <div class="dropdown inline-block relative">
            <button
              class="bg-white focus:outline-none border border-gray-300 p-2 w-full appearance-none leading-normal text-gray-700 rounded inline-flex items-center"
            >
              <span class="mr-1">{{level}}</span>
              <icon icon="angle-down" />
            </button>
            <ul class="dropdown-menu shadow-md absolute hidden text-gray-700 pt-1">
              <li class @click="level='1'">
                <a
                  class="rounded-t bg-white hover:bg-red-100 py-2 px-4 block whitespace-no-wrap"
                  href="#"
                >1 (Just starting)</a>
              </li>
              <li class @click="level='2'">
                <a
                  class="bg-white hover:bg-red-100 py-2 px-4 block whitespace-no-wrap"
                  href="#"
                >2 (Already started)</a>
              </li>
              <li class>
                <a
                  class="select-none cursor-not-allowed rounded-b bg-white hover:bg-red-100 py-2 px-4 block whitespace-no-wrap"
                  href="#"
                >3 (Intermediate)</a>
              </li>
              <li class>
                <a
                  class="select-none cursor-not-allowed rounded-b bg-white hover:bg-red-100 py-2 px-4 block whitespace-no-wrap"
                  href="#"
                >4 (Advance)</a>
              </li>
              <li class>
                <a
                  class="select-none cursor-not-allowed rounded-b bg-white hover:bg-red-100 py-2 px-4 block whitespace-no-wrap"
                  href="#"
                >5 (Expert)</a>
              </li>
            </ul>
          </div>
        </div>-->
        <!-- <div class="mt-8">
          <label class="text-gray-600" for="title">What time will you start performing this habit?</label>
          <input
            class="bg-white focus:outline-none border border-gray-300 rounded-lg p-2 block w-full appearance-none leading-normal"
            type="time"
            v-model="startTime"
            placeholder="Start Time"
          />
        </div>
        <div class="mt-8">
          <label class="text-gray-600" for="title">Till What time will you be performing this habit?</label>
          <input
            class="bg-white focus:outline-none border border-gray-300 rounded-lg p-2 block w-full appearance-none leading-normal"
            type="time"
            v-model="endTime"
            placeholder="End Time"
          />
        </div>-->
        <!-- <div class="mt-8">
          <p class="text-gray-600" for="title">For how long?</p>
          <div class="dropdown inline-block relative">
            <button
              class="bg-white focus:outline-none border border-gray-300 p-2 w-full appearance-none leading-normal text-gray-700 rounded inline-flex items-center"
            >
              <span class="mr-1">{{duration}} minutes</span>
              <icon icon="angle-down" />
            </button>
            <ul class="dropdown-menu shadow-md absolute hidden text-gray-700 pt-1">
              <li
                class
                @click="duration = time"
                v-for="time in [2, 5, 10, 15, 20, 30, 45, 60, 90]"
                :key="time"
              >
                <a
                  class="rounded-t bg-white hover:bg-red-100 py-2 px-4 block whitespace-no-wrap"
                  href="#"
                >{{time}}</a>
              </li>
            </ul>
          </div>
        </div>-->
        <div class="mt-8">
          <label class="text-gray-600" for="title">
            Categories by location
            <span class="text-gray-400">(Home, office, library)</span>
          </label>
          <input
            v-model="location"
            class="bg-white focus:outline-none border border-gray-300 rounded-lg p-2 block w-full appearance-none leading-normal"
            type="text"
            placeholder="Where"
          />
        </div>

        <!-- <p class="text-gray-700">
          <input type="checkbox" v-model="reminder" name="remember" id="remember" class="mr-2" />
          <label for="remember">Remind me daily</label>
        </p>-->

        <div
          @click="create"
          class="bg-red-400 h-10 w-32 rounded-md text-center text-white p-2 mt-8 ml-auto cursor-pointer"
        >Submit</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
// @ts-nocheck

import { Component, Vue } from "vue-property-decorator";
import TodoService from "../../../services/todoService";

@Component({
  props: ["date"]
})
export default class CreateNew extends Vue {
  todoService = new TodoService();
  public user!: object;
  priority = "Low";
  level = 1;
  status = "Todo";
  startTime = null;
  reminder = false;
  name = null;
  endTime = this.date;
  details = null;
  location = null;

  async create() {
    if (!this.name || !this.name.length) {
      alert("Title is required");
      return;
    }
    const todo = {
      priority: this.priority,
      level: this.level,
      status: this.status,
      startTime: this.startTime,
      reminder: this.reminder,
      name: this.name,
      endTime: this.endTime,
      details: this.details,
      location: this.location
    };
    const { data } = await this.todoService
      .create({ req: todo })
      .catch(err => console.log(err));
    this.$store.dispatch("addTodo", data.data.todo);
    this.$emit("close");
  }
}
</script>



<style lang="scss" scoped>
.dropdown:hover .dropdown-menu {
  display: block;
}
</style>