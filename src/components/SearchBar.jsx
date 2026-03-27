// src/components/SearchBar.jsx
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './SearchBar.css';

const SearchBar = () => {
    const [query, setQuery] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [results, setResults] = useState([]);
    const [highlighted, setHighlighted] = useState(-1);
    const [recentSearches, setRecentSearches] = useState([]);
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const inputRef = useRef(null);
    const desktopContainerRef = useRef(null);
    const mobileContainerRef = useRef(null);
    const mobileInputRef = useRef(null);
    const navigate = useNavigate();

    // Charger les produits et catégories
    useEffect(() => {
        const loadData = async () => {
            try {
                const [productsData, categoriesData] = await Promise.all([
                    import('../data/products.json'),
                    import('../data/categories.json')
                ]);
                setProducts(productsData.default);
                setCategories(categoriesData.default);
                console.log('Données chargées:', productsData.default.length, 'produits');
            } catch (error) {
                console.error('Erreur chargement données:', error);
            }
        };
        loadData();
    }, []);

    // Charger les recherches récentes
    useEffect(() => {
        const saved = localStorage.getItem('recentSearches');
        if (saved) {
            try {
                setRecentSearches(JSON.parse(saved).slice(0, 4));
            } catch (e) {
                console.error('Error loading recent searches:', e);
            }
        }
    }, []);

    // Sauvegarder une recherche récente
    const saveRecentSearch = useCallback((term) => {
        if (!term || term.trim() === '') return;
        setRecentSearches(prev => {
            const updated = [term, ...prev.filter(s => s !== term)].slice(0, 4);
            localStorage.setItem('recentSearches', JSON.stringify(updated));
            return updated;
        });
    }, []);

    // Fonction de recherche
    const runSearch = useCallback((searchQuery) => {
        if (!searchQuery.trim() || products.length === 0) {
            setResults([]);
            return;
        }

        setIsLoading(true);
        const searchTerm = searchQuery.toLowerCase().trim();
        const suggestions = [];

        // Rechercher dans les produits
        const matchingProducts = products
            .filter(product =>
                product.name?.toLowerCase().includes(searchTerm) ||
                product.description?.toLowerCase().includes(searchTerm) ||
                product.category?.toLowerCase().includes(searchTerm)
            )
            .slice(0, 8);

        matchingProducts.forEach(product => {
            suggestions.push({
                type: 'product',
                id: product.id,
                text: product.name,
                price: product.price,
                category: product.category,
                unit: product.unit,
                description: product.description,
                matchType: product.name?.toLowerCase() === searchTerm ? 'exact' : 'partial'
            });
        });

        // Rechercher dans les catégories
        if (suggestions.length < 3) {
            const matchingCategories = categories
                .filter(category =>
                    category.name?.toLowerCase().includes(searchTerm)
                )
                .slice(0, 3);

            matchingCategories.forEach(category => {
                if (!suggestions.some(s => s.text === category.name)) {
                    suggestions.push({
                        type: 'category',
                        id: category.id,
                        text: category.name,
                        name: category.name,
                        slug: category.slug,
                        productCount: products.filter(p => p.category === category.name).length
                    });
                }
            });
        }

        setResults(suggestions);
        setIsLoading(false);
    }, [products, categories]);

    // Debounce la recherche
    useEffect(() => {
        const timer = setTimeout(() => {
            if (query) {
                runSearch(query);
            } else {
                setResults([]);
            }
        }, 300);
        return () => clearTimeout(timer);
    }, [query, runSearch]);

    // Fermer au clic extérieur
    useEffect(() => {
        const handleClickOutside = (e) => {
            // Pour desktop
            if (window.innerWidth > 768) {
                if (desktopContainerRef.current && !desktopContainerRef.current.contains(e.target)) {
                    setIsOpen(false);
                }
            } else {
                // Pour mobile
                if (mobileContainerRef.current && !mobileContainerRef.current.contains(e.target)) {
                    setIsMobileOpen(false);
                    setQuery('');
                    setResults([]);
                }
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Navigation clavier desktop
    const handleKeyDown = useCallback((e) => {
        if (!isOpen || results.length === 0) return;

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                setHighlighted(prev => Math.min(prev + 1, results.length - 1));
                break;
            case 'ArrowUp':
                e.preventDefault();
                setHighlighted(prev => Math.max(prev - 1, -1));
                break;
            case 'Escape':
                setIsOpen(false);
                inputRef.current?.blur();
                break;
            case 'Enter':
                e.preventDefault();
                if (highlighted >= 0 && results[highlighted]) {
                    handleItemClick(results[highlighted]);
                } else if (query.trim()) {
                    handleSeeAll();
                }
                break;
            default:
                break;
        }
    }, [isOpen, results, highlighted, query]);

    // Navigation clavier mobile
    const handleMobileKeyDown = useCallback((e) => {
        if (!isMobileOpen || results.length === 0) return;

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                setHighlighted(prev => Math.min(prev + 1, results.length - 1));
                break;
            case 'ArrowUp':
                e.preventDefault();
                setHighlighted(prev => Math.max(prev - 1, -1));
                break;
            case 'Escape':
                setIsMobileOpen(false);
                setQuery('');
                setResults([]);
                mobileInputRef.current?.blur();
                break;
            case 'Enter':
                e.preventDefault();
                if (highlighted >= 0 && results[highlighted]) {
                    handleItemClick(results[highlighted]);
                } else if (query.trim()) {
                    handleSeeAll();
                }
                break;
            default:
                break;
        }
    }, [isMobileOpen, results, highlighted, query]);

    const handleItemClick = useCallback((item) => {
        saveRecentSearch(item.text);
        if (item.type === 'product') {
            navigate(`/product/${item.id}`);
        } else if (item.type === 'category') {
            navigate(`/catalogue?category=${item.slug || item.id}`);
        }
        setQuery('');
        setIsOpen(false);
        setIsMobileOpen(false);
        setHighlighted(-1);
    }, [navigate, saveRecentSearch]);

    const handleRecentClick = useCallback((term) => {
        setQuery(term);
        runSearch(term);
        if (window.innerWidth <= 768) {
            setIsMobileOpen(true);
        } else {
            setIsOpen(true);
        }
        setHighlighted(-1);
    }, [runSearch]);

    const handleSeeAll = useCallback(() => {
        if (query.trim()) {
            saveRecentSearch(query);
            navigate(`/catalogue?search=${encodeURIComponent(query)}`);
            setIsOpen(false);
            setIsMobileOpen(false);
            setQuery('');
            setHighlighted(-1);
        }
    }, [query, navigate, saveRecentSearch]);

    const openMobileSearch = useCallback(() => {
        setIsMobileOpen(true);
        setHighlighted(-1);
        setTimeout(() => {
            if (mobileInputRef.current) {
                mobileInputRef.current.focus();
            }
        }, 100);
    }, []);

    const closeMobileSearch = useCallback(() => {
        setIsMobileOpen(false);
        setQuery('');
        setResults([]);
        setHighlighted(-1);
    }, []);

    const formatPrice = useCallback((price) => {
        return new Intl.NumberFormat('fr-MG').format(price) + ' Ar';
    }, []);

    const highlightText = useCallback((text, searchQuery) => {
        if (!searchQuery?.trim() || !text) return text;
        const parts = text.split(new RegExp(`(${searchQuery})`, 'gi'));
        return parts.map((part, i) =>
            part?.toLowerCase() === searchQuery.toLowerCase()
                ? <mark key={i} className="highlight">{part}</mark>
                : part
        );
    }, []);

    const popularProducts = [...products]
        .sort((a, b) => (b.reviews_count || 0) - (a.reviews_count || 0))
        .slice(0, 6);

    const renderSearchContent = useCallback(() => {
        if (isLoading) {
            return (
                <div className="search-loading">
                    <div className="loading-spinner"></div>
                    <span>Recherche en cours...</span>
                </div>
            );
        }

        if (query.trim() && results.length > 0) {
            return (
                <>
                    <div className="section-header">— Suggestions ({results.length})</div>
                    {results.map((item, idx) => (
                        <div
                            key={`${item.type}-${item.id}`}
                            className={`result-item ${highlighted === idx ? 'hovered' : ''}`}
                            onClick={() => handleItemClick(item)}
                            onMouseEnter={() => setHighlighted(idx)}
                        >
                            <div className="item-icon">
                                <span className="material-symbols-outlined">
                                    {item.type === 'product' ? 'inventory_2' : 'category'}
                                </span>
                            </div>
                            <div className="item-content">
                                <div className="item-title">{highlightText(item.text, query)}</div>
                                {item.type === 'product' && (
                                    <div className="item-meta">
                                        <span className="category-badge">{item.category}</span>
                                        {item.description && (
                                            <span className="item-description">{item.description.substring(0, 60)}...</span>
                                        )}
                                    </div>
                                )}
                                {item.type === 'category' && (
                                    <div className="item-meta">
                                        <span className="category-count">{item.productCount} produits</span>
                                    </div>
                                )}
                            </div>
                            {item.type === 'product' && (
                                <div className="item-price">
                                    <div className="price-value">{formatPrice(item.price)}</div>
                                </div>
                            )}
                        </div>
                    ))}
                    <div className="dropdown-footer">
                        <div className="footer-hints">
                            <span><span className="key-hint">↑↓</span> naviguer</span>
                            <span><span className="key-hint">↵</span> sélectionner</span>
                            <span><span className="key-hint">ESC</span> fermer</span>
                        </div>
                        <button className="see-all-btn" onClick={handleSeeAll}>
                            Voir tout ({results.length}) →
                        </button>
                    </div>
                </>
            );
        }

        if (query.trim() && results.length === 0 && !isLoading) {
            return (
                <div className="search-empty">
                    <div className="empty-icon">🔍</div>
                    <div className="empty-title">Aucun résultat pour "{query}"</div>
                    <div className="empty-sub">Essayez un autre terme</div>
                </div>
            );
        }

        return (
            <>
                {recentSearches.length > 0 && (
                    <>
                        <div className="section-header">— Recherches récentes</div>
                        <div className="recent-list">
                            {recentSearches.map(term => (
                                <button key={term} className="recent-chip" onClick={() => handleRecentClick(term)}>
                                    <span className="material-symbols-outlined">history</span>
                                    {term}
                                </button>
                            ))}
                        </div>
                    </>
                )}

                {popularProducts.length > 0 && (
                    <div className="suggestions-section">
                        <div className="section-header">— Produits populaires</div>
                        <div className="suggestions-grid">
                            {popularProducts.map(product => (
                                <div key={product.id} className="suggestion-card" onClick={() => {
                                    saveRecentSearch(product.name);
                                    navigate(`/product/${product.id}`);
                                    setIsMobileOpen(false);
                                }}>
                                    <div className="suggestion-category">{product.category}</div>
                                    <div className="suggestion-name">{product.name}</div>
                                    <div className="suggestion-price">{formatPrice(product.price)}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </>
        );
    }, [query, results, highlighted, isLoading, recentSearches, popularProducts, formatPrice, highlightText, handleItemClick, handleRecentClick, handleSeeAll, saveRecentSearch, navigate]);

    return (
        <>
            {/* Desktop Search Bar */}
            <div className="search-bar-container desktop-search-bar" ref={desktopContainerRef}>
                <div className={`search-wrapper ${isOpen ? 'focused' : ''}`}>
                    <span className="search-icon">
                        <span className="material-symbols-outlined">search</span>
                    </span>
                    <input
                        ref={inputRef}
                        type="text"
                        className="search-input"
                        placeholder="RECHERCHER..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onFocus={() => setIsOpen(true)}
                        onKeyDown={handleKeyDown}
                        autoComplete="off"
                    />
                    {query && (
                        <button
                            className="clear-btn"
                            onClick={() => {
                                setQuery('');
                                setResults([]);
                                setHighlighted(-1);
                                inputRef.current?.focus();
                            }}
                        >
                            <span className="material-symbols-outlined">close</span>
                        </button>
                    )}
                </div>

                {isOpen && (
                    <div className="search-dropdown">
                        {renderSearchContent()}
                    </div>
                )}
            </div>

            {/* Mobile Search Button */}
            <button className="mobile-search-trigger" onClick={openMobileSearch} aria-label="Rechercher">
                <span className="material-symbols-outlined">search</span>
            </button>

            {/* Mobile Search Dropdown */}
            {isMobileOpen && (
                <div className="mobile-search-dropdown" ref={mobileContainerRef}>
                    <div className="mobile-search-header">
                        <div className="mobile-search-input-wrapper">
                            <span className="search-icon">
                                <span className="material-symbols-outlined">search</span>
                            </span>
                            <input
                                ref={mobileInputRef}
                                type="text"
                                className="mobile-search-input"
                                placeholder="Rechercher un produit..."
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                onKeyDown={handleMobileKeyDown}
                                autoComplete="off"
                            />
                            <button className="close-mobile-search" onClick={closeMobileSearch}>
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>
                    </div>
                    <div className="mobile-search-content">
                        {renderSearchContent()}
                    </div>
                </div>
            )}

            {/* Overlay pour mobile */}
            {isMobileOpen && (
                <div className="mobile-search-overlay" onClick={closeMobileSearch}></div>
            )}
        </>
    );
};

export default SearchBar;