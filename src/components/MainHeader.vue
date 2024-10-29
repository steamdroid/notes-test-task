<script setup>
import { storeToRefs } from 'pinia';
import { useModalStore } from '@/stores/modal';
import { useAuthStore } from '@/stores/auth';

import ButtonRegular from '@/components/controls/ButtonRegular.vue';
import IconLogin from '@/components/icons/IconLogin.vue';
import UserMenu from '@/components/UserMenu.vue';

const modalStore = useModalStore();
const authStore = useAuthStore();

const { isAuthorized } = storeToRefs(authStore);
</script>
<template>
  <header class="main-header">
    <div class="container main-header__container">
      <a class="main-header__logo logo" href="/">
        <picture class="logo__image">
          <source
            srcset="@/assets/images/main-logo.svg"
            media="(min-width: 767px)"
          />
          <source srcset="@/assets/images/main-logo--sm.svg" />
          <img src="@/assets/images/main-logo.svg" alt="MyNotes" />
        </picture>
      </a>

      <div class="main-header__controls">
        <UserMenu v-if="isAuthorized" />
        <ButtonRegular v-else @click="modalStore.openAuthModal">
          <template v-slot:icon>
            <IconLogin />
          </template>
          Вход
        </ButtonRegular>
      </div>
    </div>
  </header>
</template>
<style scoped lang="scss">
@use '@/assets/styles/_vars.scss' as *;
@use '@/assets/styles/_mixins.scss' as *;

.main-header {
  padding: 40px 0;

  @include lg {
    padding: 20px 0;
  }
}

.main-header__container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.main-header__logo {
  max-width: 218px;

  @include sm {
    max-width: 154px;
  }
}
</style>
