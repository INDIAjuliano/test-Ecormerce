// src/data/products.js (ce fichier doit exister)
import products from '../data/products.json';
import categories from '../data/categories.json';
import users from '../data/users.json';

export const getProducts = () => {
    return Promise.resolve(products);
};

export const getProductById = (id) => {
    const product = products.find((item) => item.id === Number(id));
    return Promise.resolve(product);
};

export const getCategories = () => {
    return Promise.resolve(categories);
};

export const getFeaturedProducts = () => {
    const featured = products.filter((item) => item.featured);
    return Promise.resolve(featured);
};

export const getCurrentUser = () => {
    return Promise.resolve(users[0]);
};