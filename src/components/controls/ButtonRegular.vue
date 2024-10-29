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
    <slot name="icon"></slot>
    <slot></slot>
  </button>
</template>
<style scoped lang="scss">
@use '@/assets/styles/_vars.scss' as *;
@use '@/assets/styles/_mixins.scss' as *;

button {
  display: flex;
  flex-direction: row;
  gap: 12px;

  border: none;
  cursor: pointer;
  background-color: $c-green-light;
  border-radius: 32px;
  padding: 12px 24px;
  color: $c-white;

  @include text-normal;
  text-align: center;

  @include sm {
    justify-content: center;
  }

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
