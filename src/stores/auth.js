import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { logout } from '@/helpers/api';
import { getItem, storeItem, clearItem } from '@/helpers/sessionStorage';

export const useAuthStore = defineStore('auth', () => {
  const userEmail = ref('');
  const userToken = ref('');
  const isAuthorized = computed(() => !!userToken.value);

  const setEmail = email => {
    userEmail.value = email;
    storeItem('email', email);
  };

  const setToken = token => {
    userToken.value = token;
    storeItem('token', token);
  };

  const clearAuthData = () => {
    userEmail.value = '';
    userToken.value = '';

    clearItem('email');
    clearItem('token');
  };

  const loadCredentialsFromStorage = () => {
    const email = getItem('email');
    const token = getItem('token');

    if (email && token) {
      setEmail(email);
      setToken(token);
    }
  };

  const handleLogout = async () => {
    const result = await logout();

    if (!result.error) {
      clearAuthData();
    }
  };

  return {
    isAuthorized,
    userEmail,
    userToken,
    setEmail,
    setToken,
    clearAuthData,
    loadCredentialsFromStorage,
    handleLogout,
  };
});
