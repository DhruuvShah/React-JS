import { nanoid } from "nanoid";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { asynccreateproduct } from "../../store/actions/productActions";

const CATEGORIES = [
    "men's clothing",
    "women's clothing",
    "electronics",
    "jewelery",
];

const CreateProduct = () => {
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors, isSubmitting },
    } = useForm();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const previewImage = watch("image");
    const previewTitle = watch("title");
    const previewPrice = watch("price");
    const previewCategory = watch("category");

    const CreateProductHandler = async (data) => {
        const product = {
            ...data,
            id: nanoid(),
            price: parseFloat(data.price) || 0,
            stock: parseInt(data.stock) || 0,
            rating: { rate: 0, count: 0 },
        };
        await dispatch(asynccreateproduct(product));
        toast.success("Product created successfully!");
        reset();
        navigate("/products");
    };

    return (
        <div className="max-w-5xl mx-auto">
            {/* Page header */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Create Product</h1>
                <p className="text-sm text-gray-500 mt-1">
                    Add a new product to the store
                </p>
            </div>

            <div className="flex flex-col lg:flex-row gap-8 items-start">
                {/* Form */}
                <div className="flex-1 bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
                    <form
                        onSubmit={handleSubmit(CreateProductHandler)}
                        className="space-y-5"
                        noValidate
                    >
                        {/* Image URL */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                Image URL
                            </label>
                            <input
                                {...register("image", {
                                    required: "Image URL is required",
                                    pattern: {
                                        value: /^https?:\/\/.+/,
                                        message: "Must be a valid URL starting with http(s)://",
                                    },
                                })}
                                type="url"
                                placeholder="https://example.com/image.jpg"
                                className={`w-full px-3.5 py-2.5 text-sm border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all ${
                                    errors.image
                                        ? "border-red-400 bg-red-50"
                                        : "border-gray-200 bg-gray-50 focus:bg-white"
                                }`}
                            />
                            {errors.image && (
                                <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                                    <i className="ri-error-warning-line"></i>
                                    {errors.image.message}
                                </p>
                            )}
                        </div>

                        {/* Title */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                Product Title
                            </label>
                            <input
                                {...register("title", {
                                    required: "Title is required",
                                    minLength: {
                                        value: 3,
                                        message: "Title must be at least 3 characters",
                                    },
                                })}
                                type="text"
                                placeholder="e.g. Classic Cotton T-Shirt"
                                className={`w-full px-3.5 py-2.5 text-sm border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all ${
                                    errors.title
                                        ? "border-red-400 bg-red-50"
                                        : "border-gray-200 bg-gray-50 focus:bg-white"
                                }`}
                            />
                            {errors.title && (
                                <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                                    <i className="ri-error-warning-line"></i>
                                    {errors.title.message}
                                </p>
                            )}
                        </div>

                        {/* Price + Stock row */}
                        <div className="flex gap-4">
                            <div className="flex-1">
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                    Price ($)
                                </label>
                                <input
                                    {...register("price", {
                                        required: "Price is required",
                                        min: {
                                            value: 0.01,
                                            message: "Price must be greater than 0",
                                        },
                                    })}
                                    type="number"
                                    step="0.01"
                                    placeholder="0.00"
                                    className={`w-full px-3.5 py-2.5 text-sm border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all ${
                                        errors.price
                                            ? "border-red-400 bg-red-50"
                                            : "border-gray-200 bg-gray-50 focus:bg-white"
                                    }`}
                                />
                                {errors.price && (
                                    <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                                        <i className="ri-error-warning-line"></i>
                                        {errors.price.message}
                                    </p>
                                )}
                            </div>

                            <div className="flex-1">
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                    Stock
                                </label>
                                <input
                                    {...register("stock", {
                                        required: "Stock is required",
                                        min: {
                                            value: 0,
                                            message: "Stock cannot be negative",
                                        },
                                    })}
                                    type="number"
                                    placeholder="0"
                                    className={`w-full px-3.5 py-2.5 text-sm border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all ${
                                        errors.stock
                                            ? "border-red-400 bg-red-50"
                                            : "border-gray-200 bg-gray-50 focus:bg-white"
                                    }`}
                                />
                                {errors.stock && (
                                    <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                                        <i className="ri-error-warning-line"></i>
                                        {errors.stock.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Category dropdown */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                Category
                            </label>
                            <select
                                {...register("category", {
                                    required: "Category is required",
                                })}
                                className={`w-full px-3.5 py-2.5 text-sm border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all appearance-none bg-no-repeat cursor-pointer ${
                                    errors.category
                                        ? "border-red-400 bg-red-50"
                                        : "border-gray-200 bg-gray-50 focus:bg-white"
                                }`}
                            >
                                <option value="">Select a category...</option>
                                {CATEGORIES.map((cat) => (
                                    <option key={cat} value={cat}>
                                        {cat.charAt(0).toUpperCase() + cat.slice(1)}
                                    </option>
                                ))}
                            </select>
                            {errors.category && (
                                <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                                    <i className="ri-error-warning-line"></i>
                                    {errors.category.message}
                                </p>
                            )}
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                Description
                            </label>
                            <textarea
                                {...register("description", {
                                    required: "Description is required",
                                    minLength: {
                                        value: 10,
                                        message: "Description must be at least 10 characters",
                                    },
                                })}
                                rows={4}
                                placeholder="Describe the product in detail..."
                                className={`w-full px-3.5 py-2.5 text-sm border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all resize-none ${
                                    errors.description
                                        ? "border-red-400 bg-red-50"
                                        : "border-gray-200 bg-gray-50 focus:bg-white"
                                }`}
                            ></textarea>
                            {errors.description && (
                                <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                                    <i className="ri-error-warning-line"></i>
                                    {errors.description.message}
                                </p>
                            )}
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3 pt-2">
                            <button
                                type="button"
                                onClick={() => { reset(); navigate("/products"); }}
                                className="px-5 py-2.5 border border-gray-200 text-gray-600 text-sm font-semibold rounded-xl hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="flex-1 bg-indigo-600 text-white font-semibold py-2.5 rounded-xl hover:bg-indigo-700 active:scale-[0.98] transition-all flex items-center justify-center gap-2 text-sm disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? (
                                    <>
                                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                                        Creating...
                                    </>
                                ) : (
                                    <>
                                        <i className="ri-add-circle-line text-base"></i>
                                        Create Product
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Live Preview */}
                <div className="lg:w-72 shrink-0 w-full">
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3 px-1">
                        Live Preview
                    </p>
                    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                        {/* Image */}
                        <div className="h-52 bg-gray-50 flex items-center justify-center p-4">
                            {previewImage ? (
                                <img
                                    src={previewImage}
                                    alt="preview"
                                    className="max-h-full max-w-full object-contain"
                                    onError={(e) => { e.target.style.display = "none"; }}
                                />
                            ) : (
                                <div className="flex flex-col items-center gap-2 text-gray-300">
                                    <i className="ri-image-add-line text-4xl"></i>
                                    <span className="text-xs">Image preview</span>
                                </div>
                            )}
                        </div>

                        {/* Info */}
                        <div className="p-4 space-y-1.5">
                            <span className="text-[11px] font-semibold uppercase tracking-wider text-indigo-500">
                                {previewCategory || "Category"}
                            </span>
                            <p className="text-sm font-semibold text-gray-800 line-clamp-2 leading-snug min-h-[2.5rem]">
                                {previewTitle || (
                                    <span className="text-gray-300">Product title</span>
                                )}
                            </p>
                            <div className="flex items-center justify-between pt-1">
                                <span className="text-base font-bold text-gray-900">
                                    {previewPrice
                                        ? `$${parseFloat(previewPrice).toFixed(2)}`
                                        : <span className="text-gray-300 font-normal text-sm">Price</span>}
                                </span>
                                <div className="flex items-center gap-1 text-xs text-amber-400">
                                    {Array.from({ length: 5 }, (_, i) => (
                                        <i key={i} className="ri-star-line text-gray-200"></i>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <p className="text-xs text-gray-400 text-center mt-3">
                        Preview updates as you type
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CreateProduct;
