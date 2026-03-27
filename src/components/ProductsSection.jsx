import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getImageUrl } from './imageUtils';
import './ProductsSection.css';

const ProductsSection = ({ products = [] }) => {
    const navigate = useNavigate();

    const handleProductClick = (productId) => {
        navigate(`/product/${productId}`);
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('fr-MG').format(price) + ' Ar';
    };

    const getMainFeatures = (product) => {
        const features = [];

        if (product.technical_specifications?.material_properties) {
            const props = product.technical_specifications.material_properties;
            if (props.material) features.push(`Matériau: ${props.material}`);
            if (props.weight) features.push(`Poids: ${props.weight}`);
            if (props.power) features.push(`Puissance: ${props.power}`);
            if (props.motor_power) features.push(`Moteur: ${props.motor_power}`);
            if (props.steel_grade) features.push(`Acier: ${props.steel_grade}`);
            if (props.fabric) features.push(`Tissu: ${props.fabric}`);
        }

        if (product.delivery_delay) {
            features.push(`Livraison: ${product.delivery_delay}`);
        }

        if (product.dimensions_available?.length > 0) {
            features.push(`Dimensions: ${product.dimensions_available[0]}`);
        }

        return features.slice(0, 3);
    };

    // Filtrer les produits en vedette
    const featuredProducts = products.filter(product => product.featured === true);
    const popularProducts = featuredProducts.slice(0, 3);

    return (
        <section className="section bg-surface-low">
            <div className="container-custom">
                <div className="section-header">
                    <div>
                        <span className="section-subtitle">PRODUITS POPULAIRES</span>
                        <h2 className="section-title-large">NOTRE SÉLECTION</h2>
                    </div>
                    <a href="/catalogue" className="view-all">
                        VOIR LE CATALOGUE
                    </a>
                </div>

                <div className="products-grid">
                    {popularProducts.length > 0 ? (
                        popularProducts.map((product) => (
                            <div
                                key={product.id}
                                className="product-card"
                                onClick={() => handleProductClick(product.id)}
                            >
                                <div className="product-image-wrapper">
                                    <img
                                        className="product-image"
                                        src={getImageUrl(product.images?.[0])}
                                        alt={product.name}
                                        onError={(e) => {
                                            console.log(`Image non trouvée: ${product.images?.[0]}`);
                                            e.target.src = getImageUrl('placeholder.webp');
                                            e.target.onerror = null;
                                        }}
                                    />

                                    <div className="product-badges">
                                        <span className="badge badge-featured">POPULAIRE</span>
                                        {product.high_load_rated && (
                                            <span className="badge badge-highload">HAUTE CHARGE</span>
                                        )}
                                        {product.stock < 50 && (
                                            <span className="badge badge-stock">STOCK LIMITÉ</span>
                                        )}
                                    </div>

                                    <div className="product-price-badge">
                                        <span className="price">{formatPrice(product.price)}</span>
                                        <span className="product-category">{product.category}</span>
                                    </div>

                                </div>
                                

                                <div className="product-content">
                                    <div className="product-header">
                                        <span className="product-sku">{product.sku}</span>
                                    </div>

                                    <h3 className="product-title">{product.name}</h3>
                                    <p className="product-description">{product.description}</p>

                                    <div className="product-rating">
                                        <div className="stars">
                                            {[...Array(5)].map((_, i) => (
                                                <span
                                                    key={i}
                                                    className={`star ${i < product.rating ? 'filled' : ''}`}
                                                >
                                                    ★
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <ul className="product-features">
                                        {getMainFeatures(product).map((feature, index) => (
                                            <li key={index}>
                                                <span className="feature-dot"></span> {feature}
                                            </li>
                                        ))}
                                    </ul>

                                    <div className="product-footer">

                                        <button className="btn-primary">
                                            VOIR DÉTAILS
                                            <span className="material-symbols-outlined">arrow_forward</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="no-products">
                            <p>Aucun produit en vedette pour le moment</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default ProductsSection;