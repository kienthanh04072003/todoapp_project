import mongoose from 'mongoose';

// lam viec voi ham bat dong bo luon luon dong try - catch
export const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
        console.log("lien ket csdl thanh cong");
    } catch (error) {
        console.error("loi khi lien ket csdl", error);
        process.exit(1); // thoat khoi ung dung neu khong ket noi duoc csdl
    }
}