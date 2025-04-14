import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './components/dashboard/Dashboard';
import LoginPage from './pages/login/LoginPage';
import ProductsPage from './pages/products/ProductsPage';
import ProductDetailsPage from './pages/product-details/ProductDetailsPage';
import CheckoutPage from './pages/checkout/CheckoutPage';
import CartPage from './pages/cart/CartPage';
import ProtectedRoute from './utils/ProtectRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route element={<Dashboard />}>
          <Route index element={<ProductsPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:id" element={<ProductDetailsPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App