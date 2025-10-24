import express from 'express';
import {getAlltasks } from '../controllers/tasksController.js';
import {createtasks} from '../controllers/tasksController.js';
import { updatetasks } from '../controllers/tasksController.js';
import { deletetasks } from '../controllers/tasksController.js';

const router = express.Router();


router.get("/", getAlltasks);

router.post("/", createtasks);

router.put("/:id", updatetasks);

router.delete("/:id", deletetasks);

export default router;
