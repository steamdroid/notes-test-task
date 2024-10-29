<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';

import IconUser from '@/components/icons/IconUser.vue';

const authStore = useAuthStore();
const { userEmail } = storeToRefs(authStore);

const showDropdown = ref(false);
const toggleDropdown = () => (showDropdown.value = !showDropdown.value);
</script>
<template>
  <div class="user-menu">
    <button
      @click="toggleDropdown"
      class="user-menu__main-button"
      type="button"
    >
      <span>{{ userEmail }}</span>
      <span class="user-menu__icon">
        <IconUser />
      </span>
    </button>
    <nav
      class="user-menu__dropdown"
      :class="{ 'user-menu__dropdown--show': showDropdown }"
    >
      <ul class="user-menu__list">
        <li class="user-menu__item">
          <button
            class="user-menu__item-link"
            type="button"
            @click="authStore.handleLogout"
          >
            Выйти
          </button>
        </li>
      </ul>
    </nav>
  </div>
</template>
<style scoped lang="scss">
@use '@/assets/styles/_vars.scss' as *;
@use '@/assets/styles/_mixins.scss' as *;

.user-menu {
  max-width: 100%;
  position: relative;
  z-index: 1;
}

.user-menu__main-button {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;
  padding: 0;
  background: none;
  border: none;
  cursor: pointer;

  @include text-small;
  color: $c-white;

  @include sm {
    max-width: 263px;
  }

  span {
    text-overflow: ellipsis;
    overflow: hidden;
  }
}

.user-menu__icon {
  padding: 14px 18px;
  background-color: $c-dark-middle;
  border-radius: 50%;

  @include sm {
    padding: 9px 12px;
  }

  svg {
    width: 20px;
    height: 28px;

    @include sm {
      width: 12.86px;
      height: 18px;
    }
  }
}

.user-menu__dropdown {
  position: absolute;
  top: 77px;
  right: 0;
  display: none;
  padding: 40px;
  background-color: $c-dark-middle;
  border-radius: 12px;
  box-shadow: 0px 15px 46px -10px #00000099;

  &::before {
    content: '';
    position: absolute;
    top: -8px;
    right: 20px;
    display: block;
    width: 0px;
    height: 0px;
    border-style: solid;
    border-width: 0 9px 9px 9px;
    border-color: transparent transparent $c-dark-middle transparent;
  }

  &--show {
    display: block;
  }
}

.user-menu__list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.user-menu__item {
  padding: 0;
  margin: 0;
}

.user-menu__item-link {
  @include link;
}
</style>
