export const checkEmptyTextValue = value => {
  if (value !== '') {
    return null;
  }
  return 'Заполните поле';
};
