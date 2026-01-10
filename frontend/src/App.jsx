import React from 'react'
import { Route, Routes } from 'react-router'
import IndexPage from './pages/IndexPage.jsx'
import HomePage from './pages/HomePage.jsx'
import CreatePage from './pages/CreatePage.jsx'
import UserDetailPage from './pages/UserDetailPage.jsx'
import SignUpPage from './pages/SignUpPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import TaskDetailPage from './pages/TaskDetailPage.jsx'
// import toast from 'react-hot-toast'

const App = () => {
  
  return (
    <div data-theme="cupcake">
      
      <Routes>
        <Route
          path="/signup"
          element={<SignUpPage />}
        />
        <Route
          path="/login"
          element={<LoginPage />}
        />
        <Route
          path="/"
          element={<IndexPage />}
        />
        <Route
          path="/home"
          element={<HomePage />}
        />
        <Route
          path="/create"
          element={<CreatePage />}
        />
        <Route
          path="/tasks/:id"
          element={<TaskDetailPage />}
        />
        <Route
          path="/user/:id"
          element={<UserDetailPage />}
        />
      </Routes>
    </div>
  )
}

export default App