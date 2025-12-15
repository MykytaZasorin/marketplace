import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Paper, TextField, Button, Typography, Link } from '@mui/material';
import useAuth from '../hooks/useAuth';

function Login() {
  useAuth();

  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleLogin = async e => {
    e.preventDefault();

    if (!email || !password) {
      alert('Введіть логін та пароль');
      return;
    }

    const isAdminLogin = email.toLowerCase() === 'admin';

    if (!isAdminLogin && !emailRegex.test(email)) {
      alert('Введіть коректний email');
      return;
    }

    try {
      const res = await fetch(
        'https://marketplace-production-2e6c.up.railway.app/auth/login',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: email.toLowerCase(), password }),
        }
      );

      const data = await res.json();
      if (!res.ok) {
        alert(data.error || 'Невірний логін або пароль');
        return;
      }

      localStorage.setItem('userToken', data.token);
      localStorage.setItem('userRole', data.role || 'user');

      if (data.role === 'admin') {
        localStorage.setItem('isAdmin', 'true');
        navigate('/admin');
      } else {
        localStorage.setItem('userToken', data.token);
        localStorage.setItem('userRole', data.role || 'user');
        navigate('/');
      }
    } catch (err) {
      console.error(err);
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
        pt: 8,
      }}
    >
      <Paper sx={{ p: 4, maxWidth: 400, width: '100%' }}>
        <Typography variant="h5" mb={2} textAlign="center">
          {isRegister ? 'Реєстрація' : 'Вхід в акаунт'}
        </Typography>

        <form onSubmit={handleLogin}>
          <TextField
            fullWidth
            label="Email або логін"
            margin="normal"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />

          <TextField
            fullWidth
            type="password"
            label="Пароль"
            margin="normal"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />

          <Button fullWidth type="submit" variant="contained" sx={{ mt: 2 }}>
            {isRegister ? 'Зареєструватися' : 'Увійти'}
          </Button>
        </form>

        <Button
          fullWidth
          variant="text"
          sx={{ mt: 1 }}
          onClick={() => setIsRegister(!isRegister)}
        >
          {isRegister ? 'Увійти' : 'Зареєструватися'}
        </Button>

        {!isRegister && (
          <Typography variant="body2" align="center" sx={{ mt: 1 }}>
            <Link href="/forgot-password" underline="hover">
              Забули пароль?
            </Link>
          </Typography>
        )}
      </Paper>
    </Box>
  );
}

export default Login;
