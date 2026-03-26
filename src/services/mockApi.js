import products from '../data/products.json'
import categories from '../data/categories.json'
import users from '../data/users.json'

console.log('Produits chargés:', products)
console.log('Nombre de produits:', products.length)

// Fonction pour récupérer tous les produits
export const getProducts = () => {
    console.log('getProducts appelé - retourne', products.length, 'produits')
    return Promise.resolve(products)
}

// Fonction pour récupérer un produit par son id
export const getProductById = (id) => {
    const product = products.find((item) => item.id === Number(id))
    console.log(`getProductById(${id}) appelé - Produit trouvé:`, product)
    return Promise.resolve(product)
}

// Fonction pour récupérer les catégories
export const getCategories = () => {
    console.log('getCategories appelé - retourne', categories.length, 'catégories')
    return Promise.resolve(categories)
}

// Fonction pour récupérer les produits mis en avant
export const getFeaturedProducts = () => {
    const featured = products.filter((item) => item.featured)
    console.log('Produits en vedette:', featured.length, 'produits')
    console.log('Détails des produits en vedette:', featured)
    return Promise.resolve(featured)
}

// Fonction pour récupérer un utilisateur mocké
export const getCurrentUser = () => {
    console.log('Utilisateur courant:', users[0])
    return Promise.resolve(users[0])
}