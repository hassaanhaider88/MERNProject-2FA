import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URL);
        console.log("DataBase Connected Successfully ✔", conn.connection.host);
    } catch (error) {
        console.log(("DataBase Connection Failed ❌" + error));
        process.exit(1);
    }
}

export default connectDB;