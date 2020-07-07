<template>
  <div class="block">
    <div class="flex h-screen items-center">
      <div class="lg:w-1/2 w-0 invisible lg:visible">
        <img
          src="../../assets/images/login.jpg"
          alt="https://www.freepik.com/free-photos-vectors/idea"
        />
      </div>
      <div class="p-20">
        <h2 class="text-4xl font-semibold">Please reset your password</h2>

        <div class="relative" accessibilityRole="form">
          <input
            class="bg-white focus:outline-none border-b border-red-400 rounded-sm py-2 px-4 block w-full appearance-none leading-normal mt-8"
            :type="isHiddenPassword ? 'password' : 'text'"
            id="password"
            placeholder="Password"
            v-model="password"
            @keyup.enter="login"
          />
          <icon
            :icon="isHiddenPassword ? 'eye' : 'eye-slash'"
            :title="isHiddenPassword ? 'Show password' : 'Hide password'"
            class="absolute right-0 cursor-pointer"
            @click="isHiddenPassword = !isHiddenPassword"
            style="top:35%"
          />
        </div>

        <div class="relative" accessibilityRole="form">
          <input
            class="bg-white focus:outline-none border-b border-red-400 rounded-sm py-2 px-4 block w-full appearance-none leading-normal mt-8"
            type="password"
            id="password"
            placeholder="Password"
            v-model="confirmPassword"
            @keyup.enter="reset"
          />
        </div>

        <div class="text-red-600 text-center mb-10">{{showErrorMessage}}</div>
        <div
          @click="reset"
          class="bg-red-400 p-4 m-auto text-center rounded-md font-medium tracking-wide cursor-pointer"
        >Confirm</div>
        <p class="text-gray-700 mt-4">
          Don't have an account?
          <span class="font-medium text-red-400 cursor-pointer">Click here</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
// @ts-nocheck
import { Component, Vue } from "vue-property-decorator";
import AuthService from "../../services/authService";

@Component({})
export default class Reset extends Vue {
  isHiddenPassword = true;
  confirmPassword: string = null;
  password: string = null;
  showErrorMessage: string = null;

  async reset() {
    if (!this.password || this.password.length < 8) {
      return (this.showErrorMessage =
        "Password legnth must be atleast 8 charachters");
    }

    if (this.password !== this.confirmPassword) {
      return (this.showErrorMessage = "Passwords don't match");
    }
    const res = await AuthService.reset({
      body: {
        password: this.password,
        confirmPassword: this.confirmPassword
      }
    });
    if (res.status == "Fail") {
      return (this.showErrorMessage = res.message);
    } else {
      this.$store.dispatch("addAuthentication", res);
      this.$router.push({ name: "Login" });
    }
  }
}
</script>

