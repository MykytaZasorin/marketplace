import { useState } from 'react';
import { Box, Paper, TextField, Button, Typography } from '@mui/material';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSend = async e => {
    e.preventDefault();

    try {
      const res = await fetch(
        'http://localhost:5000/auth/forgot',
        // 'https://marketplace-production-2e6c.up.railway.app/auth/forgot',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        setSent(true);
        // тут сервер має відправити лист із токеном на email
      } else {
        alert(data.error);
      }
    } catch (err) {
      alert('Помилка сервера');
    }
  };

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
        {!sent ? (
          <>
            <Typography variant="h5" mb={2}>
              Відновлення паролю
            </Typography>
            <form onSubmit={handleSend}>
              <TextField
                fullWidth
                type="email"
                label="Ваш Email"
                margin="normal"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
              <Button
                fullWidth
                type="submit"
                variant="contained"
                sx={{ mt: 2 }}
              >
                Відправити лист
              </Button>
            </form>
          </>
        ) : (
          <>
            <Typography variant="h6" mb={1}>
              Лист для відновлення паролю відправлено!
            </Typography>
            <Typography variant="body2">
              Перевірте вашу пошту та перейдіть за посиланням для створення
              нового паролю.
            </Typography>
          </>
        )}
      </Paper>
    </Box>
  );
}
