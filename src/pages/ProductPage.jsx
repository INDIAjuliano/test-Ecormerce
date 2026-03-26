import React, { useState, useEffect } from 'react';
import ImageGallery from "../components/ImageGallery";
import ProductConfigurator from '../components/ProductConfigurator';
import TechnicalSpecs from '../components/TechnicalSpecs';
import ApplicationsSection from '../components/ApplicationsSection';
import { getProductById } from '../services/mockApi';
import './ProductPage.css';

const ProductPage = () => {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedDimension, setSelectedDimension] = useState('200 x 200 x 6000mm');
    const [quantity, setQuantity] = useState(12);

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            console.log('Début du chargement du produit...');
            try {
                const productData = await getProductById(1);
                console.log(' Produit reçu dans ProductPage:', productData);
                console.log(' Détails du produit:');
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
            } catch (error) {
                console.error('Error fetching product:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, []);

    const dimensions = [
        '200 x 200 x 6000mm',
        '300 x 300 x 6000mm',
        '400 x 400 x 8000mm',
        'COULÉE SUR MESURE'
    ];

    const images = [
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBcsMOin4EJGt5_Iwq0lyE_18B7q3omZ_r2yjNwUEluCiJKRwD7-IvuQHwOgNm7cuJT6Zp2WCxPElhMOAikhF52Hq5AAhYL_nWrV2twNGIDlyAQ3AP06OMoT7o4mfA9vod9mWDcJVfCGHGQyit35OmiiksG8OX0Lxc0MJcDNKZ7iSlUKoZ8ytRZZhlw97gssZrWUgKQ50s2yyIKqN0O9h6xXz7QgOOYnOFyN_gckiK9hWM2Pv4AxV7zpcADuHWUTW-KlrIjVcIdKqT1',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCRy9a9_4rl_K6wznG_3t1CElGWctXh-Wgy0rnpycFy3evG4_Vnk5sJk6mVWZktjw41sPmNCeZIPYSCB7OXqatWhdBfxjelHtBU9gEA6GXgszuYSTsd-AgG8Eqoco3cHjPoJ98c8NWyx9CRGTKUgvSq5-rWTzFhsX0kqe-k3azZYlQ0JDl8EFHq0naodCMHzA084W6HDu4tD4Xye2WAiS-_E0FwoHsJGVjzF0UJNUM6W6Xadup4Fn-T5rq61dDAgQy7MeWR6ZYYtFMS',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDHCSwnMcHf1x-O28yFiiNyx0ot_QrF6H0Yhorj2tKCnFG13HEj5fkCDA-UFX2qjYJwlI2HeEcI39W-NbINcGb6di7sjwp_KsQx7sz-RLtU-SY0R_5ARJfb3sm2SMMGWVOhABdoDyXdbYf-KM2ZADVIVtzL1rM1eAnzGAM0Qrchr6Zw1OhSpXLo8XFEhGZAnruu9RUhyRcbVDsfUOOqXV0qysqXhxAJcz0W6djKOt6yvv7nYl2xKHl17Q5XTQ66-UjU0bxZE8wQOTk3',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBaJmd8EwlbSRI4ExO3J61g-HYXneoZhGWhye_RKkJBKJ0mO87guIZ-S0uRar-3h9O2oVbtNQUXuOEhmRDQThdwv1rdRkNLG2Iv2BrbVYs3zUWqCn_gGcTS74YCh2M44Mk7gkPSQKuLC-m-Ubds1vYoOmnkR30MDozGKdALincVC4wr5yw5TzdDEGSZCDxy_JvPgcxqRaCwMcpmoZvYjXNmQkprzfXCZIomD-iS5nQv772lRivXDwsKdBGxv3xRYQ65pbiTNvReTlEI'
    ];

    const handleAddToCart = () => {
        console.log('Added to cart:', {
            product,
            dimension: selectedDimension,
            quantity
        });
    };

    const handleDownloadSpecs = () => {
        console.log('Downloading technical specs');
    };

    if (loading) {
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
                <p>Loading product details...</p>
            </div>
        );
    }

    return (
        <main className="container product-details-main">
            <div className="product-details-container">
                {/* Breadcrumb */}
                <div className="breadcrumb">
                    <span>Accueil</span>
                    <span className="material-symbols-outlined separator">chevron_right</span>
                    <span>Matériaux</span>
                    <span className="material-symbols-outlined separator">chevron_right</span>
                    <span className="current">Acier de construction renforcé</span>
                </div>

                {/* Product Section */}
                <section className="product-section">
                    <ImageGallery images={images} productName={product?.name} />
                    <ProductConfigurator
                        product={product}
                        dimensions={dimensions}
                        selectedDimension={selectedDimension}
                        onDimensionChange={setSelectedDimension}
                        quantity={quantity}
                        onQuantityChange={setQuantity}
                        onAddToCart={handleAddToCart}
                        onDownloadSpecs={handleDownloadSpecs}
                    />
                </section>

                {/* Technical Specifications */}
                <TechnicalSpecs />

                {/* Applications Section */}
                <ApplicationsSection />
            </div>
        </main>
    );
};

export default ProductPage;