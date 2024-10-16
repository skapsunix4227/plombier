import React, { useState, useEffect } from 'react';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { Link } from 'react-router-dom';

function Interventions() {
  const [interventions, setInterventions] = useState([]);

  useEffect(() => {
    fetchInterventions();
  }, []);

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

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Interventions
      </Typography>
      <Button component={Link} to="/interventions/new" variant="contained" color="primary" sx={{ mb: 2 }}>
        Ajouter une intervention
      </Button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Rendez-vous</TableCell>
              <TableCell>Plombier</TableCell>
              <TableCell>Statut</TableCell>
              <TableCell>Début</TableCell>
              <TableCell>Fin</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {interventions.map((intervention) => (
              <TableRow key={intervention.id}>
                <TableCell>{intervention.appointment.id}</TableCell>
                <TableCell>{intervention.plumber.name}</TableCell>
                <TableCell>{intervention.status}</TableCell>
                <TableCell>{new Date(intervention.startTime).toLocaleString()}</TableCell>
                <TableCell>{intervention.endTime ? new Date(intervention.endTime).toLocaleString() : 'En cours'}</TableCell>
                <TableCell>
                  <Button component={Link} to={`/interventions/${intervention.id}`} variant="outlined" size="small" sx={{ mr: 1 }}>
                    Voir
                  </Button>
                  <Button component={Link} to={`/interventions/${intervention.id}/edit`} variant="outlined" size="small">
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

export default Interventions;