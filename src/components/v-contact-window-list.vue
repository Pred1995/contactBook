<template>
  <div class="todo__list-item">
    <template v-if="edit">
      <input v-model="updateText" type="text" />
      <img
        @click="edit = false"
        class="todo__list-item-edit"
        src="../assets/close.svg"
        alt="icon"
      />
      <img
        @click="updateItemContact"
        class="todo__list-item-remove"
        src="../assets/ok-mark.svg"
        alt="icon"
      />
    </template>
    <template v-else>
      <p>{{ item }}</p>
      <img
        @click="edit = true"
        class="todo__list-item-edit"
        src="../assets/edit.svg"
        alt="icon"
      />
      <img
        @click="deleteItemContact(index)"
        class="todo__list-item-remove"
        src="../assets/delete.svg"
        alt="icon"
      />
    </template>
  </div>
</template>

<script>
export default {
  name: "v-contact-window-list",
  props: ["index", "id", "item"],
  data: () => ({
    edit: false,
    updateText: ""
  }),
  mounted() {
    this.updateText = this.item;
  },
  watch: {},
  methods: {
    deleteItemContact(index) {
      this.$emit("deleteItemContact", index);
    },
    async updateItemContact() {
      if (this.updateText && this.updateText.indexOf(":") >= 0) {
        this.$emit("resetDate", {
          index: +this.index,
          updateText: this.item
        });
        await this.$store.dispatch("updateItemContact", {
          index: +this.index,
          updateText: this.updateText,
          id: +this.id
        });
        this.edit = false;
        this.$emit("update");
      } else {
        alert("Вы ввели текст не в правильном формате!");
      }
    }
  }
};
</script>

<style scoped></style>
