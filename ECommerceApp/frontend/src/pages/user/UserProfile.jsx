import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
    asyncdeleteuser,
    asynclogoutuser,
    asyncupdateuser,
} from "../../store/actions/userActions";

const TABS = ["Account", "Orders", "Danger Zone"];

const UserProfile = () => {
    const { users } = useSelector((state) => state.userReducer);
    const [activeTab, setActiveTab] = useState("Account");
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: {
            username: users?.username,
            email: users?.email,
            password: users?.password,
        },
    });

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const UpdateUserHandler = async (data) => {
        await dispatch(asyncupdateuser(users.id, data));
        toast.success("Profile updated successfully!");
    };

    const LogoutUserHandler = () => {
        dispatch(asynclogoutuser());
        navigate("/login");
    };

    const DeleteHandler = () => {
        dispatch(asyncdeleteuser(users.id));
        navigate("/login");
    };

    if (!users) {
        return (
            <div className="flex items-center justify-center min-h-[50vh]">
                <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto">
            {/* Profile header */}
            <div className="flex items-center gap-5 mb-8">
                <div className="w-16 h-16 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-2xl uppercase select-none shrink-0">
                    {users.username[0]}
                </div>
                <div>
                    <h1 className="text-xl font-bold text-gray-900">{users.username}</h1>
                    <p className="text-sm text-gray-500">{users.email}</p>
                    {users.isAdmin && (
                        <span className="inline-block mt-1 text-[10px] font-bold uppercase tracking-wide bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full">
                            Admin
                        </span>
                    )}
                </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 bg-gray-100 rounded-xl p-1 mb-6">
                {TABS.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => {
                            setActiveTab(tab);
                            setShowDeleteConfirm(false);
                        }}
                        className={`flex-1 text-sm font-medium py-2 px-3 rounded-lg transition-all ${
                            activeTab === tab
                                ? "bg-white text-gray-900 shadow-sm"
                                : "text-gray-500 hover:text-gray-700"
                        }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Account Tab */}
            {activeTab === "Account" && (
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
                    <h2 className="text-base font-bold text-gray-900 mb-6">
                        Account Information
                    </h2>
                    <form
                        onSubmit={handleSubmit(UpdateUserHandler)}
                        className="space-y-5"
                        noValidate
                    >
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                Username
                            </label>
                            <input
                                {...register("username", {
                                    required: "Username is required",
                                    minLength: {
                                        value: 3,
                                        message: "Username must be at least 3 characters",
                                    },
                                })}
                                type="text"
                                className={`w-full px-3.5 py-2.5 text-sm border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all ${
                                    errors.username
                                        ? "border-red-400 bg-red-50"
                                        : "border-gray-200 bg-gray-50 focus:bg-white"
                                }`}
                            />
                            {errors.username && (
                                <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                                    <i className="ri-error-warning-line"></i>
                                    {errors.username.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                Email address
                            </label>
                            <input
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                        message: "Enter a valid email address",
                                    },
                                })}
                                type="email"
                                className={`w-full px-3.5 py-2.5 text-sm border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all ${
                                    errors.email
                                        ? "border-red-400 bg-red-50"
                                        : "border-gray-200 bg-gray-50 focus:bg-white"
                                }`}
                            />
                            {errors.email && (
                                <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                                    <i className="ri-error-warning-line"></i>
                                    {errors.email.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                Password
                            </label>
                            <input
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: {
                                        value: 6,
                                        message: "Password must be at least 6 characters",
                                    },
                                })}
                                type="password"
                                className={`w-full px-3.5 py-2.5 text-sm border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all ${
                                    errors.password
                                        ? "border-red-400 bg-red-50"
                                        : "border-gray-200 bg-gray-50 focus:bg-white"
                                }`}
                            />
                            {errors.password && (
                                <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                                    <i className="ri-error-warning-line"></i>
                                    {errors.password.message}
                                </p>
                            )}
                        </div>

                        <div className="pt-2">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="bg-indigo-600 text-white font-semibold px-6 py-2.5 rounded-xl text-sm hover:bg-indigo-700 active:scale-[0.98] transition-all flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? (
                                    <>
                                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                                        Saving...
                                    </>
                                ) : (
                                    <>
                                        <i className="ri-save-line"></i>
                                        Save Changes
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Orders Tab */}
            {activeTab === "Orders" && (
                <div>
                    {!users.orders || users.orders.length === 0 ? (
                        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 text-center">
                            <i className="ri-shopping-bag-3-line text-6xl text-gray-200"></i>
                            <p className="mt-4 text-base font-semibold text-gray-500">
                                No orders yet
                            </p>
                            <p className="text-sm text-gray-400 mt-1">
                                Your order history will appear here once you make a purchase
                            </p>
                            <button
                                onClick={() => navigate("/products")}
                                className="mt-6 inline-block bg-indigo-600 text-white text-sm font-semibold px-6 py-2.5 rounded-full hover:bg-indigo-700 transition-colors"
                            >
                                Start Shopping
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <p className="text-sm text-gray-500 font-medium">
                                {users.orders.length} order{users.orders.length !== 1 ? "s" : ""}
                            </p>
                            {[...users.orders].reverse().map((order) => (
                                <div
                                    key={order.id}
                                    className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden"
                                >
                                    {/* Order header */}
                                    <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between gap-3 flex-wrap bg-gray-50/60">
                                        <div>
                                            <p className="text-xs text-gray-400 mb-0.5">
                                                {new Date(order.date).toLocaleDateString("en-US", {
                                                    year: "numeric",
                                                    month: "long",
                                                    day: "numeric",
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                })}
                                            </p>
                                            <p className="text-[11px] text-gray-400 font-mono truncate max-w-[220px]">
                                                Payment: {order.paymentId}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-3 shrink-0">
                                            <span className="text-base font-bold text-gray-900">
                                                ${order.total.toFixed(2)}
                                            </span>
                                            <span className="text-[11px] font-semibold bg-emerald-100 text-emerald-700 px-2.5 py-1 rounded-full">
                                                {order.status}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Order items */}
                                    <div className="divide-y divide-gray-50">
                                        {order.items.map((item, idx) => (
                                            <div
                                                key={item?.product?.id ?? idx}
                                                className="flex items-center gap-4 px-6 py-3"
                                            >
                                                <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center p-1.5 shrink-0 border border-gray-100">
                                                    <img
                                                        src={item?.product?.image}
                                                        alt={item?.product?.title}
                                                        className="max-h-full max-w-full object-contain"
                                                        onError={(e) => {
                                                            e.target.style.display = "none";
                                                        }}
                                                    />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-medium text-gray-800 line-clamp-1">
                                                        {item?.product?.title}
                                                    </p>
                                                    <p className="text-xs text-gray-400 capitalize">
                                                        {item?.product?.category}
                                                    </p>
                                                </div>
                                                <div className="text-right shrink-0">
                                                    <p className="text-sm font-semibold text-gray-900">
                                                        $
                                                        {(
                                                            (item?.product?.price || 0) *
                                                            item.quantity
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

                                    {/* Order footer */}
                                    <div className="px-6 py-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400 bg-gray-50/40">
                                        <span>
                                            {order.items.reduce((s, i) => s + i.quantity, 0)} item
                                            {order.items.reduce((s, i) => s + i.quantity, 0) !== 1 ? "s" : ""}
                                        </span>
                                        <span>
                                            {order.shipping === 0
                                                ? "Free shipping"
                                                : `Shipping: $${order.shipping.toFixed(2)}`}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* Danger Zone Tab */}
            {activeTab === "Danger Zone" && (
                <div className="space-y-4">
                    {/* Logout */}
                    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 flex items-center justify-between gap-4">
                        <div>
                            <p className="text-sm font-semibold text-gray-900">
                                Sign out
                            </p>
                            <p className="text-xs text-gray-500 mt-0.5">
                                Sign out of your account on this device
                            </p>
                        </div>
                        <button
                            onClick={LogoutUserHandler}
                            className="shrink-0 flex items-center gap-1.5 text-sm font-semibold text-gray-700 border border-gray-200 px-4 py-2 rounded-xl hover:bg-gray-50 transition-colors"
                        >
                            <i className="ri-logout-box-r-line"></i>
                            Sign Out
                        </button>
                    </div>

                    {/* Delete account */}
                    <div className="bg-white rounded-2xl border border-red-200 shadow-sm p-6">
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <p className="text-sm font-semibold text-gray-900">
                                    Delete account
                                </p>
                                <p className="text-xs text-gray-500 mt-0.5">
                                    Permanently delete your account and all associated data
                                </p>
                            </div>
                            {!showDeleteConfirm && (
                                <button
                                    onClick={() => setShowDeleteConfirm(true)}
                                    className="shrink-0 flex items-center gap-1.5 text-sm font-semibold text-red-600 border border-red-200 px-4 py-2 rounded-xl hover:bg-red-50 transition-colors"
                                >
                                    <i className="ri-delete-bin-6-line"></i>
                                    Delete
                                </button>
                            )}
                        </div>

                        {showDeleteConfirm && (
                            <div className="mt-4 pt-4 border-t border-red-100">
                                <div className="flex items-start gap-3 bg-red-50 rounded-xl p-4 mb-4">
                                    <i className="ri-alert-fill text-red-500 text-lg shrink-0 mt-0.5"></i>
                                    <p className="text-sm text-red-700">
                                        This action is <strong>permanent</strong> and cannot be
                                        undone. Your account, cart, and wishlist will be deleted.
                                    </p>
                                </div>
                                <div className="flex gap-3">
                                    <button
                                        onClick={() => setShowDeleteConfirm(false)}
                                        className="flex-1 py-2.5 border border-gray-200 text-gray-600 text-sm font-semibold rounded-xl hover:bg-gray-50 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={DeleteHandler}
                                        className="flex-1 py-2.5 bg-red-600 text-white text-sm font-semibold rounded-xl hover:bg-red-700 transition-colors"
                                    >
                                        Yes, delete my account
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserProfile;
