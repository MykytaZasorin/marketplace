import React from 'react';
import Header from './Header';
import { Box } from '@mui/material';

export default function MainLayout({ children, cartItems }) {
  return (
    <Box>
      <Header cartItems={cartItems} />
      <Box component="main" sx={{ mt: 2 }}>
        {children}
      </Box>
    </Box>
  );
}
