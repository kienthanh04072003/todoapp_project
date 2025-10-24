import express from "express";
import tasksRoutes from "./routes/tasksRoutes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const PORT = process.env.PORT || 5001;
const app = express();

//middle ware
app.use(express.json());
app.use(cors({origin: "http://localhost:5173"})); // cho phep cac ung dung o domain khac co the truy cap du lieu tu server nay

app.use(express.json()); // middleware chuyen doi du lieu gui len thanh dang json


app.use("/api/task", tasksRoutes);

// dung nhu nay de khi ket noi csdl thanh cong the sever moi duoc hoat dong neu ket noi khong duoc thi se khong the khoi dong sv
connectDB().then(()=>{
    app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
});




