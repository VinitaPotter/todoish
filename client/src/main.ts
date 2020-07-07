// @ts-nocheck

import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
import "./assets/style/tailwind.css";
/* tslint:disable:no-var-requires */
import { library } from "@fortawesome/fontawesome-svg-core";
/* tslint:disable:no-var-requires */
import { fas } from "@fortawesome/free-solid-svg-icons";
/* tslint:disable:no-var-requires */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";



library.add(fas);

Vue.component("icon", FontAwesomeIcon);

Vue.directive('focus', {
  // When the bound element is inserted into the DOM...
  inserted: function (el) {
    // Focus the element
    el.focus()
  }
})

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
