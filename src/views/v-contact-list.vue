<template>
  <div>
    <v-add-contact @openModalWindow="openModalWindow" />
    <div class="contact__list">
      <v-list-item
        v-for="item in items"
        :key="item.id"
        :index="item.id"
        :text="item.name"
        @openContact="openContactWindow"
        @onRemoveContact="onRemoveContact"
      />
    </div>
  </div>
</template>

<script>
import VAddContact from "@/components/v-add-contact";
import VListItem from "@/components/v-list-item";

export default {
  name: "v-contact-list",
  computed: {
    items() {
      return this.$store.getters.items;
    }
  },
  methods: {
    openContactWindow(id) {
      this.$router.push("/contacts/" + id);
    },
    async onRemoveContact(index) {
      try {
        await this.$store.dispatch("deleteContact", index);
      } catch (e) {
        console.log(e);
      }
    },
    openModalWindow() {
      this.$emit("openModalWindow");
    }
  },
  components: {
    VListItem,
    VAddContact
  }
};
</script>

<style scoped></style>
