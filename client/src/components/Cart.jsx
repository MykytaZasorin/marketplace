import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isTokenValid } from '../utils/tokenCheck';

export default function Cart({ items }) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    const userToken = localStorage.getItem('userToken');

    if (!isTokenValid(userToken)) {
      localStorage.removeItem('userToken');
      navigate('/login', { replace: true });
      return;
    }

    setIsOpen(true);
  };

  const handleClose = () => setIsOpen(false);

  return (
    <>
      {}
      <div
        style={{
          position: 'fixed',
          top: 20,
          right: 20,
          cursor: 'pointer',
          background: '#fff',
          padding: '5px 10px',
          borderRadius: '5px',
          boxShadow: '0 0 5px rgba(0,0,0,0.3)',
        }}
        onClick={handleClick}
      >
        🛒 Корзина ({items.length})
      </div>

      {}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onClick={handleClose}
        >
          <div
            style={{
              background: '#fff',
              padding: 20,
              borderRadius: 10,
              minWidth: 300,
            }}
            onClick={e => e.stopPropagation()}
          >
            <h2>Ваша корзина</h2>
            {items.length === 0 ? (
              <p>Корзина порожня</p>
            ) : (
              <ul>
                {items.map((item, idx) => (
                  <li key={idx}>
                    {item.name} - {item.quantity}
                  </li>
                ))}
              </ul>
            )}
            <button onClick={handleClose} style={{ marginTop: 10 }}>
              Закрити
            </button>
          </div>
        </div>
      )}
    </>
  );
}
