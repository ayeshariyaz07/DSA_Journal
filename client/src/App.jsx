import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import AddProblem from './components/AddProblem'
import ProblemDetail from './components/ProblemDetail'

function App() {
  return (
    <Routes>
      <Route path = "/" element = {<Dashboard/>}/>
      <Route path = "/add" element = {<AddProblem/>}/>
      <Route path= "/problem/:id" element = {<ProblemDetail/>}/>
    </Routes>
  )
}

export default App
