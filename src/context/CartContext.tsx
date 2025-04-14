import { createContext, useContext, useState, ReactNode, useEffect } from 'react'
import { Product } from '../types/product'

interface CartItem extends Product {
    quantity: number
}

interface CartContextType {
    cart: CartItem[]
    addToCart: (product: Product) => void
    removeFromCart: (productId: number) => void
    updateQuantity: (productId: number, quantity: number) => void
    clearCart: () => void
    cartCount: number
    isInCart: (productId: number) => boolean
}

const CartContext = createContext<CartContextType | undefined>(undefined)

const getInitialCart = (): CartItem[] => {
    const storedCart = localStorage.getItem('cart')
    return storedCart ? JSON.parse(storedCart) : []
}

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cart, setCart] = useState<CartItem[]>(getInitialCart)
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart])

    const addToCart = (product: Product) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.id === product.id)
            if (existingItem) {
                return prevCart.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                )
            }
            return [...prevCart, { ...product, quantity: 1 }]
        })
    }

    const removeFromCart = (productId: number) => {
        setCart(prevCart => prevCart.filter(item => item.id !== productId))
    }

    const updateQuantity = (productId: number, quantity: number) => {
        if (quantity <= 0) {
            removeFromCart(productId)
            return
        }
        setCart(prevCart =>
            prevCart.map(item =>
                item.id === productId ? { ...item, quantity } : item
            )
        )
    }

    const clearCart = () => {
        setCart([])
    }

    const isInCart = (productId: number) => {
        return cart.some(item => item.id === productId)
    }

    const cartCount = cart.reduce((total, item) => total + item.quantity, 0)

    const value = {
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        isInCart,
    }

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export const useCart = () => {
    const context = useContext(CartContext)
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider')
    }
    return context
}