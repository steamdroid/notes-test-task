import axios from 'axios';
import { useAuthStore } from '@/stores/auth';

const client = axios.create({
  baseURL: 'https://dist.nd.ru/api',
});

const _getToken = () => {
  const authStore = useAuthStore();
  return authStore.userToken;
};

const _clearAuth = () => {
  const authStore = useAuthStore();
  authStore.clearAuthData();
};

const _makeRequest = async (
  endpoint,
  method = 'get',
  data = {},
  token = null,
) => {
  const requestConfig = {
    url: endpoint,
    method: method,
    headers: {},
  };

  if (Object.keys(data).length) {
    requestConfig.data = data;
  }

  if (token) {
    requestConfig.headers.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await client.request(requestConfig);

    let result = {
      error: null,
      statusCode: response.status,
    };

    if (Array.isArray(response.data)) {
      result.data = response.data;
    } else {
      result = { ...result, ...response.data };
    }

    return result;
  } catch (err) {
    if (err.response?.status === 401) {
      _clearAuth();
    }

    if (err.response?.data) {
      const message = err.response.data.message;
      return {
        error: 1,
        ...err.response.data,
        message: Array.isArray(message) ? message.join('; ') : message,
      };
    }

    if (err.response?.status) {
      return {
        error: 1,
        statusCode: err.response.status,
        message: 'Произошла ошибка',
      };
    }

    console.error(err);

    return {
      error: 1,
      message: 'Произошла неизвестная ошибка',
    };
  }
};

export const register = async (email, password, confirm_password) => {
  const result = await _makeRequest('/reg', 'post', {
    email,
    password,
    confirm_password,
  });

  if (!result.error) {
    return {
      message: 'Успешная регистрация! Теперь вы можете войти.',
      ...result,
    };
  }

  return result;
};

export const login = async (email, password) => {
  return await _makeRequest('/auth', 'post', {
    email,
    password,
  });
};

export const logout = async () => {
  return await _makeRequest('/auth', 'delete', {}, _getToken());
};

export const getNotes = async () => {
  return await _makeRequest('/notes', 'get', {}, _getToken());
};

export const createNote = async (title, content) => {
  return await _makeRequest(
    '/notes',
    'post',
    {
      title,
      content,
    },
    _getToken(),
  );
};

export const deleteNote = async noteId => {
  return await _makeRequest(`/notes/${noteId}`, 'delete', {}, _getToken());
};
