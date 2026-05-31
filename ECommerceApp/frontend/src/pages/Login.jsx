import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { asyncloginuser } from "../store/actions/userActions";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const LoginHandler = async (data) => {
        const user = await dispatch(asyncloginuser(data));
        if (user) {
            navigate("/");
        } else {
            toast.error("Invalid email or password. Please try again.");
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center py-8">
            <div className="w-full max-w-md">
                {/* Header */}
                <div className="text-center mb-8">
                    <Link to="/" className="inline-flex items-center gap-2 mb-5">
                        <i className="ri-shopping-bag-2-fill text-3xl text-indigo-600"></i>
                        <span className="font-bold text-2xl text-gray-900">
                            Shop<span className="text-indigo-600">Sphere</span>
                        </span>
                    </Link>
                    <h1 className="text-2xl font-bold text-gray-900">Welcome back</h1>
                    <p className="text-sm text-gray-500 mt-1">Sign in to your account to continue</p>
                </div>

                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
                    <form onSubmit={handleSubmit(LoginHandler)} className="space-y-5" noValidate>
                        {/* Email */}
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
                                placeholder="john@example.com"
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

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    {...register("password", {
                                        required: "Password is required",
                                        minLength: {
                                            value: 6,
                                            message: "Password must be at least 6 characters",
                                        },
                                    })}
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    className={`w-full px-3.5 py-2.5 pr-11 text-sm border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all ${
                                        errors.password
                                            ? "border-red-400 bg-red-50"
                                            : "border-gray-200 bg-gray-50 focus:bg-white"
                                    }`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword((v) => !v)}
                                    tabIndex={-1}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    <i className={showPassword ? "ri-eye-off-line text-lg" : "ri-eye-line text-lg"}></i>
                                </button>
                            </div>
                            {errors.password && (
                                <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                                    <i className="ri-error-warning-line"></i>
                                    {errors.password.message}
                                </p>
                            )}
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-xl hover:bg-indigo-700 active:scale-[0.98] transition-all flex items-center justify-center gap-2 text-sm disabled:opacity-70 disabled:cursor-not-allowed mt-1"
                        >
                            {isSubmitting ? (
                                <>
                                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                                    Signing in...
                                </>
                            ) : (
                                "Sign In"
                            )}
                        </button>
                    </form>
                </div>

                <p className="text-center text-sm text-gray-500 mt-5">
                    Don&apos;t have an account?{" "}
                    <Link to="/register" className="text-indigo-600 font-semibold hover:underline">
                        Create one
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
