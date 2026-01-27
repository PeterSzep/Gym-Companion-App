import { Router } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Workouts from './components/Workouts'

function App() {
  return (
    <>
      <div>
        <Navbar/>
        <Workouts/>
      </div>
    </>
  )
}

export default App
