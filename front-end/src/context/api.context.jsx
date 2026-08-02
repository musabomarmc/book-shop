import { createContext, useContext, useState, useEffect } from "react";

const apiContext = createContext();

export const ApiProvider = ({ children }) => {
    const [loading, setLoading] = useState(false)
    const [books, setBooks] = useState([])

    // to get all books use /api/book/ method get
    const getAllBooks = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/book/");
            const data = await res.json();
            if (res.ok) {
                setLoading(false);
                return data
            } else {
                console.log("get all books failed", data.message);
                setLoading(false);
            }
        } catch (error) {
            console.log("Network Error", error)
            setLoading(false);
        }
    }

    useEffect(() => {
        const fetchBooks = async () => {
            const result = await getAllBooks();
            if (result && result.length > 0) {
                setBooks(result)
            }
        }
        fetchBooks();
    }, [])

    // to get single books use /api/book/:id method get
    const getSingleBook = async (bookId) => {
        setLoading(true);
        try {
            const res = await fetch(`/api/book/${bookId}`);
            const data = await res.json();
            if (res.ok) {
                setLoading(false);
                return data
            } else {
                console.log("get SIngle book failed", data.message);
                setLoading(false);
            }

        } catch (error) {
            console.log("Network Error", error)
            setLoading(false);
        }
    }
    // to create new book use /api/book/ method post
    const createBook = async (bookInfo) => {
        setLoading(true);
        try {
            const res = await fetch("/api/book/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(bookInfo)
            });
            const data = await res.json();
            if (res.ok) {
                setBooks(prev => [...prev, data]);
                setLoading(false);
                return data
            } else {
                console.log("create new book failed", data.message);
                setLoading(false);
            }

        } catch (error) {
            console.log("Network Error", error)
            setLoading(false);
        }
    }

    // to update a book use /api/book/:id method put
    const updateBook = async (bookId, bookInfo) => {
        setLoading(true);
        try {
            const res = await fetch(`/api/book/${bookId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(bookInfo)
            });
            const data = await res.json();
            if (res.ok) {
                setBooks(prev => prev.map(book => 
                    book._id === bookId ? data : book
                ));
                setLoading(false);
                return data
            } else {
                console.log("update a book failed", data.message);
                setLoading(false);
            }

        } catch (error) {
            console.log("Network Error", error)
            setLoading(false);
        }
    }

    // to delete a book use /api/book/:id method delete
    const deleteBook = async (bookId) => {
        setLoading(true);
        try {
            const res = await fetch(`/api/book/${bookId}`, {
                method: "DELETE"
            });
            const data = await res.json();
            if (res.ok) {
                setBooks(prev => prev.filter(book => book._id !== bookId));
                setLoading(false);
                return data
            } else {
                console.log("delete a book failed", data.message);
                setLoading(false);
            }

        } catch (error) {
            console.log("Network Error", error)
            setLoading(false);
        }
    }

    const value = {
        getAllBooks,
        getSingleBook,
        createBook,
        updateBook,
        deleteBook,
        books,
        loading
    }

    return (
        <apiContext.Provider value={value}>
            {children}
        </apiContext.Provider>
    )
}

export const useApi = () => {
    const context = useContext(apiContext);
    if (!context) {
        throw new Error("Error in UseApi")
    }
    return context
}