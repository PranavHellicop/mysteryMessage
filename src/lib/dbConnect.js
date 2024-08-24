import mongoose from "mongoose";

const connection = {
    isConnected: false
}

async function dbConnect() {
    if (connection.isConnected) {
        console.log("already connected to database");
    }
    try {
        const db = await mongoose.connect(process.env.MONGODB_URI || "", {})

        // console.log("dbConnect.js--->db------>", db)
        connection.isConnected = true
        console.log("DB connected successfully");
    }
    catch (error) {
        console.log("Database connection failed",error);
        process.exit(1)
    }

}

export default dbConnect