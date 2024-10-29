<script setup>
import { ref, computed, watch } from 'vue';

const props = defineProps({
  labelText: {
    type: String,
    default: 'Введите значение',
  },
  placeholderText: {
    type: String,
    default: 'Введите значение',
  },
  maxLength: Number,
  errorMessage: String,
  modelValue: {
    type: String,
    required: true,
  },
  rows: {
    type: Number,
    default: 3,
  },
});

const emit = defineEmits(['update:modelValue']);

const textLength = ref(0);

const handleInput = e => {
  const value = e.target.value;
  emit('update:modelValue', value);
};

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
      <textarea
        class="textfield__area"
        :placeholder="placeholderText"
        :value="modelValue"
        @input="handleInput($event)"
        :maxlength="maxLength"
        :rows="rows"
        type="text"
      ></textarea>
    </div>
    <div v-if="showInfo" class="textfield__info">
      <p v-if="errorMessage" class="textfield__error">{{ errorMessage }}</p>
      <p class="textfield__counter" v-if="maxLength">
        {{ textLength }}/{{ maxLength }}
      </p>
    </div>
  </label>
</template>
