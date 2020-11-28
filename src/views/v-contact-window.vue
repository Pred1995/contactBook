<template>
  <div class="contact-window">
    <div class="contact-window__header">
      <img src="../assets/contacts.png" alt="контакт" />
    </div>
    <div class="contact-window__name">
      <p>{{ contact.name }}</p>
    </div>
    <div class="contact-window__number">
      <p>{{ contact.mobile }}</p>
    </div>
    <div class="contact-window__input">
      <input
        class="input-test"
        v-model="text"
        type="text"
        placeholder="Введите название новой задачи в форате ключ:значение"
      />
    </div>
    <div class="contact-window__add">
      <button class="btn-test" @click="addContact">Добавить</button>
    </div>
    <div class="contact-window__field">
      <v-contact-window-list
        v-for="(item, index) in contactItems"
        :key="index"
        :item="item"
        :index="index"
        :id="id"
        @deleteItemContact="deleteItemContact"
        @update="update"
        @resetDate="resetDate"
      >
      </v-contact-window-list>
    </div>
    <div class="contact-window__footer">
      <router-link to="/">
        <button class="btn-test">Назад</button>
      </router-link>
    </div>
    <div class="contact-window__reset">
      <button
        :class="{ 'btn-test': lastAction, 'btn-disabled': !lastAction }"
        @click="back"
        :disabled="!lastAction"
      >
        Отмена
      </button>
    </div>
  </div>
</template>

<script>
import VContactWindowList from "@/components/v-contact-window-list";
export default {
  name: "v-contact-window",
  components: { VContactWindowList },
  data: () => ({
    text: "",
    updateText: "",
    lastAction: "",
    lastIndex: "",
    lastText: ""
  }),
  computed: {
    id() {
      return this.$route.params.id;
    },
    contact() {
      return this.$store.getters.contactById(+this.id);
    },
    contactItems() {
      return this.$store.getters.contactItems(+this.id);
    }
  },
  methods: {
    async back() {
      if (this.lastAction === "addContact") {
        await this.deleteItemContact(this.lastIndex, false);
      } else if (this.lastAction === "deleteItemContact") {
        await this.$store.dispatch("addItemToContact", {
          value: this.lastText,
          id: +this.id
        });
      } else if (this.lastAction === "updateItemContact") {
        await this.$store.dispatch("updateItemContact", {
          index: +this.lastIndex,
          updateText: this.lastText,
          id: +this.id
        });
        this.$forceUpdate();
      }
      this.lastAction = "";
    },
    resetDate({ index, updateText }) {
      this.lastIndex = index;
      this.lastText = updateText;
      this.lastAction = "updateItemContact";
    },
    update() {
      this.$forceUpdate();
    },
    async addContact() {
      if (this.text && this.text.indexOf(":") >= 0) {
        await this.$store.dispatch("addItemToContact", {
          value: this.text,
          id: +this.id
        });
        this.lastIndex = this.contactItems.indexOf(this.text);
        this.lastAction = "addContact";
        this.lastText = this.text;
        this.text = "";
      }
    },
    async deleteItem(index) {
      this.lastText = this.contactItems[index];
      await this.$store.dispatch("deleteItemContact", {
        index: index,
        id: +this.id
      });
      this.lastAction = "deleteItemContact";
      this.lastIndex = index;
    },
    async deleteItemContact(index, conf = true) {
      if (conf) {
        if (confirm("Вы действительно хотите удалить данную задачу?"))
          await this.deleteItem(index);
      } else {
        await this.deleteItem(index);
      }
    }
  }
};
</script>

<style scoped lang="scss">
.btn-test {
  font-size: 12px;
  min-width: 100px;
  margin-right: 5px;
}
.contact-window {
  display: grid;
  height: 430px;
  grid-template-columns: 2fr 3fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr 2fr 1fr;
  justify-items: center;
  grid-template-areas:
    "header input add"
    "name field field"
    "number field field"
    ". field field"
    "footer field field"
    "reset . .";

  &__header {
    grid-area: header;

    img {
      max-height: 150px;
    }
  }
  &__name {
    grid-area: name;
    p {
      font-weight: bold;
      font-size: 24px;
    }
  }
  &__number {
    grid-area: number;
    p {
      font-size: 18px;
      font-style: italic;
    }
  }
  &__add {
    grid-area: add;
    align-self: center;
  }
  &__input {
    grid-area: input;
    align-self: center;
  }
  &__field {
    grid-area: field;
    margin-right: 5px;
    width: 100%;
    overflow-y: auto;
    height: 100%;
    border-radius: 5px;
    background-color: #fdfdfd;
  }
  &__footer {
    align-self: center;
    grid-area: footer;
  }
  &__reset {
    align-self: center;
    grid-area: reset;
  }
}
</style>
