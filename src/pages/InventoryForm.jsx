import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, TextField, Button, Box } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  itemName: Yup.string().required('Le nom de l\'article est requis'),
  quantity: Yup.number().integer('La quantité doit être un nombre entier').min(0, 'La quantité ne peut pas être négative').required('La quantité est requise'),
  unitPrice: Yup.number().positive('Le prix unitaire doit être positif').required('Le prix unitaire est requis'),
  supplier: Yup.string().required('Le fournisseur est requis'),
});

function InventoryForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [inventoryItem, setInventoryItem] = useState(null);

  useEffect(() => {
    if (id) {
      fetchInventoryItem();
    }
  }, [id]);

  const fetchInventoryItem = async () => {
    try {
      const response = await fetch(`/api/inventory/${id}`);
      if (response.ok) {
        const data = await response.json();
        setInventoryItem(data);
        formik.setValues({
          itemName: data.itemName,
          quantity: data.quantity,
          unitPrice: data.unitPrice,
          supplier: data.supplier,
        });
      } else {
        console.error('Failed to fetch inventory item');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const formik = useFormik({
    initialValues: {
      itemName: '',
      quantity: '',
      unitPrice: '',
      supplier: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const url = id ? `/api/inventory/${id}` : '/api/inventory';
        const method = id ? 'PUT' : 'POST';
        const response = await fetch(url, {
          method: method,
          headers: {
            'Content-Type': 'application/json',},
          body: JSON.stringify(values),
        });

        if (response.ok) {
          navigate('/inventory');
        } else {
          console.error('Failed to save inventory item');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    },
  });

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        {id ? 'Modifier l\'article' : 'Ajouter un article'}
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id="itemName"
          name="itemName"
          label="Nom de l'article"
          value={formik.values.itemName}
          onChange={formik.handleChange}
          error={formik.touched.itemName && Boolean(formik.errors.itemName)}
          helperText={formik.touched.itemName && formik.errors.itemName}
          margin="normal"
        />
        <TextField
          fullWidth
          id="quantity"
          name="quantity"
          label="Quantité"
          type="number"
          value={formik.values.quantity}
          onChange={formik.handleChange}
          error={formik.touched.quantity && Boolean(formik.errors.quantity)}
          helperText={formik.touched.quantity && formik.errors.quantity}
          margin="normal"
        />
        <TextField
          fullWidth
          id="unitPrice"
          name="unitPrice"
          label="Prix unitaire"
          type="number"
          value={formik.values.unitPrice}
          onChange={formik.handleChange}
          error={formik.touched.unitPrice && Boolean(formik.errors.unitPrice)}
          helperText={formik.touched.unitPrice && formik.errors.unitPrice}
          margin="normal"
        />
        <TextField
          fullWidth
          id="supplier"
          name="supplier"
          label="Fournisseur"
          value={formik.values.supplier}
          onChange={formik.handleChange}
          error={formik.touched.supplier && Boolean(formik.errors.supplier)}
          helperText={formik.touched.supplier && formik.errors.supplier}
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

export default InventoryForm;