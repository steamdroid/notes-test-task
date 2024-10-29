<script setup>
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useNotesStore } from '@/stores/notes';
import { useModalStore } from '@/stores/modal';
import { getNotes } from '@/helpers/api';

import ButtonRound from '@/components/controls/ButtonRound.vue';
import IconAdd from '@/components/icons/IconAdd.vue';
import NoteItem from '@/components/NoteItem.vue';

const notesStore = useNotesStore();
const modalStore = useModalStore();

const { notesArr } = storeToRefs(notesStore);

onMounted(async () => {
  const result = await getNotes();

  if (result.data) {
    notesStore.setNotes(result.data);
  }
});
</script>
<template>
  <section class="notes">
    <div class="container notes__container">
      <NoteItem v-for="note in notesArr" :note="note" :key="note.id" />
    </div>
    <ButtonRound @click="modalStore.openAddNoteModal" class="notes__add-button">
      <IconAdd />
    </ButtonRound>
  </section>
</template>
<style scoped lang="scss">
@use '@/assets/styles/_vars.scss' as *;
@use '@/assets/styles/_mixins.scss' as *;

.notes {
  padding: 40px 0;
}

.notes__container {
  display: grid;
  align-items: start;
  grid-template-columns: repeat(3, auto);
  gap: 40px;

  @include md {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
}

.notes__add-button {
  position: fixed;
  right: 40px;
  bottom: 40px;
  box-shadow: 0px 15px 46px -10px rgba(0, 0, 0, 0.6);

  @include lg {
    right: 12px;
  }

  @include md {
    right: 8px;
  }
}
</style>
