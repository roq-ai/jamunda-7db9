import * as yup from 'yup';

export const contentValidationSchema = yup.object().shape({
  video: yup.string(),
  photo: yup.string(),
  general_information: yup.string(),
  administrator_id: yup.string().nullable(),
  content_manager_id: yup.string().nullable(),
});
