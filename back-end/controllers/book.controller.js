import bookTable from "../models/book.model.js"

export const getBooks = async (req, res) => {
    try {
        const books = await bookTable.find();
        if(!books){
            return res.status(404).json({message: "books are not found"})
        }
        return res.status(200).json(books)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const getbookById = async (req, res) => {
    try {
        const book = await bookTable.findById(req.params.id)
        if(!book){
            return res.status(404).json({message: "book not found"})
        }
        return res.status(200).json(book)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const createBook = async (req, res) => {
    try {
        // get book data from the request
        const { title, author, price, description, coverimage } = req.body;

        // check if all fields are filled
        if (!title || !author || !price || !description) {
            return res.status(404).json({ message: "all fields are required" })
        }

        // create book
        const newBook = await bookTable.create({
            title, author, price, description, coverimage
        })

        return res.status(200).json(newBook)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }

}

export const updateBook = async (req, res) => {
    try {
        const updatedBook = await bookTable.findByIdAndUpdate( req.params.id , 
            req.body, {returnDocument: 'after', runvalidator: true})
        if(!updatedBook){
            return res.status(404).json({ message: "updeted books are not found" })
        }
        return res.status(200).json(updatedBook)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const deleteBook = async (req, res) => {
    try {
        const deletedBook= await bookTable.findByIdAndDelete(req.params.id)
        if(!deleteBook){
            return res.status(404).json({ message: "book not found" })
        }
        

        return res.status(200).json({message: `Book deleted successfully ${deletedBook._id}`})
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}