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
            <p>June 2016</p>
          </div>
          <div class="list h-16 leading-8">
            <p class="h-16 leading-8 text-center border" v-for="i in 6" :key="i">My habit {{i}}</p>
          </div>
        </div>
        <div class="cal-card flex justify-between w-2/3">
          <div
            class="text-center bg-red-100 flex"
            style="box-shadow:inset 6px 0px 36px 8px rgba(0, 0, 0, 0.06)"
          >
            <div v-for="i in 5" :key="i +10" class="w-24 border-r">
              <div class="header h-16 leading-8 text-center border-l border-b">{{i}}</div>
              <div class="list">
                <p class="h-16 leading-8" v-for="i in 6" :key="i">*</p>
              </div>
            </div>
          </div>
          <div class="border-r w-32 text-center">
            <div class="header h-16 leading-8 text-center border-l border-b font-semibold">Today</div>
            <div class="list">
              <p class="h-16 leading-8" v-for="i in 6" :key="i">
                <input type="checkbox" name id />
              </p>
            </div>
          </div>
          <div v-for="i in 2" :key="i +10" class="border-r w-32 text-center">
            <div class="header h-16 leading-8 text-center border-l border-b">{{i}}</div>
            <div class="list">
              <p class="h-16 leading-8" v-for="i in 6" :key="i">*</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="w-12 absolute right-0 bottom-0 m-4 cursor-pointer" @click="$emit('create')">
      <img src="../../../assets/icons/plus.svg" alt />
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>