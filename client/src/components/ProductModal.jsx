function ProductModal({ product, onClose }) {
    if (!product) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
            <div className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl">
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 z-10 rounded-full bg-white/80 p-2 text-slate-600 hover:bg-white"
                >
                    ✕
                </button>
                <img
                    src={product.image}
                    alt={product.name}
                    className="h-64 w-full object-cover"
                />
                <div className="p-6">
                    <span className="inline-block rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-600">
                        {product.category || "General"}
                    </span>
                    <h2 className="mt-3 text-2xl font-bold text-slate-900">{product.name}</h2>
                    <p className="mt-2 text-2xl font-bold text-indigo-600">
                        ₱{Number(product.price).toLocaleString()}
                    </p>
                    <p className="mt-4 text-slate-600">{product.description}</p>
                </div>
            </div>
        </div>
    );
}

export default ProductModal;