export default function FilterBar({
    categories,
    selectedCategory,
    setSelectedCategory,
    maxPrice,
    setMaxPrice
}) {
    return (
        <div className="flex flex-col md:flex-row gap-4 mb-6">
            <select
                className="border p-2 rounded"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
            >
                <option value="">Toutes les catégories</option>
                {categories.map((category) => (
                    <option key={category.id} value={category.name}>
                        {category.name}
                    </option>
                ))}
            </select>

            <input
                type="number"
                placeholder="Prix maximum"
                className="border p-2 rounded"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
            />
        </div>
    )
}