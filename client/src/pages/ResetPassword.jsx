import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Paper, TextField, Button, Typography } from '@mui/material';

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState(false);

  const handleReset = async e => {
    e.preventDefault();

    try {
      const res = await fetch(
        `https://marketplace-production-2e6c.up.railway.app/auth/reset/${token}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ password }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        setSuccess(true);
        setTimeout(() => navigate('/login'), 2000);
      } else {
        alert(data.error);
      }
    } catch (err) {
      alert('Помилка сервера');
    }
  };

  if (success) {
    return (
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pt: 4,
        }}
      >
        <Paper sx={{ p: 4, maxWidth: 400, width: '100%', textAlign: 'center' }}>
          <Typography variant="h6">Пароль успішно оновлено!</Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            Ви будете перенаправлені на сторінку логіну
          </Typography>
        </Paper>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pt: 4,
      }}
    >
      <Paper sx={{ p: 4, maxWidth: 400, width: '100%' }}>
        <Typography variant="h5" mb={2} textAlign="center">
          Створення нового паролю
        </Typography>

        <form onSubmit={handleReset}>
          <TextField
            fullWidth
            type="password"
            label="Новий пароль"
            margin="normal"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />

          <Button fullWidth type="submit" variant="contained" sx={{ mt: 2 }}>
            Оновити пароль
          </Button>
        </form>
      </Paper>
    </Box>
  );
}
