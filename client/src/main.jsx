import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';
import ProductList from './components/Productlist';
import Login from './components/Login';
import ProductPage from './components/ProductPage';
import ProtectedAdmin from './components/ProtectedAdmin';
import ForgotPassword from './pages/forgotPassword';
import ResetPassword from './pages/resetPassword';
import Cart from './components/Cart';
import AdminLayout from './admin/AdminLayout';
import Dashboard from './admin/AdminDashboard';
import Products from './admin/Products';
import Clients from './admin/Clients';

function AppWrapper() {
  const [cartItems, setCartItems] = useState([]);
  const location = useLocation();

  return (
    <>
      {!location.pathname.startsWith('/admin') && <Cart items={cartItems} />}

      <Routes>
        <Route path="/products/:id" element={<ProductPage />} />
        <Route path="/" element={<ProductList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset/:token" element={<ResetPassword />} />

        <Route
          path="/admin/*"
          element={
            <ProtectedAdmin>
              <AdminLayout />
            </ProtectedAdmin>
          }
        >
          <Route index element={<Navigate to="products" />} />
          <Route path="products" element={<Products />} />
          <Route path="clients" element={<Clients />} />
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
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
