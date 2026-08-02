import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { FaArrowLeft, FaBook, FaDollarSign, FaImage, FaUser, FaSave } from "react-icons/fa";
import { useApi } from "../context/api.context";

const EditBook = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const { loading, books, updateBook } = useApi();

    const [submitting, setSubmitting] = useState(false);
    const [errors, setErrors] = useState({});

    const [formData, setFormData] = useState({
        title: "",
        author: "",
        price: "",
        coverimage: "",
        description: "",
    });

    // Helper to validate URLs
    const isValidUrl = (urlString) => {
        try {
            return Boolean(new URL(urlString));
        } catch (e) {
            return false;
        }
    };

    // Pre-populate form data from context when loaded
    useEffect(() => {
        // ✅ Check if books exists and is an array before using .find()
        if (books && books.length > 0) {
            const currentBook = books.find((b) => b._id.toString() === id.toString());
            if (currentBook) {
                setFormData({
                    title: currentBook.title || "",
                    author: currentBook.author || "",
                    price: currentBook.price || "",
                    coverimage: currentBook.coverimage || "",
                    description: currentBook.description || "",
                });
            }
        }
    }, [id, books]);

    // Form Validation Logic
    const validateForm = () => {
        const newErrors = {};

        if (!formData.title.trim()) {
            newErrors.title = "Title is required";
        }
        if (!formData.author.trim()) {
            newErrors.author = "Author is required";
        }
        if (!formData.price || isNaN(formData.price) || Number(formData.price) <= 0) {
            newErrors.price = "Please enter a valid price";
        }
        if (!formData.description.trim()) {
            newErrors.description = "Description is required";
        }
        if (formData.coverimage && !isValidUrl(formData.coverimage)) {
            newErrors.coverimage = "Please enter a valid URL";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        // Clear field-specific error as user types
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: null }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return; // Stop submission if validation fails
        }

        setSubmitting(true);

        try {
            if (updateBook) {
                await updateBook(id, formData);
            }
            navigate("/");
        } catch (error) {
            console.error("Failed to update book:", error);
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-[80vh] flex items-center justify-center">
                <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
            <div className="max-w-4xl mx-auto">
                {/* Back Link */}
                <Link
                    to="/"
                    className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 mb-6 transition-colors"
                >
                    <FaArrowLeft className="w-4 h-4" />
                    Back to Books
                </Link>

                {/* Form Header */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 md:p-8 mb-6">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                        Edit Book Details
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                        Update the metadata and details for this book entry.
                    </p>
                </div>

                {/* Main Grid Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Cover Image Preview Column */}
                    <div className="lg:col-span-1">
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 text-center sticky top-24">
                            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">
                                Cover Image Preview
                            </h3>
                            <div className="relative aspect-[3/4] w-full max-w-[220px] mx-auto rounded-xl overflow-hidden shadow-md bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                                {formData.coverimage && !errors.coverimage ? (
                                    <img
                                        src={formData.coverimage}
                                        alt={formData.title || "Book Cover"}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src =
                                                "https://via.placeholder.com/300x400?text=No+Cover";
                                        }}
                                    />
                                ) : (
                                    <FaImage className="w-12 h-12 text-gray-400" />
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Form Controls Column */}
                    <div className="lg:col-span-2">
                        <form
                            onSubmit={handleSubmit}
                            className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 md:p-8 space-y-6"
                        >
                            {/* Title */}
                            <div>
                                <label
                                    htmlFor="title"
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
                                >
                                    Book Title
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                                        <FaBook />
                                    </div>
                                    <input
                                        type="text"
                                        id="title"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        className={`w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-900 border ${errors.title ? "border-red-500" : "border-gray-200 dark:border-gray-700"
                                            } rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm`}
                                        placeholder="Enter book title"
                                    />
                                </div>
                                {errors.title && (
                                    <p className="mt-1 text-xs text-red-500">{errors.title}</p>
                                )}
                            </div>

                            {/* Author */}
                            <div>
                                <label
                                    htmlFor="author"
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
                                >
                                    Author Name
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                                        <FaUser />
                                    </div>
                                    <input
                                        type="text"
                                        id="author"
                                        name="author"
                                        value={formData.author}
                                        onChange={handleChange}
                                        className={`w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-900 border ${errors.author ? "border-red-500" : "border-gray-200 dark:border-gray-700"
                                            } rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm`}
                                        placeholder="Enter author's name"
                                    />
                                </div>
                                {errors.author && (
                                    <p className="mt-1 text-xs text-red-500">{errors.author}</p>
                                )}
                            </div>

                            {/* Price */}
                            <div>
                                <label
                                    htmlFor="price"
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
                                >
                                    Price ($)
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                                        <FaDollarSign />
                                    </div>
                                    <input
                                        type="number"
                                        step="0.01"
                                        id="price"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleChange}
                                        className={`w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-900 border ${errors.price ? "border-red-500" : "border-gray-200 dark:border-gray-700"
                                            } rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm`}
                                        placeholder="0.00"
                                    />
                                </div>
                                {errors.price && (
                                    <p className="mt-1 text-xs text-red-500">{errors.price}</p>
                                )}
                            </div>

                            {/* Cover Image URL */}
                            <div>
                                <label
                                    htmlFor="coverimage"
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
                                >
                                    Cover Image URL
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                                        <FaImage />
                                    </div>
                                    <input
                                        type="text"
                                        id="coverimage"
                                        name="coverimage"
                                        value={formData.coverimage}
                                        onChange={handleChange}
                                        className={`w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-900 border ${errors.coverimage ? "border-red-500" : "border-gray-200 dark:border-gray-700"
                                            } rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm`}
                                        placeholder="https://example.com/cover.jpg"
                                    />
                                </div>
                                {errors.coverimage && (
                                    <p className="mt-1 text-xs text-red-500">{errors.coverimage}</p>
                                )}
                            </div>

                            {/* Description */}
                            <div>
                                <label
                                    htmlFor="description"
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
                                >
                                    Description
                                </label>
                                <textarea
                                    id="description"
                                    name="description"
                                    rows="4"
                                    value={formData.description}
                                    onChange={handleChange}
                                    className={`w-full p-3.5 bg-gray-50 dark:bg-gray-900 border ${errors.description ? "border-red-500" : "border-gray-200 dark:border-gray-700"
                                        } rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm resize-none`}
                                    placeholder="Write a brief description..."
                                ></textarea>
                                {errors.description && (
                                    <p className="mt-1 text-xs text-red-500">{errors.description}</p>
                                )}
                            </div>

                            {/* Submit Buttons */}
                            <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100 dark:border-gray-700">
                                <button
                                    type="button"
                                    onClick={() => navigate("/")}
                                    className="px-5 py-2.5 rounded-xl text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-medium bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md shadow-blue-500/25 transition-all duration-200 disabled:opacity-50"
                                >
                                    <FaSave className="w-4 h-4" />
                                    {submitting ? "Saving..." : "Save Changes"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditBook;
