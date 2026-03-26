import React from 'react';
import Hero from '@components/HeroSection';
import './HomePage.css';

const Home = () => {
    const products = [
        {
            id: 'BOIS',
            title: 'BOIS STRUCTUREL',
            description: 'Sapin de Douglas grade A, bois traité sous pression, séché au séchoir.',
            features: ['Taille 2x4 - 2x12', 'Séché au séchoir (KD)', 'Traité sous pression'],
            icon: 'wood',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDSih4h2hTCP5RnSjuXcUbHTp-EryCvNd6G_yTebt2zkK7t1zqU9pf0rjtrc6TyPqJWiYDoPt2mBLhECB7Y8WgT32BauEXWs6nZpONV5RWDs9_Xfg27dY4Y8HDUEAnjkBcXhpRb_BADSc_cZvX2AvV8ySd4KwT5gO_rfYnIodp8jxhc-E3_ddnHwwElZqLJ--fjHR8o-aCUsfSP4zXuWq6B23YDsJvy3FNAEyel84zQ2z4KF_uNmSpfm_BgRbZmHk_aoeHPJcKRkwLt'
        },
        {
            id: 'ACIER',
            title: 'PROFILÉS STRUCTURELS',
            description: 'Laminés à chaud, barres d\'armature Grade 60, conformité ASTM A36.',
            features: ['ASTM A36 / A992', 'Coupe personnalisée CNC', 'Barres d\'armature Grade 60'],
            icon: 'precision_manufacturing',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAgiCkF3xgzuYPFPydqcdKyfV5VP_ljOQ3xNggEG5A5QilfvCHmxkiIqZxs9bNljUOIU-vlIgcmnrIriTlN8OWgtqc0-l95h_66EENiTyEVMt7bVB6YB-sm74GPpqWTRLOcePRt9DNfX7temU9NjNt7hCDdAdcAr1mq3BSpi11Jboc7D6JzGT3RrddXKg4nTUzNzVJbsUrMPMixA3F2Cplnrc9Axpxf6a6forJn39jszVjMsDZ0-RYGZO4xLjivCVrxeCnRCdnoVDkD'
        },
        {
            id: 'BÉTON',
            title: 'PRÊT À L\'EMPLOI',
            description: 'Mélanges haute résistance 4000+ PSI, renfort de fibre, blocs CMU.',
            features: ['Mélanges 4000+ PSI', 'Renfort de fibre', 'Blocs CMU certifiés'],
            icon: 'construction',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCg0-Bf0zo3bDF_9Zc407xWiN8DHzRHHPUAkI8FxlgItjbFZRG5N7I_V5jxP3gAFU57hAZ4jLNeYP-2ppW2Q2xraAed3BRHbR57EpDBn82GnO94PpiidzQejwmuXBuVCZ08-CTUto7horYB4iqHjqjccwZmBeP7xPyobdPr_RMVqnN7-i1zlIIw-Y26dCN52GhHrI4coFWVgvA-yDZD1PaKSj8aJNq3BRh_nqGSDoVRIwfJvRD4Gelzf4Ysl_Zx15z4bTqDXGguBkl6'
        }
    ];

    const handleProductClick = (productId) => {
        console.log(`Product clicked: ${productId}`);
        // Add your product click logic here
    };

    const handleManifestClick = () => {
        console.log('Manifest clicked');
        // Add your manifest download logic here
    };

    const handleConsultEngineer = () => {
        console.log('Consult engineer clicked');
        // Add your consultation logic here
    };

    const handleBulkPricing = () => {
        console.log('Bulk pricing clicked');
        // Add your bulk pricing logic here
    };

    return (
        <main>
            {/* Hero Section */}
            <>
                <Hero />
            </>

            {/* Philosophy Section */}
            <section className=" container section bg-surface">
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

            {/* Products Section */}
            <section className="container section bg-surface-low">
                <div className="container-custom">
                    <div className="section-header">
                        <div>
                            <span className="section-subtitle">CATÉGORIES PRINCIPALES</span>
                            <h2 className="section-title-large">INVENTAIRE DE BASE</h2>
                        </div>
                        <a href="#" className="view-all">
                            VOIR TOUS LES SPÉCIFICITÉS
                        </a>
                    </div>
                    <div className="products-grid">
                        {products.map((product) => (
                            <div
                                key={product.id}
                                className="product-card"
                                onClick={() => handleProductClick(product.id)}
                            >
                                <div>
                                    <div className="product-header">
                                        <span className="product-number">{product.id}</span>
                                        <span className="material-symbols-outlined product-icon">
                                            {product.icon}
                                        </span>
                                    </div>
                                    <h3 className="product-title">{product.title}</h3>
                                    <p className="product-description">{product.description}</p>
                                    <ul className="product-features">
                                        {product.features.map((feature, index) => (
                                            <li key={index}>
                                                <span className="feature-dot"></span> {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <img className="product-image" src={product.image} alt={product.title} />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

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