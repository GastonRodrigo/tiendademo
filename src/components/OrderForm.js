import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { TextField, Button, Container, Grid, Select, MenuItem, InputLabel, FormControl, Chip, Box, Typography, OutlinedInput, Checkbox, FormControlLabel } from '@mui/material';

const models = ["Dune", "Moon", "Chaise Lounge", "New C/A", "New S/A", "Beach", "Beach Max", "Izq", "Der", "Cen", "Cur", "Rec"];

const OrderForm = ({ addOrder, currentOrder, updateOrder }) => {
  const [order, setOrder] = useState({
    number: '',
    date: new Date(),
    client: '',
    model: [],
    measures: '',
    fabric: '',
    structure: false,
    gluing: false,
    upholstery: false,
    cutting: false,
    sewing: false,
    status: 'PENDING'
  });

  useEffect(() => {
    if (currentOrder) {
      setOrder({ ...currentOrder, date: new Date(currentOrder.date) });
    }
  }, [currentOrder]);

  const handleChange = (e) => {
    const { name, type, checked } = e.target;
    setOrder({
      ...order,
      [name]: type === 'checkbox' ? checked : e.target.value
    });
  };

  const handleDateChange = (date) => {
    setOrder({ ...order, date });
  };

  const handleModelChange = (event) => {
    const {
      target: { value },
    } = event;
    setOrder({
      ...order,
      model: typeof value === 'string' ? value.split(',') : value,
    });
  };

  const handleDeleteModel = (modelToDelete) => () => {
    setOrder((prevOrder) => ({
      ...prevOrder,
      model: prevOrder.model.filter((model) => model !== modelToDelete),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedOrder = {
      ...order,
      date: order.date.toISOString(),
      status: order.structure && order.gluing && order.upholstery && order.cutting && order.sewing ? 'READY' : 'PENDING'
    };
    if (currentOrder) {
      updateOrder(updatedOrder);
    } else {
      addOrder(updatedOrder);
    }
    setOrder({
      number: '',
      date: new Date(),
      client: '',
      model: [],
      measures: '',
      fabric: '',
      structure: false,
      gluing: false,
      upholstery: false,
      cutting: false,
      sewing: false,
      status: 'PENDING'
    });
  };

  return (
    <Container>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {currentOrder ? 'Editar Orden' : 'Agregar Nueva Orden'}
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Número de Orden"
                name="number"
                value={order.number}
                onChange={handleChange}
                required
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box sx={{ position: 'relative', zIndex: 1000 }}>
                <DatePicker
                  selected={order.date}
                  onChange={handleDateChange}
                  customInput={<TextField fullWidth label="Fecha" variant="outlined" />}
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Cliente"
                name="client"
                value={order.client}
                onChange={handleChange}
                required
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth variant="outlined">
                <InputLabel id="model-label">Modelos</InputLabel>
                <Select
                  labelId="model-label"
                  id="model"
                  multiple
                  value={order.model}
                  onChange={handleModelChange}
                  input={<OutlinedInput id="select-multiple-chip" label="Modelos" />}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip
                          key={value}
                          label={value}
                          onDelete={handleDeleteModel(value)}
                          onMouseDown={(event) => event.stopPropagation()}
                        />
                      ))}
                    </Box>
                  )}
                >
                  {models.map((model) => (
                    <MenuItem key={model} value={model}>
                      {model}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Medidas"
                name="measures"
                value={order.measures}
                onChange={handleChange}
                required
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Tela"
                name="fabric"
                value={order.fabric}
                onChange={handleChange}
                required
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={<Checkbox checked={order.structure} onChange={handleChange} name="structure" />}
                label="Estructura"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={<Checkbox checked={order.gluing} onChange={handleChange} name="gluing" />}
                label="Engomado"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={<Checkbox checked={order.upholstery} onChange={handleChange} name="upholstery" />}
                label="Tapizado"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={<Checkbox checked={order.cutting} onChange={handleChange} name="cutting" />}
                label="Corte"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={<Checkbox checked={order.sewing} onChange={handleChange} name="sewing" />}
                label="Costura"
              />
            </Grid>
            <Grid item xs={12}>
              <Button fullWidth variant="contained" color="primary" type="submit">
                {currentOrder ? 'Actualizar Orden' : 'Agregar Orden'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default OrderForm;
