// src/pages/ProductDetails/ProductDetailsPage.tsx
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Product } from '../../types/product'
import { useCart } from '../../context/CartContext'
import { fetchProductById } from '../../services/ProductService'
import Loading from '../../components/ui/Loading'

const ProductDetailsPage = () => {
  const { id } = useParams<{ id: string }>()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const { addToCart, isInCart } = useCart()

  useEffect(() => {
    const loadProduct = async () => {
      try {
        if (!id) return
        const data = await fetchProductById(parseInt(id))
        setProduct(data)
      } catch (err) {
        setError('Failed to load product')
      } finally {
        setLoading(false)
      }
    }
    loadProduct()
  }, [id])

  if (loading) return <Loading />
  if (error) return <div>{error}</div>
  if (!product) return <div>Product not found</div>

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-auto object-contain max-h-96"
          />
        </div>
        <div className="md:w-1/2">
          <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
          <div className="flex items-center mb-4">
            <span className="text-2xl font-bold">${product.price}</span>
            {product.rating && (
              <div className="ml-4 flex items-center">
                <span className="text-yellow-500">
                  {'★'.repeat(Math.round(product.rating.rate))}
                  {'☆'.repeat(5 - Math.round(product.rating.rate))}
                </span>
                <span className="ml-2 text-gray-600">
                  ({product.rating.count} reviews)
                </span>
              </div>
            )}
          </div>
          <p className="text-gray-700 mb-6">{product.description}</p>
          <div className="mb-6">
            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
              {product.category}
            </span>
          </div>
          <button
            onClick={() => addToCart(product)}
            disabled={isInCart(product.id)}
            className={`px-6 py-3 rounded-md font-medium ${
              isInCart(product.id)
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {isInCart(product.id) ? 'Added to Cart' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductDetailsPage