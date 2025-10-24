import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(

    //tham so thu 1 cua schema
    {
        title: {
            type: String,
            required: true,
            trim: true,

        },
        status: {
            type: String,
            enum: ["active", "compelete"],
            default: "active"
        },
        completedAt: {
            type: Date,
            default: null
        }
    },

    //tham so thu 2 cua schema
    {
        timestamps: true, //dong nay de tu dong them vao createdAt, updatedAt
    }
);

const Task = mongoose.model("Task", taskSchema);
export default Task;