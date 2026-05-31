import { Link } from "react-router-dom";

const PageNotFound = () => {
    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4">
            <div className="text-center max-w-md">
                {/* 404 number */}
                <div className="relative inline-block mb-6">
                    <span className="text-[9rem] font-black leading-none select-none bg-gradient-to-br from-indigo-200 via-indigo-300 to-violet-300 bg-clip-text text-transparent">
                        404
                    </span>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <i className="ri-compass-discover-line text-5xl text-indigo-400 opacity-60"></i>
                    </div>
                </div>

                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                    Page not found
                </h1>
                <p className="text-sm text-gray-500 leading-relaxed mb-8">
                    The page you&apos;re looking for doesn&apos;t exist or has been moved.
                    Let&apos;s get you back on track.
                </p>

                <div className="flex items-center justify-center gap-3 flex-wrap">
                    <Link
                        to="/"
                        className="flex items-center gap-2 bg-indigo-600 text-white text-sm font-semibold px-6 py-2.5 rounded-full hover:bg-indigo-700 active:scale-[0.98] transition-all"
                    >
                        <i className="ri-home-4-line"></i>
                        Back to Home
                    </Link>
                    <Link
                        to="/products"
                        className="flex items-center gap-2 border border-gray-200 text-gray-700 text-sm font-semibold px-6 py-2.5 rounded-full hover:bg-gray-50 active:scale-[0.98] transition-all"
                    >
                        <i className="ri-store-2-line"></i>
                        Browse Products
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PageNotFound;
