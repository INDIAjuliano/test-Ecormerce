import React, { useState, useEffect } from 'react';
import Hero from '../components/HeroSection';
import ProductsSection from '../components/ProductsSection';
import { getProducts, getFeaturedProducts } from '../services/mockApi';
import './HomePage.css';

const Home = () => {
    // CORRECTION: ajouter les deux variables du state
    const [products, setProducts] = useState([]);      // ← CORRIGÉ
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                // Charger tous les produits et les produits en vedette
                const [allProducts, featured] = await Promise.all([
                    getProducts(),
                    getFeaturedProducts()
                ]);

                setProducts(allProducts);
                setFeaturedProducts(featured);

                console.log('✅ Produits chargés:', allProducts.length);
                console.log('✅ Produits en vedette:', featured.length);
                console.log('📦 Produits en vedette:', featured.map(p => p.name));
            } catch (error) {
                console.error('❌ Erreur lors du chargement des produits:', error);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    const handleManifestClick = () => {
        console.log('Manifest clicked');
        // Ajoutez votre logique de téléchargement ici
    };

    const handleConsultEngineer = () => {
        console.log('Consult engineer clicked');
        // Ajoutez votre logique de consultation ici
    };

    const handleBulkPricing = () => {
        console.log('Bulk pricing clicked');
        // Ajoutez votre logique de tarification ici
    };

    if (loading) {
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
                <p>Chargement du catalogue...</p>
            </div>
        );
    }

    return (
        <main>
            {/* Hero Section */}
            <Hero />

            {/* Philosophy Section */}
            <section className="container section bg-surface">
                <div className="container-custom">
                    <div className="philosophy-grid">
                        <div className="philosophy-text">
                            <h2 className="section-title">
                                <span className="title-accent"></span> BRUTALISME ARCHITECTURAL
                            </h2>
                            <p>
                                Notre philosophie est enracinée dans l'honnêteté des matériaux. Nous pensons que l'intégrité structurelle
                                ne doit jamais être cachée derrière des placages décoratifs. Dans l'univers de{' '}
                                <span className="philosophy-highlight">CONSTRUCT_SPEC</span>, la qualité se mesure par la densité, la résistance à
                                la traction et la précision chimique.
                            </p>
                            <p>
                                C'est le Brutalisme Architectural — la puissance brute et inébranlable des composants industriels conçus
                                pour résister à l'épreuve des siècles. Nous ne vendons pas seulement des matériaux ; nous fournissons la
                                certitude mathématique que votre projet exige.
                            </p>
                            <div className="stats-grid">
                                <div>
                                    <div className="stat-number">99.8%</div>
                                    <div className="stat-label">NORME DE PURETÉ</div>
                                </div>
                                <div>
                                    <div className="stat-number">24/7</div>
                                    <div className="stat-label">DÉPLOIEMENT LOGISTIQUE</div>
                                </div>
                            </div>
                        </div>
                        <div className="philosophy-card">
                            <img
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAb4wWfijkhOHPGp6uPF3NNiU3_PFEyjnwGN6qRLYz05Yn_o_JWJRNP9pxuh2bSSfNItHzFCgw3hLGdekE4oguW7zGgH4ubuDzNl7QOT0Lpk2PKZwTmxxuRjVPkEPsqsMaBllhlD3g2GpYnYHb6W8wOPK9jw2t2uzHtTZPVZoQroWzWrpZ20Y5vV4fEz7L8pVjR9mN5HaheCyq8WFhcDDtygyzliD_E6A4QFST1eb_QR9xB2upPw6yiGSB47nLWF27A6rFyqNMz2h3w"
                                alt="Concrete texture"
                            />
                            <div className="card-overlay">
                                <div className="glass-card">
                                    <span
                                        className="material-symbols-outlined"
                                        style={{ fontSize: '3rem', color: '#a23f00', display: 'block', marginBottom: '1rem' }}
                                    >
                                        architecture
                                    </span>
                                    <h3
                                        style={{
                                            fontFamily: 'Work Sans',
                                            fontWeight: 900,
                                            fontSize: '1.5rem',
                                            textTransform: 'uppercase',
                                            marginBottom: '0.75rem'
                                        }}
                                    >
                                        LE MANIFESTE SPEC
                                    </h3>
                                    <p style={{ fontSize: '0.75rem', fontWeight: 500 }}>
                                        Téléchargez notre livre blanc technique sur la longévité structurelle.
                                    </p>
                                    <button
                                        onClick={handleManifestClick}
                                        style={{
                                            marginTop: '1.5rem',
                                            fontSize: '0.75rem',
                                            fontWeight: 900,
                                            textTransform: 'uppercase',
                                            background: 'none',
                                            border: 'none',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.5rem',
                                            color: 'inherit'
                                        }}
                                    >
                                        LIRE LE DOCUMENT{' '}
                                        <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>
                                            open_in_new
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Products Section - Utilise les produits en vedette */}
            <ProductsSection products={featuredProducts} />

            {/* CTA Section */}
            <section className="cta-section">
                <div className="container cta-content">
                    <h2 className="cta-title">
                        PRÊT À CONSTRUIRE L'AVENIR DES <span>INFRASTRUCTURES</span> ?
                    </h2>
                    <div className="cta-buttons">
                        <button className="btn-primary" onClick={handleConsultEngineer}>
                            CONSULTER UN INGÉNIEUR
                        </button>
                        <button className="btn-secondary" onClick={handleBulkPricing}>
                            TARIFICATION DE GROS
                        </button>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Home;