
<template>
  <div class="block">
    <div class="flex h-screen items-center">
      <div class="p-20">
        <h1 class="text-4xl font-semibold">Hello!</h1>
        <h2
          class="text-4xl font-semibold"
        >{{stage == 1 ? 'Sign Up' : stage == 2? 'Confirm your email' : 'Welcome'}}</h2>

        <div v-if="stage==1">
          <input
            v-focus
            autocomplete="true"
            class="bg-white focus:outline-none border-b border-red-400 rounded-sm py-2 px-4 block w-full appearance-none leading-normal mt-8"
            type="text"
            name="name"
            id="name"
            placeholder="Name"
            v-model="name
          "
          />
          <input
            autocomplete="true"
            class="bg-white focus:outline-none border-b border-red-400 rounded-sm py-2 px-4 block w-full appearance-none leading-normal mt-8"
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            v-model="email"
          />
          <form class="relative" accessibilityRole="form">
            <input
              class="bg-white focus:outline-none border-b border-red-400 rounded-sm py-2 px-4 block w-full appearance-none leading-normal mt-8"
              :type="isHiddenPassword ? 'password' : 'text'"
              id="password"
              placeholder="Password"
              v-model="password"
            />
            <icon
              :icon="isHiddenPassword ? 'eye' : 'eye-slash'"
              :title="isHiddenPassword ? 'Show password' : 'Hide password'"
              class="absolute right-0 cursor-pointer"
              @click="isHiddenPassword = !isHiddenPassword"
              style="top:35%"
            />
          </form>
          <input
            class="bg-white focus:outline-none border-b border-red-400 rounded-sm py-2 px-4 block w-full appearance-none leading-normal mt-8"
            type="password"
            id="password"
            placeholder="Confirm Password"
            v-model="confirmPassword"
          />

          <div class="flex my-4 justify-between">
            <p class="text-gray-700">
              <input type="checkbox" name="remember" id="remember" class="mr-2" v-model="agreement" />
              <label for="remember" class="text-gray-700">
                By creating an account, you agree to the
                <span
                  class="text-red-400 cursor-pointer"
                >Terms of use</span> and our
                <span class="text-red-400 cursor-pointer">Privacy policy</span>
              </label>
            </p>
          </div>
          <div class="text-red-600 text-center mb-6">{{showErrorMessage}}</div>
          <div
            @click="validateData"
            class="bg-red-400 p-4 m-auto text-center rounded-md font-medium tracking-wide cursor-pointer"
          >Sign Up</div>
          <p class="text-gray-700 mt-4 text-center" @click="$router.push({name: 'login'})">
            Already have an account?
            <span class="font-medium text-red-400 cursor-pointer">Click here</span>
          </p>
        </div>

        <div v-else-if="stage==2">
          <input
            maxlength="4"
            style="letter-spacing:4rem"
            class="bg-white text-xl focus:outline-none border h-16 border-red-400 rounded-sm pl-16 pr-8 block w-full appearance-none leading-normal my-8"
            id="password"
            placeholder="Code"
            v-model="code"
          />
          <div
            @click="confirmEmail"
            class="bg-red-400 p-4 m-auto text-center rounded-md font-medium tracking-wide cursor-pointer"
          >Confirm</div>
          <div
            @click="$router.push({name: 'login'})"
            class="p-4 m-auto text-center rounded-md font-medium tracking-wide cursor-pointer text-gray-600"
          >Skip for now</div>
        </div>
        <div v-else>
          <p class="mt-10 text-gray-900">Welcome aboard! 🎉</p>
          <p class="mt-2 text-gray-700">We hope you will have fun and productive time here!</p>

          <p
            class="mt-12 text-center font-semibold text-xl"
          >Please wait while set things up for you!</p>
          <p class="loading text-center text-pink-400"></p>
        </div>
      </div>
      <div class="lg:w-1/2 w-0 lg:visible invisible">
        <img
          src="../../assets/images/signup.jpg"
          alt="<a href='https://www.freepik.com/free-photos-vectors/technology'>Technology vector created by stories - www.freepik.com</a>"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
// @ts-nocheck
import { Component, Vue } from "vue-property-decorator";
import AuthService from "../../services/authService";

@Component({})
export default class SignUp extends Vue {
  isHiddenPassword = true;
  name = null;
  email = null;
  password = null;
  confirmPassword = null;
  showErrorMessage = null;
  agreement = true;
  stage = 1;
  code = null;

  validateData() {
    this.showErrorMessage = null;
    if (!this.name || this.name.length < 2) {
      return (this.showErrorMessage = "Name must be atleast 2 character long");
    }

    if (!this.email || !this.email.length) {
      return (this.showErrorMessage = "Email can not be empty");
    } else {
      const regexpEmail = new RegExp("^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$");
      const validated = regexpEmail.test(this.email);
      if (!validated) {
        return (this.showErrorMessage = "Please check email format");
      }
    }

    if (!this.password || this.password.length < 8) {
      return (this.showErrorMessage =
        "Please recheck password. Password must be 8 charachter long");
    }
    if (this.password !== this.confirmPassword) {
      return (this.showErrorMessage = "Passwords don't match");
    }

    if (!this.agreement) {
      return (this.showErrorMessage =
        "Please agree to the terms and conditions to move ahead");
    }

    this.signUp();
  }
  async signUp() {
    const user = {
      name: this.name,
      email: this.email,
      password: this.password,
      confirmPassword: this.confirmPassword
    };
    const res = await AuthService.signUp({
      body: user
    });

    if (res && res.data && res.data.status == "Error") {
      return (this.showErrorMessage = res.message);
    } else {
      this.stage = 2;
    }
  }
  async confirmEmail() {
    const res = await AuthService.confirm({
      body: {
        email: this.email,
        code: this.code
      }
    });

    if (res.status == "Success!") {
      this.stage = 3;

      setTimeout(() => {
        this.$router.push({ name: "Home" });
      }, 2000);
    } else {
      alert("Invalid Code. Please try again!");
    }
  }
}
</script>
<style >
.loading {
  margin: 100px;
  width: 36px;
  height: 36px;
  border: 4px solid #ed64a6;
  border-bottom: 4px solid #fbb6ce;
  border-radius: 100%;

  animation: spin infinite 1s linear;
  translatez: 0;
}

@keyframes spin {
  0% {
    transform: rotateZ(0deg);
  }

  100% {
    transform: rotateZ(360deg);
  }
}
</style>

