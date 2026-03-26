// src/components/ProductCard.js
import React from 'react';
import { Link } from 'react-router-dom';
import { getImageUrl } from './imageUtils';
import './ProductCard.css';

const ProductCard = ({ product }) => {
    const formatPrice = (price, currency) => {
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
        : '/placeholder.webp';

    return (

        <div className="product-cards">
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
                    <span className="card-price">${formatPrice(product.price, product.currency)}<small>/{product.unit}</small></span>
                        </div>
                <h2 className="card-title">{product.name}</h2>
                        <p className="card-description">Pressure-treated architectural grade timber, kiln-dried for maximum
                            structural stability and rot resistance.</p>
                        <button className="add-to-cart-btn">
                    <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>add_shopping_cart</span>
                            Add to Order
                        </button>
                    </div>
                </div>
    );
};

export default ProductCard;

