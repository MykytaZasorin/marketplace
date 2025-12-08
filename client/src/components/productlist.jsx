import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5000/products')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setProducts(data);
        else console.error('Products is not an array:', data);
      })
      .catch(err => console.error(err));
  }, []);

  const goToAdmin = () => {
    navigate('/login');
  };

  // Динамическая фильтрация по названию и цене
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesPrice = maxPrice ? product.price <= Number(maxPrice) : true;
    return matchesSearch && matchesPrice;
  });

  return (
    <div style={{ padding: 20 }}>
      <h1>Список товарів</h1>

      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <input
          type="text"
          placeholder="Пошук товару..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          style={{ padding: '5px', flex: 1 }}
        />
        <input
          type="number"
          placeholder="Макс. ціна"
          value={maxPrice}
          onChange={e => setMaxPrice(e.target.value)}
          style={{ padding: '5px', width: '120px' }}
        />
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {filteredProducts.length ? (
          filteredProducts.map(product => (
            <div
              key={product._id}
              style={{
                border: '1px solid #ccc',
                padding: '10px',
                width: '150px',
              }}
            >
              <img
                src={product.image}
                alt={product.title}
                style={{ width: '100%', height: '100px', objectFit: 'cover' }}
              />
              <h3>{product.title}</h3>
              <p>Ціна: {product.price} грн</p>
            </div>
          ))
        ) : (
          <p>Товари не знайдено</p>
        )}
      </div>

      <button
        onClick={goToAdmin}
        style={{
          marginTop: 20,
          padding: '10px 20px',
          backgroundColor: '#007bff',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Адмінка
      </button>
    </div>
  );
}
