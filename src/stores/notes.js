import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useNotesStore = defineStore('notes', () => {
  const notesArr = ref([]);

  const setNotes = notes => (notesArr.value = notes);
  const addLocalNote = note => notesArr.value.push(note);
  const deleteLocalNote = noteId =>
    (notesArr.value = notesArr.value.filter(({ id }) => id !== noteId));

  return { notesArr, setNotes, addLocalNote, deleteLocalNote };
});
