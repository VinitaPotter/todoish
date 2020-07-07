<template>
  <div class="home">
    <TodoScreen v-if="authenticated"></TodoScreen>
    <WelcomeScreen v-else></WelcomeScreen>
  </div>
</template>

<script lang="ts">
// @ts-nocheck
import { Component, Vue } from "vue-property-decorator";
import WelcomeScreen from "../components/welcome/welcome.vue";
import TodoScreen from "../components/main/todos.vue";
// import store from "../store/index";
import AuthService from "../services/authService";

@Component({
  components: {
    WelcomeScreen,
    TodoScreen
  }
})
export default class App extends Vue {
  authenticated = false;

  created() {
    let jwt;
    if (document.cookie && document.cookie.split("=")[0] == "jwt") {
      jwt = document.cookie.split("=")[1];
    }

    if (jwt) {
      this.authenticated = true;
    } else {
      this.authenticated = false;
    }
  }
  async mounted() {
    const { data } = await AuthService.getUser();
    if (data) {
      this.$store.dispatch("addUser", data.user);
    }
    console.log(data);
  }
}
</script>
