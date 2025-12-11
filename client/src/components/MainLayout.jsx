import React from 'react';
import Header from './Header';
import { Box } from '@mui/material';

export default function MainLayout({ children }) {
  return (
    <Box>
      <Header />
      <Box component="main" sx={{ mt: 2 }}>
        {children}
      </Box>
    </Box>
  );
}
