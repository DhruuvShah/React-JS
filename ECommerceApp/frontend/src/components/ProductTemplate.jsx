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

const ProductTemplate = ({ product }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const users = useSelector((state) => state.userReducer.users);
    const [imgError, setImgError] = useState(false);

    const isWishlisted = users?.wishlist?.some((p) => p.id === product.id) ?? false;

    const AddtoCartHandler = async () => {
        if (!users) { navigate("/login"); return; }
        const copyuser = { ...users, cart: [...(users.cart || [])] };
        const x = copyuser.cart.findIndex((c) => c?.product?.id == product.id);
        if (x == -1) {
            copyuser.cart.push({ product, quantity: 1 });
        } else {
            copyuser.cart[x] = { product, quantity: copyuser.cart[x].quantity + 1 };
        }
        const success = await dispatch(asyncupdateuser(copyuser.id, copyuser));
        if (success) {
            toast.success("Added to cart!");
        } else {
            toast.error("Could not update cart. Please try again.");
        }
    };

    const WishlistHandler = async (e) => {
        e.preventDefault();
        if (!users) { navigate("/login"); return; }
        const success = await dispatch(asyncToggleWishlist(product));
        if (success) {
            toast.success(isWishlisted ? "Removed from wishlist" : "Added to wishlist!");
        } else {
            toast.error("Could not update wishlist. Please try again.");
        }
    };

    return (
        <div className="group relative bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow flex flex-col overflow-hidden">

            {/* Wishlist toggle */}
            <button
                onClick={WishlistHandler}
                title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                className="absolute top-3 right-3 z-10 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center hover:scale-110 transition-transform"
            >
                <i
                    className={`text-sm ${
                        isWishlisted ? "ri-heart-fill text-rose-500" : "ri-heart-line text-gray-400"
                    }`}
                ></i>
            </button>

            {/* Product image */}
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

            {/* Card body */}
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
                        onClick={AddtoCartHandler}
                        className="flex items-center gap-1.5 bg-indigo-600 text-white text-xs font-semibold px-3 py-1.5 rounded-lg hover:bg-indigo-700 active:scale-95 transition-all"
                    >
                        <i className="ri-shopping-cart-2-line text-sm"></i>
                        Add
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductTemplate;
