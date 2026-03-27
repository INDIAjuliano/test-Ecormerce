import { useEffect, useMemo, useState } from 'react'
import { getCategories, getProducts } from '../services/mockApi'
import ProductCard from '../components/ProductCard'
import './CatalogPage.css'

export default function CatalogPage() {
    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])
    const [selectedCategory, setSelectedCategory] = useState('')
    const [priceRange, setPriceRange] = useState({ min: 0, max: 2000000 }) // Valeur par défaut
    const [globalMinPrice, setGlobalMinPrice] = useState(0)
    const [globalMaxPrice, setGlobalMaxPrice] = useState(2000000)
    const [sortBy, setSortBy] = useState('default')
    const [visibleProducts, setVisibleProducts] = useState(6)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            console.log('Début du chargement du catalogue...')
            try {
                const productsData = await getProducts()
                const categoriesData = await getCategories()

                // Calculer les prix min et max globaux
                const prices = productsData.map(p => p.price)
                const minGlobal = Math.min(...prices)
                const maxGlobal = Math.max(...prices)

                setGlobalMinPrice(minGlobal)
                setGlobalMaxPrice(maxGlobal)
                setPriceRange({ min: minGlobal, max: maxGlobal })

                console.log('PRODUITS CHARGÉS:', productsData)
                console.log(`Nombre total de produits: ${productsData.length}`)

                // Afficher chaque produit avec ses détails
                console.group('📋 LISTE DÉTAILLÉE DES PRODUITS')
                productsData.forEach((product, index) => {
                    console.log(`\n${index + 1}. ${product.name}`)
                    console.log(`   ID: ${product.id}`)
                    console.log(`   SKU: ${product.sku}`)
                    console.log(`   Catégorie: ${product.category}`)
                    console.log(`   Prix: ${product.price.toLocaleString()} ${product.currency}`)
                    console.log(`   Stock: ${product.stock} ${product.unit}`)
                    console.log(`   Note: ${product.rating}/5 (${product.reviews_count} avis)`)
                    console.log(`   En vedette: ${product.featured ? '⭐ Oui' : '❌ Non'}`)
                    console.log(`   Haute charge: ${product.high_load_rated ? '✅ Oui' : '❌ Non'}`)
                })
                console.groupEnd()

                // Afficher les catégories
                console.log('🏷️ CATÉGORIES CHARGÉES:', categoriesData)
                console.log(`📊 Nombre de catégories: ${categoriesData.length}`)

                // Statistiques par catégorie
                console.group('📊 STATISTIQUES PAR CATÉGORIE')
                const statsByCategory = {}
                productsData.forEach(product => {
                    if (!statsByCategory[product.category]) {
                        statsByCategory[product.category] = {
                            count: 0,
                            totalValue: 0,
                            products: []
                        }
                    }
                    statsByCategory[product.category].count++
                    statsByCategory[product.category].totalValue += product.price
                    statsByCategory[product.category].products.push(product.name)
                })

                Object.entries(statsByCategory).forEach(([category, stats]) => {
                    console.log(`\n📌 ${category}:`)
                    console.log(`   Nombre de produits: ${stats.count}`)
                    console.log(`   Valeur totale du stock: ${stats.totalValue.toLocaleString()} MGA`)
                    console.log(`   Prix moyen: ${Math.round(stats.totalValue / stats.count).toLocaleString()} MGA`)
                })
                console.groupEnd()

                // Produits en vedette
                const featuredProducts = productsData.filter(p => p.featured)
                console.log('⭐ PRODUITS EN VEDETTE:', featuredProducts.length)
                featuredProducts.forEach(product => {
                    console.log(`   - ${product.name} (${product.price.toLocaleString()} ${product.currency})`)
                })

                setProducts(productsData)
                setCategories(categoriesData)
            } catch (error) {
                console.error('Error fetching data:', error)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [])

    useEffect(() => {
        if (products.length > 0) {
            console.log(`Mise à jour des produits: ${products.length} produits disponibles`)
        }
    }, [products])

    // Get category counts
    const getCategoryCount = (categoryName) => {
        return products.filter(p => p.category === categoryName).length
    }

    // Gestion du slider de prix
    const handlePriceSliderChange = (e, type) => {
        const value = Number(e.target.value)
        if (type === 'min') {
            setPriceRange(prev => ({ ...prev, min: value }))
        } else {
            setPriceRange(prev => ({ ...prev, max: value }))
        }
        setVisibleProducts(6)
    }

    // Formater le prix pour l'affichage
    const formatPriceForDisplay = (price) => {
        return new Intl.NumberFormat('fr-MG').format(price) + ' Ar'
    }

    // Filter and sort products
    const filteredProducts = useMemo(() => {
        let filtered = products.filter((product) => {
            const categoryMatch = selectedCategory === '' || product.category === selectedCategory
            const priceMatch = product.price >= priceRange.min && product.price <= priceRange.max
            return categoryMatch && priceMatch
        })

        // Log des résultats de filtrage
        console.log(`   Filtre catégorie: ${selectedCategory || 'Toutes'}`)
        console.log(`   Filtre prix: ${formatPriceForDisplay(priceRange.min)} - ${formatPriceForDisplay(priceRange.max)}`)
        console.log(`   Produits après filtrage: ${filtered.length}`)

        // Apply sorting
        let sorted = [...filtered]
        switch (sortBy) {
            case 'price-asc':
                sorted.sort((a, b) => a.price - b.price)
                console.log(`   Tri: Prix croissant`)
                break
            case 'price-desc':
                sorted.sort((a, b) => b.price - a.price)
                console.log(`   Tri: Prix décroissant`)
                break
            case 'name-asc':
                sorted.sort((a, b) => a.name.localeCompare(b.name))
                console.log(`   Tri: Nom A-Z`)
                break
            case 'name-desc':
                sorted.sort((a, b) => b.name.localeCompare(a.name))
                console.log(`   Tri: Nom Z-A`)
                break
            default:
                console.log(`   Tri: Par défaut`)
        }

        return sorted
    }, [products, selectedCategory, priceRange, sortBy])

    // Pagination
    const displayedProducts = useMemo(() => {
        return filteredProducts.slice(0, visibleProducts)
    }, [filteredProducts, visibleProducts])

    const hasMoreProducts = visibleProducts < filteredProducts.length

    const loadMoreProducts = () => {
        setVisibleProducts(prev => prev + 6)
    }

    const handleCategorySelect = (category) => {
        setSelectedCategory(category === selectedCategory ? '' : category)
        setVisibleProducts(6)
    }

    const handleApplyFilters = () => {
        setVisibleProducts(6)
    }

    const handleResetFilters = () => {
        console.log('Réinitialisation de tous les filtres')
        setSelectedCategory('')
        setPriceRange({ min: globalMinPrice, max: globalMaxPrice })
        setSortBy('default')
        setVisibleProducts(6)
    }

    if (loading) {
        return (
            <div className="main-layout">
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p>Chargement du catalogue...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="container main-layout">
            <aside className="sidebar">
                <div className="sidebar-sticky">
                    <div className="filter-section">
                        <h3 className="filter-title">Catégories</h3>
                        <ul className="category-list">
                            <li className="category-item">
                                <button
                                    className={`category-btn ${selectedCategory === '' ? 'active' : ''}`}
                                    onClick={() => handleCategorySelect('')}
                                >
                                    <span className="category-name">Tous les produits</span>
                                    <span className="category-count">{products.length}</span>
                                </button>
                            </li>
                            {categories.map((category) => (
                                <li key={category.id} className="category-item">
                                    <button
                                        className={`category-btn ${selectedCategory === category.name ? 'active' : ''}`}
                                        onClick={() => handleCategorySelect(category.name)}
                                    >
                                        <span className="category-name">{category.name}</span>
                                        <span className="category-count">{getCategoryCount(category.name)}</span>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="filter-section">
                        <div className="price-header">
                            <h3 className="price-label">Prix (MGA)</h3>
                            <span className="price-value">
                                {formatPriceForDisplay(priceRange.min)} - {formatPriceForDisplay(priceRange.max)}
                            </span>
                        </div>

                        {/* Slider de prix avec deux poignées */}
                        <div className="price-slider-container">
                            <div className="price-slider-track">
                                <div
                                    className="price-slider-fill"
                                    style={{
                                        left: `${((priceRange.min - globalMinPrice) / (globalMaxPrice - globalMinPrice)) * 100}%`,
                                        right: `${((globalMaxPrice - priceRange.max) / (globalMaxPrice - globalMinPrice)) * 100}%`
                                    }}
                                />
                            </div>
                            <input
                                type="range"
                                className="price-slider-input price-slider-min"
                                min={globalMinPrice}
                                max={globalMaxPrice}
                                value={priceRange.min}
                                onChange={(e) => handlePriceSliderChange(e, 'min')}
                                step={Math.ceil((globalMaxPrice - globalMinPrice) / 100)}
                            />
                            <input
                                type="range"
                                className="price-slider-input price-slider-max"
                                min={globalMinPrice}
                                max={globalMaxPrice}
                                value={priceRange.max}
                                onChange={(e) => handlePriceSliderChange(e, 'max')}
                                step={Math.ceil((globalMaxPrice - globalMinPrice) / 100)}
                            />
                        </div>

                        <div className="price-inputs">
                            <div className="price-input-group">
                                <span className="price-input-label">Min</span>
                                <input
                                    type="number"
                                    className="price-input"
                                    value={priceRange.min}
                                    onChange={(e) => {
                                        let value = Number(e.target.value)
                                        if (isNaN(value)) value = globalMinPrice
                                        if (value >= globalMinPrice && value <= priceRange.max) {
                                            setPriceRange(prev => ({ ...prev, min: value }))
                                            setVisibleProducts(6)
                                        }
                                    }}
                                    step={1000}
                                />
                            </div>
                            <div className="price-input-group">
                                <span className="price-input-label">Max</span>
                                <input
                                    type="number"
                                    className="price-input"
                                    value={priceRange.max}
                                    onChange={(e) => {
                                        let value = Number(e.target.value)
                                        if (isNaN(value)) value = globalMaxPrice
                                        if (value <= globalMaxPrice && value >= priceRange.min) {
                                            setPriceRange(prev => ({ ...prev, max: value }))
                                            setVisibleProducts(6)
                                        }
                                    }}
                                    step={1000}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="filter-actions">
                        <button className="apply-btn" onClick={handleApplyFilters}>
                            <span className="material-symbols-outlined">filter_alt</span>
                            Appliquer les filtres
                        </button>
                        <button className="reset-btn" onClick={handleResetFilters}>
                            <span className="material-symbols-outlined">refresh</span>
                            Réinitialiser
                        </button>
                    </div>
                </div>
            </aside>

            <main className="main-content">
                <div className="section-header">
                    <div>
                        <span className="section-badge">Catalogue</span>
                        <h1 className="section-title">Matériaux de<br />Construction</h1>
                        <p className="results-count">{filteredProducts.length} produit(s) trouvé(s)</p>
                    </div>
                    <div className="sort-section">
                        <span className="sort-label">Trier par :</span>
                        <select
                            className="sort-select"
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                        >
                            <option value="default">Par défaut</option>
                            <option value="price-asc">Prix croissant</option>
                            <option value="price-desc">Prix décroissant</option>
                            <option value="name-asc">Nom A-Z</option>
                            <option value="name-desc">Nom Z-A</option>
                        </select>
                    </div>
                </div>

                {filteredProducts.length === 0 ? (
                    <div className="no-results">
                        <span className="material-symbols-outlined">inventory</span>
                        <h3>Aucun produit trouvé</h3>
                        <p>Essayez d'ajuster vos filtres</p>
                        <button className="reset-filters-btn" onClick={handleResetFilters}>
                            Effacer tous les filtres
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="products-grid">
                            {displayedProducts.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>

                        {hasMoreProducts && (
                            <div className="load-more">
                                <button className="load-more-btn" onClick={loadMoreProducts}>
                                    Charger plus ({filteredProducts.length - visibleProducts} restants)
                                </button>
                            </div>
                        )}

                        {!hasMoreProducts && filteredProducts.length > 6 && (
                            <div className="load-more">
                                <p className="end-message">Fin du catalogue</p>
                            </div>
                        )}
                    </>
                )}
            </main>
        </div>
    )
}