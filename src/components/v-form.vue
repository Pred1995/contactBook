<template>
  <div v-if="show" class="modal-shadow" @click.self="closeModal">
    <div class="modal">
      <div class="modal-close" @click="closeModal">&#10006;</div>
      <slot name="title">
        <h3 class="modal-title">Добавить контакт</h3>
      </slot>
      <slot name="body">
        <div class="modal-content">
          <v-loader v-if="loading" />
          <form @submit.prevent="onSub" v-else>
            <div class="modal-content-group">
              <input
                id="name"
                type="text"
                v-model.trim="name"
                class="modal-content-group__input"
                placeholder="Имя"
                :class="{
                  invalid: $v.name.$dirty && !$v.name.required
                }"
              />
              <small
                class="modal-content-group__helper invalid"
                v-if="$v.name.$dirty && !$v.name.required"
                >Поле имя не должно быть пустым!</small
              >
            </div>
            <div class="modal-content-group">
              <vue-tel-input
                id="mobile"
                type="tel"
                v-model.trim="mobile"
                class="modal-content-group__input-tel"
                placeholder="8 (800) 555-35-35"
                :class="{
                  invalid: $v.mobile.$dirty && !$v.mobile.required
                }"
              />
              <small
                class="modal-content-group__helper invalid"
                v-if="$v.mobile.$dirty && !$v.mobile.required"
                >Введите телефон</small
              >
            </div>
          </form>
        </div>
      </slot>
      <slot name="footer">
        <div class="modal-footer">
          <button class="btn-test" @click="onSub()">
            Добавить
          </button>
        </div>
      </slot>
    </div>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import VLoader from "@/components/v-loader";

export default {
  name: "v-form",
  props: ["show"],
  components: { VLoader },
  data: () => ({
    name: "",
    mobile: "",
    loading: true
  }),
  mounted() {
    setTimeout(() => {
      // имитация загрущки
      this.loading = false;
    }, 500);
  },
  methods: {
    closeModal() {
      this.name = "";
      this.mobile = "";
      this.loading = true;
      this.$emit("closeModalWindow");
    },
    async onSub() {
      // функиця добавление контакта
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      // валидация
      await this.$store.dispatch("addContact", {
        name: this.name,
        mobile: this.mobile
      });
      this.closeModal();
    }
  },
  validations: {
    name: { required },
    mobile: { required }
  }
};
</script>

<style scoped lang="scss">
.modal-content-group {
  &__input-tel {
    font-family: "Roboto", sans-serif;
    color: #333;
    font-size: 1.2rem;
    border: none;
    padding-top: 1rem;
    padding-bottom: 1rem;
    border-bottom: 0.3rem solid #db4c3f;
    margin-top: 4px;
    border-radius: 0.2rem;
  }
  &__input {
    font-family: "Roboto", sans-serif;
    color: #333;
    font-size: 1.2rem;
    margin: 0 auto;
    padding-top: 1rem;
    padding-bottom: 1rem;
    padding-left: 0.3rem;
    border-radius: 0.2rem;
    background-color: rgb(255, 255, 255);
    border: none;
    width: 100%;
    display: block;
    border-bottom: 0.3rem solid #db4c3f;
    transition: all 0.3s;
  }
  &__helper {
    font-family: "Roboto", sans-serif;
    color: red;
  }
}
.modal-shadow {
  position: absolute;
  top: 0;
  left: 0;
  min-height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.39);
}

.modal {
  background: #fff;
  border-radius: 8px;
  padding: 15px;
  min-width: 420px;
  max-width: 480px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  &-close {
    border-radius: 50%;
    color: #fff;
    background: #db4c3f;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 7px;
    right: 7px;
    width: 30px;
    height: 30px;
    cursor: pointer;
  }

  &-title {
    color: #db4c3f;
  }

  &-content {
    margin-bottom: 20px;
  }
}
</style>
