import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "ContactList",
    component: () => import("../views/v-contact-list")
  },
  {
    path: "/contacts/:id",
    name: "ContactWindow",
    props: true,
    component: () => import("../views/v-contact-window")
  },
  {
    path: "*",
    component: { render: (h) => h("div", ["404! Страница не найдена!"]) },
  }
];

const router = new VueRouter({
  mode: "history",
  routes
});

export default router;
