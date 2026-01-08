import mongoose from 'mongoose'

// 1. create a schema

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },

  description: {
    type: String,
    required: true
  },

  priority: {
    type: String,
    required: true
  },

  status: {
    type: String,
    required: true
  },

  dueDate:{
    type: Date,
    required: true
  },

  assignedTo:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  // instead of creating a created at we will use mongoose feature of timestamp
},
  { timestamps: true} //createdAt, updatedAt
)

// 2. model based of that schema

const Task = mongoose.model("Task", taskSchema)

// 3. export the model

export default Task

/*
task title
task description
task priority
task status
task due-date
task assigned to
task assigned date
*/
