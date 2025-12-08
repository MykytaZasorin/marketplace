import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;
const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL;

function Login() {
  useAuth();
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleLogin = async e => {
    e.preventDefault();

    const now = Date.now();
    const attempts = Number(localStorage.getItem('loginAttempts') || 0);
    const lockUntil = Number(localStorage.getItem('lockUntil') || 0);

    if (lockUntil > now) {
      const minutesLeft = Math.ceil((lockUntil - now) / 60000);
      alert(
        `Ви перевищили кількість спроб. Спробуйте через ${minutesLeft} хвилин або скиньте пароль.`
      );
      return;
    }

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      localStorage.setItem('isAdmin', 'true');
      localStorage.removeItem('loginAttempts');
      localStorage.removeItem('lockUntil');
      navigate('/admin');
      return;
    }

    if (!emailRegex.test(email)) {
      alert('Введіть коректний email');
      return;
    }

    if (isRegister) {
      if (!email || !password) {
        alert('Введіть логін та пароль');
        return;
      }

      try {
        const res = await fetch('http://localhost:5000/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });

        const data = await res.json();

        if (!res.ok) {
          alert(data.error || 'Помилка при реєстрації');
          return;
        }

        alert('Користувач зареєстрований! Тепер можна увійти.');
        setIsRegister(false);
        setEmail('');
        setPassword('');
      } catch (err) {
        console.error(err);
        alert('Помилка сервера');
      }
    } else {
      try {
        console.log('Logging in user with:', { email, password });
        const res = await fetch('http://localhost:5000/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });

        const data = await res.json();

        if (!res.ok) {
          const newAttempts = attempts + 1;
          localStorage.setItem('loginAttempts', newAttempts);

          if (newAttempts >= 3) {
            const lockTime = now + 30 * 60 * 1000;
            localStorage.setItem('lockUntil', lockTime);
            alert(
              'Забагато невдалих спроб! Спробуйте через 30 хвилин або скиньте пароль.'
            );
          } else {
            alert(
              `Невірний логін або пароль. Залишилось спроб: ${3 - newAttempts}`
            );
          }
          return;
        }

        localStorage.removeItem('loginAttempts');
        localStorage.removeItem('lockUntil');

        localStorage.setItem('userToken', data.token);
        navigate('/');
      } catch (err) {
        console.error(err);
        alert('Помилка сервера');
      }
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>{isRegister ? 'Реєстрація' : 'Вхід в аккаунт'}</h1>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Логін"
          value={email}
          onChange={e => setEmail(e.target.value)}
          style={{ padding: '5px', marginRight: '10px', marginBottom: '10px' }}
        />
        <br />
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={e => setPassword(e.target.value)}
          style={{ padding: '5px', marginBottom: '10px' }}
        />
        <br />
        <button type="submit">
          {isRegister ? 'Зареєструватися' : 'Увійти'}
        </button>
      </form>
      <button
        onClick={() => setIsRegister(!isRegister)}
        style={{ marginTop: '10px' }}
      >
        {isRegister ? 'Увійти' : 'Зареєструватися'}
      </button>
      <button
        style={{ marginTop: '10px' }}
        onClick={() => navigate('/forgot-password')}
      >
        Забули пароль?
      </button>
    </div>
  );
}

export default Login;
