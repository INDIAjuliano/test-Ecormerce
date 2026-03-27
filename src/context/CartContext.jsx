// src/context/CartContext.jsx
import { createContext, useContext, useMemo, useState } from 'react'

// Création du contexte panier
const CartContext = createContext()

// Hook personnalisé pour accéder facilement au panier

// Provider global du panier
export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState(() => {
        // Récupérer le panier depuis localStorage au chargement
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    // Ajouter un produit au panier
    const addToCart = (product) => {
        console.log('Ajout au panier:', product);
        setCartItems((prev) => {
            const existing = prev.find((item) => item.id === product.id)

            if (existing) {
                console.log(`Mise à jour quantité: ${product.name}`);
                return prev.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                )
            }

            console.log(`Nouveau produit: ${product.name}`);
            return [...prev, { ...product, quantity: 1 }]
        })
    }

    // Supprimer complètement un produit du panier
    const removeFromCart = (productId) => {
        console.log('🗑️ Suppression du produit:', productId);
        setCartItems((prev) => prev.filter((item) => item.id !== productId))
    }

    // Mettre à jour la quantité d'un produit
    const updateQuantity = (productId, quantity) => {
        console.log(`🔄 Mise à jour quantité ${productId} -> ${quantity}`);
        setCartItems((prev) =>
            prev.map((item) =>
                item.id === productId
                    ? { ...item, quantity: Math.max(1, quantity) }
                    : item
            )
        )
    }

    // Calcul du total
    const total = useMemo(() => {
        return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
    }, [cartItems])

    const value = {
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        total
    }

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export const useCart = () => useContext(CartContext)
