import React from 'react';
import { AppBar, Toolbar, Typography, Box, IconButton } from '@mui/material';
import TelegramIcon from '@mui/icons-material/Telegram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import PhoneIcon from '@mui/icons-material/Phone'; // можна замінити на Viber іконку, якщо додати svg
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AppBar position="static" sx={{ top: 'auto', bottom: 0, mt: 2 }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6">TechMarket</Typography>

        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          <IconButton
            color="inherit"
            component="a"
            href="https://t.me/yourtelegram"
            target="_blank"
          >
            <TelegramIcon />
          </IconButton>
          <IconButton
            color="inherit"
            component="a"
            href="https://web.whatsapp.com"
            target="_blank"
          >
            <WhatsAppIcon />
          </IconButton>
          <IconButton
            color="inherit"
            component="a"
            href="viber://chat?number=yourviber"
            target="_blank"
          >
            <PhoneIcon />
          </IconButton>
          <IconButton color="inherit" onClick={scrollToTop}>
            <KeyboardArrowUpIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
