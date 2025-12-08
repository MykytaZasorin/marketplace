import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ProductList from './components/Productlist';
import Admin from './components/Admin';
import Login from './components/Login';
import ProductPage from './components/ProductPage';
import ProtectedAdmin from './components/ProtectedAdmin';
import ForgotPassword from './pages/forgotPassword';
import ResetPassword from './pages/resetPassword';
import Cart from './components/Cart';

function AppWrapper() {
  const [cartItems, setCartItems] = useState([]);

  return (
    <>
      {}
      <Cart items={cartItems} />

      <Routes>
        <Route path="/products/:id" element={<ProductPage />} />
        <Route path="/" element={<ProductList />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/admin"
          element={
            <ProtectedAdmin>
              <Admin />
            </ProtectedAdmin>
          }
        />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset/:token" element={<ResetPassword />} />
      </Routes>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppWrapper />
    </BrowserRouter>
  </React.StrictMode>
);
