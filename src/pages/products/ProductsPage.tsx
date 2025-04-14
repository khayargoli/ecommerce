import { useState, useEffect, useRef } from 'react'
import { fetchCategories, fetchProducts } from '../../services/ProductService'
import { Product } from '../../types/product'
import Loading from '../../components/ui/Loading'
import SearchBar from '../../components/ui/SearchBar'
import ProductCard from '../../components/products/ProductCart'

const PAGE_SIZE = 20

const ProductsPage = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const [category, setCategory] = useState('')
    const [sort, setSort] = useState('desc')
    const [categories, setCategories] = useState<string[]>([])
    const [allProducts, setAllProducts] = useState<Product[]>([])
    const [displayedProducts, setDisplayedProducts] = useState<Product[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [hasMore, setHasMore] = useState(true)
    const loaderRef = useRef<HTMLDivElement>(null)

    // Fetch all products and categories on mount
    useEffect(() => {
        const loadData = async () => {
            try {
                setIsLoading(true)
                const [productsData, categoriesData] = await Promise.all([
                    fetchProducts(),
                    fetchCategories(),
                ])
                setAllProducts(productsData)
                setCategories(categoriesData)
                setHasMore(productsData.length > PAGE_SIZE)
            } catch (err) {
                console.error('Failed to load products:', err)
            } finally {
                setIsLoading(false)
            }
        }
        loadData()
    }, [])

    // Filter and sort products 
    useEffect(() => {
        if (allProducts.length === 0) return

        let filteredProducts = [...allProducts]

        // Apply search filter
        if (searchTerm) {
            filteredProducts = filteredProducts.filter(
                (product) =>
                    product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    product.description.toLowerCase().includes(searchTerm.toLowerCase())
            )
        }

        // Apply category filter
        if (category) {
            filteredProducts = filteredProducts.filter(
                (product) => product.category === category
            )
        }

        // Apply sorting
        filteredProducts.sort((a, b) => {
            return sort === 'desc' ? b.price - a.price : a.price - b.price
        })

       
        setDisplayedProducts(filteredProducts.slice(0, PAGE_SIZE))
        setHasMore(filteredProducts.length > PAGE_SIZE)
    }, [allProducts, searchTerm, category, sort])

    
    if (isLoading) return <Loading />

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

                <div className="flex flex-wrap gap-4 mt-4">
                    <select
                        className="border rounded px-3 py-2"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="">All Categories</option>
                        {categories.map((cat) => (
                            <option key={cat} value={cat}>
                                {cat.charAt(0).toUpperCase() + cat.slice(1)}
                            </option>
                        ))}
                    </select>

                    <select
                        className="border rounded px-3 py-2"
                        value={sort}
                        onChange={(e) => setSort(e.target.value)}
                    >
                        <option value="desc">Price: High to Low</option>
                        <option value="asc">Price: Low to High</option>
                    </select>
                </div>
            </div>

            {displayedProducts.length === 0 ? (
                <div className="text-center py-12">
                    <h3 className="text-xl font-medium">No products found</h3>
                    <p className="text-gray-600 mt-2">
                        Try adjusting your search or filter criteria
                    </p>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {displayedProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>

                    <div ref={loaderRef} className="h-10 flex justify-center items-center">
                       
                        {!hasMore && (
                            <p className="text-gray-500">No more products to load</p>
                        )}
                    </div>
                </>
            )}
        </div>
    )
}

export default ProductsPage