import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Plomberie App
        </Typography>
        <Button color="inherit" component={Link} to="/">Accueil</Button>
        <Button color="inherit" component={Link} to="/appointment">Rendez-vous</Button>
        <Button color="inherit" component={Link} to="/contact">Contact</Button>
        {token ? (
          <>
            <Button color="inherit" component={Link} to="/backoffice">Back Office</Button>
            <Button color="inherit" component={Link} to="/plumbers">Plombiers</Button>
            <Button color="inherit" component={Link} to="/services">Services</Button>
            <Button color="inherit" component={Link} to="/inventory">Inventaire</Button>
            <Button color="inherit" component={Link} to="/interventions">Interventions</Button>
            <Button color="inherit" component={Link} to="/clients">Clients</Button>
            <Button color="inherit" component={Link} to="/invoices">Factures</Button>
            <Button color="inherit" component={Link} to="/reviews">Avis</Button>
            <Button color="inherit" onClick={handleLogout}>Déconnexion</Button>
          </>
        ) : (
          <Button color="inherit" component={Link} to="/login">Connexion</Button>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Header;