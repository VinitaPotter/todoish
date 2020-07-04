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
        <h1 class="text-4xl font-semibold">Hello!</h1>
        <h2 class="text-4xl font-semibold">
          Welcome back,
          <span>{{$route.query && $route.query.user ? $route.query.user : null }}</span>
        </h2>
        <div v-if="currentUser">
          <p class="text-4xl font-semibold">{{currentUser}}!</p>
        </div>
        <input
          v-else
          autocomplete="true"
          class="bg-white focus:outline-none border-b border-red-400 rounded-sm py-2 px-4 block w-full appearance-none leading-normal mt-8"
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          v-model="email"
        />
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
        <div class="flex my-4 justify-between">
          <!-- <p class="text-gray-700">
            <input type="checkbox" name="remember" id="remember" class="mr-2" />
            <label for="remember">Remember me</label>
          </p>-->
          <p
            @click="forgotPassword"
            class="text-gray-700 cursor-pointer"
            :title="[email? 'Click to get a link to reset password' : 'Enter email']"
            :class="[email ? null : 'cursor-not-allowed']"
          >Forgot Password?</p>
        </div>
        <div class="text-red-600 text-center mb-10">{{showErrorMessage}}</div>
        <div
          @click="login"
          class="bg-red-400 p-4 m-auto text-center rounded-md font-medium tracking-wide cursor-pointer"
        >Login</div>
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
export default class Login extends Vue {
  isHiddenPassword = true;
  email: string = null;
  password: string = null;
  showErrorMessage: string = null;
  currentUser = null;

  created() {
    if (this.$route.params.user) {
      this.email = this.$route.params.user;
    }
    if (this.$route.query && this.$route.query.userData) {
      this.currentUser = this.$route.query.userData.name;
    }
  }

  async login() {
    const res = await AuthService.login({
      body: {
        email: this.email,
        password: this.password
      }
    });
    if (res.status == "Fail") {
      return (this.showErrorMessage = res.message);
    } else {
      localStorage.setItem("jwt", res.token);
      this.$store.dispatch("addAuthentication", res);
      this.$router.push({ name: "Home" });
    }
  }
  async forgotPassword() {
    const res = await AuthService.forgotPassword({
      body: {
        email: this.email
      }
    });

    if (res) {
      alert("Please check your email");
    }
  }
}
</script>

