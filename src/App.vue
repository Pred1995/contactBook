<template>
  <div id="app">
    <div class="todo">
      <div class="todo__header">
        <router-link to="/">
          <h4>Контакты</h4>
        </router-link>
      </div>
      <router-view @openModalWindow="openModalWindow" />
    </div>
    <v-form :key="show" :show="show" @closeModalWindow="closeModalWindow" />
  </div>
</template>

<script>
import VForm from "@/components/v-form";
export default {
  name: "App",
  data: () => ({
    show: false
  }),
  methods: {
    openModalWindow() {
      this.show = true;
    },
    closeModalWindow() {
      this.show = false;
    }
  },
  components: { VForm }
};
</script>

<style>
@import "./assets/app.css";
@import "./assets/snip.scss";
</style>
