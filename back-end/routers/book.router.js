import { Router } from "express";

import {getBooks, getbookById, createBook, updateBook, deleteBook} from "../controllers/book.controller.js"

const router = Router()

// get all books
router.get("/", getBooks)

// get single book
router.get("/:id", getbookById)

// create new book
router.post("/", createBook)

//  update book
router.put("/:id", updateBook)

//  delete book
router.delete("/:id", deleteBook)

export default router;