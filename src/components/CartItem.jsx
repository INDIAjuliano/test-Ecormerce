export default function CartItem({ item, onRemove }) {
    return (
        <div className="flex justify-between items-center border-b py-4">
            <div>
                <h3 className="font-semibold">{item.name}</h3>
                <p>Quantité : {item.quantity}</p>
                <p>Prix unitaire : {item.price.toLocaleString()} Ar</p>
            </div>

            <div className="text-right">
                <p className="font-bold">
                    {(item.price * item.quantity).toLocaleString()} Ar
                </p>
                <button
                    onClick={() => onRemove(item.id)}
                    className="mt-2 px-3 py-1 bg-red-600 text-white rounded"
                >
                    Supprimer
                </button>
            </div>
        </div>
    )
}