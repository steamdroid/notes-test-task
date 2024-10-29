<script setup>
import { ref, computed, watch } from 'vue';

import IconPasswordShow from '@/components/icons/IconPasswordShow.vue';
import IconPasswordHide from '@/components/icons/IconPasswordHide.vue';

const props = defineProps({
  labelText: {
    type: String,
    default: 'Пароль',
  },
  placeholderText: {
    type: String,
    default: 'Введите пароль',
  },
  maxLength: Number,
  errorMessage: String,
  modelValue: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(['update:modelValue']);

const textLength = ref(0);
const visibilityStatus = ref(false);

const fieldType = computed(() =>
  visibilityStatus.value ? 'text' : 'password',
);

const handleInput = e => {
  const value = e.target.value;
  emit('update:modelValue', value);
};

const toggleVisibility = () =>
  (visibilityStatus.value = !visibilityStatus.value);

const showInfo = computed(() => {
  return !!(props.maxLength || props.errorMessage);
});

watch(
  () => props.modelValue,
  () => (textLength.value = props.modelValue.length),
);
</script>
<template>
  <label class="textfield">
    <p class="textfield__label">{{ labelText }}</p>
    <div class="textfield__wrapper">
      <input
        class="textfield__input"
        :placeholder="placeholderText"
        :value="modelValue"
        @input="handleInput($event)"
        :maxlength="maxLength"
        :type="fieldType"
      />
      <button class="textfield__toggle" type="button" @click="toggleVisibility">
        <IconPasswordHide v-if="visibilityStatus" />
        <IconPasswordShow v-else />
      </button>
    </div>
    <div v-if="showInfo" class="textfield__info">
      <p v-if="errorMessage" class="textfield__error">{{ errorMessage }}</p>
      <p class="textfield__counter" v-if="maxLength">
        {{ textLength }}/{{ maxLength }}
      </p>
    </div>
  </label>
</template>
