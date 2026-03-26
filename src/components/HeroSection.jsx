import React from 'react';
import './HeroSection.css';

const HeroSection = () => {

    return (
        <section className="hero">
            <div className="hero-bg">
                <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuC_ESI4chYzP1TPjbl6I1FtTujBpqlVJb8n2-6vaRWdxhBorfHV3mnjS414gIYBs3n3QKZeB4iihsuF9LWOdFy-cAcNgLxlSskbiUCry2Nyv0h95f1r1_JYHAe4HaT-B6QQQYa8DH21lXt0YKXNBxsEOLeNLAWhfcn7wYu73Hi7Yv8f_YQBWnodLes6d3mzs4iJFkywG6nr6NvPdewfGMyAgBTvf0nbCroq0JcAZkAtOSlZ8vDBm-mn-T-119nf9ijc9HqD5Ny6EUPp"
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