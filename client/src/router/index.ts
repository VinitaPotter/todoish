import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../components/welcome/login.vue";
import Signup from "../components/welcome/signup.vue";


Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/welcome/:user?",
    name: "login",
    props: true,
    component: Login
  },
  {
    path: "/signup",
    name: "signup",

    component: Signup
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,

  routes,
});

export default router;
