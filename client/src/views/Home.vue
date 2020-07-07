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

  async created() {
    let jwt;
    if (document.cookie && document.cookie.split("=")[0] == "jwt") {
      jwt = document.cookie.split("=")[1];
    }

    if (jwt) {
      const { data } = await AuthService.getUser();
      this.$store.dispatch("addUser", data.user);
      this.authenticated = true;
    } else {
      this.authenticated = false;
    }
  }
}
</script>
