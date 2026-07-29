import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { useApi } from "../context/api.context.jsx"
const BookDetails = () => {
    const { getSingleBook, loading } = useApi();
    const { id } = useParams()
    const [book, setBook] = useState()

    useEffect(() => {
        const fetchBooks = async () => {
            const result = await getSingleBook(id);
            if (result) {
                setBook(result)
            }
        }
        fetchBooks();
    }, [])

    if(loading){
        return (
            <div className="p-8 flex justify-center items-center min-h-[60vh]">
                <div className="text-xl text-gray-600">Loading book....</div>
            </div>
        )
    }

    // If no book found
    if (!book) {
        return (
            <div className="p-8 flex justify-center items-center min-h-[60vh]">
                <div className="text-xl text-gray-600">Book not found</div>
            </div>
        )
    }

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
                <div className="md:flex">
                    {/* Book Cover Image */}
                    <div className="md:flex-shrink-0 flex justify-center p-6 bg-gray-50">
                        <img
                            src={book.coverimage}
                            alt={book.title || "Book"}
                            className="w-full max-w-[300px] h-auto rounded-lg shadow-md"
                        />
                    </div>

                    {/* Book Details */}
                    <div className="p-6 md:p-8 flex-1">
                        {/* Title */}
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">
                            {book.title || "Untitled"}
                        </h1>

                        {/* Author */}
                        <p className="text-xl text-gray-600 mb-4">
                            by {book.author || "Unknown Author"}
                        </p>

                        {/* Price */}
                        <div className="mb-4">
                            <span className="text-2xl font-bold text-green-600">
                                ${book.price || "0.00"}
                            </span>
                        </div>

                        {/* Description */}
                        <div className="mb-6">
                            <h3 className="text-lg font-semibold text-gray-700 mb-2">Description</h3>
                            <p className="text-gray-600 leading-relaxed">
                                {book.description || "No description available for this book."}
                            </p>
                        </div>

                        {/* Created At & Updated At */}
                        <div className="border-t border-gray-200 pt-4 mt-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm text-gray-500">Created</p>
                                    <p className="text-sm font-medium text-gray-700">
                                        {book.createdAt
                                            ? new Date(book.createdAt).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })
                                            : "N/A"
                                        }
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Last Updated</p>
                                    <p className="text-sm font-medium text-gray-700">
                                        {book.updatedAt
                                            ? new Date(book.updatedAt).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })
                                            : "N/A"
                                        }
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-3 mt-6">
                            <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors">
                                Edit Book
                            </button>
                            <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition-colors">
                                Delete Book
                            </button>
                            <button className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg transition-colors">
                                Back to Books
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BookDetails