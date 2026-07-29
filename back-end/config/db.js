import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL)
        console.log(`connected to mongoDB: ${conn.connection.host}`)
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
}