import Task from "../models/task.js";

export async function getAllTasks (req, res){
  try{
    const tasks = await Task.find().sort({createdAt : 1});// newest first
    res.status(200).json(tasks)
  }catch(error){
    console.log("Error while fetching all tasks", error)
    res.status(500).json({message: "internal server error"})
  }
}

export async function getTaskById(req, res){
  try{
    const task = await Task.findById(req.params.id);
    if(!task){
      return res.status(404).json({message : "Task not found"})
    }
    res.status(200).json(task)
  }catch(error){
    console.log("Error while fetching a tasks", error)
    res.status(500).json({message: "internal server error"})
  }
}

export async function createTask (req, res){
  try {
    const {title, description, priority, status, dueDate, assignedTo} = req.body;

    const task = new Task({
      title,
      description,
      priority,
      status,
      dueDate,
      assignedTo
    });

    const savedTask = await task.save();
    res.status(200).json(savedTask)
  } catch (error) {
    console.log("Error while creating task", error)
    res.status(500).json({message: "internal server error"})
  }
}

export async function editTask (req, res){
  try {
    const {title, description, priority, status, dueDate, assignedTo} = req.body;

    const updatedTask = await Task.findByIdAndUpdate(req.params.id, {
      title,
      description,
      priority,
      status,
      dueDate,
      assignedTo
    },{
      new: true
    })

    if(!updatedTask){
      return res.status(404).json({message : "task not found"})
    }
    res.status(200).json(updatedTask)
  } catch (error) {
    console.log("Error while updating task", error)
    res.status(500).json({message : "error in updating tasks"})
  }
}

export async function deleteTask (req, res){
  try {
    const deleteTask = await Task.findOneAndDelete(req.params.id)
    
    if(!deleteTask){
      return res.status(404).json({message : "Task not found"})
    }

    res.status(200).json({message : "Task delted successfully"})
  } catch (error) {
    console.log("Error while deleting task", error)
    res.status(500).json({message : "error in deleting the task"})
  }
}
