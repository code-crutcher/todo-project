import React from 'react'
import { Route, Routes } from 'react-router'
import HomePage from './pages/HomePage.jsx'
import CreatePage from './pages/CreatePage.jsx'
import NoteDetailPage from './pages/TaskDetailPage.jsx'
import UserDetailPage from './pages/UserDetailPage.jsx'
// import toast from 'react-hot-toast'

const App = () => {
  return (
    <div data-theme="cupcake">
      
      <Routes>
        <Route
          path="/"
          element={<HomePage />}
        />
        <Route
          path="/create"
          element={<CreatePage />}
        />
        <Route
          path="/tasks/:id"
          element={<NoteDetailPage />}
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