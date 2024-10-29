<script setup>
import { ref } from 'vue';
import { useModalStore } from '@/stores/modal';
import { useNotesStore } from '@/stores/notes';
import { createNote } from '@/helpers/api';
import { checkEmptyTextValue } from '@/helpers/validate';

import ButtonRegular from '@/components/controls/ButtonRegular.vue';
import TextField from '@/components/controls/TextField.vue';
import TextArea from '@/components/controls/TextArea.vue';

const modalStore = useModalStore();
const notesStore = useNotesStore();

const noteTitle = ref('');
const noteText = ref('');

const noteTitleError = ref(null);
const noteTextError = ref(null);

const clearFields = () => {
  noteTitle.value = '';
  noteText.value = '';
};

const handleCreateNote = async () => {
  modalStore.clearMessage();

  noteTitleError.value = checkEmptyTextValue(noteTitle.value);
  noteTextError.value = checkEmptyTextValue(noteText.value);

  if (noteTitleError.value || noteTextError.value) {
    return;
  }

  const result = await createNote(noteTitle.value, noteText.value);

  if (result.error) {
    modalStore.setErrorMessage(result.message);
    return;
  }

  notesStore.addLocalNote(result);
  clearFields();
  modalStore.setSuccessMessage('Заметка добавлена!');
};
</script>
<template>
  <form class="form" @submit.prevent="handleCreateNote">
    <TextField
      v-model="noteTitle"
      labelText="Название заметки"
      placeholder-text="Введите название"
      max-length="100"
      :error-message="noteTitleError"
    />
    <TextArea
      v-model="noteText"
      labelText="Текст заметки"
      placeholder-text="Введите текст"
      max-length="255"
      rows="5"
      :error-message="noteTextError"
    />
    <footer class="form__footer">
      <ButtonRegular type="submit" class="form__footer-button"
        >Добавить</ButtonRegular
      >
    </footer>
  </form>
</template>
