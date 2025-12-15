import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');

  const handleReset = async e => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:5000/auth/reset/${token}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (res.ok) {
        alert('Пароль оновлено!');
        navigate('/login');
      } else {
        alert(data.error);
      }
    } catch (err) {
      alert('Помилка сервера');
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Створення нового паролю</h1>

      <form onSubmit={handleReset}>
        <input
          type="password"
          placeholder="Новий пароль"
          value={password}
          onChange={e => setPassword(e.target.value)}
          style={{ padding: '5px', width: '250px' }}
        />
        <br />
        <button style={{ marginTop: '10px' }}>Оновити пароль</button>
      </form>
    </div>
  );
}
