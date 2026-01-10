import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import toast from 'react-hot-toast';
import { Link, useNavigate, useParams } from 'react-router';
import { ArrowLeftIcon, LoaderIcon , Trash2Icon} from 'lucide-react';
import api from '../lib/axios'

const TaskDetailPage = () => {
  const[users, setUsers] = useState([])
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false)

  const navigate = useNavigate();

  const {id} = useParams();

  useEffect(()=>{
      const fetchUsers = async()=>{
        try {
          const res = await api.get("/users",{
          headers: {
            'Authorization' : localStorage.getItem('token')
          }
        })
          console.log("data",res.data);
          setUsers(res.data)
        } catch (error) {
          console.log("error in fetching tasks", error)
        } finally{
          setLoading(false)
        }
      };
  
      fetchUsers();
    }, [])

  /*console.log({id});
  console.lof("the above is better than typing id is:", id)*/

  useEffect(()=>{
    const fetchTask = async()=>{
      try {
        const res = await api.get(`/tasks/${id}`,{
          headers: {
            'Authorization' : localStorage.getItem('token')
          }
        })
        setTask(res.data)
      } catch (error) {
        console.log("Error while fetching task", error)
        toast.error("Failed to load the task")
      }finally{
        setLoading(false)
      }
    }

    fetchTask();
  },[id]);

  console.log({task})

  const handleDelete = async()=>{
    if(!window.confirm("Are you sure you want to delete task")) return;

    try {
      await api.delete(`/tasks/${id}`,{
          headers: {
            'Authorization' : localStorage.getItem('token')
          }
        });
      setTask((prev)=> prev.filter(task => task._id !== id))
      toast.success("Task Deleted")
      navigate("/home")
    } catch (error) {
      console.log("Error while deleting task", error)
      toast.error("Error while deleting task")
    }
  }

  const handleSave = async() => {
    if(!task.title.trim() || !task.description.trim() || !task.priority || !task.status || !task.dueDate || !task.assignedTo){
      toast.error("Please provide all values")
      return;
    }

    setSaving(true)

    try {
      await api.put(`tasks/${id}`, task,{
          headers: {
            'Authorization' : localStorage.getItem('token')
          }
        });
      toast.success("Task Updated Successfully!!")
      navigate("/home")
    } catch (error) {
      console.log("Error while saving task", error)
      toast.error("Failed to update task")
    }finally{
      setSaving(false)
    }
  }

  if(loading){
    return(
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className='animate-spin size-10'></LoaderIcon>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Link to="/" className='btn btn-ghost'>
            <ArrowLeftIcon className='h-5 w-5'/>
            Back To Tasks
          </Link>
          <button className="btn btn-error btn-outline" onClick={handleDelete}>
            <Trash2Icon className="h-5 w-5"/>
              Delete Task
          </button>
        </div>
        <div className="card bg-base-100">
          <div className="card-body">
            <form onSubmit="" action="">
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Title</span>
                  </label>
                  <input 
                    type="text" 
                    name="" 
                    id="" 
                    value={task.title}
                    placeholder="Task Title"
                    className='input input-bordered'
                    onChange={(e)=> setTask({...task, title: e.target.value})}
                  />
                </div>
                <div className="form-control mb-4">
                    <label className="label">
                    <span className="label-text">Description</span>
                  </label>
                  <textarea 
                    value={task.description}
                    placeholder="Task Description"
                    className='textarea textarea-bordered h-32'
                    onChange={(e)=> setTask({...task, description: e.target.value})}
                  />
                </div>
                <div className="form-control mb-4">
                    <label className="label">
                      <span className="label-text">Priority</span>
                    </label>
                      <div className="flex left items-center gap-4">
                      <div className="flex items-center">
                        <input 
                          type="radio" 
                          name="priority" 
                          className="radio radio-xs"
                          value="High"
                          checked={task.priority === 'High'}
                          onChange={(e)=> setTask({...task, priority: e.target.value})}
                        >
                        </input>
                        <label className='label'>
                          <span className="label-text">High</span>
                        </label>
                      </div>
                      <div className="flex items-center">
                      <input 
                        type="radio" 
                        name="priority"  
                        className="radio radio-xs"
                        value="Medium"
                        checked={task.priority === 'Medium'}
                        onChange={(e)=> setTask({...task, priority: e.target.value})}
                      >
                      </input>
                      <label className='label'>
                        <span className="label-text">Medium</span>
                      </label>
                      </div>
                      <div className="flex items-center">
                      <input 
                        type="radio" 
                        name="priority"  
                        className="radio radio-xs"
                        value="Low"
                        checked={task.priority === 'Low'}
                        onChange={(e)=> setTask({...task, priority: e.target.value})}
                      >
                      </input>
                      <label className='label'>
                        <span className="label-text">Low</span>
                      </label>
                      </div>
                    </div>

                </div>
                <div className="form-control mb-4">
                    <label className="label">
                      <span className="label-text">Status</span>
                    </label>
                      <div className="flex left items-center gap-4">
                      <div className="flex items-center">
                        <input 
                          type="radio" 
                          name="status" 
                          className="radio radio-xs"
                          value="To-Do"
                          checked={task.status === 'To-Do'}
                          onChange={(e)=> setTask({...task, status: e.target.value})}
                        >
                        </input>
                        <label className='label'>
                          <span className="label-text">To-Do</span>
                        </label>
                      </div>
                      <div className="flex items-center">
                      <input 
                        type="radio" 
                        name="status"  
                        className="radio radio-xs"
                        value="In-Progress"
                        checked={task.status === 'In-Progress'}
                        onChange={(e)=> setTask({...task, status: e.target.value})}
                      >
                      </input>
                      <label className='label'>
                        <span className="label-text">In-Progress</span>
                      </label>
                      </div>
                      <div className="flex items-center">
                      <input 
                        type="radio" 
                        name="status"  
                        className="radio radio-xs"
                        value="Completed"
                        checked={task.status === 'Completed'}
                        onChange={(e)=> setTask({...task, status: e.target.value})}
                      >
                      </input>
                      <label className='label'>
                        <span className="label-text">Completed</span>
                      </label>
                      </div>
                    </div>

                </div>
                <div className="form-control mb-4">
                    <label className="label">
                      <span className="label-text">DueDate</span>
                    </label>
                  <input type="date" name="" id=""  className='border-2 rounded-box' onChange={(e)=> setTask({...task, dueDate: e.target.value})}/>
                </div>
                <div className="form-control mb-4">
                    <label className="label">
                    <span className="label-text">Assignee</span>
                  </label>
                  <select name="assignee" id="" className="select select-bordered" onChange={(e)=> setTask({...task, assignedTo: e.target.value})}>
                    {users.map((user)=>(
                      <option key={user._id} selected={task.assignedTo === user._id}
                      value={user._id}
                      >{user.firstName} {user.lastName}</option>
                    ))}

                  </select>
                </div>
                <div className="card-actions justify-center">
                    <button type="submit" className="btn btn-primary" disabled={saving} onClick={handleSave}>
                      {saving ? "Saving..." : "Save Changes"}
                    </button>
                </div>
              </form>
          </div>
        </div>
        </div>
      </div>
    </div>
  )
}

export default TaskDetailPage