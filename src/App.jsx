import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Header from './components/Header';
import Home from './pages/Home';
import Appointment from './pages/Appointment';
import Contact from './pages/Contact';
import BackOffice from './pages/BackOffice';
import Login from './pages/Login';
import Plumbers from './pages/Plumbers';
import PlumberForm from './pages/PlumberForm';
import Services from './pages/Services';
import ServiceForm from './pages/ServiceForm';
import Inventory from './pages/Inventory';
import InventoryForm from './pages/InventoryForm';
import Interventions from './pages/Interventions';
import InterventionForm from './pages/InterventionForm';
import Clients from './pages/Clients';
import ClientForm from './pages/ClientForm';
import Invoices from './pages/Invoices';
import InvoiceForm from './pages/InvoiceForm';
import Reviews from './pages/Reviews';
import ReviewForm from './pages/ReviewForm';

const theme = createTheme();

function PrivateRoute({ children }) {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/appointment" element={<Appointment />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route 
          path="/backoffice" 
          element={
            <PrivateRoute>
              <BackOffice />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/plumbers" 
          element={
            <PrivateRoute>
              <Plumbers />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/plumbers/new" 
          element={
            <PrivateRoute>
              <PlumberForm />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/plumbers/:id" 
          element={
            <PrivateRoute>
              <PlumberForm />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/plumbers/:id/edit" 
          element={
            <PrivateRoute>
              <PlumberForm />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/services" 
          element={
            <PrivateRoute>
              <Services />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/services/new" 
          element={
            <PrivateRoute>
              <ServiceForm />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/services/:id" 
          element={
            <PrivateRoute>
              <ServiceForm />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/services/:id/edit" 
          element={
            <PrivateRoute>
              <ServiceForm />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/inventory" 
          element={
            <PrivateRoute>
              <Inventory />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/inventory/new" 
          element={
            <PrivateRoute>
              <InventoryForm />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/inventory/:id" 
          element={
            <PrivateRoute>
              <InventoryForm />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/inventory/:id/edit" 
          element={
            <PrivateRoute>
              <InventoryForm />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/interventions" 
          element={
            <PrivateRoute>
              <Interventions />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/interventions/new" 
          element={
            <PrivateRoute>
              <InterventionForm />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/interventions/:id" 
          element={
            <PrivateRoute>
              <InterventionForm />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/interventions/:id/edit" 
          element={
            <PrivateRoute>
              <InterventionForm />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/clients" 
          element={
            <PrivateRoute>
              <Clients />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/clients/new" 
          element={
            <PrivateRoute>
              <ClientForm />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/clients/:id" 
          element={
            <PrivateRoute>
              <ClientForm />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/clients/:id/edit" 
          element={
            <PrivateRoute>
              <ClientForm />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/invoices" 
          element={
            <PrivateRoute>
              <Invoices />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/invoices/new" 
          element={
            <PrivateRoute>
              <InvoiceForm />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/invoices/:id" 
          element={
            <PrivateRoute>
              <InvoiceForm />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/invoices/:id/edit" 
          element={
            <PrivateRoute>
              <InvoiceForm />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/reviews" 
          element={
            <PrivateRoute>
              <Reviews />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/reviews/new" 
          element={
            <PrivateRoute>
              <ReviewForm />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/reviews/:id" 
          element={
            <PrivateRoute>
              <ReviewForm />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/reviews/:id/edit" 
          element={
            <PrivateRoute>
              <ReviewForm />
            </PrivateRoute>
          } 
        />
      </Routes>
    </ThemeProvider>
  );
}

export default App;