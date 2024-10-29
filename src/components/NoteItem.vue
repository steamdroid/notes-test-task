<script setup>
import TextClamp from 'vue3-text-clamp';
import { useNotesStore } from '@/stores/notes';
import { deleteNote } from '@/helpers/api';

import IconClose from '@/components/icons/IconClose.vue';

const notesStore = useNotesStore();

const props = defineProps({
  note: Object,
});

const handleDeleteNote = async () => {
  const result = await deleteNote(props.note.id);
  if (!result.error) {
    notesStore.deleteLocalNote(props.note.id);
  }
};
</script>
<template>
  <article class="note">
    <header class="note__header">
      <h2 class="note__title">{{ note.title }}</h2>
    </header>
    <section class="note__body">
      <p class="note__text">
        <text-clamp :text="note.content" :max-lines="9" />
      </p>
    </section>
    <footer class="note__footer">
      <button class="note__remove" type="button" @click="handleDeleteNote">
        <IconClose />
        Удалить
      </button>
    </footer>
  </article>
</template>
<style scoped lang="scss">
@use '@/assets/styles/_vars.scss' as *;
@use '@/assets/styles/_mixins.scss' as *;

.note {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 506px;
  background-color: $c-green-light;
  border: none;
  border-radius: 5px;
  border-top-right-radius: 0;
  mask: linear-gradient(-135deg, rgba(0, 0, 0, 0) 28.28px, #000 0);
  box-shadow: 0px 15px 15px -10px rgba(0, 0, 0, 0.4);

  @include lg {
    width: 388px;
  }

  @include md {
    width: 100%;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0px;
    right: 0;
    display: block;
    border-width: 20px;
    border-color: transparent;
    -moz-border-radius: 0 0 0 5px;
    border-radius: 0 0 0 5px;
    border-style: solid;
    background: #a5bb0c;
    width: 0;
  }
}

.note__header {
  padding: 20px 56px 20px 28px;
  border-bottom: 1px solid $c-green;
}

.note__title {
  @include h4;
  color: $c-white;
}

.note__body {
  padding: 20px 28px;
}

.note__text {
  @include text-normal;
  color: $c-white;
}

.note__footer {
  display: flex;
  flex-direction: row;
}

.note__remove {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;
  margin-left: auto;
  padding: 20px 24px;
  border: none;
  background: none;
  cursor: pointer;

  @include text-normal;
  color: $c-white;
}
</style>
