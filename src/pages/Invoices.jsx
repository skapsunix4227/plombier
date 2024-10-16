import React, { useState, useEffect } from 'react';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { Link } from 'react-router-dom';

function Invoices() {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    try {
      const response = await fetch('/api/invoices');
      if (response.ok) {
        const data = await response.json();
        setInvoices(data);
      } else {
        console.error('Failed to fetch invoices');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Factures
      </Typography>
      <Button component={Link} to="/invoices/new" variant="contained" color="primary" sx={{ mb: 2 }}>
        Créer une facture
      </Button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Numéro</TableCell>
              <TableCell>Intervention</TableCell>
              <TableCell>Montant</TableCell>
              <TableCell>Date d'émission</TableCell>
              <TableCell>Statut</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {invoices.map((invoice) => (
              <TableRow key={invoice.id}>
                <TableCell>{invoice.id}</TableCell>
                <TableCell>{invoice.intervention.id}</TableCell>
                <TableCell>{invoice.amount} €</TableCell>
                <TableCell>{new Date(invoice.issueDate).toLocaleDateString()}</TableCell>
                <TableCell>{invoice.status}</TableCell>
                <TableCell>
                  <Button component={Link} to={`/invoices/${invoice.id}`} variant="outlined" size="small" sx={{ mr: 1 }}>
                    Voir
                  </Button>
                  <Button component={Link} to={`/invoices/${invoice.id}/edit`} variant="outlined" size="small">
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

export default Invoices;