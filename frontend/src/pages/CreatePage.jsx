import { ArrowLeft } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router';
import toast from "react-hot-toast"
import api from '../lib/axios';


const CreatePage = () => {
  const [users, setUsers] = useState([])
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [loading, setLoading] = useState(true)
  const status = "To-Do";

  const assignor = localStorage.getItem('id');

  const navigate = useNavigate();

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

  const handleSubmit = async(e) => {
    e.preventDefault() //prevents the page from loading
    
    if(!title.trim() || !description.trim() || !priority || !dueDate || !assignedTo){
      toast.error("All fields are required");
      return;
    }
    setLoading(true)
    try {
      await api.post("/tasks",{
        title,
        description,
        priority,
        status,
        dueDate,
        assignedTo,
        assignor
      },{
          headers: {
            'Authorization' : localStorage.getItem('token')
          }
        })
      toast.success("Task created successfully")
      navigate("/home")
    } catch (error) {
      console.log("Error while creating task",error)
      if(error.response.status === 429){
        toast.error("Slow down! You're creating tasks too fast!!",{
          duration: 4000,
          icon: "☠️"
        })
      }
      else{
        toast.error("Failed to create task")
      }
    }finally{
      setLoading(false)
    }
  }

  return (

    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {loading ?
            <div>Loading..</div>
          : <div><Link to={"/home"} className="btn btn-ghost mb-6">
            <ArrowLeft className='size-4'/>
            Back to Tasks
          </Link>
          <div className="card bg-base-100">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4">Create New Task</h2>
              <form onSubmit={handleSubmit} action="">
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Title</span>
                  </label>
                  <input 
                    type="text" 
                    name="" 
                    id="" 
                    placeholder="Task Title"
                    className='input input-bordered'
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                  <div className="form-control mb-4">
                    <label className="label">
                    <span className="label-text">Description</span>
                  </label>
                  <textarea 
                    placeholder="Task Description"
                    className='textarea textarea-bordered h-32'
                    onChange={(e) => setDescription(e.target.value)}
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
                          onChange={(e)=> setPriority(e.target.value)}
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
                        onChange={(e)=> setPriority(e.target.value)}
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
                        onChange={(e)=> setPriority(e.target.value)}
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
                    <div className="flex items-center">
                      <input type="checkbox" className="checkbox checkbox-xs" defaultChecked={true} disabled/>
                      <label className="label">
                        <span className="label-text">To Do</span>
                      </label>
                    </div>
                  </div>
                  <div className="form-control mb-4">
                    <label className="label">
                      <span className="label-text">DueDate</span>
                    </label>
                  <input type="date" name="" id="" className='border-2 rounded-box' onChange={(e)=> setDueDate(e.target.value)}/>
                  </div>
                  <div className="form-control mb-4">
                    <label className="label">
                    <span className="label-text">Assignee</span>
                  </label>
                  <select name="assignee" id="" defaultValue="Assigned To" className="select select-bordered" onChange={(e)=> setAssignedTo(e.target.value)}>
                    <option disabled={true}>Assigned To</option>
                    {users.map((user)=>(
                      <option key={user._id} value={user._id}>{user.firstName} {user.lastName}</option>
                    ))}

                  </select>
                  </div>
                  <div className="card-actions justify-center">
                    <button type="submit" className="btn btn-primary" disabled={loading}>
                      {loading ? "Creating..." : "Create Task"}
                    </button>
                  </div>
              </form>
            </div>
          </div></div>
          }
          
        </div>
      </div>
    </div>
  )
}

export default CreatePage