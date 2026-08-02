import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useApi } from "../context/api.context.jsx";

const Home = () => {
    const { books, loading, deleteBook } = useApi();
    const navigate = useNavigate()
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [bookToDelete, setBookToDelete] = useState(null);

    // Handle actual deletion
    const handleConfirmDelete = async () => {
        if (!bookToDelete) return;

        try {
            await deleteBook(bookToDelete._id);
            setShowDeleteModal(false);
            setBookToDelete(null);
        } catch (error) {
            console.error("Error deleting book:", error);
        }
    };

    // Handle cancel deletion
    const handleCancelDelete = () => {
        setShowDeleteModal(false);
        setBookToDelete(null);
    };

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
                            <button onClick={() => navigate(`/edit/${book._id}`)} className="flex-1 bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded text-sm font-medium transition-colors">
                                Update
                            </button>
                            <button onClick={() => {
                                setBookToDelete(book);
                                setShowDeleteModal(true);
                            }} className="flex-1 bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded text-sm font-medium transition-colors">
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

                {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg max-w-md w-full p-6 shadow-xl">
                        {/* Modal Header */}
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-bold text-gray-800">Confirm Delete</h3>
                            <button
                                onClick={handleCancelDelete}
                                className="text-gray-500 hover:text-gray-700 text-2xl"
                            >
                                x
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="mb-6">
                            <p className="text-gray-600 mb-2">
                                Are you sure you want to delete this book?
                            </p>
                            {bookToDelete && (
                                <div className="bg-gray-50 p-3 rounded border border-gray-200">
                                    <p className="font-semibold text-gray-800">
                                        "{bookToDelete.title || "Untitled"}"
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        by {bookToDelete.author || "Unknown Author"}
                                    </p>
                                </div>
                            )}
                            <p className="text-red-500 text-sm mt-3">
                                ⚠️ This action cannot be undone.
                            </p>
                        </div>

                        {/* Modal Footer - Buttons */}
                        <div className="flex gap-3">
                            <button
                                onClick={handleCancelDelete}
                                className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded font-medium transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleConfirmDelete}
                                className="flex-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded font-medium transition-colors flex items-center justify-center"
                            >
                                Delete Book
                            </button>
                        </div>
                    </div>
                </div>
            )}

            </div>
        </div>
    )
}

export default Home