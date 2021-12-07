import * as yup from 'yup';

yup.setLocale({
  mixed: {
    required: 'Ce champ est requis',
  },
  string: {
    email: 'E-mail invalide',
    min: 'Ce champ doit être ${min} caractères minimum',
    max: 'Ce champ doit être ${max} caractères maximum',
  },
  number: {
    min: 'Ce champ doit être supérieur à ${min}',
    max: 'Ce champ doit être inférieur à ${max}',
  },
});
