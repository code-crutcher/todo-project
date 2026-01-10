import express from 'express'
import {createTask, deleteTask, editTask, getAllTasks, getTaskById} from '../controllers/taskController.js'

const taskRoutes = express.Router();

taskRoutes.get("/", getAllTasks)

taskRoutes.get("/:id", getTaskById)

taskRoutes.post("/", createTask)

taskRoutes.put("/:id", editTask)

taskRoutes.delete("/:id", deleteTask)

taskRoutes.get("/")

export default taskRoutes
