// src/components/Navbar.js
import React, { useState } from 'react';
import CartDrawer from './CartDrawer';
import SearchBar from './SearchBar';
import { useCart } from '../context/CartContext';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

const Header = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const { cartItems } = useCart();

    const navLinks = [
        { name: 'Accueil', path: '/' },
        { name: 'Products', path: '/catalogue' },
        { name: 'Contacts', path: '/contact' }
    ];

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const handleLinkClick = () => {
        setIsMobileMenuOpen(false);
    };

    const openCart = () => {
        setIsCartOpen(true);
    };

    const closeCart = () => {
        setIsCartOpen(false);
    };

    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <>
            <header className="header">
                <div className="container nav-container">
                    <NavLink to="/" className="logo">
                        CONSTRUCT_SPEC
                    </NavLink>

                    {/* Desktop Navigation */}
                    <div className="nav-links">
                        {navLinks.map((link) => (
                            <NavLink
                                key={link.name}
                                to={link.path}
                                className={({ isActive }) =>
                                    `nav-link ${isActive ? 'active' : ''}`
                                }
                                onClick={handleLinkClick}
                                end={link.path === '/'}
                            >
                                {link.name}
                            </NavLink>
                        ))}
                    </div>

                    {/* Header Actions */}
                    <div className="header-actions">
                        <SearchBar />

                        <button className="icon-btn cart-btn" onClick={openCart}>
                            <span className="material-symbols-outlined">shopping_cart</span>
                            {totalItems > 0 && (
                                <span className="cart-count">{totalItems}</span>
                            )}
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
                            <NavLink
                                key={link.name}
                                to={link.path}
                                className={({ isActive }) =>
                                    `mobile-nav-link ${isActive ? 'active' : ''}`
                                }
                                onClick={handleLinkClick}
                                end={link.path === '/'}
                            >
                                {link.name}
                            </NavLink>
                        ))}
                    </div>
                </div>
            </header>

            <CartDrawer isOpen={isCartOpen} onClose={closeCart} />
        </>
    );
};

export default Header;