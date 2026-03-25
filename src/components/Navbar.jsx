import React, { useState } from 'react';
import './Navbar.css';

const Header = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeLink, setActiveLink] = useState('MATÉRIAUX');

    const navLinks = [
        { name: 'Accueil', path: '#' },
        { name: 'Produit', path: '#' },
        { name: 'COMMANDES EN GROS', path: '#' }
    ];

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const handleLinkClick = (linkName) => {
        setActiveLink(linkName);
        setIsMobileMenuOpen(false);
    };

    return (
        <header className="header">
            <div className="container nav-container">
                <a href="#" className="logo">CONSTRUCT_SPEC</a>

                {/* Desktop Navigation */}
                <div className="nav-links">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.path}
                            className={`nav-link ${activeLink === link.name ? 'active' : ''}`}
                            onClick={() => handleLinkClick(link.name)}
                        >
                            {link.name}
                        </a>
                    ))}
                </div>

                {/* Header Actions */}
                <div className="header-actions">
                    <div className="search-box">
                        <span className="material-symbols-outlined" style={{ fontSize: '1.25rem', color: '#8c7166' }}>
                            search
                        </span>
                        <input type="text" className="search-input" placeholder="RECHERCHER..." />
                    </div>
                    <button className="icon-btn">
                        <span className="material-symbols-outlined">shopping_cart</span>
                    </button>
                    <button className="icon-btn hide-mobile">
                        <span className="material-symbols-outlined">account_circle</span>
                    </button>
                    <button className="mobile-menu-btn" onClick={toggleMobileMenu}>
                        <span className="material-symbols-outlined">menu</span>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
                <div className="mobile-menu-content">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.path}
                            className={`mobile-nav-link ${activeLink === link.name ? 'active' : ''}`}
                            onClick={() => handleLinkClick(link.name)}
                        >
                            {link.name}
                        </a>
                    ))}
                </div>
            </div>
        </header>
    );
};

export default Header;