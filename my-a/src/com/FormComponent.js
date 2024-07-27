import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { TextField, Button, Box } from '@mui/material';

const validationSchema = Yup.object({
  title: Yup.string().when('showComments', {
    is: false,
    then: Yup.string().required('Требуется название'),
  }),
  name: Yup.string().when('showComments', {
    is: true,
    then: Yup.string().required('Требуется имя'),
  }),
  email: Yup.string().when('showComments', {
    is: true,
    then: Yup.string().email('Неверный адрес электронной почты').required('Требуется электронная почта'),
  }),
  body: Yup.string().required('Требуется тело'),
  description: Yup.string().required('Требуется описание'),
});


const FormComponent = ({ onAddRecord, showComments }) => {
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const newRecord = { ...values, id: Date.now() };
      const url = showComments ? 'http://localhost:3000/comments' : 'http://localhost:3000/posts';
      const response = await axios.post(url, newRecord);
      onAddRecord(response.data);
      resetForm();
    } catch (error) {
      console.error('Ошибка отправки формы:', error);
  
    }
    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={{ title: '', name: '', email: '', body: '', description: '' }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          {!showComments && (
            <Box mb={2}>
              <Field
                name="title"
                as={TextField}
                label="Title"
                variant="outlined"
                fullWidth
                helperText={<ErrorMessage name="title" />}
                error={Boolean(<ErrorMessage name="title" />)}
              />
            </Box>
          )}
          {showComments && (
            <>
              <Box mb={2}>
                <Field
                  name="name"
                  as={TextField}
                  label="Name"
                  variant="outlined"
                  fullWidth
                  helperText={<ErrorMessage name="name" />}
                  error={Boolean(<ErrorMessage name="name" />)}
                />
              </Box>
              <Box mb={2}>
                <Field
                  name="email"
                  as={TextField}
                  label="Email"
                  variant="outlined"
                  fullWidth
                  helperText={<ErrorMessage name="email" />}
                  error={Boolean(<ErrorMessage name="email" />)}
                />
              </Box>
            </>
          )}
          <Box mb={2}>
            <Field
              name="body"
              as={TextField}
              label="Body"
              variant="outlined"
              fullWidth
              helperText={<ErrorMessage name="body" />}
              error={Boolean(<ErrorMessage name="body" />)}
            />
          </Box>
          <Box mb={2}>
            <Field
              name="description"
              as={TextField}
              label="Description"
              variant="outlined"
              fullWidth
              helperText={<ErrorMessage name="description" />}
              error={Boolean(<ErrorMessage name="description" />)}
            />
          </Box>
          <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
            Отправить
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default FormComponent;
