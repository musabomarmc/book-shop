import { text } from "express";
import mongoose from "mongoose"

const userSchema = new  mongoose.Schema(
    {
        userName: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        role: {
            type: String
        },
    },
    {
        timestamps: true
    }
)

const userTable = mongoose.model("users", userSchema)
export default userTable;