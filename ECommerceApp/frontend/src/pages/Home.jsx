import { lazy, Suspense, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProductTemplate = lazy(() => import("../components/ProductTemplate"));

const CATEGORY_CARDS = [
    {
        name: "men's clothing",
        label: "Men's Fashion",
        icon: "ri-shirt-line",
        bg: "bg-blue-50",
        iconColor: "text-blue-600",
        border: "border-blue-100",
        hover: "hover:bg-blue-100",
    },
    {
        name: "women's clothing",
        label: "Women's Fashion",
        icon: "ri-scissors-cut-line",
        bg: "bg-pink-50",
        iconColor: "text-pink-600",
        border: "border-pink-100",
        hover: "hover:bg-pink-100",
    },
    {
        name: "electronics",
        label: "Electronics",
        icon: "ri-cpu-line",
        bg: "bg-violet-50",
        iconColor: "text-violet-600",
        border: "border-violet-100",
        hover: "hover:bg-violet-100",
    },
    {
        name: "jewelery",
        label: "Jewelry",
        icon: "ri-vip-crown-line",
        bg: "bg-amber-50",
        iconColor: "text-amber-600",
        border: "border-amber-100",
        hover: "hover:bg-amber-100",
    },
];

const SkeletonCard = () => (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden animate-pulse">
        <div className="h-52 bg-gray-100"></div>
        <div className="p-4 space-y-2">
            <div className="h-3 bg-gray-100 rounded w-1/3"></div>
            <div className="h-4 bg-gray-100 rounded w-full"></div>
            <div className="h-4 bg-gray-100 rounded w-2/3"></div>
        </div>
    </div>
);

const Home = () => {
    const products = useSelector((state) => state.productReducer.products);
    const navigate = useNavigate();

    const featured = useMemo(
        () =>
            [...products]
                .sort((a, b) => (b.rating?.rate ?? 0) - (a.rating?.rate ?? 0))
                .slice(0, 4),
        [products]
    );

    return (
        <div className="space-y-16">

            {/* ── Hero ── */}
            <section className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-indigo-600 via-indigo-700 to-violet-800 text-white px-8 py-20 md:py-28">
                <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-white/5 pointer-events-none"></div>
                <div className="absolute -bottom-24 -left-12 w-96 h-96 rounded-full bg-white/5 pointer-events-none"></div>

                <div className="relative max-w-xl">
                    <span className="inline-block text-xs font-semibold uppercase tracking-widest bg-white/20 px-3 py-1 rounded-full mb-5">
                        New Collection · 2025
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4 tracking-tight">
                        Discover Products<br />You'll Love
                    </h1>
                    <p className="text-indigo-200 text-base md:text-lg mb-8 leading-relaxed">
                        Shop thousands of premium products across fashion,
                        electronics, and jewelry — all in one place.
                    </p>
                    <div className="flex gap-3 flex-wrap">
                        <Link
                            to="/products"
                            className="bg-white text-indigo-700 font-semibold px-6 py-3 rounded-full hover:bg-indigo-50 transition-colors text-sm shadow"
                        >
                            Shop Now
                        </Link>
                        <Link
                            to="/products"
                            className="border border-white/30 text-white font-medium px-6 py-3 rounded-full hover:bg-white/10 transition-colors text-sm"
                        >
                            Browse Categories
                        </Link>
                    </div>
                </div>
            </section>

            {/* ── Categories ── */}
            <section>
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-gray-900">Shop by Category</h2>
                    <Link to="/products" className="text-sm font-medium text-indigo-600 hover:underline">
                        View all →
                    </Link>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {CATEGORY_CARDS.map((cat) => (
                        <button
                            key={cat.name}
                            onClick={() =>
                                navigate(`/products?category=${encodeURIComponent(cat.name)}`)
                            }
                            className={`flex flex-col items-center gap-3 p-6 rounded-2xl border ${cat.border} ${cat.bg} ${cat.hover} group transition-all hover:shadow-md`}
                        >
                            <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                                <i className={`${cat.icon} text-2xl ${cat.iconColor}`}></i>
                            </div>
                            <span className="text-sm font-semibold text-gray-700 text-center">
                                {cat.label}
                            </span>
                        </button>
                    ))}
                </div>
            </section>

            {/* ── Top Rated Products ── */}
            <section>
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">Top Rated Products</h2>
                        <p className="text-sm text-gray-400 mt-0.5">
                            Hand-picked based on customer reviews
                        </p>
                    </div>
                    <Link to="/products" className="text-sm font-medium text-indigo-600 hover:underline">
                        View all →
                    </Link>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {products.length === 0
                        ? [...Array(4)].map((_, i) => <SkeletonCard key={i} />)
                        : featured.map((product) => (
                              <Suspense key={product.id} fallback={<SkeletonCard />}>
                                  <ProductTemplate product={product} />
                              </Suspense>
                          ))}
                </div>
            </section>

            {/* ── Trust Banner ── */}
            <section className="rounded-2xl bg-gradient-to-r from-slate-800 to-slate-900 text-white p-8">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-indigo-500 rounded-xl flex items-center justify-center shrink-0">
                            <i className="ri-truck-line text-2xl"></i>
                        </div>
                        <div>
                            <h3 className="font-bold">Free Shipping</h3>
                            <p className="text-slate-400 text-sm">On all orders over $50</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-rose-500 rounded-xl flex items-center justify-center shrink-0">
                            <i className="ri-refund-2-line text-2xl"></i>
                        </div>
                        <div>
                            <h3 className="font-bold">30-Day Returns</h3>
                            <p className="text-slate-400 text-sm">No questions asked</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center shrink-0">
                            <i className="ri-shield-check-line text-2xl"></i>
                        </div>
                        <div>
                            <h3 className="font-bold">Secure Payments</h3>
                            <p className="text-slate-400 text-sm">256-bit SSL encryption</p>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default Home;
