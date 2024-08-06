import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box mt={2} p={2} bgcolor="#f1f1f1">
      <Typography variant="body2" color="textSecondary" align="center">
        © 2024 AKOR Design. Todos los derechos reservados.
      </Typography>
    </Box>
  );
};

export default Footer;
