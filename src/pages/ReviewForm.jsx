import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, TextField, Button, Box, FormControl, InputLabel, Select, MenuItem, Rating } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  interventionId: Yup.number().required('L\'intervention est requise'),
  rating: Yup.number().min(1).max(5).required('La note est requise'),
  comment: Yup.string(),
});

function ReviewForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [review, setReview] = useState(null);
  const [interventions, setInterventions] = useState([]);

  useEffect(() => {
    fetchInterventions();
    if (id) {
      fetchReview();
    }
  }, [id]);

  const fetchReview = async () => {
    try {
      const response = await fetch(`/api/reviews/${id}`);
      if (response.ok) {
        const data = await response.json();
        setReview(data);
        formik.setValues({
          interventionId: data.intervention.id,
          rating: data.rating,
          comment: data.comment || '',
        });
      } else {
        console.error('Failed to fetch review');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchInterventions = async () => {
    try {
      const response = await fetch('/api/interventions');
      if (response.ok) {
        const data = await response.json();
        setInterventions(data);
      } else {
        console.error('Failed to fetch interventions');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const formik = useFormik({
    initialValues: {
      interventionId: '',
      rating: 0,
      comment: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const url = id ? `/api/reviews/${id}` : '/api/reviews';
        const method = id ? 'PUT' : 'POST';
        const response = await fetch(url, {
          method: method,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });

        if (response.ok) {
          navigate('/reviews');
        } else {
          console.error('Failed to save review');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    },
  });

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        {id ? 'Modifier l\'avis' : 'Ajouter un avis'}
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <FormControl fullWidth margin="normal">
          <InputLabel id="intervention-label">Intervention</InputLabel>
          <Select
            labelId="intervention-label"
            id="interventionId"
            name="interventionId"
            value={formik.values.interventionId}
            onChange={formik.handleChange}
            error={formik.touched.interventionId && Boolean(formik.errors.interventionId)}
          >
            {interventions.map((intervention) => (
              <MenuItem key={intervention.id} value={intervention.id}>
                {`Intervention ${intervention.id}`}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Box mt={2}>
          <Typography component="legend">Note</Typography>
          <Rating
            name="rating"
            value={formik.values.rating}
            onChange={(event, newValue) => {
              formik.setFieldValue('rating', newValue);
            }}
          />
        </Box>
        <TextField
          fullWidth
          id="comment"
          name="comment"
          label="Commentaire"
          multiline
          rows={4}
          value={formik.values.comment}
          onChange={formik.handleChange}
          error={formik.touched.comment && Boolean(formik.errors.comment)}
          helperText={formik.touched.comment && formik.errors.comment}
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

export default ReviewForm;