<script setup>
import { ref } from 'vue';
import { login } from '@/helpers/api';
import { useModalStore } from '@/stores/modal';
import { useAuthStore } from '@/stores/auth';
import {
  checkEmptyTextValue,
  checkIncorrectEmailValue,
} from '@/helpers/validate';

import ButtonRegular from '@/components/controls/ButtonRegular.vue';
import TextField from '@/components/controls/TextField.vue';
import PasswordField from '@/components/controls/PasswordField.vue';

const modalStore = useModalStore();
const authStore = useAuthStore();

const email = ref('');
const password = ref('');

const emailError = ref(null);
const passwordError = ref(null);

const handleLogin = async () => {
  emailError.value =
    checkEmptyTextValue(email.value) || checkIncorrectEmailValue(email.value);
  passwordError.value = checkEmptyTextValue(password.value);

  if (emailError.value || passwordError.value) {
    return;
  }

  const result = await login(email.value, password.value);

  if (result.error) {
    modalStore.setErrorMessage(result.message);
    return;
  }

  authStore.setEmail(email.value);
  authStore.setToken(result.accessToken);
  modalStore.close();
};
</script>
<template>
  <form class="form" @submit.prevent="handleLogin">
    <TextField v-model="email" labelText="Email" :error-message="emailError" />
    <PasswordField
      v-model="password"
      labelText="Пароль"
      :error-message="passwordError"
    />
    <footer class="form__footer">
      <p class="form__footer-info">
        У&nbsp;вас нет аккаунта?
        <button
          class="form__footer-link"
          type="button"
          @click="modalStore.openRegisterModal"
        >
          Зарегистрируйтесь
        </button>
      </p>
      <ButtonRegular type="submit" class="form__footer-button"
        >Войти</ButtonRegular
      >
    </footer>
  </form>
</template>
