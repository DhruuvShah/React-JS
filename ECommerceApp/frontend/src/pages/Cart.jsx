import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { asyncupdateuser } from "../store/actions/userActions";

const CartItemImage = ({ src, alt }) => {
    const [err, setErr] = useState(false);
    return err ? (
        <div className="w-full h-full flex items-center justify-center">
            <i className="ri-image-line text-3xl text-gray-300"></i>
        </div>
    ) : (
        <img
            src={src}
            alt={alt}
            onError={() => setErr(true)}
            className="max-h-full max-w-full object-contain"
        />
    );
};

const Cart = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const users = useSelector((state) => state.userReducer.users);
    const cart = users?.cart || [];

    const IncreaseQuantityHandler = (index) => {
        const copyuser = { ...users, cart: [...users.cart] };
        copyuser.cart[index] = {
            ...copyuser.cart[index],
            quantity: copyuser.cart[index].quantity + 1,
        };
        dispatch(asyncupdateuser(copyuser.id, copyuser));
    };

    // Bug fix: was `quantity > 0` which let items hit 0 and stay in cart
    const DecreaseQuantityHandler = (index) => {
        const copyuser = { ...users, cart: [...users.cart] };
        if (copyuser.cart[index].quantity > 1) {
            copyuser.cart[index] = {
                ...copyuser.cart[index],
                quantity: copyuser.cart[index].quantity - 1,
            };
        } else {
            copyuser.cart.splice(index, 1);
        }
        dispatch(asyncupdateuser(copyuser.id, copyuser));
    };

    const RemoveHandler = (index) => {
        const copyuser = { ...users, cart: [...users.cart] };
        copyuser.cart.splice(index, 1);
        dispatch(asyncupdateuser(copyuser.id, copyuser));
        toast.success("Item removed from cart");
    };

    const subtotal = cart.reduce(
        (sum, item) => sum + (item.product?.price || 0) * item.quantity,
        0
    );
    const shipping = cart.length > 0 && subtotal < 50 ? 5.99 : 0;
    const total = subtotal + shipping;
    const totalItems = cart.reduce((s, i) => s + i.quantity, 0);

    if (cart.length === 0) {
        return (
            <div className="text-center py-24">
                <i className="ri-shopping-cart-2-line text-7xl text-gray-200"></i>
                <p className="mt-4 text-xl font-semibold text-gray-500">
                    Your cart is empty
                </p>
                <p className="text-sm text-gray-400 mt-1">
                    Looks like you haven&apos;t added anything yet
                </p>
                <Link
                    to="/products"
                    className="mt-6 inline-block bg-indigo-600 text-white text-sm font-semibold px-6 py-2.5 rounded-full hover:bg-indigo-700 transition-colors"
                >
                    Shop Now
                </Link>
            </div>
        );
    }

    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-6">
                Shopping Cart{" "}
                <span className="text-base font-normal text-gray-500">
                    ({cart.length} item{cart.length !== 1 ? "s" : ""})
                </span>
            </h1>

            <div className="flex flex-col lg:flex-row gap-8 items-start">
                {/* Cart items */}
                <div className="flex-1 space-y-4 w-full">
                    {cart.map((item, index) => (
                        <div
                            key={item?.product?.id ?? index}
                            className="flex gap-4 bg-white rounded-2xl border border-gray-200 shadow-sm p-4"
                        >
                            {/* Image */}
                            <div className="w-24 h-24 bg-gray-50 rounded-xl flex items-center justify-center shrink-0 p-2">
                                <CartItemImage
                                    src={item?.product?.image}
                                    alt={item?.product?.title}
                                />
                            </div>

                            {/* Info */}
                            <div className="flex-1 min-w-0">
                                <span className="text-[11px] font-semibold uppercase tracking-wider text-indigo-500">
                                    {item?.product?.category}
                                </span>
                                <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 leading-snug mt-0.5">
                                    {item?.product?.title}
                                </h3>
                                <p className="text-base font-bold text-gray-900 mt-1.5">
                                    ${item?.product?.price?.toFixed(2)}
                                </p>
                            </div>

                            {/* Quantity + Remove */}
                            <div className="flex flex-col items-end justify-between shrink-0 gap-3">
                                <button
                                    onClick={() => RemoveHandler(index)}
                                    title="Remove item"
                                    className="text-gray-400 hover:text-red-500 transition-colors"
                                >
                                    <i className="ri-delete-bin-6-line text-lg"></i>
                                </button>

                                <div className="flex items-center bg-gray-100 rounded-xl overflow-hidden">
                                    <button
                                        onClick={() => DecreaseQuantityHandler(index)}
                                        className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-indigo-600 hover:bg-gray-200 transition-colors font-bold text-lg"
                                    >
                                        −
                                    </button>
                                    <span className="w-7 text-center text-sm font-semibold text-gray-800 select-none">
                                        {item.quantity}
                                    </span>
                                    <button
                                        onClick={() => IncreaseQuantityHandler(index)}
                                        className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-indigo-600 hover:bg-gray-200 transition-colors font-bold text-lg"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Order summary */}
                <div className="lg:w-80 w-full shrink-0">
                    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sticky top-24">
                        <h2 className="text-lg font-bold text-gray-900 mb-5">
                            Order Summary
                        </h2>

                        <div className="space-y-3 text-sm">
                            <div className="flex justify-between text-gray-600">
                                <span>
                                    Subtotal ({totalItems} item{totalItems !== 1 ? "s" : ""})
                                </span>
                                <span className="font-semibold text-gray-800">
                                    ${subtotal.toFixed(2)}
                                </span>
                            </div>
                            <div className="flex justify-between text-gray-600">
                                <span>Shipping</span>
                                {shipping === 0 ? (
                                    <span className="font-semibold text-emerald-600">Free</span>
                                ) : (
                                    <span className="font-semibold text-gray-800">
                                        ${shipping.toFixed(2)}
                                    </span>
                                )}
                            </div>
                            {shipping > 0 && (
                                <p className="text-[11px] text-indigo-500 bg-indigo-50 rounded-lg px-3 py-1.5">
                                    Add ${(50 - subtotal).toFixed(2)} more for free shipping
                                </p>
                            )}
                        </div>

                        <div className="border-t border-gray-100 mt-5 pt-4 flex justify-between items-center">
                            <span className="font-bold text-gray-900">Total</span>
                            <span className="font-bold text-2xl text-gray-900">
                                ${total.toFixed(2)}
                            </span>
                        </div>

                        <button
                            onClick={() => navigate("/checkout")}
                            className="mt-5 w-full bg-indigo-600 text-white font-semibold py-3 rounded-xl hover:bg-indigo-700 active:scale-[0.98] transition-all flex items-center justify-center gap-2 text-sm"
                        >
                            <i className="ri-secure-payment-line text-base"></i>
                            Proceed to Checkout
                        </button>

                        <Link
                            to="/products"
                            className="mt-3 w-full block text-center text-sm text-gray-500 hover:text-indigo-600 transition-colors py-1"
                        >
                            ← Continue Shopping
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
