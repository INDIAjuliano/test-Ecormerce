// src/components/CartDrawer.jsx
import React from 'react';
import { useCart } from '../context/CartContext';
import { getImageUrl } from './imageUtils';
import './CartDrawer.css';

const PLACEHOLDER_IMAGE = 'https://placehold.co/80x80/e8e8e8/666?text=No+Image';

const CartDrawer = ({ isOpen, onClose }) => {
    const { cartItems, removeFromCart, total, updateQuantity } = useCart();

    const formatPrice = (price, currency = 'MGA') => {
        if (!price && price !== 0) return '0 Ar';

        if (currency === 'MGA') {
            return new Intl.NumberFormat('fr-MG', {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
            }).format(price) + ' Ar';
        }
        return new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency: currency,
        }).format(price);
    };

    const handleQuantityChange = (productId, newQuantity) => {
        if (newQuantity < 1) {
            removeFromCart(productId);
        } else {
            updateQuantity(productId, newQuantity);
        }
    };

    const handleRemoveItem = (productId, productName) => {
        if (window.confirm(`Retirer ${productName} du panier ?`)) {
            removeFromCart(productId);
        }
    };

    const getImageSrc = (imagePath) => {
        if (!imagePath) return PLACEHOLDER_IMAGE;
        const processedUrl = getImageUrl(imagePath);
        return processedUrl;
    };

    const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const deliveryFee = 0; // À calculer selon le total
    const totalWithDelivery = total + deliveryFee;

    return (
        <>
            {/* Overlay */}
            <div
                className={`cart-overlay ${isOpen ? 'active' : ''}`}
                onClick={onClose}
            />

            {/* Drawer */}
            <div className={`cart-drawer ${isOpen ? 'open' : ''}`}>
                <div className="cart-header">
                    <h2>
                        <span className="material-symbols-outlined">shopping_cart</span>
                        Mon Panier
                        {cartCount > 0 && <span className="cart-count-badge">{cartCount}</span>}
                    </h2>
                    <button className="close-btn" onClick={onClose}>
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                <div className="cart-content">
                    {cartItems.length === 0 ? (
                        <div className="empty-cart">
                            <div className="empty-cart-icon">
                                <span className="material-symbols-outlined">shopping_cart_off</span>
                            </div>
                            <h3>Votre panier est vide</h3>
                            <p>Découvrez nos produits et ajoutez-les à votre panier</p>
                            <button className="btn-primary continue-shopping-btn" onClick={onClose}>
                                Découvrir les produits
                            </button>
                        </div>
                    ) : (
                        <>
                            <div className="cart-items">
                                {cartItems.map((item) => {
                                    const imageSrc = getImageSrc(item.image);
                                    const itemTotal = item.price * item.quantity;

                                    return (
                                        <div key={item.id} className="cart-item">
                                            <div className="cart-item-image">
                                                <img
                                                    src={imageSrc}
                                                    alt={item.name}
                                                    onError={(e) => {
                                                        e.target.src = PLACEHOLDER_IMAGE;
                                                    }}
                                                />
                                            </div>

                                            <div className="cart-item-details">
                                                <h3>{item.name}</h3>
                                                <p className="item-sku">{item.sku}</p>
                                                {item.dimension && (
                                                    <p className="item-dimension">
                                                        <span className="material-symbols-outlined">straighten</span>
                                                        {item.dimension}
                                                    </p>
                                                )}
                                                <p className="item-price">{formatPrice(item.price)} / {item.unit || 'pièce'}</p>
                                            </div>

                                            <div className="cart-item-actions">
                                                <div className="quantity-selector">
                                                    <button
                                                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                                        disabled={item.quantity <= 1}
                                                        className="quantity-btn"
                                                    >
                                                        <span className="material-symbols-outlined">remove</span>
                                                    </button>
                                                    <span className="quantity-value">{item.quantity}</span>
                                                    <button
                                                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                                        className="quantity-btn"
                                                    >
                                                        <span className="material-symbols-outlined">add</span>
                                                    </button>
                                                </div>

                                                <div className="item-total">
                                                    {formatPrice(itemTotal)}
                                                </div>

                                                <button
                                                    className="remove-item-btn"
                                                    onClick={() => handleRemoveItem(item.id, item.name)}
                                                    title="Supprimer"
                                                >
                                                    <span className="material-symbols-outlined">delete_outline</span>
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="cart-footer">
                                <div className="cart-summary">
                                    <div className="summary-row">
                                        <span>Sous-total ({cartCount} articles)</span>
                                        <span>{formatPrice(total)}</span>
                                    </div>
                                    <div className="summary-row">
                                        <span>Livraison</span>
                                        <span>{deliveryFee === 0 ? 'Gratuite' : formatPrice(deliveryFee)}</span>
                                    </div>
                                    <div className="summary-divider"></div>
                                    <div className="summary-row total">
                                        <span>Total TTC</span>
                                        <span>{formatPrice(totalWithDelivery)}</span>
                                    </div>
                                </div>

                                <button className="checkout-btn">
                                    <span className="material-symbols-outlined">payment</span>
                                    Commander
                                </button>

                                <button className="continue-shopping-link" onClick={onClose}>
                                    Continuer mes achats
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default CartDrawer;