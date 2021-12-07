import * as yup from 'yup';

import '../../../../../config/yup';

export const subjectSchema = yup.object().shape({
  title: yup.string().required(),
  color: yup.string().required(),
  picture: yup.string(),
});
