import React, { useState, useEffect, useRef, useCallback } from 'react';

// ─── Mock Data ────────────────────────────────────────────────────────────────
const MOCK_PRODUCTS = [
    { id: 1, name: 'Béton Haute Performance', category: 'Matériaux', price: 12500, unit: 'tonne', badge: 'NOUVEAU', description: 'Béton C40/50 pour structures exigeantes' },
    { id: 2, name: 'Acier Laminé HEA 200', category: 'Charpente', price: 87000, unit: 'm', badge: 'STOCK', description: 'Profilé HEA en acier S275' },
    { id: 3, name: 'Parpaing Creux 20x20x50', category: 'Maçonnerie', price: 850, unit: 'unité', badge: null, description: 'Bloc béton standard pour murs porteurs' },
    { id: 4, name: 'Enduit de Façade Premium', category: 'Finition', price: 3200, unit: 'sac 25kg', badge: 'PROMO', description: 'Enduit monocouche hydrofuge' },
    { id: 5, name: 'Poutre IPE 300', category: 'Charpente', price: 62000, unit: 'm', badge: null, description: 'Poutre en I pour planchers mixtes' },
    { id: 6, name: 'Isolant Laine de Roche 100mm', category: 'Isolation', price: 1800, unit: 'm²', badge: 'ECO', description: 'Isolation thermique et acoustique' },
    { id: 7, name: 'Treillis Soudé ST25', category: 'Ferraillage', price: 4500, unit: 'panneau', badge: null, description: 'Armature pour dalles et chapes' },
    { id: 8, name: 'Colle Carrelage Flex C2', category: 'Finition', price: 1200, unit: 'sac 25kg', badge: null, description: 'Mortier-colle pour grands formats' },
    { id: 9, name: 'Plaque de Plâtre BA13', category: 'Cloisons', price: 980, unit: 'plaque', badge: null, description: 'Plaque standard pour cloisons légères' },
    { id: 10, name: 'Gravier Concassé 5/25', category: 'Granulats', price: 4200, unit: 'tonne', badge: null, description: 'Granulat pour fondations et béton' },
];

