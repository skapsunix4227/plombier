import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, TextField, Button, Box } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  name: Yup.string().required('Le nom est requis'),
  description: Yup.string().required('La description est requise'),
  basePrice: Yup.number().positive('Le prix doit être positif').required('Le prix de base est requis'),
  duration: Yup.number().positive('La durée doit être positive').integer('La durée doit être un nombre entier').required('La durée est requise'),
});

function ServiceForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);

  useEffect(() => {
    if (id) {
      fetchService();
    }
  }, [id]);

  const fetchService = async () => {
    try {
      const response = await fetch(`/api/services/${id}`);
      if (response.ok) {
        const data = await response.json();
        setService(data);
        formik.setValues({
          name: data.name,
          description: data.description,
          basePrice: data.basePrice,
          duration: data.duration,
        });
      } else {
        console.error('Failed to fetch service');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      basePrice: '',
      duration: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const url = id ? `/api/services/${id}` : '/api/services';
        const method = id ? 'PUT' : 'POST';
        const response = await fetch(url, {
          method: method,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });

        if (response.ok) {
          navigate('/services');
        } else {
          console.error('Failed to save service');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    },
  });

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        {id ? 'Modifier le service' : 'Ajouter un service'}
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id="name"
          name="name"
          label="Nom"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
          margin="normal"
        />
        <TextField
          fullWidth
          id="description"
          name="description"
          label="Description"
          value={formik.values.description}
          onChange={formik.handleChange}
          error={formik.touched.description && Boolean(formik.errors.description)}
          helperText={formik.touched.description && formik.errors.description}
          margin="normal"
          multiline
          rows={4}
        />
        <TextField
          fullWidth
          id="basePrice"
          name="basePrice"
          label="Prix de base"
          type="number"
          value={formik.values.basePrice}
          onChange={formik.handleChange}
          error={formik.touched.basePrice && Boolean(formik.errors.basePrice)}
          helperText={formik.touched.basePrice && formik.errors.basePrice}
          margin="normal"
        />
        <TextField
          fullWidth
          id="duration"
          name="duration"
          label="Durée (minutes)"
          type="number"
          value={formik.values.duration}
          onChange={formik.handleChange}
          error={formik.touched.duration && Boolean(formik.errors.duration)}
          helperText={formik.touched.duration && formik.errors.duration}
          margin="normal"
        />
        <Box mt={2}>
          <Button color="primary" variant="contained" fullWidth type="submit">
            {id ? 'Modifier' : 'Ajouter'}
          </Button>
        </Box>
      </form>
    </Container>
  );
}

export default ServiceForm;