export const getItem = key => {
  return sessionStorage.getItem(key);
};

export const storeItem = (key, item) => {
  sessionStorage.setItem(key, item);
};

export const clearItem = key => {
  sessionStorage.removeItem(key);
};
