<script setup>
import { ref } from 'vue';
import { useModalStore } from '@/stores/modal';
import { register } from '@/helpers/api';
import {
  checkEmptyTextValue,
  checkIncorrectEmailValue,
} from '@/helpers/validate';

import ButtonRegular from '@/components/controls/ButtonRegular.vue';
import TextField from '@/components/controls/TextField.vue';
import PasswordField from '@/components/controls/PasswordField.vue';

const modalStore = useModalStore();

const email = ref('');
const password = ref('');
const passwordAgain = ref('');

const emailError = ref(null);
const passwordError = ref(null);
const passwordAgainError = ref(null);

const handleRegistration = async () => {
  emailError.value =
    checkEmptyTextValue(email.value) || checkIncorrectEmailValue(email.value);
  passwordError.value = checkEmptyTextValue(password.value);
  passwordAgainError.value = checkEmptyTextValue(passwordAgain.value);

  if (emailError.value || passwordError.value || passwordAgainError.value) {
    return;
  }

  const result = await register(
    email.value,
    password.value,
    passwordAgain.value,
  );

  if (result.error) {
    modalStore.setErrorMessage(result.message);
  } else {
    modalStore.setSuccessMessage(result.message);
  }
};
</script>
<template>
  <form class="form" @submit.prevent="handleRegistration">
    <TextField
      v-model="email"
      labelText="Email"
      placeholder-text="Введите Email"
      :error-message="emailError"
    />
    <PasswordField
      v-model="password"
      labelText="Пароль"
      :error-message="passwordError"
    />
    <PasswordField
      v-model="passwordAgain"
      labelText="Пароль ещё раз"
      :error-message="passwordAgainError"
    />
    <footer class="form__footer">
      <p class="form__footer-info">
        У&nbsp;вас есть аккаунт?
        <button
          class="form__footer-link"
          type="button"
          @click="modalStore.openAuthModal"
        >
          Вход
        </button>
      </p>
      <ButtonRegular type="submit" class="form__footer-button"
        >Зарегистрироваться</ButtonRegular
      >
    </footer>
  </form>
</template>
