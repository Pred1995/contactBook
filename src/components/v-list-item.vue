<template>
  <div class="contact__list-item">
    <p @click="openContact(index)">{{ text }}</p>
    <img
      @click="removeContact(index)"
      class="contact__list-item-remove"
      src="../assets/delete.svg"
      alt="icon"
    />
  </div>
</template>

<script>
export default {
  props: {
    text: String,
    index: Number
  },
  methods: {
    removeContact(index) {
      if (confirm("Вы действительно хотите контакт?")) {
        this.$emit("onRemoveContact", index);
      }
    },
    openContact(index) {
      this.$emit("openContact", index);
    }
  }
};
</script>
