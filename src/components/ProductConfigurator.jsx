import React from 'react';
import './ProductConfigurator.css';

const ProductConfigurator = ({
    product,
    dimensions,
    selectedDimension,
    onDimensionChange,
    quantity,
    onQuantityChange,
    onAddToCart,
    onDownloadSpecs,
    stock,
    unit
}) => {
    const handleIncrement = () => {
        if (quantity < stock) {
            onQuantityChange(quantity + 1);
        }
    };

    const handleDecrement = () => {
        if (quantity > 1) {
            onQuantityChange(quantity - 1);
        }
    };

    const handleQuantityChange = (e) => {
        const value = parseInt(e.target.value);
        if (!isNaN(value) && value >= 1 && value <= stock) {
            onQuantityChange(value);
        }
    };

    // Calculer la note moyenne (si disponible)
    const averageRating = product?.rating || 4.5;
    const fullStars = Math.floor(averageRating);
    const hasHalfStar = averageRating % 1 >= 0.5;
    const totalReviews = product?.reviews_count || 142;

    // Formater le prix
    const formatPrice = (price, currency) => {
        if (!price) return 'Prix non disponible';

        if (currency === 'MGA') {
            return new Intl.NumberFormat('fr-MG', {
                style: 'currency',
                currency: 'MGA',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
            }).format(price);
        }
        return new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency: currency || 'EUR',
        }).format(price);
    };

    return (
        <div className="product-info">
            <h1 className="product-title">
                {product?.name || 'Produit'}
            </h1>

            {/* Rating Section - Dynamique */}
            <div className="rating">
                <div className="stars">
                    {[...Array(5)].map((_, i) => (
                        <span
                            key={i}
                            className="material-symbols-outlined"
                            style={{
                                fontVariationSettings: i < fullStars ? "'FILL' 1" :
                                    (i === fullStars && hasHalfStar ? "'FILL' 0.5" : "'FILL' 0")
                            }}
                        >
                            {i < fullStars ? 'star' : (i === fullStars && hasHalfStar ? 'star_half' : 'star')}
                        </span>
                    ))}
                </div>
                <span className="rating-text">
                    ({totalReviews} AVIS CLIENTS)
                </span>
            </div>

            {/* Price Section - Dynamique */}
            <div className="price-card">
                <span className="price-label">PRIX UNITAIRE</span>
                <div className="price-value">
                    {formatPrice(product?.price, product?.currency)}
                    <small> / {unit || 'UNITÉ'} (HT)</small>
                </div>
                {stock && stock < 50 && (
                    <div className="stock-warning">
                        Stock limité : {stock} {unit}s disponibles
                    </div>
                )}
            </div>

            {/* Dimension Selection - Dynamique */}
            {dimensions && dimensions.length > 0 && (
                <div className="option-group">
                    <label className="option-label">DIMENSIONS DISPONIBLES</label>
                    <div className="dimension-grid">
                        {dimensions.map((dimension) => (
                            <button
                                key={dimension}
                                className={`dimension-btn ${selectedDimension === dimension ? 'active' : ''}`}
                                onClick={() => onDimensionChange(dimension)}
                            >
                                {dimension}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Quantity and Delivery */}
            <div className="quantity-selector">
                <div className="quantity-control">
                    <label className="option-label">QUANTITÉ</label>
                    <div className="quantity-box">
                        <button
                            className="quantity-btn"
                            onClick={handleDecrement}
                            disabled={quantity <= 1}
                        >
                            -
                        </button>
                        <input
                            type="number"
                            className="quantity-input"
                            value={quantity}
                            onChange={handleQuantityChange}
                            min="1"
                            max={stock}
                            disabled={stock === 0}
                        />
                        <button
                            className="quantity-btn"
                            onClick={handleIncrement}
                            disabled={quantity >= stock}
                        >
                            +
                        </button>
                    </div>
                    {stock > 0 && (
                        <div className="stock-info">
                            {stock <= 10 ? (
                                <span className="stock-low">Plus que {stock} {unit}s en stock</span>
                            ) : (
                                <span className="stock-available">{stock} {unit}s disponibles</span>
                            )}
                        </div>
                    )}
                </div>
                <div className="delivery-info">
                    <label className="option-label">DÉLAI DE LIVRAISON</label>
                    <div className="delivery-box">
                        {stock > 0 ? '3-5 JOURS OUVRABLES' : 'RUPTURE DE STOCK'}
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <button
                className="btn-primary"
                onClick={onAddToCart}
                disabled={stock === 0}
            >
                <span className="material-symbols-outlined">add_shopping_cart</span>
                {stock > 0 ? 'AJOUTER AU PANIER' : 'RUPTURE DE STOCK'}
            </button>

            <button className="btn-secondary" onClick={onDownloadSpecs}>
                <span className="material-symbols-outlined" style={{ fontSize: '1.125rem' }}>download_2</span>
                TÉLÉCHARGER LA FICHE TECHNIQUE (PDF)
            </button>

            {/* Trust Badges */}
            <div className="trust-badges">
                <div className="badge-item">
                    <span className="material-symbols-outlined">verified</span>
                    <p>CERTIFIÉ {product?.certification || 'ISO 9001'}</p>
                </div>
                <div className="badge-item">
                    <span className="material-symbols-outlined">precision_manufacturing</span>
                    <p>USINAGE DE PRÉCISION</p>
                </div>
                <div className="badge-item">
                    <span className="material-symbols-outlined">local_shipping</span>
                    <p>LIVRAISON RAPIDE</p>
                </div>
            </div>

            {/* Additional Product Info */}
            {product?.sku && (
                <div className="product-sku">
                    SKU: {product.sku}
                </div>
            )}
        </div>
    );
};

export default ProductConfigurator;