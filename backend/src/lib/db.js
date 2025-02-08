import mongooose from "mongoose";

const connectDB = async () => {
    try {
        const conn = await mongooose.connect(process.env.MONGO_URI);
        console.log(`MongoDb connected: ${conn.connection.host}`);
    }
    catch (error) {
        console.error("MongoDb connection error: " + error?.message);
    }
};

export { connectDB };