const CONTACT_INFO = [
    { id: 'c1', type: 'contact', label: 'Adresse principale', value: 'Zone Industrielle Ivato, Antananarivo 101, Madagascar', icon: '📍' },
    { id: 'c2', type: 'contact', label: 'Téléphone', value: '+261 20 22 XXX XX', icon: '📞' },
    { id: 'c3', type: 'contact', label: 'Email commercial', value: 'commercial@constructspec.mg', icon: '✉️' },
    { id: 'c4', type: 'contact', label: 'Horaires', value: 'Lun–Ven 7h30–17h00 · Sam 8h00–12h00', icon: '🕐' },
    { id: 'c5', type: 'contact', label: 'Service technique', value: 'technique@constructspec.mg', icon: '🔧' },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
const formatPrice = (price) =>
    new Intl.NumberFormat('fr-MG', { style: 'currency', currency: 'MGA', maximumFractionDigits: 0 })
        .format(price).replace('MGA', 'Ar');

const highlight = (text, query) => {
    if (!query.trim()) return text;
    const parts = text.split(new RegExp(`(${query.trim()})`, 'gi'));
    return parts.map((p, i) =>
        p.toLowerCase() === query.toLowerCase()
            ? <mark key={i}>{p}</mark>
            : p
    );
};

// ─── Category pill colors ─────────────────────────────────────────────────────
const CAT_COLORS = {
    Matériaux: '#4a626d',
    Charpente: '#1a1c1c',
    Maçonnerie: '#594238',
    Finition: '#6b4a3e',
    Isolation: '#3d6659',
    Ferraillage: '#5a3d5a',
    Granulats: '#7a5c3d',
    Cloisons: '#3d4a6b',
};

// ─── SearchBar Component ──────────────────────────────────────────────────────
const SearchBar = () => {
    const [query, setQuery] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [results, setResults] = useState({ products: [], contacts: [] });
    const [activeTab, setActiveTab] = useState('all');
    const [highlighted, setHighlighted] = useState(-1);
    const [recentSearches, setRecentSearches] = useState(['Béton', 'Acier', 'Isolant']);
    const inputRef = useRef(null);
    const containerRef = useRef(null);

    // ── Search logic ──────────────────────────────────────────────────────────
    const runSearch = useCallback((q) => {
        if (!q.trim()) {
            setResults({ products: [], contacts: [] });
            return;
        }
        const lower = q.toLowerCase();
        const products = MOCK_PRODUCTS.filter(p =>
            p.name.toLowerCase().includes(lower) ||
            p.category.toLowerCase().includes(lower) ||
            p.description.toLowerCase().includes(lower)
        ).slice(0, 6);

        const contacts = CONTACT_INFO.filter(c =>
            c.label.toLowerCase().includes(lower) ||
            c.value.toLowerCase().includes(lower)
        );

        setResults({ products, contacts });
    }, []);

    useEffect(() => {
        const t = setTimeout(() => runSearch(query), 150);
        return () => clearTimeout(t);
    }, [query, runSearch]);

    // ── Outside click ─────────────────────────────────────────────────────────
    useEffect(() => {
        const handler = (e) => {
            if (containerRef.current && !containerRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    // ── Keyboard nav ──────────────────────────────────────────────────────────
    const allItems = [...results.products, ...results.contacts];
    const handleKeyDown = (e) => {
        if (!isOpen) return;
        if (e.key === 'ArrowDown') { e.preventDefault(); setHighlighted(h => Math.min(h + 1, allItems.length - 1)); }
        if (e.key === 'ArrowUp') { e.preventDefault(); setHighlighted(h => Math.max(h - 1, -1)); }
        if (e.key === 'Escape') { setIsOpen(false); inputRef.current?.blur(); }
        if (e.key === 'Enter' && highlighted >= 0) {
            const item = allItems[highlighted];
            if (item.type === 'contact') return;
            handleProductClick(item);
        }
    };

    const handleProductClick = (product) => {
        setRecentSearches(prev => {
            const updated = [product.name, ...prev.filter(s => s !== product.name)].slice(0, 4);
            return updated;
        });
        setQuery(product.name);
        setIsOpen(false);
        window.location.href = `/catalogue?search=${encodeURIComponent(product.name)}`;
    };

    const handleRecentClick = (term) => {
        setQuery(term);
        runSearch(term);
        setIsOpen(true);
        inputRef.current?.focus();
    };

    const totalResults = results.products.length + results.contacts.length;
    const showEmpty = query.trim() && totalResults === 0;
    const showDropdown = isOpen;

    // ── Filtered by tab ───────────────────────────────────────────────────────
    const visibleProducts = activeTab === 'contacts' ? [] : results.products;
    const visibleContacts = activeTab === 'products' ? [] : results.contacts;

    return (
        <div className="cs-search-root" ref={containerRef}>
            <style>{`
        /* ── Reset & Root ── */
        .cs-search-root {
          position: relative;
          width: 100%;
          max-width: 680px;
          margin: 0 auto;
          font-family: 'Work Sans', 'Segoe UI', sans-serif;
        }

        /* ── Input wrapper ── */
        .cs-search-wrapper {
          display: flex;
          align-items: center;
          background: #1a1c1c;
          border: 2px solid transparent;
          border-radius: 2px;
          overflow: hidden;
          transition: border-color .2s, box-shadow .2s;
        }
        .cs-search-wrapper.focused {
          border-color: #a23f00;
          box-shadow: 0 0 0 4px rgba(162,63,0,.15);
        }

        .cs-search-icon {
          padding: 0 1rem 0 1.2rem;
          color: #8c7166;
          display: flex;
          align-items: center;
          font-size: 1.2rem;
        }

        .cs-search-input {
          flex: 1;
          background: transparent;
          border: none;
          outline: none;
          color: #f9f9f9;
          font-family: 'Work Sans', sans-serif;
          font-size: .95rem;
          font-weight: 600;
          letter-spacing: .05em;
          padding: .95rem 0;
        }
        .cs-search-input::placeholder { color: #594238; }

        .cs-kbd {
          display: flex;
          align-items: center;
          gap: .3rem;
          padding: 0 1rem;
          color: #594238;
          font-size: .65rem;
          font-weight: 700;
          letter-spacing: .1em;
        }
        @media (max-width: 480px) { .cs-kbd { display: none; } }

        .cs-clear-btn {
          background: none;
          border: none;
          cursor: pointer;
          color: #594238;
          padding: 0 .8rem;
          font-size: 1.1rem;
          display: flex;
          align-items: center;
          transition: color .2s;
        }
        .cs-clear-btn:hover { color: #f9f9f9; }

        /* ── Dropdown ── */
        .cs-dropdown {
          position: absolute;
          top: calc(100% + 8px);
          left: 0; right: 0;
          background: #1a1c1c;
          border: 1px solid #2e2e2e;
          border-radius: 2px;
          box-shadow: 0 24px 48px rgba(0,0,0,.5);
          z-index: 9999;
          overflow: hidden;
          animation: cs-drop-in .18s ease;
        }
        @keyframes cs-drop-in {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ── Tabs ── */
        .cs-tabs {
          display: flex;
          border-bottom: 1px solid #2e2e2e;
          background: #111212;
        }
        .cs-tab {
          flex: 1;
          padding: .65rem;
          background: none;
          border: none;
          cursor: pointer;
          font-family: 'Work Sans', sans-serif;
          font-size: .68rem;
          font-weight: 700;
          letter-spacing: .15em;
          text-transform: uppercase;
          color: #594238;
          transition: color .2s, border-bottom .2s;
          border-bottom: 2px solid transparent;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: .4rem;
        }
        .cs-tab.active {
          color: #a23f00;
          border-bottom-color: #a23f00;
        }
        .cs-tab-count {
          background: #a23f00;
          color: #fff;
          font-size: .58rem;
          padding: .1rem .4rem;
          border-radius: 20px;
        }

        /* ── Section header ── */
        .cs-section-label {
          padding: .8rem 1.2rem .4rem;
          font-size: .6rem;
          font-weight: 900;
          letter-spacing: .25em;
          text-transform: uppercase;
          color: #4a4a4a;
        }

        /* ── Product row ── */
        .cs-product-row {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: .75rem 1.2rem;
          cursor: pointer;
          transition: background .15s;
          border-left: 3px solid transparent;
        }
        .cs-product-row:hover,
        .cs-product-row.hovered {
          background: #222424;
          border-left-color: #a23f00;
        }

        .cs-product-img {
          width: 44px;
          height: 44px;
          background: #2e2e2e;
          border-radius: 2px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.3rem;
          flex-shrink: 0;
        }

        .cs-product-info { flex: 1; min-width: 0; }
        .cs-product-name {
          font-size: .88rem;
          font-weight: 700;
          color: #f0ece8;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .cs-product-name mark {
          background: transparent;
          color: #a23f00;
          font-weight: 900;
        }
        .cs-product-meta {
          display: flex;
          align-items: center;
          gap: .5rem;
          margin-top: .2rem;
        }
        .cs-product-cat {
          font-size: .62rem;
          font-weight: 700;
          letter-spacing: .12em;
          text-transform: uppercase;
          padding: .15rem .5rem;
          border-radius: 2px;
          color: #fff;
        }
        .cs-product-desc {
          font-size: .7rem;
          color: #594238;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 220px;
        }

        .cs-product-price {
          text-align: right;
          flex-shrink: 0;
        }
        .cs-price-val {
          font-size: .85rem;
          font-weight: 900;
          color: #a23f00;
        }
        .cs-price-unit {
          font-size: .6rem;
          color: #594238;
          margin-top: .1rem;
        }
        .cs-product-badge {
          background: #a23f00;
          color: #fff;
          font-size: .55rem;
          font-weight: 900;
          letter-spacing: .1em;
          padding: .15rem .4rem;
          border-radius: 2px;
          margin-top: .3rem;
          display: inline-block;
        }
        .cs-product-badge.PROMO { background: #c8a000; }
        .cs-product-badge.ECO   { background: #3d7a5c; }

        /* ── Contact row ── */
        .cs-contact-row {
          display: flex;
          align-items: center;
          gap: .9rem;
          padding: .7rem 1.2rem;
          cursor: default;
          transition: background .15s;
        }
        .cs-contact-row:hover { background: #1e2020; }
        .cs-contact-emoji {
          width: 36px;
          height: 36px;
          background: #222424;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1rem;
          flex-shrink: 0;
        }
        .cs-contact-label {
          font-size: .65rem;
          font-weight: 700;
          letter-spacing: .12em;
          text-transform: uppercase;
          color: #594238;
        }
        .cs-contact-value {
          font-size: .8rem;
          font-weight: 600;
          color: #c4b8b0;
          margin-top: .15rem;
        }
        .cs-contact-value mark {
          background: transparent;
          color: #a23f00;
          font-weight: 900;
        }

        /* ── Recent ── */
        .cs-recent-list {
          display: flex;
          flex-wrap: wrap;
          gap: .5rem;
          padding: 1rem 1.2rem;
        }
        .cs-recent-chip {
          background: #222424;
          border: 1px solid #2e2e2e;
          border-radius: 2px;
          padding: .4rem .9rem;
          font-size: .7rem;
          font-weight: 700;
          letter-spacing: .1em;
          text-transform: uppercase;
          color: #8c7166;
          cursor: pointer;
          transition: all .2s;
          display: flex;
          align-items: center;
          gap: .4rem;
        }
        .cs-recent-chip:hover {
          background: #a23f00;
          border-color: #a23f00;
          color: #fff;
        }

        /* ── Suggestions ── */
        .cs-suggestions {
          padding: .8rem 1.2rem 1rem;
        }
        .cs-suggestion-label {
          font-size: .6rem;
          font-weight: 900;
          letter-spacing: .25em;
          text-transform: uppercase;
          color: #4a4a4a;
          margin-bottom: .7rem;
        }
        .cs-suggestion-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: .5rem;
        }
        @media (max-width: 480px) {
          .cs-suggestion-grid { grid-template-columns: repeat(2, 1fr); }
        }
        .cs-suggestion-card {
          background: #222424;
          border: 1px solid #2e2e2e;
          border-radius: 2px;
          padding: .7rem;
          cursor: pointer;
          transition: all .2s;
        }
        .cs-suggestion-card:hover {
          border-color: #a23f00;
          background: #2a1e18;
          transform: translateY(-2px);
        }
        .cs-sug-cat {
          font-size: .58rem;
          font-weight: 900;
          letter-spacing: .15em;
          text-transform: uppercase;
          color: #594238;
          margin-bottom: .3rem;
        }
        .cs-sug-name {
          font-size: .78rem;
          font-weight: 700;
          color: #d4c8c0;
          line-height: 1.3;
        }
        .cs-sug-price {
          font-size: .75rem;
          font-weight: 900;
          color: #a23f00;
          margin-top: .4rem;
        }

        /* ── Footer ── */
        .cs-dropdown-footer {
          border-top: 1px solid #2e2e2e;
          padding: .65rem 1.2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: #111212;
        }
        .cs-footer-hint {
          font-size: .62rem;
          color: #3a3a3a;
          font-weight: 700;
          letter-spacing: .08em;
          display: flex;
          gap: .8rem;
        }
        .cs-footer-hint span {
          display: flex;
          align-items: center;
          gap: .3rem;
        }
        .cs-kbd-key {
          background: #2a2a2a;
          border: 1px solid #3a3a3a;
          border-radius: 2px;
          padding: .1rem .35rem;
          font-size: .6rem;
          color: #5a5a5a;
        }
        .cs-see-all {
          font-size: .65rem;
          font-weight: 900;
          letter-spacing: .15em;
          text-transform: uppercase;
          color: #a23f00;
          text-decoration: none;
          cursor: pointer;
          background: none;
          border: none;
          display: flex;
          align-items: center;
          gap: .3rem;
          transition: color .2s;
        }
        .cs-see-all:hover { color: #d45a00; }

        /* ── Empty ── */
        .cs-empty {
          padding: 2.5rem 1.2rem;
          text-align: center;
          color: #594238;
        }
        .cs-empty-icon { font-size: 2.5rem; margin-bottom: .5rem; }
        .cs-empty-title {
          font-size: .85rem;
          font-weight: 700;
          color: #8c7166;
          margin-bottom: .25rem;
        }
        .cs-empty-sub { font-size: .75rem; }
      `}</style>

            {/* ── Input ── */}
            <div className={`cs-search-wrapper ${isOpen ? 'focused' : ''}`}>
                <span className="cs-search-icon">
                    {query ? '🔍' : '⌕'}
                </span>
                <input
                    ref={inputRef}
                    className="cs-search-input"
                    type="text"
                    placeholder="RECHERCHER UN PRODUIT, UNE INFORMATION..."
                    value={query}
                    onChange={e => { setQuery(e.target.value); setIsOpen(true); setHighlighted(-1); }}
                    onFocus={() => setIsOpen(true)}
                    onKeyDown={handleKeyDown}
                    autoComplete="off"
                />
                {!query && (
                    <div className="cs-kbd">
                        <span className="cs-kbd-key">⌘</span>
                        <span className="cs-kbd-key">K</span>
                    </div>
                )}
                {query && (
                    <button className="cs-clear-btn" onClick={() => { setQuery(''); setResults({ products: [], contacts: [] }); inputRef.current?.focus(); }}>
                        ✕
                    </button>
                )}
            </div>

            {/* ── Dropdown ── */}
            {showDropdown && (
                <div className="cs-dropdown">

                    {/* ── Tabs (only when there are results) ── */}
                    {totalResults > 0 && (
                        <div className="cs-tabs">
                            <button className={`cs-tab ${activeTab === 'all' ? 'active' : ''}`} onClick={() => setActiveTab('all')}>
                                Tout {totalResults > 0 && <span className="cs-tab-count">{totalResults}</span>}
                            </button>
                            <button className={`cs-tab ${activeTab === 'products' ? 'active' : ''}`} onClick={() => setActiveTab('products')}>
                                Produits {results.products.length > 0 && <span className="cs-tab-count">{results.products.length}</span>}
                            </button>
                            <button className={`cs-tab ${activeTab === 'contacts' ? 'active' : ''}`} onClick={() => setActiveTab('contacts')}>
                                Contact {results.contacts.length > 0 && <span className="cs-tab-count">{results.contacts.length}</span>}
                            </button>
                        </div>
                    )}

                    {/* ── No results ── */}
                    {showEmpty && (
                        <div className="cs-empty">
                            <div className="cs-empty-icon">◈</div>
                            <div className="cs-empty-title">Aucun résultat pour « {query} »</div>
                            <div className="cs-empty-sub">Essayez un autre terme ou consultez le catalogue complet</div>
                        </div>
                    )}

                    {/* ── Products ── */}
                    {visibleProducts.length > 0 && (
                        <>
                            <div className="cs-section-label">— Produits</div>
                            {visibleProducts.map((p, idx) => (
                                <div
                                    key={p.id}
                                    className={`cs-product-row ${highlighted === idx ? 'hovered' : ''}`}
                                    onClick={() => handleProductClick(p)}
                                    onMouseEnter={() => setHighlighted(idx)}
                                >
                                    <div className="cs-product-img">
                                        {p.category === 'Charpente' ? '🏗️' : p.category === 'Isolation' ? '🧱' : p.category === 'Ferraillage' ? '⚙️' : '📦'}
                                    </div>
                                    <div className="cs-product-info">
                                        <div className="cs-product-name">{highlight(p.name, query)}</div>
                                        <div className="cs-product-meta">
                                            <span className="cs-product-cat" style={{ backgroundColor: CAT_COLORS[p.category] || '#594238' }}>
                                                {p.category}
                                            </span>
                                            <span className="cs-product-desc">{p.description}</span>
                                        </div>
                                        {p.badge && <span className={`cs-product-badge ${p.badge}`}>{p.badge}</span>}
                                    </div>
                                    <div className="cs-product-price">
                                        <div className="cs-price-val">{formatPrice(p.price)}</div>
                                        <div className="cs-price-unit">/{p.unit}</div>
                                    </div>
                                </div>
                            ))}
                        </>
                    )}

                    {/* ── Contacts ── */}
                    {visibleContacts.length > 0 && (
                        <>
                            <div className="cs-section-label">— Informations contact</div>
                            {visibleContacts.map((c, idx) => (
                                <div key={c.id} className="cs-contact-row" onMouseEnter={() => setHighlighted(results.products.length + idx)}>
                                    <div className="cs-contact-emoji">{c.icon}</div>
                                    <div>
                                        <div className="cs-contact-label">{c.label}</div>
                                        <div className="cs-contact-value">{highlight(c.value, query)}</div>
                                    </div>
                                </div>
                            ))}
                        </>
                    )}

                    {/* ── Empty query: recents + suggestions ── */}
                    {!query.trim() && (
                        <>
                            {recentSearches.length > 0 && (
                                <>
                                    <div className="cs-section-label">— Recherches récentes</div>
                                    <div className="cs-recent-list">
                                        {recentSearches.map(term => (
                                            <button key={term} className="cs-recent-chip" onClick={() => handleRecentClick(term)}>
                                                ↩ {term}
                                            </button>
                                        ))}
                                    </div>
                                </>
                            )}

                            <div className="cs-suggestions">
                                <div className="cs-suggestion-label">— Produits populaires</div>
                                <div className="cs-suggestion-grid">
                                    {MOCK_PRODUCTS.slice(0, 6).map(p => (
                                        <div key={p.id} className="cs-suggestion-card" onClick={() => handleProductClick(p)}>
                                            <div className="cs-sug-cat">{p.category}</div>
                                            <div className="cs-sug-name">{p.name}</div>
                                            <div className="cs-sug-price">{formatPrice(p.price)}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </>
                    )}

                    {/* ── Footer ── */}
                    <div className="cs-dropdown-footer">
                        <div className="cs-footer-hint">
                            <span><span className="cs-kbd-key">↑↓</span> naviguer</span>
                            <span><span className="cs-kbd-key">↵</span> sélectionner</span>
                            <span><span className="cs-kbd-key">ESC</span> fermer</span>
                        </div>
                        {query.trim() && totalResults > 0 && (
                            <button className="cs-see-all" onClick={() => { window.location.href = `/catalogue?search=${encodeURIComponent(query)}`; }}>
                                Voir tout ({totalResults}) →
                            </button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default SearchBar;