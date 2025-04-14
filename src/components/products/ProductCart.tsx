import { Link } from 'react-router-dom'
import { Product } from '../../types/product'
import { useCart } from '../../context/CartContext'
import { FiShoppingCart } from 'react-icons/fi'

interface ProductCardProps {
    product: Product
}

const ProductCard = ({ product }: ProductCardProps) => {
    const { addToCart, isInCart } = useCart()

    return (
        <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
            <Link to={`/products/${product.id}`} className="block">
                <div className="aspect-square bg-white p-4 flex items-center justify-center">
                    <img
                        src={product.image}
                        alt={product.title}
                        className="object-contain h-48 w-full"
                    />
                </div>
                <div className="p-4 h-[7.5rem]">
                    <h3 className="font-medium text-gray-900 mb-1 line-clamp-2">
                        {product.title}
                    </h3>
                    <div className="flex items-center justify-between mt-2">
                        <span className="text-lg font-bold">${product.price}</span>
                        {product.rating && (
                            <div className="flex items-center">
                                <span className="text-yellow-500 mr-1">
                                    ★{product.rating.rate.toFixed(1)}
                                </span>
                                <span className="text-gray-500 text-sm">
                                    ({product.rating.count})
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </Link>
            <div className="px-4 pb-4">
                <button
                    onClick={() => addToCart(product)}
                    disabled={isInCart(product.id)}
                    className={`w-full py-2 px-4 rounded-md flex items-center justify-center space-x-2 ${isInCart(product.id)
                            ? 'bg-gray-200 text-gray-600 cursor-not-allowed'
                            : 'bg-blue-600 hover:bg-blue-700 text-white'
                        }`}
                >
                    <FiShoppingCart />
                    <span>{isInCart(product.id) ? 'Added to Cart' : 'Add to Cart'}</span>
                </button>
            </div>
        </div>
    )
}

export default ProductCard