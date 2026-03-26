import { useEffect, useMemo, useState } from 'react'
import { getCategories, getProducts } from '../services/mockApi'
import ProductCard from '../components/ProductCard'
import './CatalogPage.css'

export default function CatalogPage() {
    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])
    const [selectedCategory, setSelectedCategory] = useState('')
    const [maxPrice, setMaxPrice] = useState('')
    const [minPrice, setMinPrice] = useState('')
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
                    console.log(`   Dimensions: ${product.dimensions_available.join(', ')}`)
                    console.log(`   Description: ${product.description.substring(0, 100)}...`)
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
                    console.log(`   Produits: ${stats.products.join(', ')}`)
                })
                console.groupEnd()

                // Produits en vedette
                const featuredProducts = productsData.filter(p => p.featured)
                console.log(' PRODUITS EN VEDETTE:', featuredProducts.length)
                featuredProducts.forEach(product => {
                    console.log(`   - ${product.name} (${product.price.toLocaleString()} ${product.currency})`)
                })

                // Produits haute performance
                const highLoadProducts = productsData.filter(p => p.high_load_rated)
                console.log('🏗️ PRODUITS HAUTE CHARGE:', highLoadProducts.length)
                highLoadProducts.forEach(product => {
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

    // Filter and sort products
    const filteredProducts = useMemo(() => {
        let filtered = products.filter((product) => {
            const categoryMatch = selectedCategory === '' || product.category === selectedCategory
            const priceMatch = maxPrice === '' || product.price <= Number(maxPrice)
            const minPriceMatch = minPrice === '' || product.price >= Number(minPrice)
            return categoryMatch && priceMatch && minPriceMatch
        })

        // Log des résultats de filtrage
        console.log(`   Filtre catégorie: ${selectedCategory || 'Toutes'}`)
        console.log(`   Filtre prix: ${minPrice || '0'} - ${maxPrice || '∞'} MGA`)
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
    }, [products, selectedCategory, maxPrice, minPrice, sortBy])

    // Log quand les produits filtrés changent
    useEffect(() => {
        if (filteredProducts.length > 0) {
            console.log(`📊 Affichage de ${filteredProducts.length} produits après filtrage`)
            console.log('   Produits:', filteredProducts.map(p => `${p.name} (${p.price} MGA)`).join(', '))
        }
    }, [filteredProducts])


    // Pagination
    const displayedProducts = useMemo(() => {
        const displayed = filteredProducts.slice(0, visibleProducts)
        console.log(`📄 Affichage des produits ${visibleProducts > filteredProducts.length ? filteredProducts.length : visibleProducts}/${filteredProducts.length}`)
        return displayed
    }, [filteredProducts, visibleProducts])

    const hasMoreProducts = visibleProducts < filteredProducts.length

    const loadMoreProducts = () => {
        setVisibleProducts(prev => prev + 6)
    }

    const handleCategorySelect = (category) => {
        setSelectedCategory(category === selectedCategory ? '' : category)
        setVisibleProducts(6) // Reset pagination when filter changes
    }

    const handleApplyFilters = () => {
        // Filters are already applied via state
        setVisibleProducts(6)
    }

    const handleResetFilters = () => {
        console.log('Réinitialisation de tous les filtres')
        setSelectedCategory('')
        setMaxPrice('')
        setMinPrice('')
        setSortBy('default')
        setVisibleProducts(6)
    }


    const handlePriceInputChange = (e, type) => {
        let value = e.target.value.replace('$', '').replace(',', '').trim()
        if (type === 'min') {
            setMinPrice(value)
        } else {
            setMaxPrice(value)
        }
        setVisibleProducts(6)
    }

    if (loading) {
        return (
            <div className="main-layout">
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p>Loading inventory...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="container main-layout">
            <aside className="sidebar">
                <div className="sidebar-sticky">
                    <div className="filter-section">
                        <h3 className="filter-title">Product Categories</h3>
                        <ul className="category-list">
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
                            <h3 className="price-label">Price Range</h3>
                            <span className="price-value">
                                ${minPrice || '0'} - ${maxPrice || '5,000+'}
                            </span>
                        </div>
                        <div className="price-slider">
                            <div
                                className="price-slider-fill"
                                style={{
                                    left: `${Math.min(((Number(minPrice) || 0) / 5000) * 100, 100)}%`,
                                    width: `${Math.min(((Number(maxPrice) || 5000) - (Number(minPrice) || 0)) / 5000 * 100, 100 - (((Number(minPrice) || 0) / 5000) * 100))}%`
                                }}
                            ></div>
                        </div>
                        <div className="price-inputs">
                            <input
                                type="text"
                                className="price-input"
                                value={`$${minPrice || '0'}`}
                                onChange={(e) => handlePriceInputChange(e, 'min')}
                                placeholder="$0"
                            />
                            <input
                                type="text"
                                className="price-input"
                                value={`$${maxPrice || '5000'}`}
                                onChange={(e) => handlePriceInputChange(e, 'max')}
                                placeholder="$5000"
                            />
                        </div>
                    </div>

                    <div className="filter-actions">
                        <button className="apply-btn" onClick={handleApplyFilters}>
                            <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>filter_alt</span>
                            Apply Specifications
                        </button>
                        <button className="reset-btn" onClick={handleResetFilters}>
                            <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>refresh</span>
                            Reset Filters
                        </button>
                    </div>
                </div>
            </aside>

            <main className="main-content">
                <div className="section-header">
                    <div>
                        <span className="section-badge">Structural Supply</span>
                        <h1 className="section-title">Material<br />Inventory</h1>
                        <p className="results-count">{filteredProducts.length} products found</p>
                    </div>
                    <div className="sort-section">
                        <span className="sort-label">Sort By:</span>
                        <select
                            className="sort-select"
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                        >
                            <option value="default">Default</option>
                            <option value="price-asc">Price: Low to High</option>
                            <option value="price-desc">Price: High to Low</option>
                            <option value="name-asc">Name: A to Z</option>
                            <option value="name-desc">Name: Z to A</option>
                        </select>
                    </div>
                </div>

                {filteredProducts.length === 0 ? (
                    <div className="no-results">
                        <span className="material-symbols-outlined" style={{ fontSize: '4rem' }}>inventory</span>
                        <h3>No products found</h3>
                        <p>Try adjusting your filters or search criteria</p>
                        <button className="reset-filters-btn" onClick={handleResetFilters}>
                            Clear all filters
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
                                    Load More Inventory ({filteredProducts.length - visibleProducts} remaining)
                                </button>
                            </div>
                        )}

                        {!hasMoreProducts && filteredProducts.length > 6 && (
                            <div className="load-more">
                                <p className="end-message">You've reached the end of the catalog</p>
                            </div>
                        )}
                    </>
                )}
            </main>
        </div>
    )
}