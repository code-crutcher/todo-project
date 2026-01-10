import React from 'react'
import { Link, useNavigate } from 'react-router'
import {PlusIcon} from "lucide-react"
import toast from 'react-hot-toast';
const Navbar = ({isLoggedIn}) => {

  const navigate = useNavigate();

  const handleLogout = ()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    toast.success("Logged out Successfully")
    navigate("/login")
  }

  return (
   <header className='bg-base-300 border-b border-base-content/10'>
    <div className='mx-auto max-w-7xl p-4'>
      <div className="flex item-center justify-between">
        <h1 className="text-3xl font-bold text-primary font-mono tracking-tight">
          TaskFlow
        </h1>
        <div className="flex items-center gap-4">
          {isLoggedIn ? 
          <>
            <Link to={"/create"} className='btn btn-primary'>
              <PlusIcon className='size-5'/>
              <span>New Task</span>
            </Link> 
            <button onClick={handleLogout} className='btn btn-primary'>
              <span>Logout</span>
            </button>
          </> 
            : 
            <Link to={"/signup"} className='btn btn-primary'>
              <span>SignUp</span>
            </Link>}
        </div>
      </div>
    </div>
   </header>
  )
}

export default Navbar