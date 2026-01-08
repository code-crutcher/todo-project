import React from 'react'
import { Link } from 'react-router'
import { CircleUserIcon, PenSquareIcon, Trash2Icon } from 'lucide-react'
import { CalendarIcon } from 'lucide-react'
import toast from 'react-hot-toast'
import { formatDate, daysLeft } from '../lib/utils'
import api from '../lib/axios'

const TaskCard = ({ task,setTasks }) => {

  const handleDelete = async (e, id) => {
    console.log(id);
    e.preventDefault(); //get rid of navigation behaviour

    if(!window.confirm("Are you sure you want to delete this task?")) return;

    try {
      await api.delete(`/tasks/${id}`);
      setTasks((prev)=> prev.filter(task => task._id !== id)) //to get rid of the deleted one
      console.log(task._id)
      toast.success("Task Deleted")
    } catch (error) {
      console.log("error while deleting task", error)
      toast.error("Error while deleting the task")
    }
  }

  const taskPriority = () => {
    if (task.priority === 'High') {
      return <span className="bg-red-400/50 py-0.5 px-2 rounded-full text-xs font-semibold text-red-500">
        {task.priority}
      </span>
    } else if (task.priority === 'Medium') {
      return <span className="bg-yellow-400/50 py-0.5 px-2 rounded-full text-xs font-semibold text-yellow-500">
        {task.priority}
      </span>
    } else {
      return <span className="bg-blue-400/50 py-0.5 px-2 rounded-full text-xs font-semibold text-blue-500">
        {task.priority}
      </span>
    }
  }

  const taskStatus = () => {
    if(task.status === 'Completed'){
      return <span className='px-2 py-0.5 border-2 border-solid border-green-700 rounded-full text-sm text-green-700'>{task.status}</span>
    }else{
      return <span className='px-2 py-0.5 border-2 border-solid border-primary rounded-full text-sm text-primary'>{task.status}</span>
    }
  }

  return (
    <Link to={`/tasks/${task._id}`}
      className='card bg-base-100 shadow-lg hover:border-none transition-all duration-200 border-t-4 border-solid border-primary'
    >
      <div className="card-body">
        <div className="flex justify-between items-center">
          <h2 className='card-title text-base-content mb-2'>{task.title}</h2>
          {taskStatus()}
        </div>
        <p className="text-base-content/70 line-clamp-3">{task.description}</p>
        <div className="card-actions flex items-center mt-8 gap-10">
          {taskPriority()}
          <span className="flex text-xs items-center text-base-content/60 gap-1">
          <CalendarIcon className='size-3.5'/>
            {formatDate(new Date(task.dueDate))}
          </span>
          <span className='text-xs text-primary font-semibold'>{daysLeft(task.dueDate)}</span>
        </div>
        <div className="flex justify-between items-center mt-8">
          <div className="flex flex-start items-center gap-2">
            <CircleUserIcon color='#2596be' className='size-6'/>
            <span className='text-sm text-base-content/70'>{task.assignedTo.firstName} {task.assignedTo.lastName}</span>
          </div>
          <div className="flex items-center gap-1">
            <PenSquareIcon className='size-4'/>
            <button className='btn btn-ghost btn-xs text-error'onClick={(e)=> handleDelete(e,task._id)}>
              <Trash2Icon className='size-4'/>
            </button>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default TaskCard