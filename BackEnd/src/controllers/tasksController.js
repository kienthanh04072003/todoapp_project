import Task from "../models/Task.js";


export const getAlltasks = async (req, res) => {
    try {
        // lay toan bo du lieu trong collection tasks
      //  const tasks = await Task.find().sort({createdAt: -1}); 
        
        const result = await Task.aggregate([
            {
                $facet: {
                    tasks: [{$sort: {createdAt: -1}}], // sap xep giam dan theo thoi gian tao
                    activeCount: [{$match: {status: "active"}}, {$count: "count"}], // dem so luong task con hoat dong
                    completedCount: [{$match: {status: "completed"}}, {$count: "count"}] // dem so luong task da hoan thanh
                }
            }
        ]);

        const tasks = result[0].tasks;
        const activeCount = result[0].activeCount[0]?.count || 0;
        const completedCount = result[0].activeCount[0]?.count || 0;


       // throw new Error("loi tao tu tao") tao bua 1 loi de test catch loi sv
        res.status(200).json({  tasks, activeCount, completedCount});
    } catch (error) {
        console.error("loi khi goi toan bo task", error); // loi cho dev doc
        res.status(500).json({message: "loi sever"}) // loi cho nguoi dung doc
    }
};


export const createtasks = async (req, res) => {
    try {
        const {title} = req.body;
        const task = new Task({title});
        const newTask = await task.save(); // luu task moi tao vao csdl
        res.status(201).json(newTask);
    } catch (error) {
        console.error("loi khi goi create task", error); // loi cho dev doc
        res.status(500).json({message: "loi sever"}) // loi cho nguoi dung doc
    }
};

export const updatetasks = async (req, res) => {
    try {
        const {title, status, completedAt} = req.body; // lay nhung truong co the update
        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id, // lay id tren url
            {
                title,
                status,
                completedAt
            },
            {new: true} // de tra ve task moi sau khi update
        );

        if(!updatedTask) {
            return res.status(404).json({message: "nhiem vu khong ton tai"});
        }
        res.status(200).json(updatedTask);

    } catch (error) {
         console.error("loi khi goi update task", error); // loi cho dev doc
         res.status(500).json({message: "loi sever"}) // loi cho nguoi dung doc
    }
};

export const deletetasks = async (req, res) => {
    try {
        const deletedTask = await Task.findByIdAndDelete(req.params.id);

        if(!deletedTask) {
            return res.status(404).json({message: "nhiem vu khong ton tai"});
        }
        res.status(200).json({message: "xoa nhiem vu thanh cong"});
    } catch (error) {
        console.error("loi khi goi delete task", error); // loi cho dev doc
         res.status(500).json({message: "loi sever"}) // loi cho nguoi dung doc
    }
};