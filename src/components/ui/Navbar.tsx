// src/components/layout/Navbar.tsx
import { Link } from 'react-router-dom';
import { FiShoppingCart, FiUser, FiLogOut } from 'react-icons/fi'
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth()
  const { cartCount } = useCart()

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-blue-600">
          MyShop
        </Link>

        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              <span className="hidden sm:inline">Hello, {user}</span>
              <button
                onClick={logout}
                className="p-2 text-gray-600 hover:text-gray-900"
                title="Logout"
              >
                <FiLogOut size={20} />
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="p-2 text-gray-600 hover:text-gray-900"
              title="Login"
            >
              <FiUser size={20} />
            </Link>
          )}

          <Link
            to="/cart"
            className="relative p-2 text-gray-600 hover:text-gray-900"
            title="Cart"
          >
            <FiShoppingCart size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar