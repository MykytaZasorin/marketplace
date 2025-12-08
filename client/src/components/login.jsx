import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;

function Login() {
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const handleLogin = e => {
    e.preventDefault();

    if (isRegister) {
      if (!username || !password) {
        alert('Введіть логін та пароль');
        return;
      }
      const exists = users.find(u => u.username === username);
      if (exists) {
        alert('Користувач вже існує');
        return;
      }
      setUsers([...users, { username, password }]);
      alert('Користувач зареєстрований!');
      setIsRegister(false);
      setUsername('');
      setPassword('');
    } else {
      if (password === ADMIN_PASSWORD) {
        localStorage.setItem('isAdmin', 'true');
        navigate('/admin');
      } else {
        const user = users.find(
          u => u.username === username && u.password === password
        );
        if (user) {
          localStorage.setItem('isUser', 'true');
          navigate('/');
        } else {
          alert('Невірний логін або пароль');
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
