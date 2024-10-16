import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, TextField, Button, Box } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  name: Yup.string().required('Le nom est requis'),
  email: Yup.string().email('Email invalide').required('L\'email est requis'),
  phone: Yup.string().required('Le numéro de téléphone est requis'),
  skills: Yup.string().required('Les compétences sont requises'),
  availability: Yup.string().required('La disponibilité est requise'),
});

function PlumberForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [plumber, setPlumber] = useState(null);

  useEffect(() => {
    if (id) {
      fetchPlumber();
    }
  }, [id]);

  const fetchPlumber = async () => {
    try {
      const response = await fetch(`/api/plumbers/${id}`);
      if (response.ok) {
        const data = await response.json();
        setPlumber(data);
        formik.setValues({
          name: data.name,
          email: data.email,
          phone: data.phone,
          skills: data.skills.join(', '),
          availability: JSON.stringify(data.availability),
        });
      } else {
        console.error('Failed to fetch plumber');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      skills: '',
      availability: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const plumberData = {
        ...values,
        skills: values.skills.split(',').map(skill => skill.trim()),
        availability: JSON.parse(values.availability),
      };

      try {
        const url = id ? `/api/plumbers/${id}` : '/api/plumbers';
        const method = id ? 'PUT' : 'POST';
        const response = await fetch(url, {
          method: method,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(plumberData),
        });

        if (response.ok) {
          navigate('/plumbers');
        } else {
          console.error('Failed to save plumber');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    },
  });

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        {id ? 'Modifier le plombier' : 'Ajouter un plombier'}
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
          id="email"
          name="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          margin="normal"
        />
        <TextField
          fullWidth
          id="phone"
          name="phone"
          label="Téléphone"
          value={formik.values.phone}
          onChange={formik.handleChange}
          error={formik.touched.phone && Boolean(formik.errors.phone)}
          helperText={formik.touched.phone && formik.errors.phone}
          margin="normal"
        />
        <TextField
          fullWidth
          id="skills"
          name="skills"
          label="Compétences (séparées par des virgules)"
          value={formik.values.skills}
          onChange={formik.handleChange}
          error={formik.touched.skills && Boolean(formik.errors.skills)}
          helperText={formik.touched.skills && formik.errors.skills}
          margin="normal"
        />
        <TextField
          fullWidth
          id="availability"
          name="availability"
          label="Disponibilité (format JSON)"
          value={formik.values.availability}
          onChange={formik.handleChange}
          error={formik.touched.availability && Boolean(formik.errors.availability)}
          helperText={formik.touched.availability && formik.errors.availability}
          margin="normal"
          multiline
          rows={4}
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

export default PlumberForm;