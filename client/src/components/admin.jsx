import { useState } from 'react';

function Admin() {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');

  const addProduct = async e => {
    e.preventDefault();

    const newProduct = { title, price, image };

    const res = await fetch('http://localhost:5000/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newProduct),
    });

    if (res.ok) {
      alert('Товар добавлен!');
      setTitle('');
      setPrice('');
      setImage('');
    } else {
      alert('Ошибка при добавлении товара');
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Admin Panel — Add Product</h1>
      <form onSubmit={addProduct}>
        <input
          type="text"
          placeholder="Название"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <br />

        <input
          type="number"
          placeholder="Цена"
          value={price}
          onChange={e => setPrice(e.target.value)}
        />
        <br />

        <input
          type="text"
          placeholder="URL картинки"
          value={image}
          onChange={e => setImage(e.target.value)}
        />
        <br />

        <button type="submit">Добавить товар</button>
      </form>
    </div>
  );
}

export default Admin;
