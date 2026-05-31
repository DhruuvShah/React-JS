import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import AuthWrapper from "./AuthWarpper";
import UnauthWarpper from "./UnauthWarpper";

const Home = lazy(() => import("../pages/Home"));
const Products = lazy(() => import("../pages/Products"));
const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));
const CreateProduct = lazy(() => import("../pages/admin/CreateProduct"));
const ProductDetails = lazy(() => import("../pages/admin/ProductDetails"));
const UserProfile = lazy(() => import("../pages/user/UserProfile"));
const PageNotFound = lazy(() => import("../pages/PageNotFound"));
const Cart = lazy(() => import("../pages/Cart"));
const Checkout = lazy(() => import("../pages/Checkout"));
const Wishlist = lazy(() => import("../pages/Wishlist"));

const Spinner = () => (
    <div className="flex items-center justify-center min-h-[50vh]">
        <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
    </div>
);

const Mainroutes = () => {
    return (
        <Suspense fallback={<Spinner />}>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />

                <Route path="/login" element={<UnauthWarpper><Login /></UnauthWarpper>} />
                <Route path="/register" element={<UnauthWarpper><Register /></UnauthWarpper>} />

                <Route path="/admin/create-product" element={<AuthWrapper><CreateProduct /></AuthWrapper>} />
                <Route path="/admin/user-profile" element={<AuthWrapper><UserProfile /></AuthWrapper>} />
                <Route path="/product/:id" element={<AuthWrapper><ProductDetails /></AuthWrapper>} />
                <Route path="/cart" element={<AuthWrapper><Cart /></AuthWrapper>} />
                <Route path="/checkout" element={<AuthWrapper><Checkout /></AuthWrapper>} />
                <Route path="/wishlist" element={<AuthWrapper><Wishlist /></AuthWrapper>} />

                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </Suspense>
    );
};

export default Mainroutes;
