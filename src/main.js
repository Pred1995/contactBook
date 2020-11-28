import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Vuelidate from "vuelidate";
import VueTelInput from "vue-tel-input";
import UUID from "vue-uuid";

Vue.use(Vuelidate);
Vue.use(VueTelInput);
Vue.use(UUID);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
