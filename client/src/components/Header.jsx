import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Badge,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from 'react-router-dom';
import { isTokenValid } from '../utils/tokenCheck';

export default function Header({ cartItems }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleCartClick = () => {
    const userToken = localStorage.getItem('userToken');

    if (!isTokenValid(userToken)) {
      localStorage.removeItem('userToken');
      navigate('/login', { replace: true });
      return;
    }

    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  return (
    <>
      <AppBar position="static">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6">My Shop</Typography>

          <Box>
            <Button color="inherit" onClick={() => navigate('/')}>
              Home
            </Button>
            <Button color="inherit" onClick={() => navigate('/login')}>
              Login
            </Button>
          </Box>

          <IconButton color="inherit" onClick={handleCartClick}>
            <Badge badgeContent={cartItems.length} color="secondary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Ваша корзина</DialogTitle>
        <DialogContent>
          {cartItems.length === 0 ? (
            <Typography>Корзина порожня</Typography>
          ) : (
            <ul>
              {cartItems.map((item, idx) => (
                <li key={idx}>
                  {item.name} - {item.quantity}
                </li>
              ))}
            </ul>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Закрити</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
