import * as yup from 'yup';

import '../../../../../config/yup';

export const packSchema = yup.object().shape({
  description: yup.string().required(),
  level: yup.string().required(),
  category: yup.string().required(),
  isFree: yup.boolean().required(),
});
