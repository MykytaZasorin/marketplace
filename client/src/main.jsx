import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';

// Components
import ProductList from './pages/ProductList';
import ProductPage from './pages/ProductPage';
import Login from './components/Login';
import Cart from './components/Cart';
import MainLayout from './components/MainLayout';
import ProtectedAdmin from './components/ProtectedAdmin';

// Pages
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';

// Admin
import AdminLayout from './admin/AdminLayout';
import Dashboard from './admin/AdminDashboard';
import Products from './admin/Products';
import Clients from './admin/Clients';
import AddProduct from './admin/AddProduct';

function AppWrapper() {
  const [cartItems, setCartItems] = useState([]);
  const location = useLocation();

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <MainLayout cartItems={cartItems}>
              <ProductList />
            </MainLayout>
          }
        />
        <Route
          path="/products/:id"
          element={
            <MainLayout cartItems={cartItems}>
              <ProductPage />
            </MainLayout>
          }
        />
        <Route
          path="/login"
          element={
            <MainLayout cartItems={cartItems}>
              <Login />
            </MainLayout>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <MainLayout cartItems={cartItems}>
              <ForgotPassword />
            </MainLayout>
          }
        />
        <Route
          path="/reset/:token"
          element={
            <MainLayout cartItems={cartItems}>
              <ResetPassword />
            </MainLayout>
          }
        />

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
          <Route path="addproduct" element={<AddProduct />} />
        </Route>
      </Routes>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <BrowserRouter basename="/marketplace"> */}
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <AppWrapper />
    </BrowserRouter>
  </React.StrictMode>
);
