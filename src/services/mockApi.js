import products from '../data/products.json'
import categories from '../data/categories.json'
import users from '../data/users.json'

// Fonction pour récupérer tous les produits
export const getProducts = () => {
    return Promise.resolve(products)
}

// Fonction pour récupérer un produit par son id
export const getProductById = (id) => {
    const product = products.find((item) => item.id === Number(id))
    return Promise.resolve(product)
}

// Fonction pour récupérer les catégories
export const getCategories = () => {
    return Promise.resolve(categories)
}

// Fonction pour récupérer les produits mis en avant
export const getFeaturedProducts = () => {
    const featured = products.filter((item) => item.featured)
    return Promise.resolve(featured)
}

// Fonction pour récupérer un utilisateur mocké
export const getCurrentUser = () => {
    return Promise.resolve(users[0])
}