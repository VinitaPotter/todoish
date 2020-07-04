<template>
  <div class="m-16 shadow-md rounded relative">
    <div class="nav flex justify-between px-8 py-4 border">
      <div class="font-semibold">Todoish</div>
      <div class="nav-items flex justify-between w-3/12">
        <p class="font-medium">Tracker</p>
        <p class="font-medium">Statistics</p>
        <p class="font-medium">Friends</p>
      </div>
      <div class="font-medium">Current User</div>
    </div>
    <div class="main py-8 pl-8 bg-red-200">
      <div class="card ml-8 bg-white rounded-lg rounded-r-none rounded-b-none flex">
        <div class="habits-card w-1/3">
          <div class="header h-16 leading-8 flex justify-between border px-10">
            <p>My habits</p>
            <p>{{new Date().toLocaleString('default', { month: 'long', year: 'numeric' })}}</p>
          </div>
          <div class="list h-16 leading-8">
            <p
              @click="show_todo= todo"
              class="h-16 leading-8 text-center border cursor-pointer hover:bg-red-200"
              v-for="todo in todos"
              :key="todo._id"
            >{{todo.name}}</p>
          </div>
        </div>
        <div class="cal-card flex justify-between w-2/3">
          <div
            class="text-center bg-red-100 flex"
            style="box-shadow:inset 6px 0px 36px 8px rgba(0, 0, 0, 0.06)"
          >
            <div v-for="i in [5, 4, 3, 2, 1]" :key="i" class="w-24 border-r">
              <div class="header h-16 leading-8 text-center border-l border-b">{{ getPrevDate(i)}}</div>
              <div class="list">
                <p class="h-16 leading-8" v-for="i in todos.length" :key="i">*</p>
              </div>
            </div>
          </div>
          <div class="border-r w-32 text-center">
            <div class="header h-16 leading-8 text-center border-l border-b font-semibold">Today</div>
            <div class="list">
              <p class="h-16 leading-8" v-for="j in todos.length" :key="j">
                <input type="checkbox" name id />
              </p>
            </div>
          </div>
          <div class="border-r w-32 text-center">
            <div class="header h-16 leading-8 text-center border-l border-b">{{getNextDate(1) }}</div>
            <div class="list">
              <p class="h-16 leading-8" v-for="k in todos.length" :key="k">*</p>
            </div>
          </div>
          <div class="border-r w-32 text-center">
            <div class="header h-16 leading-8 text-center border-l border-b">{{getNextDate(2) }}</div>
            <div class="list">
              <p class="h-16 leading-8" v-for="l in todos.length" :key="l">*</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="w-12 absolute right-0 bottom-0 m-4 cursor-pointer" @click="$emit('create')">
      <img src="../../../assets/icons/plus.svg" alt />
    </div>
    <todo :todo="show_todo" @close="show_todo = null" v-if="show_todo"></todo>
  </div>
</template>

<script lang="ts">
import { mapState } from "vuex";
import { Component, Vue } from "vue-property-decorator";
import todo from "./todo.vue";

@Component({
  computed: {
    ...mapState(["todos"])
  },

  components: {
    todo
  }
})
export default class Todos extends Vue {
  getNextDate(val: number) {
    const date = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate() + val
    );
    return date.toLocaleString("default", { day: "2-digit" });
  }
  getPrevDate(val: number) {
    const date = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate() - val
    );
    return date.toLocaleString("default", { day: "2-digit" });
  }

  show_todo = null;
}
</script>

<style>
</style>