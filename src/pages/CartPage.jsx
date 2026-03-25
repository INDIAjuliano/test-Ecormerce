import CartItem from '../components/CartItem'
import { useCart } from '../context/CartContext'

export default function CartPage() {
    const { cartItems, removeFromCart, total } = useCart()

    return (
        <div className="px-6 py-10">
            <h1 className="text-3xl font-bold mb-6">Mon panier</h1>

            {cartItems.length === 0 ? (
                <p>Votre panier est vide.</p>
            ) : (
                <>
                    <div className="space-y-4">
                        {cartItems.map((item) => (
                            <CartItem key={item.id} item={item} onRemove={removeFromCart} />
                        ))}
                    </div>

                    <div className="mt-8 text-right">
                        <h2 className="text-2xl font-bold">
                            Total : {total.toLocaleString()} Ar
                        </h2>
                    </div>
                </>
            )}
        </div>
    )
}