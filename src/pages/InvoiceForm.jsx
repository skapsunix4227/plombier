import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, TextField, Button, Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  interventionId: Yup.number().required('L\'intervention est requise'),
  amount: Yup.number().positive('Le montant doit être positif').required('Le montant est requis'),
  status: Yup.string().required('Le statut est requis'),
});

function InvoiceForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [invoice, setInvoice] = useState(null);
  const [interventions, setInterventions] = useState([]);

  useEffect(() => {
    fetchInterventions();
    if (id) {
      fetchInvoice();
    }
  }, [id]);

  const fetchInvoice = async () => {
    try {
      const response = await fetch(`/api/invoices/${id}`);
      if (response.ok) {
        const data = await response.json();
        setInvoice(data);
        formik.setValues({
          interventionId: data.intervention.id,
          amount: data.amount,
          status: data.status,
        });
      } else {
        console.error('Failed to fetch invoice');
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
      amount: '',
      status: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const url = id ? `/api/invoices/${id}` : '/api/invoices';
        const method = id ? 'PUT' : 'POST';
        const response = await fetch(url, {
          method: method,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });

        if (response.ok) {
          navigate('/invoices');
        } else {
          console.error('Failed to save invoice');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    },
  });

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        {id ? 'Modifier la facture' : 'Créer une facture'}
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
        <TextField
          fullWidth
          id="amount"
          name="amount"
          label="Montant"
          type="number"
          value={formik.values.amount}
          onChange={formik.handleChange}
          error={formik.touched.amount && Boolean(formik.errors.amount)}
          helperText={formik.touched.amount && formik.errors.amount}
          margin="normal"
        />
        <FormControl fullWidth margin="normal">
          <InputLabel id="status-label">Statut</InputLabel>
          <Select
            labelId="status-label"
            id="status"
            name="status"
            value={formik.values.status}
            onChange={formik.handleChange}
            error={formik.touched.status && Boolean(formik.errors.status)}
          >
            <MenuItem value="Pending">En attente</MenuItem>
            <MenuItem value="Paid">Payée</MenuItem>
            <MenuItem value="Cancelled">Annulée</MenuItem>
          </Select>
        </FormControl>
        <Box mt={2}>
          <Button color="primary" variant="contained" fullWidth type="submit">
            {id ? 'Modifier' : 'Créer'}
          </Button>
        </Box>
      </form>
    </Container>
  );
}

export default InvoiceForm;