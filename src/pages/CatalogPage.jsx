import { useEffect, useMemo, useState } from 'react'
import { getCategories, getProducts } from '../services/mockApi'
import ProductCard from '../components/ProductCard'
import FilterBar from '../components/FilterBar'

export default function CatalogPage() {
    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])
    const [selectedCategory, setSelectedCategory] = useState('')
    const [maxPrice, setMaxPrice] = useState('')

    useEffect(() => {
        getProducts().then(setProducts)
        getCategories().then(setCategories)
    }, [])

    const filteredProducts = useMemo(() => {
        return products.filter((product) => {
            const categoryMatch =
                selectedCategory === '' || product.category === selectedCategory

            const priceMatch =
                maxPrice === '' || product.price <= Number(maxPrice)

            return categoryMatch && priceMatch
        })
    }, [products, selectedCategory, maxPrice])

    return (
        <div className="px-6 py-10">
            <h1 className="text-3xl font-bold mb-6">Catalogue</h1>

            <FilterBar
                categories={categories}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                maxPrice={maxPrice}
                setMaxPrice={setMaxPrice}
            />

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    )
}