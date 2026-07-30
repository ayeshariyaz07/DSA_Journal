import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import AddProblem from './components/AddProblem'
import ProblemDetail from './components/ProblemDetail'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Profile from './pages/Profile'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/add" element={<AddProblem />} />
      <Route path="/problem/:id" element={<ProblemDetail />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup/>} />
      <Route path="/profile" element={<Profile/>} />
    </Routes>
  )
}

export default App
