<script setup>
import { computed } from 'vue';

const props = defineProps({
  type: String,
  disabled: Boolean,
});

const buttonType = computed(() => {
  return props.type || 'button';
});
</script>
<template>
  <button :type="buttonType" :disabled="disabled">
    <slot></slot>
  </button>
</template>
<style scoped lang="scss">
@use '@/assets/styles/_vars.scss' as *;
@use '@/assets/styles/_mixins.scss' as *;

button {
  border: none;
  cursor: pointer;
  background-color: $c-green-light;
  border-radius: 50%;
  padding: 20px;

  &:hover {
    background-color: $c-green-middle;
  }

  &:active {
    background-color: $c-green-dark;
  }

  &[disabled] {
    background-color: $c-gray;
  }
}
</style>
