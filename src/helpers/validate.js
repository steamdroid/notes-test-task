import { string } from 'yup';

export const checkEmptyTextValue = value => {
  const schema = string().required();
  if (schema.isValidSync(value)) {
    return null;
  }
  return 'Заполните поле';
};

export const checkIncorrectEmailValue = value => {
  const schema = string().email();

  if (schema.isValidSync(value)) {
    return null;
  }
  return 'Введите корректный Email';
};
