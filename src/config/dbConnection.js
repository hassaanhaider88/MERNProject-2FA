import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("DataBase Connected Successfully ✔");
    } catch (error) {
        console.log(("DataBase Connection Failed ❌" + error));
        process.exit(1);
    }
}

export default connectDB;