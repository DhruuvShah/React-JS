import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import { asynclogoutuser } from "../store/actions/userActions";

const Nav = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.userReducer.users);
    const [searchQuery, setSearchQuery] = useState("");
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null);
    const navigate = useNavigate();

    const handleLogout = () => {
        setMenuOpen(false);
        dispatch(asynclogoutuser());
        navigate("/login");
    };

    const cartCount = user?.cart?.reduce((sum, item) => sum + item.quantity, 0) ?? 0;
    const wishlistCount = user?.wishlist?.length ?? 0;

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
        }
    };

    return (
        <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 gap-4">

                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2.5 shrink-0">
                        <div className="w-8 h-8 bg-indigo-600 rounded-[9px] flex items-center justify-center shadow-sm">
                            <ShoppingBag className="w-[18px] h-[18px] text-white" strokeWidth={2.25} />
                        </div>
                        <span className="font-semibold text-[17px] tracking-[-0.4px] text-gray-900 select-none">
                            Shop<span className="text-indigo-600">Sphere</span>
                        </span>
                    </Link>

                    {/* Search bar */}
                    <form onSubmit={handleSearch} className="flex-1 max-w-xl">
                        <div className="relative">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search for products..."
                                className="w-full pl-4 pr-10 py-2 text-sm text-gray-900 border border-gray-300 rounded-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent focus:bg-white transition-all"
                            />
                            <button
                                type="submit"
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-600 transition-colors"
                            >
                                <i className="ri-search-line text-lg"></i>
                            </button>
                        </div>
                    </form>

                    {/* Right section */}
                    <div className="flex items-center gap-1 shrink-0">
                        {user ? (
                            <>
                                {/* Wishlist icon */}
                                <NavLink
                                    to="/wishlist"
                                    title="Wishlist"
                                    className="relative p-2 text-gray-500 hover:text-indigo-600 transition-colors"
                                >
                                    <i className="ri-heart-line text-xl"></i>
                                    {wishlistCount > 0 && (
                                        <span className="absolute -top-0.5 -right-0.5 bg-rose-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold leading-none">
                                            {wishlistCount}
                                        </span>
                                    )}
                                </NavLink>

                                {/* Cart icon */}
                                <NavLink
                                    to="/cart"
                                    title="Cart"
                                    className="relative p-2 text-gray-500 hover:text-indigo-600 transition-colors"
                                >
                                    <i className="ri-shopping-cart-2-line text-xl"></i>
                                    {cartCount > 0 && (
                                        <span className="absolute -top-0.5 -right-0.5 bg-indigo-600 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold leading-none">
                                            {cartCount > 9 ? "9+" : cartCount}
                                        </span>
                                    )}
                                </NavLink>

                                {/* User avatar + dropdown */}
                                <div className="relative ml-1" ref={menuRef}>
                                    <button
                                        onClick={() => setMenuOpen((prev) => !prev)}
                                        className="flex items-center gap-1.5 pl-1 pr-2 py-1 rounded-full hover:bg-gray-100 transition-colors"
                                    >
                                        <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-semibold text-sm uppercase select-none">
                                            {user.username[0]}
                                        </div>
                                        <i className={`ri-arrow-${menuOpen ? "up" : "down"}-s-line text-gray-400 text-sm`}></i>
                                    </button>

                                    {menuOpen && (
                                        <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl border border-gray-100 shadow-xl py-1.5 z-50">
                                            {/* User info header */}
                                            <div className="px-4 py-2.5 border-b border-gray-100">
                                                <p className="text-sm font-semibold text-gray-900 truncate">
                                                    {user.username}
                                                </p>
                                                <p className="text-xs text-gray-500 truncate">{user.email}</p>
                                                {user.isAdmin && (
                                                    <span className="inline-block mt-1.5 text-[10px] font-bold uppercase tracking-wide bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full">
                                                        Admin
                                                    </span>
                                                )}
                                            </div>

                                            {/* Menu items */}
                                            {user.isAdmin && (
                                                <NavLink
                                                    to="/admin/create-product"
                                                    onClick={() => setMenuOpen(false)}
                                                    className="flex items-center gap-2.5 px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                                                >
                                                    <i className="ri-add-box-line text-base"></i>
                                                    Create Product
                                                </NavLink>
                                            )}
                                            <NavLink
                                                to="/admin/user-profile"
                                                onClick={() => setMenuOpen(false)}
                                                className="flex items-center gap-2.5 px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                                            >
                                                <i className="ri-user-settings-line text-base"></i>
                                                My Account
                                            </NavLink>
                                            <NavLink
                                                to="/wishlist"
                                                onClick={() => setMenuOpen(false)}
                                                className="flex items-center gap-2.5 px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                                            >
                                                <i className="ri-heart-line text-base"></i>
                                                Wishlist
                                            </NavLink>
                                            <div className="border-t border-gray-100 my-1"></div>
                                            <button
                                                onClick={handleLogout}
                                                className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                                            >
                                                <i className="ri-logout-box-r-line text-base"></i>
                                                Sign Out
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </>
                        ) : (
                            <div className="flex items-center gap-2">
                                <NavLink
                                    to="/login"
                                    className="text-sm font-medium text-gray-700 hover:text-indigo-600 px-3 py-2 transition-colors"
                                >
                                    Login
                                </NavLink>
                                <NavLink
                                    to="/register"
                                    className="text-sm font-medium bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700 transition-colors"
                                >
                                    Register
                                </NavLink>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </nav>
    );
};

export default Nav;
