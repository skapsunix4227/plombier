import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, TextField, Button, Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  appointmentId: Yup.number().required('Le rendez-vous est requis'),
  plumberId: Yup.number().required('Le plombier est requis'),
  status: Yup.string().required('Le statut est requis'),
  startTime: Yup.date().required('L\'heure de début est requise'),
  endTime: Yup.date().nullable(),
  notes: Yup.string(),
});

function InterventionForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [intervention, setIntervention] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [plumbers, setPlumbers] = useState([]);

  useEffect(() => {
    fetchAppointments();
    fetchPlumbers();
    if (id) {
      fetchIntervention();
    }
  }, [id]);

  const fetchIntervention = async () => {
    try {
      const response = await fetch(`/api/interventions/${id}`);
      if (response.ok) {
        const data = await response.json();
        setIntervention(data);
        formik.setValues({
          appointmentId: data.appointment.id,
          plumberId: data.plumber.id,
          status: data.status,
          startTime: data.startTime,
          endTime: data.endTime || '',
          notes: data.notes || '',
        });
      } else {
        console.error('Failed to fetch intervention');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchAppointments = async () => {
    try {
      const response = await fetch('/api/appointments');
      if (response.ok) {
        const data = await response.json();
        setAppointments(data);
      } else {
        console.error('Failed to fetch appointments');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

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

  const formik = useFormik({
    initialValues: {
      appointmentId: '',
      plumberId: '',
      status: '',
      startTime: '',
      endTime: '',
      notes: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const url = id ? `/api/interventions/${id}` : '/api/interventions';
        const method = id ? 'PUT' : 'POST';
        const response = await fetch(url, {
          method: method,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });

        if (response.ok) {
          navigate('/interventions');
        } else {
          console.error('Failed to save intervention');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    },
  });

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        {id ? 'Modifier l\'intervention' : 'Ajouter une intervention'}
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <FormControl fullWidth margin="normal">
          <InputLabel id="appointment-label">Rendez-vous</InputLabel>
          <Select
            labelId="appointment-label"
            id="appointmentId"
            name="appointmentId"
            value={formik.values.appointmentId}
            onChange={formik.handleChange}
            error={formik.touched.appointmentId && Boolean(formik.errors.appointmentId)}
          >
            {appointments.map((appointment) => (
              <MenuItem key={appointment.id} value={appointment.id}>
                {`${appointment.id} - ${appointment.name} (${new Date(appointment.date).toLocaleDateString()})`}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel id="plumber-label">Plombier</InputLabel>
          <Select
            labelId="plumber-label"
            id="plumberId"
            name="plumberId"
            value={formik.values.plumberId}
            onChange={formik.handleChange}
            error={formik.touched.plumberId && Boolean(formik.errors.plumberId)}
          >
            {plumbers.map((plumber) => (
              <MenuItem key={plumber.id} value={plumber.id}>
                {plumber.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          fullWidth
          id="status"
          name="status"
          label="Statut"
          value={formik.values.status}
          onChange={formik.handleChange}
          error={formik.touched.status && Boolean(formik.errors.status)}
          helperText={formik.touched.status && formik.errors.status}
          margin="normal"
        />
        <TextField
          fullWidth
          id="startTime"
          name="startTime"
          label="Heure de début"
          type="datetime-local"
          value={formik.values.startTime}
          onChange={formik.handleChange}
          error={formik.touched.startTime && Boolean(formik.errors.startTime)}
          helperText={formik.touched.startTime && formik.errors.startTime}
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          fullWidth
          id="endTime"
          name="endTime"
          label="Heure de fin"
          type="datetime-local"
          value={formik.values.endTime}
          onChange={formik.handleChange}
          error={formik.touched.endTime && Boolean(formik.errors.endTime)}
          helperText={formik.touched.endTime && formik.errors.endTime}
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          fullWidth
          id="notes"
          name="notes"
          label="Notes"
          multiline
          rows={4}
          value={formik.values.notes}
          onChange={formik.handleChange}
          error={formik.touched.notes && Boolean(formik.errors.notes)}
          helperText={formik.touched.notes && formik.errors.notes}
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

export default InterventionForm;