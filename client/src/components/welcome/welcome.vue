<template>
  <div class="bg-grey-300 mt-12">
    <div class="flex justify-between mx-64">
      <div class="text-xl font-semibold">Todoish</div>
      <a
        title="Atomic Habits by James Clear"
        class="bg-black h-10 rounded-lg px-3 pt-2 cursor-pointer text-white font-medium hover:bg-red-500"
        href="https://jamesclear.com/atomic-habits"
        target="_blank"
      >Know more</a>
    </div>
    <div class="flex justify-between mx-64">
      <div class="mt-20">
        <h1 class="text-2xl font-medium mb-3">A todo list for habits</h1>
        <p class="text-gray-700 text-100">Small habits. Big impact!</p>
      </div>

      <div class="flex mt-20">
        <input
          class="bg-white focus:outline-none focus:border-red-500 border border-gray-300 rounded-lg h-10 appearance-none leading-normal px-2"
          type="email"
          v-model="email"
          placeholder="username@example.com"
        />
        <div
          @click.once="redirect()"
          class="submit h-10 bg-black w-10 block px-3 py-2 rounded-lg ml-4 hover:bg-red-500 hover:scale-110 cursor-pointer"
          :class="{'cursor-wait' : loading}"
        >
          <icon icon="arrow-right" class="text-white" />
        </div>
      </div>
    </div>
    <div class="flex justify-center">
      <img
        class="w-4/5"
        src="../../assets/images/welcome.jpg"
        alt="<a href='http://www.freepik.com/free-photos-vectors/music'> Music vector created by pch.vector - www.freepik.com</a>"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import AuthService from "../../services/authService";

@Component({})
export default class Welcome extends Vue {
  email = "";
  authService = new AuthService();
  loading = false;

  async redirect() {
    this.loading = true;
    let validated;
    if (this.email && this.email.length) {
      const regexpEmail = new RegExp("^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$");
      validated = regexpEmail.test(this.email);
    }
    if (validated) {
      const res = await AuthService.isExisting({ email: this.email });
      if (res.data.status) {
        console.log(res);
        this.$router.push({
          name: "login",
          params: { user: this.email },
          query: { userData: res.data.status }
        });
      } else {
        this.$router.push({ name: "signup" });
      }
    } else {
      this.$router.push({ name: "signup" });
    }
    this.loading = false;
  }
}
</script>

<style>
</style>[]