import { Link } from 'react-router-dom'

export default function ProductCard({ product }) {
    return (
        <div className="border rounded-lg p-4 shadow-sm">
            <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover rounded-md"
            />

            <h3 className="text-lg font-semibold mt-3">{product.name}</h3>
            <p className="text-sm text-gray-500">{product.category}</p>
            <p className="font-bold mt-2">{product.price.toLocaleString()} Ar</p>

            <Link
                to={`/produit/${product.id}`}
                className="inline-block mt-3 px-4 py-2 bg-blue-600 text-white rounded"
            >
                Voir le produit
            </Link>
        </div>
    )
}