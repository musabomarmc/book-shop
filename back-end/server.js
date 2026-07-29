import express from "express";
import dotenv from "dotenv";
import bookRouter from "./routers/book.router.js";
import { connectDB } from "./config/db.js";
import authRouter from "./routers/auth.router.js";

const app = express();
app.use(express.json());
dotenv.config()

// book router
app.use("/api/book", bookRouter)

// Auth router
app.use("/api/auth", authRouter);

const port = process.env.PORT || 4000
app.listen(port, () => {
    connectDB();
    console.log(`the server is running at ${port}`)
})