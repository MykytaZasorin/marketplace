import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;

function Login() {
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = e => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      localStorage.setItem('isAdmin', 'true');
      navigate('/admin');
    } else {
      alert('Невірний пароль');
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Вхід в адмінку</h1>
      <form onSubmit={handleLogin}>
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={e => setPassword(e.target.value)}
          style={{ padding: '5px', marginRight: '10px' }}
        />
        <button type="submit">Увійти</button>
      </form>
    </div>
  );
}

export default Login;
