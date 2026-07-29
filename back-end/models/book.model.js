import mongoose from "mongoose";

const bookSchema = mongoose.Schema(
    {
        title: {
            type: String,
            require: [true, "please add book titel"]
        },
        author: {
            type: String,
            require: [true, "please add author name"]
        },
        price: {
            type: String,
            require: [true, "please add price"]
        },
        description: {
            type: String,
            require: [true, "please add description"]
        },
        coverimage: {
            type: String,
            require: false
        }
    },
    {
        timestamps: true
    }
)


const bookTable = mongoose.model("bookTables", bookSchema);

export default bookTable;