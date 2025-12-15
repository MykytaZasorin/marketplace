import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
      const res = await fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.toLowerCase(), password }),
      });

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
    </div>
  );
}

export default Login;
