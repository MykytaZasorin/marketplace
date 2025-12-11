import React from 'react';
import Header from './Header';
import { Box } from '@mui/material';
import Footer from './Footer';

export default function MainLayout({ children, cartItems }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header cartItems={cartItems} />
      <Box component="main" sx={{ mt: 2 }}>
        {children}
      </Box>
      <Footer />
    </Box>
  );
}
