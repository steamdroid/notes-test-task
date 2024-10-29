<script setup>
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useModalStore } from '@/stores/modal';
import { useAuthStore } from '@/stores/auth';

import MainHeader from '@/components/MainHeader.vue';
import StartScreen from '@/components/StartScreen.vue';
import NotesList from '@/components/NotesList.vue';
import ModalBase from './components/ModalBase.vue';
import FormLogin from '@/components/forms/FormLogin.vue';
import FormRegister from '@/components/forms/FormRegister.vue';
import FormNewNote from './components/forms/FormNewNote.vue';

const modalStore = useModalStore();
const authStore = useAuthStore();
const { modalContent } = storeToRefs(modalStore);
const { isAuthorized } = storeToRefs(authStore);

onMounted(() => authStore.loadCredentialsFromStorage());
</script>

<template>
  <MainHeader />

  <main>
    <NotesList v-if="isAuthorized" />
    <StartScreen v-else />
  </main>
  <ModalBase>
    <FormLogin v-if="modalContent === 'auth'" />
    <FormRegister v-else-if="modalContent === 'register'" />
    <FormNewNote v-else-if="modalContent === 'addNote'" />
  </ModalBase>
</template>
