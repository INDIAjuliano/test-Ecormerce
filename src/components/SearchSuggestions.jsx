// src/components/SearchSuggestions.jsx
import React, { useState, useEffect, useRef } from 'react';
import './SearchSuggestions.css';

const SearchSuggestions = ({
    searchQuery,
    onSelectSuggestion,
    products,
    isOpen,
    onClose
}) => {
    const [suggestions, setSuggestions] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const suggestionsRef = useRef(null);

    useEffect(() => {
        if (searchQuery.trim().length > 0) {
            generateSuggestions();
        } else {
            setSuggestions([]);
        }
    }, [searchQuery, products]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (suggestionsRef.current && !suggestionsRef.current.contains(event.target)) {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [onClose]);

    const generateSuggestions = () => {
        const query = searchQuery.toLowerCase().trim();

        // Suggestions basées sur les produits
        const productSuggestions = products
            .filter(product =>
                product.name.toLowerCase().includes(query) ||
                product.description?.toLowerCase().includes(query)
            )
            .slice(0, 5)
            .map(product => ({
                type: 'product',
                text: product.name,
                id: product.id,
                price: product.price,
                image: product.image
            }));

        // Suggestions basées sur les catégories (si disponible)
        const categorySuggestions = [];
        if (window.categories) {
            const matchingCategories = window.categories
                .filter(cat => cat.name.toLowerCase().includes(query))
                .slice(0, 2)
                .map(cat => ({
                    type: 'category',
                    text: cat.name,
                    id: cat.id
                }));
            categorySuggestions.push(...matchingCategories);
        }

        // Suggestions populaires (tendances)
        const popularSuggestions = getPopularSuggestions(query);

        setSuggestions([...productSuggestions, ...categorySuggestions, ...popularSuggestions]);
        setSelectedIndex(-1);
    };

    const getPopularSuggestions = (query) => {
        // Vous pouvez personnaliser ces suggestions en fonction de vos produits populaires
        const popular = [
            'Béton', 'Ciment', 'Acier', 'Brique', 'Tuyaux',
            'Étanchéité', 'Isolation', 'Peinture', 'Carrelage'
        ];

        return popular
            .filter(item => item.toLowerCase().includes(query))
            .slice(0, 3)
            .map(item => ({
                type: 'popular',
                text: item
            }));
    };

    const handleKeyDown = (e) => {
        if (!isOpen || suggestions.length === 0) return;

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                setSelectedIndex(prev =>
                    prev < suggestions.length - 1 ? prev + 1 : prev
                );
                break;
            case 'ArrowUp':
                e.preventDefault();
                setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
                break;
            case 'Enter':
                e.preventDefault();
                if (selectedIndex >= 0 && suggestions[selectedIndex]) {
                    handleSelect(suggestions[selectedIndex]);
                }
                break;
            case 'Escape':
                onClose();
                break;
            default:
                break;
        }
    };

    const handleSelect = (suggestion) => {
        onSelectSuggestion(suggestion);
        onClose();
    };

    const highlightMatch = (text, query) => {
        if (!query) return text;

        const parts = text.split(new RegExp(`(${query})`, 'gi'));
        return parts.map((part, i) =>
            part.toLowerCase() === query.toLowerCase() ?
                <mark key={i} className="suggestion-highlight">{part}</mark> :
                part
        );
    };

    if (!isOpen || suggestions.length === 0) return null;

    return (
        <div className="search-suggestions" ref={suggestionsRef}>
            <div className="suggestions-header">
                <span>Suggestions</span>
            </div>
            {suggestions.map((suggestion, index) => (
                <div
                    key={`${suggestion.type}-${suggestion.id || suggestion.text}`}
                    className={`suggestion-item ${index === selectedIndex ? 'selected' : ''}`}
                    onClick={() => handleSelect(suggestion)}
                    onMouseEnter={() => setSelectedIndex(index)}
                >
                    <div className="suggestion-icon">
                        {suggestion.type === 'product' && (
                            <span className="material-symbols-outlined">inventory_2</span>
                        )}
                        {suggestion.type === 'category' && (
                            <span className="material-symbols-outlined">category</span>
                        )}
                        {suggestion.type === 'popular' && (
                            <span className="material-symbols-outlined">trending_up</span>
                        )}
                    </div>
                    <div className="suggestion-content">
                        <div className="suggestion-text">
                            {highlightMatch(suggestion.text, searchQuery)}
                        </div>
                        {suggestion.type === 'product' && suggestion.price && (
                            <div className="suggestion-price">
                                {suggestion.price.toFixed(2)} €
                            </div>
                        )}
                    </div>
                </div>
            ))}
            <div className="suggestions-footer">
                <span>Appuyez sur ↵ pour rechercher</span>
            </div>
        </div>
    );
};

export default SearchSuggestions;