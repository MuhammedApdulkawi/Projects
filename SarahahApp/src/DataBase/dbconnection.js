import mongoose from "mongoose";
const dbConnection = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/sarahahApp');
        console.log('connected successfully');
    } catch (error) {
        console.log('Failed To Connect the database');
    }
}
export default dbConnection