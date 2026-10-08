import { useState } from "react";
import ProductGrid from "../components/ProductGrid";
import ProductModal from "../components/ProductModal";

function GalleryPage({ products, loading }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [sortOrder, setSortOrder] = useState("default");
    const [selectedProduct, setSelectedProduct] = useState(null);

    const categories = ["All", ...new Set(products.map((p) => p.category || "General"))];

    const filteredProducts = products
        .filter((product) => {
            const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = selectedCategory === "All" || (product.category || "General") === selectedCategory;
            return matchesSearch && matchesCategory;
        })
        .sort((a, b) => {
            if (sortOrder === "low-high") return a.price - b.price;
            if (sortOrder === "high-low") return b.price - a.price;
            return 0;
        });

    return (
        <main className="mx-auto max-w-6xl px-6 py-10">
            <section className="relative mb-10 overflow-hidden rounded-3xl bg-linear-to-br from-indigo-600 via-violet-600 to-cyan-500 p-10 text-white shadow-xl md:p-14">
                <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10"></div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/70">Product Gallery</p>
                <h2 className="mt-3 text-4xl font-bold md:text-5xl">Discover Our Products</h2>
                <p className="mt-3 text-white/80">
                    {filteredProducts.length} items available · by ASHLEY NICOLE ELMA
                </p>
            </section>

            <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <input
                    type="text"
                    placeholder="🔍 Search products..."
                    className="w-full rounded-xl border border-slate-300 px-4 py-2 md:w-64"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

                <div className="flex flex-wrap items-center gap-4">
                    <div className="flex flex-wrap gap-2">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`rounded-full px-4 py-2 text-sm font-medium transition ${selectedCategory === cat
                                        ? "bg-indigo-600 text-white shadow-md"
                                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    <select
                        className="rounded-xl border border-slate-300 px-4 py-2 text-sm"
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value)}
                    >
                        <option value="default">Sort by: Default</option>
                        <option value="low-high">Price: Low to High</option>
                        <option value="high-low">Price: High to Low</option>
                    </select>
                </div>
            </div>

            {loading ? (
                <p className="py-20 text-center text-slate-400">Loading products...</p>
            ) : (
                <ProductGrid products={filteredProducts} onEdit={setSelectedProduct} />
            )}

            {selectedProduct && (
                <ProductModal
                    product={selectedProduct}
                    onClose={() => setSelectedProduct(null)}
                />
            )}
        </main>
    );
}
export default GalleryPage;