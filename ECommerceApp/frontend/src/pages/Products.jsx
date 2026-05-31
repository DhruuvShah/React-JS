import { lazy, Suspense, useMemo, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

const ProductTemplate = lazy(() => import("../components/ProductTemplate"));

const CATEGORIES = [
    "all",
    "men's clothing",
    "women's clothing",
    "electronics",
    "jewelery",
];

const SORT_OPTIONS = [
    { label: "Default", value: "default" },
    { label: "Price: Low to High", value: "price_asc" },
    { label: "Price: High to Low", value: "price_desc" },
    { label: "Top Rated", value: "rating_desc" },
];

const SkeletonCard = () => (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden animate-pulse">
        <div className="h-52 bg-gray-100"></div>
        <div className="p-4 space-y-2">
            <div className="h-3 bg-gray-100 rounded w-1/3"></div>
            <div className="h-4 bg-gray-100 rounded w-full"></div>
            <div className="h-4 bg-gray-100 rounded w-2/3"></div>
            <div className="h-8 bg-gray-100 rounded w-1/2 mt-2"></div>
        </div>
    </div>
);

const Products = () => {
    const allProducts = useSelector((state) => state.productReducer.products);
    const [searchParams, setSearchParams] = useSearchParams();
    const [sort, setSort] = useState("default");
    const [displayCount, setDisplayCount] = useState(8);

    const categoryParam = searchParams.get("category") || "all";
    const searchParam = searchParams.get("search") || "";

    useEffect(() => {
        setDisplayCount(8);
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [categoryParam, searchParam, sort]);

    const filteredSorted = useMemo(() => {
        let result = [...allProducts];

        if (categoryParam !== "all") {
            result = result.filter((p) => p.category === categoryParam);
        }
        if (searchParam) {
            const q = searchParam.toLowerCase();
            result = result.filter(
                (p) =>
                    p.title.toLowerCase().includes(q) ||
                    p.description.toLowerCase().includes(q) ||
                    p.category.toLowerCase().includes(q)
            );
        }
        if (sort === "price_asc") result.sort((a, b) => a.price - b.price);
        else if (sort === "price_desc") result.sort((a, b) => b.price - a.price);
        else if (sort === "rating_desc")
            result.sort((a, b) => (b.rating?.rate ?? 0) - (a.rating?.rate ?? 0));

        return result;
    }, [allProducts, categoryParam, searchParam, sort]);

    const displayed = filteredSorted.slice(0, displayCount);
    const hasMore = displayCount < filteredSorted.length;

    const handleCategory = (cat) => {
        const params = {};
        if (cat !== "all") params.category = cat;
        if (searchParam) params.search = searchParam;
        setSearchParams(params);
    };

    const pageTitle = searchParam
        ? `Results for "${searchParam}"`
        : categoryParam !== "all"
        ? categoryParam.charAt(0).toUpperCase() + categoryParam.slice(1)
        : "All Products";

    return (
        <div>
            {/* Page header */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">{pageTitle}</h1>
                <p className="text-sm text-gray-500 mt-1">
                    {filteredSorted.length} product{filteredSorted.length !== 1 ? "s" : ""} found
                </p>
            </div>

            {/* Filter + Sort bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div className="flex flex-wrap gap-2">
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => handleCategory(cat)}
                            className={`px-4 py-1.5 rounded-full text-sm font-medium capitalize transition-colors ${
                                categoryParam === cat
                                    ? "bg-indigo-600 text-white shadow-sm"
                                    : "bg-white border border-gray-200 text-gray-600 hover:border-indigo-300 hover:text-indigo-600"
                            }`}
                        >
                            {cat === "all" ? "All" : cat}
                        </button>
                    ))}
                </div>

                <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-300 cursor-pointer"
                >
                    {SORT_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>
            </div>

            {/* Initial loading skeletons */}
            {allProducts.length === 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    {[...Array(8)].map((_, i) => (
                        <SkeletonCard key={i} />
                    ))}
                </div>
            ) : filteredSorted.length === 0 ? (
                /* Empty state */
                <div className="text-center py-24">
                    <i className="ri-search-line text-6xl text-gray-200"></i>
                    <p className="mt-4 text-gray-500 font-medium text-lg">No products found</p>
                    <p className="text-sm text-gray-400 mt-1">
                        Try a different search term or category
                    </p>
                    <button
                        onClick={() => setSearchParams({})}
                        className="mt-5 inline-block text-sm font-medium text-indigo-600 hover:underline"
                    >
                        Clear all filters
                    </button>
                </div>
            ) : (
                <InfiniteScroll
                    dataLength={displayed.length}
                    next={() => setDisplayCount((c) => c + 8)}
                    hasMore={hasMore}
                    loader={
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
                            {[...Array(4)].map((_, i) => (
                                <SkeletonCard key={i} />
                            ))}
                        </div>
                    }
                    endMessage={
                        <p className="text-center text-sm text-gray-400 py-10">
                            You've seen all {filteredSorted.length} products
                        </p>
                    }
                >
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                        {displayed.map((product) => (
                            <Suspense key={product.id} fallback={<SkeletonCard />}>
                                <ProductTemplate product={product} />
                            </Suspense>
                        ))}
                    </div>
                </InfiniteScroll>
            )}
        </div>
    );
};

export default Products;
