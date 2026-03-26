import React from 'react';

const ProductConfigurator = ({
    product,
    dimensions,
    selectedDimension,
    onDimensionChange,
    quantity,
    onQuantityChange,
    onAddToCart,
    onDownloadSpecs
}) => {
    const handleIncrement = () => {
        onQuantityChange(quantity + 1);
    };

    const handleDecrement = () => {
        if (quantity > 1) {
            onQuantityChange(quantity - 1);
        }
    };

    const handleQuantityChange = (e) => {
        const value = parseInt(e.target.value);
        if (!isNaN(value) && value >= 1) {
            onQuantityChange(value);
        }
    };

    return (
        <div className="product-info">
            <h1 className="product-title">
                POUTRE EN I <br />
                TITAN-X STRUCTURELLE
            </h1>

            <div className="rating">
                <div className="stars">
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    <span className="material-symbols-outlined">star_half</span>
                </div>
                <span className="rating-text">(142 SPÉCS VÉRIFIÉES)</span>
            </div>

            <div className="price-card">
                <span className="price-label">PRIX UNITAIRE</span>
                <div className="price-value">
                    $284.50 <small>/ UNITÉ (HORS TAXES)</small>
                </div>
            </div>

            {/* Dimension Selection */}
            <div className="option-group">
                <label className="option-label">DIMENSIONS DU PROFIL (L x H x L)</label>
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

            {/* Quantity and Delivery */}
            <div className="quantity-selector">
                <div className="quantity-control">
                    <label className="option-label">QUANTITÉ</label>
                    <div className="quantity-box">
                        <button className="quantity-btn" onClick={handleDecrement}>-</button>
                        <input
                            type="number"
                            className="quantity-input"
                            value={quantity}
                            onChange={handleQuantityChange}
                        />
                        <button className="quantity-btn" onClick={handleIncrement}>+</button>
                    </div>
                </div>
                <div className="delivery-info">
                    <label className="option-label">DÉLAI DE LIVRAISON</label>
                    <div className="delivery-box">3-5 JOURS OUVRABLES</div>
                </div>
            </div>

            {/* Action Buttons */}
            <button className="btn-primary" onClick={onAddToCart}>
                <span className="material-symbols-outlined">add_shopping_cart</span>
                AJOUTER AU PANIER PROJET
            </button>
            <button className="btn-secondary" onClick={onDownloadSpecs}>
                <span className="material-symbols-outlined" style={{ fontSize: '1.125rem' }}>download_2</span>
                TÉLÉCHARGER LA FICHE TECHNIQUE (PDF)
            </button>

            {/* Trust Badges */}
            <div className="trust-badges">
                <div className="badge-item">
                    <span className="material-symbols-outlined">verified</span>
                    <p>CERTIFIÉ ASTM</p>
                </div>
                <div className="badge-item">
                    <span className="material-symbols-outlined">precision_manufacturing</span>
                    <p>USINAGE DE PRÉCISION</p>
                </div>
                <div className="badge-item">
                    <span className="material-symbols-outlined">local_shipping</span>
                    <p>PRÊT POUR LA LOGISTIQUE</p>
                </div>
            </div>
        </div>
    );
};

export default ProductConfigurator;