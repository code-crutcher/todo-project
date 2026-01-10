import React from 'react'
import { useState } from 'react'
import { UserIcon, MailIcon, LockIcon, User } from 'lucide-react'
import { Link } from 'react-router'
import { useNavigate } from 'react-router'
import toast from 'react-hot-toast'
import api from '../lib/axios'

const SignUpPage = () => {

  const[loading, setLoading] = useState(false)
  const[firstName, setFirstName] = useState("")
  const[lastName, setLastName] = useState("")
  const[email, setEmail] = useState("")
  const[password, setPassword] = useState("")

  const navigate = useNavigate();

  const handleSubmit = async(e) =>{
     e.preventDefault();
    if(!firstName.trim() || !email || !password){
      toast.error("All fields are required");
      return;
    }
    setLoading(true);
    try {
      await api.post("/auth/signup",{
        firstName,
        lastName,
        email,
        password
      })
      toast.success("User created successfully")
      navigate("/login")
    } catch (error) {
      console.log(error)
      if(error.response.status === 400){
        const [{message}] = error.response.data.error.details;
        console.log(message);
        toast.error(message)
      }else{
        toast.error("Error while siging in")
      }
    }finally{
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="card shadow-lg bg-base-100">
            <div className="card-body max-w-full items-center">
              <h2 className="card-title text-2xl mb-4 text-pr">SignUp</h2>
              <form onSubmit={handleSubmit} action="">
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="flex items-center gap-1 label-text">
                      <UserIcon/>
                      First Name
                      </span>
                  </label>
                  <input 
                    type="text" 
                    name="" 
                    id="" 
                    placeholder="Enter First Name"
                    className='input input-bordered'
                    onChange={(e)=> setFirstName(e.target.value)}
                  />
                </div>
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="flex items-center gap-1 label-text">
                      <UserIcon/>
                      Last Name
                      </span>
                  </label>
                  <input 
                    type="text" 
                    name="" 
                    id="" 
                    placeholder="Enter Last Name"
                    className='input input-bordered'
                    onChange={(e)=> setLastName(e.target.value)}
                  />
                </div>
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="flex items-center gap-1 label-text">
                      <MailIcon/>
                      Email
                      </span>
                  </label>
                  <input 
                    type="email" 
                    name="" 
                    id="" 
                    placeholder="Enter Email"
                    className='input input-bordered'
                    onChange={(e)=> setEmail(e.target.value)}
                  />
                </div>
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="flex items-center gap-1 label-text">
                      <LockIcon/>
                      Passowrd
                      </span>
                  </label>
                  <input 
                    type="password" 
                    name="" 
                    id="" 
                    placeholder="Enter Password"
                    className='input input-bordered'
                    onChange={(e)=> setPassword(e.target.value)}
                  />
                </div>
                <div className="card-actions justify-center">
                    <button type="submit" className="btn btn-primary" disabled={loading}>
                      {loading ? "Signing..." : "Sign Up"}
                    </button>
                </div>
                <div className="mt-4 flex justify-center items-center gap-1">
                  <span className='text-base-content/70'>Already have an account?</span>
                  <Link to="/login" className='hover:underline hover:text-primary'>Login</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
        
  )
}

export default SignUpPage