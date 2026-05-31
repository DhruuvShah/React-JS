import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
    asyncdeleteproduct,
    asyncupdateproduct,
} from "../../store/actions/productActions";
import { asyncupdateuser, asyncToggleWishlist } from "../../store/actions/userActions";
import ProductTemplate from "../../components/ProductTemplate";

const renderStars = (rate) =>
    Array.from({ length: 5 }, (_, i) => {
        const full = i + 1 <= Math.floor(rate);
        const half = !full && i < rate && rate % 1 >= 0.5;
        return (
            <i
                key={i}
                className={`text-lg ${
                    full
                        ? "ri-star-fill text-amber-400"
                        : half
                        ? "ri-star-half-fill text-amber-400"
                        : "ri-star-line text-gray-300"
                }`}
            ></i>
        );
    });

const ProductDetails = () => {
    const { id } = useParams();
    const {
        productReducer: { products },
        userReducer: { users },
    } = useSelector((state) => state);
    const product = products?.find((p) => p.id == id);

    const [qty, setQty] = useState(1);
    const [showEditModal, setShowEditModal] = useState(false);
    const [imgError, setImgError] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { register, handleSubmit } = useForm({
        defaultValues: {
            image: product?.image,
            title: product?.title,
            price: product?.price,
            category: product?.category,
            description: product?.description,
        },
    });

    const AddtoCartHandler = async () => {
        if (!users) { navigate("/login"); return; }
        const copyuser = { ...users, cart: [...(users.cart || [])] };
        const x = copyuser.cart.findIndex((c) => c?.product?.id == product.id);
        if (x === -1) {
            copyuser.cart.push({ product, quantity: qty });
        } else {
            copyuser.cart[x] = { product, quantity: copyuser.cart[x].quantity + qty };
        }
        const success = await dispatch(asyncupdateuser(copyuser.id, copyuser));
        if (success) {
            toast.success(`${qty} item${qty > 1 ? "s" : ""} added to cart!`);
        } else {
            toast.error("Could not update cart. Please try again.");
        }
    };

    const BuyNowHandler = async () => {
        if (!users) { navigate("/login"); return; }
        const copyuser = { ...users, cart: [...(users.cart || [])] };
        const x = copyuser.cart.findIndex((c) => c?.product?.id == product.id);
        if (x === -1) {
            copyuser.cart.push({ product, quantity: qty });
        } else {
            copyuser.cart[x] = { product, quantity: copyuser.cart[x].quantity + qty };
        }
        await dispatch(asyncupdateuser(copyuser.id, copyuser));
        navigate("/checkout");
    };

    const isWishlisted = users?.wishlist?.some((p) => p.id === product?.id) ?? false;

    const WishlistHandler = async () => {
        if (!users) { navigate("/login"); return; }
        const success = await dispatch(asyncToggleWishlist(product));
        if (success) {
            toast.success(isWishlisted ? "Removed from wishlist" : "Added to wishlist!");
        } else {
            toast.error("Could not update wishlist. Please try again.");
        }
    };

    const UpdateProductHandler = (data) => {
        dispatch(asyncupdateproduct(id, data));
        toast.success("Product updated!");
        setShowEditModal(false);
    };

    const DeleteHandler = () => {
        if (!window.confirm("Delete this product? This cannot be undone.")) return;
        dispatch(asyncdeleteproduct(id));
        toast.success("Product deleted");
        navigate("/products");
    };

    const related = products
        ?.filter((p) => p.category === product?.category && p.id !== product?.id)
        .slice(0, 4);

    if (!product) {
        return (
            <div className="flex items-center justify-center min-h-[50vh]">
                <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div>
            {/* Breadcrumb */}
            <nav className="text-sm text-gray-500 mb-6 flex items-center gap-1.5 flex-wrap">
                <Link to="/" className="hover:text-indigo-600 transition-colors">
                    Home
                </Link>
                <i className="ri-arrow-right-s-line text-gray-400"></i>
                <Link to="/products" className="hover:text-indigo-600 transition-colors">
                    Products
                </Link>
                <i className="ri-arrow-right-s-line text-gray-400"></i>
                <span className="text-gray-400 capitalize">{product.category}</span>
            </nav>

            {/* Main product card */}
            <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="flex flex-col lg:flex-row">
                    {/* Image panel */}
                    <div className="lg:w-5/12 bg-gray-50 flex items-center justify-center p-10 min-h-[380px]">
                        {imgError ? (
                            <div className="flex flex-col items-center gap-3 text-gray-300">
                                <i className="ri-image-line text-7xl"></i>
                                <span className="text-sm">Image unavailable</span>
                            </div>
                        ) : (
                            <img
                                src={product.image}
                                alt={product.title}
                                onError={() => setImgError(true)}
                                className="max-h-[360px] max-w-full object-contain"
                            />
                        )}
                    </div>

                    {/* Info panel */}
                    <div className="lg:w-7/12 p-8 lg:p-10 flex flex-col">
                        {/* Category badge + admin buttons */}
                        <div className="flex items-start justify-between gap-3 mb-3">
                            <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
                                {product.category}
                            </span>
                            {users?.isAdmin && (
                                <div className="flex gap-2 shrink-0">
                                    <button
                                        onClick={() => setShowEditModal(true)}
                                        className="flex items-center gap-1.5 text-xs font-medium text-gray-600 border border-gray-200 px-3 py-1.5 rounded-lg hover:border-indigo-400 hover:text-indigo-600 transition-colors"
                                    >
                                        <i className="ri-edit-line"></i>
                                        Edit
                                    </button>
                                    <button
                                        onClick={DeleteHandler}
                                        className="flex items-center gap-1.5 text-xs font-medium text-red-500 border border-red-200 px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors"
                                    >
                                        <i className="ri-delete-bin-6-line"></i>
                                        Delete
                                    </button>
                                </div>
                            )}
                        </div>

                        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 leading-snug mb-3">
                            {product.title}
                        </h1>

                        {/* Rating */}
                        {product.rating && (
                            <div className="flex items-center gap-2 mb-4">
                                <div className="flex items-center gap-0.5">
                                    {renderStars(product.rating.rate)}
                                </div>
                                <span className="text-sm font-bold text-gray-700">
                                    {product.rating.rate}
                                </span>
                                <span className="text-sm text-gray-400">
                                    ({product.rating.count} reviews)
                                </span>
                            </div>
                        )}

                        {/* Price */}
                        <div className="text-3xl font-bold text-gray-900 mb-5">
                            ${product.price.toFixed(2)}
                        </div>

                        {/* Stock badge */}
                        {product.stock !== undefined && (
                            <div className="mb-5">
                                {product.stock > 10 ? (
                                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full">
                                        <i className="ri-checkbox-circle-fill"></i>
                                        In Stock ({product.stock} available)
                                    </span>
                                ) : product.stock > 0 ? (
                                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-700 bg-amber-50 px-3 py-1.5 rounded-full">
                                        <i className="ri-alert-fill"></i>
                                        Only {product.stock} left!
                                    </span>
                                ) : (
                                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-red-700 bg-red-50 px-3 py-1.5 rounded-full">
                                        <i className="ri-close-circle-fill"></i>
                                        Out of Stock
                                    </span>
                                )}
                            </div>
                        )}

                        {/* Description */}
                        <p className="text-sm text-gray-600 leading-relaxed mb-8">
                            {product.description}
                        </p>

                        {/* Quantity + action buttons */}
                        <div className="mt-auto space-y-4">
                            <div className="flex items-center gap-3">
                                <span className="text-sm font-medium text-gray-700">Qty:</span>
                                <div className="flex items-center bg-gray-100 rounded-xl overflow-hidden">
                                    <button
                                        onClick={() => setQty((q) => Math.max(1, q - 1))}
                                        className="w-9 h-9 flex items-center justify-center text-gray-600 hover:text-indigo-600 hover:bg-gray-200 transition-colors font-bold text-lg"
                                    >
                                        −
                                    </button>
                                    <span className="w-9 text-center text-sm font-semibold text-gray-800 select-none">
                                        {qty}
                                    </span>
                                    <button
                                        onClick={() => setQty((q) => q + 1)}
                                        className="w-9 h-9 flex items-center justify-center text-gray-600 hover:text-indigo-600 hover:bg-gray-200 transition-colors font-bold text-lg"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <button
                                    onClick={AddtoCartHandler}
                                    className="flex-1 flex items-center justify-center gap-2 border-2 border-indigo-600 text-indigo-600 font-semibold py-3 rounded-xl hover:bg-indigo-50 active:scale-[0.98] transition-all text-sm"
                                >
                                    <i className="ri-shopping-cart-2-line text-base"></i>
                                    Add to Cart
                                </button>
                                <button
                                    onClick={BuyNowHandler}
                                    className="flex-1 flex items-center justify-center gap-2 bg-indigo-600 text-white font-semibold py-3 rounded-xl hover:bg-indigo-700 active:scale-[0.98] transition-all text-sm"
                                >
                                    <i className="ri-flash-line text-base"></i>
                                    Buy Now
                                </button>
                            </div>

                            <button
                                onClick={WishlistHandler}
                                className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border font-semibold text-sm transition-all active:scale-[0.98] ${
                                    isWishlisted
                                        ? "border-rose-300 bg-rose-50 text-rose-600 hover:bg-rose-100"
                                        : "border-gray-200 text-gray-600 hover:border-rose-300 hover:text-rose-500 hover:bg-rose-50"
                                }`}
                            >
                                <i className={isWishlisted ? "ri-heart-fill text-base" : "ri-heart-line text-base"}></i>
                                {isWishlisted ? "Saved to Wishlist" : "Add to Wishlist"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Related products */}
            {related?.length > 0 && (
                <div className="mt-12">
                    <h2 className="text-xl font-bold text-gray-900 mb-5">
                        More in{" "}
                        <span className="capitalize">{product.category}</span>
                    </h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                        {related.map((p) => (
                            <ProductTemplate key={p.id} product={p} />
                        ))}
                    </div>
                </div>
            )}

            {/* Admin Edit Modal */}
            {showEditModal && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
                    onClick={(e) => e.target === e.currentTarget && setShowEditModal(false)}
                >
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between p-6 border-b border-gray-100 sticky top-0 bg-white z-10">
                            <h3 className="text-lg font-bold text-gray-900">
                                Edit Product
                            </h3>
                            <button
                                onClick={() => setShowEditModal(false)}
                                className="text-gray-400 hover:text-gray-700 transition-colors w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100"
                            >
                                <i className="ri-close-line text-xl"></i>
                            </button>
                        </div>

                        <form
                            onSubmit={handleSubmit(UpdateProductHandler)}
                            className="p-6 space-y-4"
                        >
                            <div>
                                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                                    Image URL
                                </label>
                                <input
                                    {...register("image")}
                                    type="url"
                                    placeholder="https://..."
                                    className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                                    Title
                                </label>
                                <input
                                    {...register("title")}
                                    type="text"
                                    placeholder="Product title"
                                    className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all"
                                />
                            </div>

                            <div className="flex gap-3">
                                <div className="flex-1">
                                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                                        Price ($)
                                    </label>
                                    <input
                                        {...register("price")}
                                        type="number"
                                        step="0.01"
                                        placeholder="0.00"
                                        className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all"
                                    />
                                </div>
                                <div className="flex-1">
                                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                                        Category
                                    </label>
                                    <input
                                        {...register("category")}
                                        type="text"
                                        placeholder="Category"
                                        className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                                    Description
                                </label>
                                <textarea
                                    {...register("description")}
                                    rows={4}
                                    placeholder="Product description..."
                                    className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all resize-none"
                                ></textarea>
                            </div>

                            <div className="flex gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setShowEditModal(false)}
                                    className="flex-1 py-2.5 border border-gray-200 text-gray-600 text-sm font-semibold rounded-xl hover:bg-gray-50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 py-2.5 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 transition-colors"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductDetails;
