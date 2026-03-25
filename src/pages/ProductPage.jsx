import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getProductById } from '../services/mockApi'
import { useCart } from '../context/CartContext'

export default function ProductPage() {
    const { id } = useParams()
    const [product, setProduct] = useState(null)
    const { addToCart } = useCart()

    useEffect(() => {
        getProductById(id).then(setProduct)
    }, [id])

    if (!product) {
        return <p className="p-6">Chargement du produit...</p>
    }

    return (
        <div className="px-6 py-10 grid md:grid-cols-2 gap-8">
            <img
                src={product.image}
                alt={product.name}
                className="w-full rounded-lg object-cover"
            />

            <div>
                <h1 className="text-3xl font-bold">{product.name}</h1>
                <p className="text-gray-500 mt-2">{product.category}</p>
                <p className="mt-4">{product.description}</p>
                <p className="text-2xl font-bold mt-6">
                    {product.price.toLocaleString()} Ar
                </p>

                <button
                    onClick={() => addToCart(product)}
                    className="mt-6 px-6 py-3 bg-green-600 text-white rounded"
                >
                    Ajouter au panier
                </button>
            </div>
        </div>
    )
}