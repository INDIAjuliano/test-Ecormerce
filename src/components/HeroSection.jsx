import React from 'react';
import './HeroSection.css';
import heroImage from '../assets/hero_image_.webp';

const HeroSection = () => {

    return (
        <section className="hero">
            <div className="hero-bg">
                <img
                    className="hero-img"
                    src={heroImage}
                    alt="Construction site"
                />
            </div>
            <div className="container hero-content">
                <div className="hero-badge">Établi en 1984</div>
                <h1 className="hero-title">
                    Substance <br />
                    <span>D'Ingénierie</span>
                    <br />de Précision.
                </h1>
                <p className="hero-description">
                    Fournir l'ossature structurelle des infrastructures mondiales. Nous livrons des
                    matières premières de qualité architecturale avec une logistique de niveau militaire.
                </p>
                <div className="hero-buttons">
                    <button className="btn-primary">
                        DEMANDER UN DEVIS{' '}
                        <span className="material-symbols-outlined" style={{ fontSize: '1.25rem' }}>
                            arrow_forward
                        </span>
                    </button>
                    <button className="btn-outline">VOIR LA LOGISTIQUE</button>
                </div>
            </div>
            <div className=" container hero-accent"></div>
        </section>
    );
};

export default HeroSection;