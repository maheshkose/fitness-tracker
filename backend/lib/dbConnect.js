import mongoose from "mongoose"
import 'dotenv/config'

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL,{dbName:"fitness"});
        console.log("MongoDB connected");
        
    } catch (error) {
        console.log(error.message || "MongoDB connection error");
        
    }
}

export default connectDb;