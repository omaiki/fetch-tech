import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import './App.css'


function App() {

  return (
    <>
      <div>
      <h1>React Authentication</h1>
      <Login />
      <Dashboard />
    </div>
    </>
  )
}

export default App
