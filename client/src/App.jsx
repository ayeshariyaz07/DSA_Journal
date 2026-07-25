import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import AddProblem from './components/AddProblem'

function App() {
  return (
    <Routes>
      <Route path = "/" element = {<Dashboard/>}/>
      <Route path = "/add" element = {<AddProblem/>}/>
      
    </Routes>
  )
}

export default App
