<script setup>
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useModalStore } from '@/stores/modal';

import ButtonRound from '@/components/controls/ButtonRound.vue';
import IconClose from '@/components/icons/IconClose.vue';

const modalStore = useModalStore();

const { isModalOpen, modalTitle, modalMessage, modalMessageType } =
  storeToRefs(modalStore);

const messageClass = computed(() => {
  switch (modalMessageType.value) {
    case 'error':
      return 'modal__message--error';
    case 'success':
      return 'modal__message--success';
  }

  return '';
});
</script>
<template>
  <div
    class="modal-overlay"
    :class="{ 'modal-overlay--show': isModalOpen }"
  ></div>
  <dialog :open="isModalOpen" class="modal">
    <ButtonRound @click="modalStore.close" class="modal__close">
      <IconClose />
    </ButtonRound>
    <p class="modal__title">{{ modalTitle }}</p>
    <slot></slot>
    <p class="modal__message" :class="messageClass" v-if="modalMessage">
      {{ modalMessage }}
    </p>
  </dialog>
</template>
<style scoped lang="scss">
@use '@/assets/styles/_vars.scss' as *;
@use '@/assets/styles/_mixins.scss' as *;

.modal-overlay {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: $c-dark;
  opacity: 0.7;
  z-index: 10;

  &--show {
    display: block;
  }
}

.modal {
  position: fixed;
  padding: 80px;
  width: 780px;
  left: 50vw;
  top: 50vh;
  transform: translate(-50%, -50%);
  background-color: $c-dark-middle;
  border: none;
  border-radius: 40px;
  z-index: 20;

  @include lg {
    padding: 56px;
    width: 594px;
  }

  @include md {
    width: 688px;
  }

  @include sm {
    padding: 90px 16px;
    width: 100%;
  }
}

.modal__close {
  position: absolute;
  top: 20px;
  right: 20px;
}

.modal__title {
  @include h2;
  margin-bottom: 40px;
  color: $c-white;
}

.modal__message {
  @include text-small;

  margin-top: 20px;
  padding: 8px 20px;
  border-radius: 24px;

  &--error {
    background-color: rgba(255, 116, 97, 0.1);
    color: #ff7461;
  }

  &--success {
    background-color: rgba(165, 187, 12, 0.1);
    color: $c-green;
  }
}
</style>
