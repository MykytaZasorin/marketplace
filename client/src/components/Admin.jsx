import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Admin() {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem('userRole');
    if (role !== 'admin') {
      alert('У вас немає доступу до цієї сторінки');
      navigate('/');
    }
  }, [navigate]);

  const fetchProducts = async () => {
    try {
      const res = await fetch(
        'https://marketplace-production-2e6c.up.railway.app/products'
      );
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const addProduct = async e => {
    e.preventDefault();
    const newProduct = { title, price: Number(price), image };
    const method = editingId ? 'PUT' : 'POST';
    const url = editingId
      ? `https://marketplace-production-2e6c.up.railway.app/products/${editingId}`
      : 'https://marketplace-production-2e6c.up.railway.app/products';
    const token = localStorage.getItem('userToken');

    const res = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newProduct),
    });

    if (res.ok) {
      alert(editingId ? 'Товар оновлено!' : 'Товар додано!');
      setTitle('');
      setPrice('');
      setImage('');
      setEditingId(null);
      fetchProducts();
    } else {
      alert('Помилка при збереженні товару');
    }
  };

  const editProduct = product => {
    setTitle(product.title || '');
    setPrice(product.price || '');
    setImage(product.image || '');
    setEditingId(product._id);
  };

  const deleteProduct = async id => {
    if (!confirm('Ви впевнені, що хочете видалити товар?')) return;

    const res = await fetch(
      `https://marketplace-production-2e6c.up.railway.app/products/${id}`,
      {
        method: 'DELETE',
      }
    );
    if (res.ok) {
      alert('Товар видалено!');
      fetchProducts();
    } else {
      alert('Помилка при видаленні товару');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    localStorage.removeItem('userToken');
    navigate('/');
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Адмін-панель — {editingId ? 'Редагувати товар' : 'Додати товар'}</h1>
      <button onClick={handleLogout} style={{ marginBottom: '20px' }}>
        Вийти
      </button>

      <form onSubmit={addProduct}>
        <input
          type="text"
          placeholder="Назва товару"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <br />
        <input
          type="number"
          placeholder="Ціна"
          value={price}
          onChange={e => setPrice(e.target.value)}
        />
        <br />
        <input
          type="text"
          placeholder="URL зображення"
          value={image}
          onChange={e => setImage(e.target.value)}
        />
        <br />
        <button type="submit">
          {editingId ? 'Зберегти зміни' : 'Додати товар'}
        </button>
      </form>

      <h2>Список товарів</h2>
      <ul>
        {products.map(p => (
          <li key={p._id} style={{ marginBottom: '15px' }}>
            <strong>{p.title}</strong> — {p.price} грн
            <br />
            <img src={p.image} width="100" alt={p.title} />
            <br />
            <button onClick={() => editProduct(p)}>Редагувати</button>
            <button
              onClick={() => deleteProduct(p._id)}
              style={{ marginLeft: '10px' }}
            >
              Видалити
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Admin;
