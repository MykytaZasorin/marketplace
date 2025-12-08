import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async e => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        alert('Реєстрація пройшла успішно!');
        navigate('/login');
      } else {
        const data = await res.json();
        alert(data.message || 'Помилка при реєстрації');
      }
    } catch (err) {
      console.error(err);
      alert('Помилка при реєстрації');
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Реєстрація</h1>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Ім'я користувача"
          value={username}
          onChange={e => setUsername(e.target.value)}
          style={{ padding: '5px', marginBottom: '10px', display: 'block' }}
        />
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={e => setPassword(e.target.value)}
          style={{ padding: '5px', marginBottom: '10px', display: 'block' }}
        />
        <button type="submit">Зареєструватися</button>
      </form>
    </div>
  );
}
