import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
  Center,
} from '@chakra-ui/react';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useFormik, FormikHelpers } from 'formik';
import { getContentById, updateContentById } from 'apiSdk/contents';
import { Error } from 'components/error';
import { contentValidationSchema } from 'validationSchema/contents';
import { ContentInterface } from 'interfaces/content';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { AdministratorInterface } from 'interfaces/administrator';
import { ContentManagerInterface } from 'interfaces/content-manager';
import { getAdministrators } from 'apiSdk/administrators';
import { getContentManagers } from 'apiSdk/content-managers';

function ContentEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<ContentInterface>(
    () => (id ? `/contents/${id}` : null),
    () => getContentById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: ContentInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateContentById(id, values);
      mutate(updated);
      resetForm();
      router.push('/contents');
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<ContentInterface>({
    initialValues: data,
    validationSchema: contentValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Edit Content
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        {formError && (
          <Box mb={4}>
            <Error error={formError} />
          </Box>
        )}
        {isLoading || (!formik.values && !error) ? (
          <Center>
            <Spinner />
          </Center>
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <FormControl id="video" mb="4" isInvalid={!!formik.errors?.video}>
              <FormLabel>Video</FormLabel>
              <Input type="text" name="video" value={formik.values?.video} onChange={formik.handleChange} />
              {formik.errors.video && <FormErrorMessage>{formik.errors?.video}</FormErrorMessage>}
            </FormControl>
            <FormControl id="photo" mb="4" isInvalid={!!formik.errors?.photo}>
              <FormLabel>Photo</FormLabel>
              <Input type="text" name="photo" value={formik.values?.photo} onChange={formik.handleChange} />
              {formik.errors.photo && <FormErrorMessage>{formik.errors?.photo}</FormErrorMessage>}
            </FormControl>
            <FormControl id="general_information" mb="4" isInvalid={!!formik.errors?.general_information}>
              <FormLabel>General Information</FormLabel>
              <Input
                type="text"
                name="general_information"
                value={formik.values?.general_information}
                onChange={formik.handleChange}
              />
              {formik.errors.general_information && (
                <FormErrorMessage>{formik.errors?.general_information}</FormErrorMessage>
              )}
            </FormControl>
            <AsyncSelect<AdministratorInterface>
              formik={formik}
              name={'administrator_id'}
              label={'Select Administrator'}
              placeholder={'Select Administrator'}
              fetcher={getAdministrators}
              renderOption={(record) => (
                <option key={record.id} value={record.id}>
                  {record?.name}
                </option>
              )}
            />
            <AsyncSelect<ContentManagerInterface>
              formik={formik}
              name={'content_manager_id'}
              label={'Select Content Manager'}
              placeholder={'Select Content Manager'}
              fetcher={getContentManagers}
              renderOption={(record) => (
                <option key={record.id} value={record.id}>
                  {record?.id}
                </option>
              )}
            />
            <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
              Submit
            </Button>
          </form>
        )}
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'content',
  operation: AccessOperationEnum.UPDATE,
})(ContentEditPage);
