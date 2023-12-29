import mongoose from "mongoose"

const URL = "mongodb+srv://josephine:josephine@cluster0.v1d2dga.mongodb.net/ACB?retryWrites=true&w=majority";

export const connectDB = async () => {
    await mongoose.connect(URL)
    
}