import { useEffect, useState } from 'react';

export default function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/products')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setProducts(data);
        else console.error('Products is not an array:', data);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h1>Products</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {products.map(product => (
          <div
            key={product._id}
            style={{
              border: '1px solid #ccc',
              padding: '10px',
              width: '150px',
            }}
          >
            <img
              src={product.imageUrl}
              alt={product.title}
              style={{ width: '100%' }}
            />
            <h3>{product.title}</h3>
            <p>{product.description}</p>
            <p>${product.price}</p>
            <p>Stock: {product.stock}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
