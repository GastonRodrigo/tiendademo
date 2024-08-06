import React from 'react';
import { TextField, MenuItem, Grid } from '@mui/material';

const Filter = ({ filterText, filterField, onFilterTextChange, onFilterFieldChange }) => {
  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item>
        <TextField
          select
          label="Filtrar por"
          value={filterField}
          onChange={(e) => onFilterFieldChange(e.target.value)}
        >
          <MenuItem value="number">Número de Orden</MenuItem>
          <MenuItem value="client">Cliente</MenuItem>
          <MenuItem value="model">Modelo</MenuItem>
          <MenuItem value="fabric">Tela</MenuItem>
        </TextField>
      </Grid>
      <Grid item>
        <TextField
          label="Buscar"
          value={filterText}
          onChange={(e) => onFilterTextChange(e.target.value)}
        />
      </Grid>
    </Grid>
  );
};

export default Filter;
