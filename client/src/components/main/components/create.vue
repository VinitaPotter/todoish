<template>
  <div class="absolute h-screen w-screen top-0 z-50 bg-red-200 bg-opacity-50">
    <img src="../../../assets/images/create.svg" alt class="bg-fixed h-screen" />
    <div
      class="w-2/5 m-auto absolute"
      style="top:50%;left:70%;transform: translate(-50%, -50%);"
      v-on-clickaway="() => $emit('close')"
    >
      <div class="bg-white rounded-lg border h-64 p-8">
        <p class="font-semibold text-center h-8 leading-10 text-2xl">Build a new habit</p>
        <input
          class="bg-white focus:outline-none border border-gray-300 rounded-lg p-2 block w-full appearance-none leading-normal mt-12"
          type="text"
          placeholder="Title"
        />
        <input
          class="bg-white focus:outline-none border border-gray-300 rounded-lg p-2 block w-full appearance-none leading-normal mt-12"
          type="text"
          placeholder="Description"
        />
        <p>Priority</p>
        <p>StartTime</p>
        <p>End Time</p>
        <p>Location</p>
        <p>REmind me</p>
        <div class="bg-red-400 h-10 w-32 rounded-md text-center text-white p-2 mt-8 ml-auto">Submit</div>
      </div>
    </div>
  </div>
</template>

<script>
import { directive as onClickaway } from "vue-clickaway";

export default {
  directives: {
    onClickaway: onClickaway
  }
};
</script>

<style>
</style>