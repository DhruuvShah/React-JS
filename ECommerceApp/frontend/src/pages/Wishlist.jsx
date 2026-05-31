import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { asyncupdateuser, asyncToggleWishlist } from "../store/actions/userActions";

const renderStars = (rate) =>
    Array.from({ length: 5 }, (_, i) => {
        const full = i + 1 <= Math.floor(rate);
        const half = !full && i < rate && rate % 1 >= 0.5;
        return (
            <i
                key={i}
                className={`text-xs ${
                    full
                        ? "ri-star-fill text-amber-400"
                        : half
                        ? "ri-star-half-fill text-amber-400"
                        : "ri-star-line text-gray-300"
                }`}
            ></i>
        );
    });

const WishlistItem = ({ product }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const users = useSelector((state) => state.userReducer.users);
    const [imgError, setImgError] = useState(false);

    const handleRemove = async () => {
        await dispatch(asyncToggleWishlist(product));
    };

    const handleAddToCart = async () => {
        if (!users) { navigate("/login"); return; }
        const newCart = [...(users.cart || [])];
        const x = newCart.findIndex((c) => c?.product?.id == product.id);
        if (x === -1) {
            newCart.push({ product, quantity: 1 });
        } else {
            newCart[x] = { product, quantity: newCart[x].quantity + 1 };
        }
        const newWishlist = (users.wishlist || []).filter((p) => p.id !== product.id);
        const success = await dispatch(
            asyncupdateuser(users.id, { ...users, cart: newCart, wishlist: newWishlist })
        );
        if (success) {
            toast.success("Added to cart!");
        } else {
            toast.error("Could not update cart. Please try again.");
        }
    };

    return (
        <div className="group relative bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow flex flex-col overflow-hidden">
            {/* Remove from wishlist */}
            <button
                onClick={handleRemove}
                title="Remove from wishlist"
                className="absolute top-3 right-3 z-10 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center hover:scale-110 transition-transform"
            >
                <i className="ri-heart-fill text-sm text-rose-500"></i>
            </button>

            {/* Image */}
            <Link to={`/product/${product.id}`} className="block">
                <div className="h-52 bg-gray-50 flex items-center justify-center p-4">
                    {imgError ? (
                        <div className="flex flex-col items-center gap-2 text-gray-300">
                            <i className="ri-image-line text-5xl"></i>
                            <span className="text-xs">No image</span>
                        </div>
                    ) : (
                        <img
                            src={product.image}
                            alt={product.title}
                            onError={() => setImgError(true)}
                            className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
                        />
                    )}
                </div>
            </Link>

            {/* Body */}
            <div className="p-4 flex flex-col flex-1">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-indigo-500 mb-1">
                    {product.category}
                </span>

                <Link to={`/product/${product.id}`} className="block mb-2">
                    <h2 className="text-sm font-semibold text-gray-800 line-clamp-2 leading-snug hover:text-indigo-600 transition-colors">
                        {product.title}
                    </h2>
                </Link>

                {product.rating && (
                    <div className="flex items-center gap-1.5 mb-3">
                        <div className="flex items-center gap-0.5">
                            {renderStars(product.rating.rate)}
                        </div>
                        <span className="text-xs text-gray-400">
                            {product.rating.rate} ({product.rating.count})
                        </span>
                    </div>
                )}

                <div className="mt-auto flex items-center justify-between pt-2">
                    <span className="text-base font-bold text-gray-900">
                        ${product.price.toFixed(2)}
                    </span>
                    <button
                        onClick={handleAddToCart}
                        className="flex items-center gap-1.5 bg-indigo-600 text-white text-xs font-semibold px-3 py-1.5 rounded-lg hover:bg-indigo-700 active:scale-95 transition-all"
                    >
                        <i className="ri-shopping-cart-2-line text-sm"></i>
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

const Wishlist = () => {
    const user = useSelector((state) => state.userReducer.users);
    const items = user?.wishlist || [];

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">My Wishlist</h1>
                <p className="text-sm text-gray-500 mt-1">
                    {items.length} saved item{items.length !== 1 ? "s" : ""}
                </p>
            </div>

            {items.length === 0 ? (
                <div className="text-center py-24">
                    <i className="ri-heart-line text-6xl text-gray-200"></i>
                    <p className="mt-4 text-lg font-medium text-gray-500">
                        Your wishlist is empty
                    </p>
                    <p className="text-sm text-gray-400 mt-1">
                        Save items you love by clicking the heart icon on any product
                    </p>
                    <Link
                        to="/products"
                        className="mt-6 inline-block bg-indigo-600 text-white text-sm font-semibold px-6 py-2.5 rounded-full hover:bg-indigo-700 transition-colors"
                    >
                        Browse Products
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    {items.map((product) => (
                        <WishlistItem key={product.id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Wishlist;
