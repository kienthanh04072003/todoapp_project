import express from "express";
import tasksRoutes from "./routes/tasksRoutes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";

dotenv.config();

const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

const app = express();

//middle ware
app.use(express.json());

if(process.env.NODE_ENV !== "production"){
    app.use(cors({origin: "http://localhost:5173"}));
}// cho phep cac ung dung o domain khac co the truy cap du lieu tu server nay

app.use(express.json()); // middleware chuyen doi du lieu gui len thanh dang json


app.use("/api/task", tasksRoutes);

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, "../FrontEnd/dist"))); // phuc vu cac file tinh tu thu muc dist

    app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../FrontEnd/dist/index.html"));
})
}

// dung nhu nay de khi ket noi csdl thanh cong the sever moi duoc hoat dong neu ket noi khong duoc thi se khong the khoi dong sv
connectDB().then(()=>{
    app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
});




