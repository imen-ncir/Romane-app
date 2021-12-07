import * as yup from 'yup';

import '../../../../config/yup';

export const loginSchema = yup.object().shape({
  username: yup.string().email().required(),
  password: yup.string().min(8).required(),
});

export const registerSchema = yup.object().shape({
  email: yup.string().email().required(),
  username: yup.string().min(8).required(),
  password: yup.string().min(8).required(),
  passwordConfirm: yup
    .string()
    .min(8)
    .required()
    .oneOf([yup.ref('password'), null], 'Les champs ne sont pas identiques'),
});
