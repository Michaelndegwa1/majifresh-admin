import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/useAuthStore';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Layout } from './components/layout/Layout';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { ProductList } from './pages/Products/ProductList';
import { ProductForm } from './pages/Products/ProductForm';
import { OrderList } from './pages/Orders/OrderList';
import { OrderDetail } from './pages/Orders/OrderDetail';
import { Customers } from './pages/Customers';
import { Drivers } from './pages/Drivers';
import { Settings } from './pages/Settings';

function App() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <BrowserRouter>
      <Routes>
        {/* Public route */}
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/" replace /> : <Login />}
        />

        {/* Protected routes */}
        <Route
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<Dashboard />} />
          
          {/* Products */}
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/create" element={<ProductForm />} />
          <Route path="/products/edit/:id" element={<ProductForm />} />
          
          {/* Orders */}
          <Route path="/orders" element={<OrderList />} />
          <Route path="/orders/:id" element={<OrderDetail />} />
          
          {/* Customers & Drivers */}
          <Route path="/customers" element={<Customers />} />
          <Route path="/drivers" element={<Drivers />} />
          
          {/* Settings */}
          <Route path="/settings" element={<Settings />} />
        </Route>

        {/* Catch all - redirect to dashboard if authenticated, login otherwise */}
        <Route
          path="*"
          element={<Navigate to={isAuthenticated ? '/' : '/login'} replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
