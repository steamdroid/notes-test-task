import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useModalStore = defineStore('modal', () => {
  const isModalOpen = ref(false);
  const modalMessageType = ref('success');
  const modalMessage = ref('Успех!');
  const modalTitle = ref('');
  const modalContent = ref(null);

  const open = () => {
    clearMessage();
    isModalOpen.value = true;
  };

  const close = () => {
    clearMessage();
    isModalOpen.value = false;
  };

  const setContent = name => {
    modalContent.value = name;
  };

  const setErrorMessage = msg => {
    modalMessageType.value = 'error';
    modalMessage.value = msg;
  };

  const setSuccessMessage = msg => {
    modalMessageType.value = 'success';
    modalMessage.value = msg;
  };

  const clearMessage = () => {
    modalMessageType.value = null;
    modalMessage.value = null;
  };

  const setTitle = title => {
    modalTitle.value = title;
  };

  const openAuthModal = () => {
    setContent('auth');
    setTitle('Вход в ваш аккаунт');
    open();
  };

  const openRegisterModal = () => {
    setContent('register');
    setTitle('Регистрация');
    open();
  };

  const openAddNoteModal = () => {
    setContent('addNote');
    setTitle('Добавление заметки');
    open();
  };

  return {
    isModalOpen,
    modalTitle,
    modalContent,
    modalMessage,
    modalMessageType,
    open,
    close,
    setTitle,
    setContent,
    setErrorMessage,
    setSuccessMessage,
    clearMessage,
    openAuthModal,
    openRegisterModal,
    openAddNoteModal,
  };
});
