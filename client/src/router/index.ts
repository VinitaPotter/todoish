// @ts-nocheck
import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../components/welcome/login.vue";
import Signup from "../components/welcome/signup.vue";
import Reset from "../components/welcome/reset.vue";


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
  {
    path: "/resetPassword/:id",
    name: "reset",

    component: Reset
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,

  routes,
});

export default router;
