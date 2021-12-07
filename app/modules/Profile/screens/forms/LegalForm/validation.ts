import * as yup from 'yup';

import '../../../../../config/yup';

export const schema = yup.object().shape({
  firstname: yup.string().required(),
  lastname: yup.string().required(),
  line1: yup.string().required(),
  zipcode: yup.string().length(5).required(),
  city: yup.string().required(),
  phone: yup.string().length(10).required(),
});
