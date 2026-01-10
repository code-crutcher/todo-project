import React from 'react'
import Navbar from '../components/Navbar'
import { Link } from 'react-router'


const IndexPage = () => {
  return (
    <div className='min-h-screen'>
      <Navbar/>

      <div className="max-w-7xl mx-auto p-4 mt-6">
        <div className="flex flex-col items-center justify-center py-16 space-y-6 max-w-md mx-auto text-center">
          <div className="bg-primary/10 rounded-full p-8">
            <h1 className="text-4xl font-bold text-primary">Welcome to TaskFlow</h1>
            <h4 className="mt-2 text-sm font-semibold text-base-content/70">
              Create, Collaborate and stay Consistent
            </h4>
          </div>
          <div className="p-8">
            <p className="text-base-content/70">Signup today and make your own community to stay consistent.</p>
            <Link to="/signup" className='mt-5 btn btn-primary'>Start Creating</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default IndexPage