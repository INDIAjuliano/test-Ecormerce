import { createContext, useContext, useMemo, useState } from 'react'

// Création du contexte panier
const CartContext = createContext()

// Hook personnalisé pour accéder facilement au panier
export const useCart = () => useContext(CartContext)

// Provider global du panier
export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([])

    // Ajouter un produit au panier
    const addToCart = (product) => {
        setCartItems((prev) => {
            const existing = prev.find((item) => item.id === product.id)

            if (existing) {
                return prev.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                )
            }

            return [...prev, { ...product, quantity: 1 }]
        })
    }

    // Supprimer complètement un produit du panier
    const removeFromCart = (productId) => {
        setCartItems((prev) => prev.filter((item) => item.id !== productId))
    }

    // Calcul du total
    const total = useMemo(() => {
        return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
    }, [cartItems])

    const value = {
        cartItems,
        addToCart,
        removeFromCart,
        total
    }

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}