import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;
const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL;

function Login() {
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const handleLogin = async e => {
    e.preventDefault();

    if (isRegister) {
      if (!username || !password) {
        alert('Введіть логін та пароль');
        return;
      }

      try {
        const res = await fetch('http://localhost:5000/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: username, password }),
        });

        const data = await res.json();

        if (!res.ok) {
          alert(data.error || 'Помилка при реєстрації');
          return;
        }

        alert('Користувач зареєстрований! Тепер можна увійти.');
        setIsRegister(false);
        setUsername('');
        setPassword('');
      } catch (err) {
        console.error(err);
        alert('Помилка сервера');
      }
    } else {
      if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        localStorage.setItem('isAdmin', 'true');
        navigate('/admin');
      } else {
        try {
          const res = await fetch('http://localhost:5000/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: username, password }),
          });

          const data = await res.json();

          if (!res.ok) {
            alert(data.error || 'Невірний логін або пароль');
            return;
          }

          localStorage.setItem('userToken', data.token);
          navigate('/');
        } catch (err) {
          console.error(err);
          alert('Помилка сервера');
        }
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
          value={username}
          onChange={e => setUsername(e.target.value)}
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
