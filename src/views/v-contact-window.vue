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
        placeholder="Введите ключ:значение"
      />
    </div>
    <div class="contact-window__add">
      <button class="btn-test" @click="addItem">Добавить</button>
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
    // текст в инпуте
    lastAction: "",
    // последнее действие
    lastIndex: "",
    // последний индекс
    lastText: ""
    // последний текст
  }),
  computed: {
    id() {
      // получение id из url
      return this.$route.params.id;
    },
    contact() {
      // получение данных контакта с помощью id
      return this.$store.getters.contactById(+this.id);
    },
    contactItems() {
      // получение элементов ключ:значение контакта с помощью id
      return this.$store.getters.contactItems(+this.id);
    }
  },
  methods: {
    async back() {
      // функция возврата к прежнему состоянию
      if (this.lastAction === "addItem") {
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
      // обновляет историю, если пользователь редактировал элемент ключ:значение
      this.lastIndex = index;
      this.lastText = updateText;
      this.lastAction = "updateItemContact";
    },
    update() {
      // ре-рендер компонента, вызывается в компоненте наследнике
      this.$forceUpdate();
    },
    async addItem() {
      // добавление элемента ключ:значение
      if (this.text && this.text.indexOf(":") >= 0) {
        await this.$store.dispatch("addItemToContact", {
          value: this.text,
          id: +this.id
        });
        this.lastIndex = this.contactItems.indexOf(this.text);
        this.lastAction = "addItem";
        this.lastText = this.text;
        this.text = "";
      } else {
        alert(
          "Введите текст в формате ключ:значение, например: email:test@mail.ru"
        );
      }
    },
    async deleteItem(index) {
      // удаление элемента ключ:значение
      this.lastText = this.contactItems[index];
      await this.$store.dispatch("deleteItemContact", {
        index: index,
        id: +this.id
      });
      this.lastAction = "deleteItemContact";
      this.lastIndex = index;
    },
    async deleteItemContact(index, conf = true) {
      // удаление элемента ключ:значение
      if (conf) {
        if (confirm("Вы действительно хотите удалить данный элемент?"))
          await this.deleteItem(index);
      } else {
        await this.deleteItem(index);
      }
    }
  }
};
</script>

<style lang="scss">
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
