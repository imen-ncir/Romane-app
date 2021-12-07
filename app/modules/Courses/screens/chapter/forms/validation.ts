import * as yup from 'yup';

import '../../../../../config/yup';

export const chapterSchema = yup.object().shape({
  title: yup.string().required(),
});
