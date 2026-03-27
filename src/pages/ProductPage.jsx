import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ImageGallery from "../components/ImageGallery";
import ProductConfigurator from '../components/ProductConfigurator';
import TechnicalSpecs from '../components/TechnicalSpecs';
import ApplicationsSection from '../components/ApplicationsSection';
import { getProductById } from '../services/mockApi';
import { useCart } from '../context/CartContext';

import './ProductPage.css';


const ProductPage = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedDimension, setSelectedDimension] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [error, setError] = useState(null);
    const { addToCart } = useCart(); 

    useEffect(() => {
        const fetchProduct = async () => {

            if (!id) {
                console.error('❌ Aucun ID produit trouvé dans l\'URL');
                setError('ID produit manquant');
                setLoading(false);
                return;
            }
            setLoading(true);
            console.log('Début du chargement du produit...');
            try {
                const productData = await getProductById(parseInt(id));

                if (!productData) {
                    console.error(`❌ Produit avec l'ID ${id} non trouvé`);
                    setError('Produit non trouvé');
                    setLoading(false);
                    return;
                }

                console.log('✅ Produit reçu dans ProductPage:', productData);
                console.log('📦 Détails du produit:');
                console.log('   - ID:', productData?.id);
                console.log('   - Nom:', productData?.name);
                console.log('   - Prix:', productData?.price, productData?.currency);
                console.log('   - Catégorie:', productData?.category);
                console.log('   - Stock:', productData?.stock);
                console.log('   - Description:', productData?.description);
                console.log('   - Dimensions disponibles:', productData?.dimensions_available);
                console.log('   - Spécifications techniques:', productData?.technical_specifications);
                console.log('   - Images:', productData?.images);

                setProduct(productData);

                // Définir la première dimension par défaut si disponible
                if (productData?.dimensions_available && productData.dimensions_available.length > 0) {
                    setSelectedDimension(productData.dimensions_available[0]);
                }

                // Définir la quantité initiale
                setQuantity(1);

            } catch (error) {
                console.error('❌ Error fetching product:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    const handleAddToCart = () => {
        if (!product) return;

        const cartItem = {
            id: product.id,
            name: product.name,
            price: product.price,
            currency: product.currency,
            quantity: quantity,
            dimension: selectedDimension,
            image: product.images && product.images.length > 0 ? product.images[selectedImageIndex] : null,
            unit: product.unit || 'unité',
            stock: product.stock
        };

        console.log('🛒 Ajout au panier:', cartItem);

        // Ici vous appellerez votre fonction addToCart du contexte
        addToCart(cartItem);

        // Optionnel: Afficher une notification
        // alert(`${quantity} x ${product.name} ajouté au panier`);
    };

    const handleDownloadSpecs = () => {
        console.log('📄 Téléchargement des spécifications techniques pour:', product?.name);
        // Logique pour télécharger les specs
        // Par exemple: générer un PDF ou ouvrir un lien
        if (product?.technical_specifications) {
            const specsText = `
                Spécifications techniques - ${product.name}
                ${'='.repeat(50)}
                
                Dimensions: ${selectedDimension}
                Matériau: ${product.technical_specifications.material || 'N/A'}
                Traitement: ${product.technical_specifications.treatment || 'N/A'}
                Résistance: ${product.technical_specifications.strength || 'N/A'}
                Normes: ${product.technical_specifications.standards || 'N/A'}
                Application: ${product.technical_specifications.application || 'N/A'}
            `;

            const blob = new Blob([specsText], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${product.name}_specifications.txt`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);

            console.log('✅ Spécifications téléchargées');
        } else {
            console.warn('⚠️ Aucune spécification technique disponible');
        }
    };

    const handleQuantityChange = (newQuantity) => {
        if (product && newQuantity >= 1 && newQuantity <= product.stock) {
            setQuantity(newQuantity);
            console.log(`Quantité mise à jour: ${newQuantity}`);
        } else if (newQuantity > product?.stock) {
            console.warn(`Stock insuffisant. Maximum: ${product?.stock}`);
            alert(`Stock limité à ${product?.stock} unités`);
        }
    };

    const handleDimensionChange = (dimension) => {
        setSelectedDimension(dimension);
        console.log(`Dimension sélectionnée: ${dimension}`);

        // Optionnel: Mettre à jour le prix selon la dimension
        // Si vous avez des prix différents selon les dimensions
        if (product?.dimensions_prices && product.dimensions_prices[dimension]) {
            // Mettre à jour le prix
            // setProduct({...product, price: product.dimensions_prices[dimension]});
        }
    };

    // Formater le prix pour l'affichage
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

    if (loading) {
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
                <p>Chargement des détails du produit...</p>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="error-container">
                <span className="material-symbols-outlined error-icon">error</span>
                <h2>Produit non trouvé</h2>
                <p>{error || "Le produit que vous recherchez n'existe pas ou a été supprimé."}</p>
                <button className="back-btn" onClick={() => window.history.back()}>
                    Retour
                </button>
                <button className="home-btn" onClick={() => window.location.href = '/'}>
                    Accueil
                </button>
            </div>
        );
    }
    if (!product) {
        return (
            <div className="error-container">
                <span className="material-symbols-outlined error-icon">error</span>
                <h2>Produit non trouvé</h2>
                <p>Le produit que vous recherchez n'existe pas ou a été supprimé.</p>
                <button className="back-btn" onClick={() => window.history.back()}>
                    Retour
                </button>
            </div>
        );
    }

    // Préparer les images pour la galerie
    const galleryImages = product.images && product.images.length > 0
        ? product.images
        : ['/placeholder.webp'];

    // Préparer les dimensions disponibles
    const availableDimensions = product.dimensions_available && product.dimensions_available.length > 0
        ? product.dimensions_available
        : ['Dimension standard'];

    return (
        <main className="container product-details-main">
            <div className="product-details-container">
                {/* Breadcrumb dynamique */}
                <div className="breadcrumb">
                    <span>Accueil</span>
                    <span className="material-symbols-outlined separator">chevron_right</span>
                    <span>{product.category || 'Produits'}</span>
                    <span className="material-symbols-outlined separator">chevron_right</span>
                    <span className="current">{product.name}</span>
                </div>

                {/* Product Section avec données dynamiques */}
                <section className="product-section">
                    <ImageGallery
                        images={galleryImages}
                        productName={product.name}
                        onImageSelect={setSelectedImageIndex}
                        selectedIndex={selectedImageIndex}
                    />

                    <ProductConfigurator
                        product={{
                            ...product,
                            formattedPrice: formatPrice(product.price, product.currency)
                        }}
                        dimensions={availableDimensions}
                        selectedDimension={selectedDimension}
                        onDimensionChange={handleDimensionChange}
                        quantity={quantity}
                        onQuantityChange={handleQuantityChange}
                        onAddToCart={handleAddToCart}
                        onDownloadSpecs={handleDownloadSpecs}
                        stock={product.stock}
                        unit={product.unit || 'unité'}
                    />
                </section>

                {/* Technical Specifications dynamique */}
                <TechnicalSpecs
                    specifications={product.technical_specifications}
                    productName={product.name}
                    selectedDimension={selectedDimension}
                />

                {/* Applications Section dynamique */}
                <ApplicationsSection
                    applications={product.applications}
                    productCategory={product.category}
                    productName={product.name}
                />
            </div>
        </main>
    );
};

export default ProductPage;