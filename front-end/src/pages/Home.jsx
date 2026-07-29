import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useApi } from "../context/api.context.jsx";

const Home = () => {
    const { books, loading } = useApi();
    const navigate = useNavigate()

    if(loading){
        return (
            <div className="p-8 flex justify-center items-center min-h-[60vh]">
                <div className="text-xl text-gray-600">Loading books...</div>
            </div>
        )
    }

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-8 text-gray-800">All Books</h1>

            {/* Grid Container */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

                {/* Map through books array */}
                {books.map((book) => (
                    <div
                        key={book._id}
                        className="border-2 border-gray-300 rounded-lg p-4 bg-gray-50 shadow-md hover:shadow-xl transition-shadow"
                    >
                        {/* Book Cover Image */}
                        <div className="flex justify-center mb-4">
                            <img
                                src={book.coverimage}
                                alt={book.title || "Book"}
                                className="w-full max-w-[200px] h-auto rounded border border-gray-300"
                            />
                        </div>

                        {/* Book Title */}
                        <h2 className="text-xl font-semibold text-gray-800 mt-2 mb-1">
                            {book.title || "Untitled"}
                        </h2>

                        {/* Book Author */}
                        <p className="text-sm text-gray-600 font-medium mb-2">
                            by {book.author || "Unknown Author"}
                        </p>

                        {/* Book Price */}
                        <p className="text-lg font-bold text-green-600 mb-3">
                            ${book.price || "0.00"}
                        </p>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-2 mt-2">
                            <button onClick={() => navigate(`/book/${book._id}`)} className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded text-sm font-medium transition-colors">
                                Details
                            </button>
                            <button className="flex-1 bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded text-sm font-medium transition-colors">
                                Update
                            </button>
                            <button className="flex-1 bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded text-sm font-medium transition-colors">
                                Delete
                            </button>
                        </div>
                    </div>
                ))}

                {/* If no books, show message */}
                {books.length === 0 && (
                    <div className="col-span-full text-center py-12">
                        <p className="text-gray-500 text-lg">No books available</p>
                    </div>
                )}

            </div>
        </div>
    )
}

export default Home