import React, { useState, useEffect } from 'react';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { Link } from 'react-router-dom';

function Plumbers() {
  const [plumbers, setPlumbers] = useState([]);

  useEffect(() => {
    fetchPlumbers();
  }, []);

  const fetchPlumbers = async () => {
    try {
      const response = await fetch('/api/plumbers');
      if (response.ok) {
        const data = await response.json();
        setPlumbers(data);
      } else {
        console.error('Failed to fetch plumbers');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Plombiers
      </Typography>
      <Button component={Link} to="/plumbers/new" variant="contained" color="primary" sx={{ mb: 2 }}>
        Ajouter un plombier
      </Button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Nom</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Téléphone</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {plumbers.map((plumber) => (
              <TableRow key={plumber.id}>
                <TableCell>{plumber.name}</TableCell>
                <TableCell>{plumber.email}</TableCell>
                <TableCell>{plumber.phone}</TableCell>
                <TableCell>
                  <Button component={Link} to={`/plumbers/${plumber.id}`} variant="outlined" size="small" sx={{ mr: 1 }}>
                    Voir
                  </Button>
                  <Button component={Link} to={`/plumbers/${plumber.id}/edit`} variant="outlined" size="small">
                    Modifier
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default Plumbers;