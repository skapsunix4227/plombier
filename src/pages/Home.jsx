import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Bienvenue chez Plomberie Services
      </Typography>
      <Typography variant="body1" paragraph>
        Nous sommes spécialisés dans les réparations et installations de plomberie. Prenez rendez-vous dès maintenant pour bénéficier de nos services professionnels.
      </Typography>
      <Button variant="contained" component={Link} to="/appointment">
        Prendre rendez-vous
      </Button>
    </Container>
  );
}

export default Home;