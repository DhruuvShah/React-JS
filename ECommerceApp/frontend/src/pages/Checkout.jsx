import { useState } from "react";
import { nanoid } from "nanoid";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { asyncupdateuser } from "../store/actions/userActions";

const CheckoutItemImage = ({ src, alt }) => {
    const [err, setErr] = useState(false);
    return err ? (
        <div className="w-full h-full flex items-center justify-center">
            <i className="ri-image-line text-2xl text-gray-300"></i>
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

const Checkout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const users = useSelector((state) => state.userReducer.users);
    const cart = users?.cart || [];
    const [paying, setPaying] = useState(false);

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
                    Add some products before checking out
                </p>
                <Link
                    to="/products"
                    className="mt-6 inline-block bg-indigo-600 text-white text-sm font-semibold px-6 py-2.5 rounded-full hover:bg-indigo-700 transition-colors"
                >
                    Browse Products
                </Link>
            </div>
        );
    }

    const handlePayment = async () => {
        if (typeof window.Razorpay === "undefined") {
            toast.error("Payment gateway failed to load. Please refresh the page.");
            return;
        }

        setPaying(true);

        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID,
            amount: Math.round(total * 100),
            currency: "INR",
            name: "ShopSphere",
            description: `Payment for ${totalItems} item${totalItems !== 1 ? "s" : ""}`,
            image: "",
            handler: async function (response) {
                const order = {
                    id: nanoid(),
                    date: new Date().toISOString(),
                    paymentId: response.razorpay_payment_id,
                    items: [...cart],
                    subtotal,
                    shipping,
                    total,
                    status: "Confirmed",
                };
                const copyuser = {
                    ...users,
                    cart: [],
                    orders: [...(users.orders || []), order],
                };
                await dispatch(asyncupdateuser(copyuser.id, copyuser));
                toast.success("Order placed successfully!");
                navigate("/admin/user-profile");
            },
            prefill: {
                name: users?.username || "",
                email: users?.email || "",
            },
            notes: {
                address: "ShopSphere Order",
            },
            theme: {
                color: "#4F46E5",
            },
            modal: {
                ondismiss: () => {
                    setPaying(false);
                    toast.info("Payment cancelled");
                },
            },
        };

        const rzp = new window.Razorpay(options);
        rzp.on("payment.failed", (response) => {
            setPaying(false);
            toast.error(`Payment failed: ${response.error.description}`);
        });
        rzp.open();
    };

    return (
        <div className="max-w-4xl mx-auto">
            {/* Breadcrumb */}
            <nav className="text-sm text-gray-500 mb-6 flex items-center gap-1.5">
                <Link to="/" className="hover:text-indigo-600 transition-colors">
                    Home
                </Link>
                <i className="ri-arrow-right-s-line text-gray-400"></i>
                <Link to="/cart" className="hover:text-indigo-600 transition-colors">
                    Cart
                </Link>
                <i className="ri-arrow-right-s-line text-gray-400"></i>
                <span className="text-gray-900 font-medium">Checkout</span>
            </nav>

            <h1 className="text-2xl font-bold text-gray-900 mb-8">Checkout</h1>

            <div className="flex flex-col lg:flex-row gap-8 items-start">
                {/* Left: order items + customer info */}
                <div className="flex-1 space-y-5">
                    {/* Order items */}
                    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
                        <h2 className="text-base font-bold text-gray-900 mb-5">
                            Order Items
                            <span className="ml-2 text-sm font-normal text-gray-400">
                                ({totalItems} item{totalItems !== 1 ? "s" : ""})
                            </span>
                        </h2>
                        <div className="divide-y divide-gray-50 -mx-2">
                            {cart.map((item, index) => (
                                <div
                                    key={item?.product?.id ?? index}
                                    className="flex items-center gap-4 px-2 py-3"
                                >
                                    <div className="w-14 h-14 bg-gray-50 rounded-xl flex items-center justify-center p-2 shrink-0">
                                        <CheckoutItemImage
                                            src={item?.product?.image}
                                            alt={item?.product?.title}
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-semibold text-gray-800 line-clamp-1">
                                            {item?.product?.title}
                                        </p>
                                        <p className="text-xs text-gray-400 mt-0.5 capitalize">
                                            {item?.product?.category}
                                        </p>
                                    </div>
                                    <div className="text-right shrink-0">
                                        <p className="text-sm font-bold text-gray-900">
                                            ${(
                                                (item?.product?.price || 0) * item.quantity
                                            ).toFixed(2)}
                                        </p>
                                        <p className="text-xs text-gray-400">
                                            Qty {item.quantity} × $
                                            {item?.product?.price?.toFixed(2)}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Customer details (read-only) */}
                    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
                        <h2 className="text-base font-bold text-gray-900 mb-4">
                            Customer Details
                        </h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-1">
                                    Name
                                </p>
                                <p className="text-sm font-medium text-gray-800">
                                    {users?.username}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-1">
                                    Email
                                </p>
                                <p className="text-sm font-medium text-gray-800 truncate">
                                    {users?.email}
                                </p>
                            </div>
                        </div>
                        <p className="mt-4 text-xs text-gray-400">
                            Order confirmation will be linked to this account.
                        </p>
                    </div>
                </div>

                {/* Right: order summary + payment */}
                <div className="lg:w-80 w-full shrink-0">
                    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sticky top-24">
                        <h2 className="text-lg font-bold text-gray-900 mb-5">
                            Order Summary
                        </h2>

                        <div className="space-y-3 text-sm">
                            <div className="flex justify-between text-gray-600">
                                <span>
                                    Subtotal ({totalItems} item
                                    {totalItems !== 1 ? "s" : ""})
                                </span>
                                <span className="font-semibold text-gray-800">
                                    ${subtotal.toFixed(2)}
                                </span>
                            </div>
                            <div className="flex justify-between text-gray-600">
                                <span>Shipping</span>
                                {shipping === 0 ? (
                                    <span className="font-semibold text-emerald-600">
                                        Free
                                    </span>
                                ) : (
                                    <span className="font-semibold text-gray-800">
                                        ${shipping.toFixed(2)}
                                    </span>
                                )}
                            </div>
                            {shipping > 0 && (
                                <p className="text-[11px] text-indigo-500 bg-indigo-50 rounded-lg px-3 py-1.5">
                                    Add ${(50 - subtotal).toFixed(2)} more for free
                                    shipping
                                </p>
                            )}
                        </div>

                        <div className="border-t border-gray-100 mt-5 pt-4 flex justify-between items-center">
                            <span className="font-bold text-gray-900">Total</span>
                            <span className="font-bold text-2xl text-gray-900">
                                ${total.toFixed(2)}
                            </span>
                        </div>

                        {/* Razorpay badge */}
                        <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-400">
                            <i className="ri-shield-check-line text-emerald-500"></i>
                            Secure payment via Razorpay
                        </div>

                        <button
                            onClick={handlePayment}
                            disabled={paying}
                            className="mt-4 w-full bg-indigo-600 text-white font-semibold py-3.5 rounded-xl hover:bg-indigo-700 active:scale-[0.98] transition-all flex items-center justify-center gap-2 text-sm disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {paying ? (
                                <>
                                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                                    Opening Payment...
                                </>
                            ) : (
                                <>
                                    <i className="ri-secure-payment-line text-base"></i>
                                    Pay ${total.toFixed(2)}
                                </>
                            )}
                        </button>

                        <Link
                            to="/cart"
                            className="mt-3 w-full block text-center text-sm text-gray-500 hover:text-indigo-600 transition-colors py-1"
                        >
                            ← Back to Cart
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
