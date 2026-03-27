// src/components/ProductCard.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getImageUrl } from './imageUtils';
import { useCart } from '../context/CartContext';
import './ProductCard.css';

const PLACEHOLDER_IMAGE = 'https://placehold.co/400x400/e8e8e8/666?text=Image+non+disponible';


const ProductCard = ({ product }) => {
    const { addToCart } = useCart();

    console.log('ProductCard rendu pour:', product?.name);
    const navigate = useNavigate();
    console.log('Product data:', product);

    const formatPrice = (price, currency) => {
        console.log(`Formatage du prix: ${price} ${currency}`);
        if (currency === 'MGA') {
            // Formater pour l'Ariary Malgache
            return new Intl.NumberFormat('fr-MG', {
                style: 'currency',
                currency: 'MGA',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
            }).format(price);
        }
        // Format par défaut
        return new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency: currency || 'EUR',
        }).format(price);
    };

    // Récupérer la première image du produit
    const productImage = product.images && product.images.length > 0
        ? getImageUrl(product.images[0])
        : PLACEHOLDER_IMAGE;

    const handleAddToCart = (e) => {
        e.preventDefault(); 
        addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            currency: product.currency,
            quantity: 1,
            image: productImage,
            unit: product.unit,
            stock: product.stock
        });

        console.log('🛒 Ajout au panier:', addToCart);
        
    };

    const handleCardClick = () => {
        navigate(`/product/${product.id}`);
    };

    return (
        <div className="product-cards" onClick={handleCardClick}>
            <div className="card-image">
                <img
                    src={productImage}
                    alt={product.name}
                    className="product-image"
                    loading="lazy"
                    onError={(e) => {
                        console.error(`Erreur chargement image: ${product.name} - ${productImage}`);
                        e.target.src = '/placeholder.webp';
                        e.target.onerror = null;
                    }}
                    onLoad={() => {
                        console.log(`Image chargée: ${product.name}`);
                    }}
                />
                <div className="card-badge">
                    {product.stock > 0 ? (
                        <span className="in-stock">En stock</span>
                    ) : (
                        <span className="out-of-stock">Rupture de stock</span>
                    )}
                </div>
            </div>
            <div className="card-content">
                <div className="card-header">
                    <span className="card-category">{product.category}</span>
                    <span className="card-price">
                        {formatPrice(product.price, product.currency)}
                        <small>/{product.unit}</small>
                    </span>
                </div>
                <h2 className="card-title">{product.name}</h2>
                <p className="card-description">
                    Bois d'ingénierie traité sous pression, séché au four pour une stabilité structurelle
                    maximale et une résistance à la pourriture.
                </p>
                <button
                    className="add-to-cart-btn"
                    onClick={handleAddToCart}
                    disabled={product.stock === 0}
                >
                    <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>
                        add_shopping_cart
                    </span>
                    Ajouter au panier
                </button>
            </div>
        </div>
    );
};

export default ProductCard;