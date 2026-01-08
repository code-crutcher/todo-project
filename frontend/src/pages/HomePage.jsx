import React , {useState, useEffect} from 'react'
import toast from "react-hot-toast"
import Navbar from '../components/Navbar'
import RateLimitedUI from '../components/RateLimitedUI'
import TaskCard from '../components/TaskCard'
import { Divide } from 'lucide-react'
import api from '../lib/axios'
const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        // general syntax of fetching api
        /*const res = await fetch("http://localhost:3000/api/tasks");
        const data = await res.json();
        console.log(data)*/

        const res = await api.get("/tasks");
        console.log("data",res.data);
        setTasks(res.data);
        setIsRateLimited(false)
      } catch (error) {
        console.log("error in fetching tasks", error)
        if(error.response?.status === 429){
          setIsRateLimited(true)
        }else{
          toast.error("Failed to load tasks")
        }
      }finally{
        setLoading(false)
      }
      
    };
    
    fetchTasks();
  },[])
  return (
    <div className='min-h-screen'>
      <Navbar/>
      { isRateLimited && <RateLimitedUI/>}

      <div className="max-w-7xl mx-auto p-4 mt-6">
        {loading && <div className='text-center text-primary py-10'>task loading...</div>}

        {tasks.length > 0 && !isRateLimited &&(
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tasks.map((task)=>(
              <TaskCard key={task._id} task={task}/>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default HomePage