import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useApi } from "../context/api.context.jsx";

const AddBook = () => {
    const { createBook } = useApi();

    const navigate = useNavigate()
    const [newBook, setNewBook] = useState({
        coverimage: "",
        title: "",
        author: "",
        price: "",
        description: ""
    })

    const [errors, setErrors] = useState({})
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitError, setSubmitError] = useState("")

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target
        setNewBook(prev => ({
            ...prev,
            [name]: value
        }))
        // Clear error for this field when user types
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ""
            }))
        }
    }

    // Validate form
    const validateForm = () => {
        const newErrors = {}

        if (!newBook.title.trim()) {
            newErrors.title = "Title is required"
        }
        if (!newBook.author.trim()) {
            newErrors.author = "Author is required"
        }
        if (!newBook.price || isNaN(newBook.price) || Number(newBook.price) <= 0) {
            newErrors.price = "Please enter a valid price"
        }
        if (!newBook.description.trim()) {
            newErrors.description = "Description is required"
        }
        if (newBook.coverimage && !isValidUrl(newBook.coverimage)) {
            newErrors.coverimage = "Please enter a valid URL"
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    // Validate URL helper
    const isValidUrl = (string) => {
        try {
            new URL(string)
            return true
        } catch (_) {
            return false
        }
    }

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault()
        setSubmitError("")

        if (!validateForm()) {
            return
        }

        setIsSubmitting(true)

        try {
            // Prepare data - convert price to number
            const bookData = {
                ...newBook,
                price: Number(newBook.price)
            }

            const result = await createBook(bookData)

            if (result) {
                console.log("book created successfully")
                setNewBook({
                    coverimage: "",
                    title: "",
                    author: "",
                    price: "",
                    description: ""
                })

                setTimeout(() => {
                    navigate("/")
                }, 1500)
            } else{
                setSubmitError("failed to create a book")
            }
        } catch (error) {
            setSubmitError("Network error. Please try again.")
            console.error("Error creating book:", error)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="max-w-3xl mx-auto p-6">
            <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Add New Book</h1>

                {submitError && (
                    <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                        {submitError}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Cover Image URL */}
                    <div>
                        <label htmlFor="coverimage" className="block text-sm font-medium text-gray-700 mb-1">
                            Cover Image URL
                        </label>
                        <input
                            type="url"
                            id="coverimage"
                            name="coverimage"
                            value={newBook.coverimage}
                            onChange={handleChange}
                            placeholder="https://example.com/book-cover.jpg"
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition ${errors.coverimage ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {errors.coverimage && (
                            <p className="mt-1 text-sm text-red-600">{errors.coverimage}</p>
                        )}
                        {newBook.coverimage && !errors.coverimage && isValidUrl(newBook.coverimage) && (
                            <div className="mt-2">
                                <p className="text-sm text-green-600">✓ Valid URL</p>
                                <img
                                    src={newBook.coverimage}
                                    alt="Book cover preview"
                                    className="mt-2 h-32 w-auto object-cover rounded border border-gray-200"
                                    onError={(e) => {
                                        e.target.style.display = 'none'
                                    }}
                                />
                            </div>
                        )}
                    </div>

                    {/* Title */}
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                            Title *
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={newBook.title}
                            onChange={handleChange}
                            placeholder="Enter book title"
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition ${errors.title ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {errors.title && (
                            <p className="mt-1 text-sm text-red-600">{errors.title}</p>
                        )}
                    </div>

                    {/* Author */}
                    <div>
                        <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-1">
                            Author *
                        </label>
                        <input
                            type="text"
                            id="author"
                            name="author"
                            value={newBook.author}
                            onChange={handleChange}
                            placeholder="Enter author name"
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition ${errors.author ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {errors.author && (
                            <p className="mt-1 text-sm text-red-600">{errors.author}</p>
                        )}
                    </div>

                    {/* Price */}
                    <div>
                        <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                            Price ($) *
                        </label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            value={newBook.price}
                            onChange={handleChange}
                            placeholder="0.00"
                            step="0.01"
                            min="0"
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition ${errors.price ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {errors.price && (
                            <p className="mt-1 text-sm text-red-600">{errors.price}</p>
                        )}
                    </div>

                    {/* Description */}
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                            Description *
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={newBook.description}
                            onChange={handleChange}
                            placeholder="Enter book description"
                            rows="5"
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-y ${errors.description ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {errors.description && (
                            <p className="mt-1 text-sm text-red-600">{errors.description}</p>
                        )}
                        <p className="mt-1 text-sm text-gray-500">
                            {newBook.description.length} characters
                        </p>
                    </div>

                    {/* Form Actions */}
                    <div className="flex flex-wrap gap-4 pt-4 border-t border-gray-200">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors font-medium ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {isSubmitting ? (
                                <>
                                    <span className="inline-block animate-spin mr-2">⟳</span>
                                    Creating...
                                </>
                            ) : (
                                'Create Book'
                            )}
                        </button>

                        <button
                            type="button"
                            onClick={() => navigate("/")}
                            className="px-6 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors font-medium"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddBook