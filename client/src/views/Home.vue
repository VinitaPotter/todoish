<template>
  <div class="home">
    <TodoScreen v-if="authenticated"></TodoScreen>
    <WelcomeScreen v-else></WelcomeScreen>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import WelcomeScreen from "../components/welcome/welcome.vue";
import TodoScreen from "../components/main/todos.vue";
// import store from "../store/index";

@Component({
  components: {
    WelcomeScreen,
    TodoScreen
  }
})
export default class App extends Vue {
  authenticated = false;
  created() {
    if (localStorage.getItem("jwt")) {
      this.authenticated = true;
    } else {
      if (this.$store.state.token) {
        this.authenticated = true;
      } else {
        this.authenticated = false;
      }
    }
  }
}
</script>
