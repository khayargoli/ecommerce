
import { Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext'

const CartPage = () => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    cartCount,
    clearCart,
  } = useCart()

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  if (cartCount === 0) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Your Cart is Empty</h2>
        <Link
          to="/products"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Continue Shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold">Your Cart ({cartCount})</h2>
        <button
          onClick={clearCart}
          className="text-red-600 hover:text-red-800"
        >
          Clear Cart
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row border-b py-4 gap-4"
            >
              <div className="sm:w-32 flex-shrink-0">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-auto object-contain"
                />
              </div>
              <div className="flex-grow">
                <h3 className="font-medium">{item.title}</h3>
                <p className="text-gray-600 text-sm mb-2">
                  {item.category}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <button
                      onClick={() =>
                        updateQuantity(item.id, item.quantity - 1)
                      }
                      className="w-8 h-8 border rounded flex items-center justify-center"
                    >
                      -
                    </button>
                    <span className="mx-4">{item.quantity}</span>
                    <button
                      onClick={() =>
                        updateQuantity(item.id, item.quantity + 1)
                      }
                      className="w-8 h-8 border rounded flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>
                  <div className="font-bold">${item.price * item.quantity}</div>
                </div>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 hover:text-red-700 self-start sm:self-center"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <div className="bg-gray-50 p-6 rounded-lg h-fit">
          <h3 className="text-lg font-bold mb-4">Order Summary</h3>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="border-t pt-4 flex justify-between font-bold">
              <span>Total</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
          </div>
          <Link
            to="/checkout"
            className="block mt-6 bg-blue-600 hover:bg-blue-700 text-white text-center py-3 rounded"
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  )
}

export default CartPage