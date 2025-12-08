import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5000/products/${id}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Завантаження товару...</p>;
  if (!product) return <p>Товар не знайдено</p>;

  return (
    <div style={{ padding: 20 }}>
      <Link to="/" style={{ textDecoration: 'none', color: '#007bff' }}>
        ← Повернутися до списку товарів
      </Link>
      <h1>{product.title}</h1>
      <img src={product.image} alt={product.title} width="300" />
      <p>Ціна: {product.price} грн</p>
      <p>Опис: {product.description || 'Опис відсутній'}</p>
    </div>
  );
}
