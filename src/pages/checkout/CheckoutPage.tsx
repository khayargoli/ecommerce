import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext'

const CheckoutPage = () => {
    const { cart, cartCount } = useCart()
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        address: '',
        city: '',
        zipCode: '',
        paymentMethod: 'credit',
    })
    const [error, setError] = useState('')

    const totalPrice = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    )

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
    }

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
            <h2 className="text-2xl font-bold mb-8">Checkout</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <h3 className="text-lg font-medium">Shipping Information</h3>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                                    First Name
                                </label>
                                <input
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    required
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                />
                            </div>

                            <div>
                                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                                    Last Name
                                </label>
                                <input
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    required
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                required
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                                Address
                            </label>
                            <input
                                type="text"
                                id="address"
                                name="address"
                                required
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                value={formData.address}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                                    City
                                </label>
                                <input
                                    type="text"
                                    id="city"
                                    name="city"
                                    required
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    value={formData.city}
                                    onChange={handleChange}
                                />
                            </div>

                            <div>
                                <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">
                                    ZIP Code
                                </label>
                                <input
                                    type="text"
                                    id="zipCode"
                                    name="zipCode"
                                    required
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    value={formData.zipCode}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <h3 className="text-lg font-medium pt-4">Payment Method</h3>

                        <div className="space-y-2">
                            <div className="flex items-center">
                                <input
                                    id="credit"
                                    name="paymentMethod"
                                    type="radio"
                                    className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                                    value="credit"
                                    checked={formData.paymentMethod === 'credit'}
                                    onChange={handleChange}
                                />
                                <label htmlFor="credit" className="ml-3 block text-sm font-medium text-gray-700">
                                    Credit Card
                                </label>
                            </div>

                            <div className="flex items-center">
                                <input
                                    id="paypal"
                                    name="paymentMethod"
                                    type="radio"
                                    className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                                    value="paypal"
                                    checked={formData.paymentMethod === 'paypal'}
                                    onChange={handleChange}
                                />
                                <label htmlFor="paypal" className="ml-3 block text-sm font-medium text-gray-700">
                                    PayPal
                                </label>
                            </div>
                        </div>

                        {error && (
                            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300"
                        >
                            Place Order
                        </button>
                    </form>
                </div>

                <div>
                    <h3 className="text-lg font-medium mb-4">Order Summary</h3>
                    <div className="bg-gray-50 p-6 rounded-lg">
                        <div className="space-y-4">
                            {cart.map(item => (
                                <div key={item.id} className="flex justify-between">
                                    <div>
                                        <span className="font-medium">{item.title}</span>
                                        <span className="text-gray-600 text-sm block">
                                            Qty: {item.quantity}
                                        </span>
                                    </div>
                                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                                </div>
                            ))}

                            <div className="border-t pt-4 space-y-2">
                                <div className="flex justify-between">
                                    <span>Subtotal</span>
                                    <span>${totalPrice.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Shipping</span>
                                    <span>Free</span>
                                </div>
                                <div className="flex justify-between font-bold text-lg pt-2">
                                    <span>Total</span>
                                    <span>${totalPrice.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CheckoutPage