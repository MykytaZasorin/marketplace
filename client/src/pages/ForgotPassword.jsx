import { useState } from 'react';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSend = async e => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5000/auth/forgot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setSent(true);
      } else {
        alert(data.error);
      }
    } catch (err) {
      alert('Помилка сервера');
    }
  };

  if (sent) return <h2>Лист для відновлення паролю відправлено!</h2>;

  return (
    <div style={{ padding: 20 }}>
      <h1>Відновлення паролю</h1>

      <form onSubmit={handleSend}>
        <input
          type="email"
          placeholder="Введіть ваш Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          style={{ padding: '5px', width: '250px' }}
        />
        <br />
        <button style={{ marginTop: '10px' }}>Відправити лист</button>
      </form>
    </div>
  );
}
