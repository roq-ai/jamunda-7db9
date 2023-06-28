import * as yup from 'yup';

export const contentManagerValidationSchema = yup.object().shape({
  user_id: yup.string().nullable(),
});
