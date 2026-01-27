import React, { useState } from "react"
import {
  Dumbbell,
} from "lucide-react"
import CreateWorkout from "./CreateWorkout"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isMedalOpen, setMedalOpen] = useState(false)

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="bg-blue-600 p-1.5 rounded-lg">
                <Dumbbell className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                Gym<span className="text-blue-500">Companion</span>
              </span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <a href="#home">Home</a>
              <button
                className="flex items-center justify-center bg-blue-600 hover:bg-blue-500 text-white p-2 rounded-full transition-colors"
                onClick={() => setMedalOpen(true)}
              >
                Log a workout
              </button>
            </div>

            {isMedalOpen && (
              <CreateWorkout onClose={() => setMedalOpen(false)} />
            )}

            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-slate-400 hover:text-white transition-colors"
              >
              </button>
            </div>
          </div>
        </div>
      </nav>

      {isMedalOpen && <CreateWorkout onClose={() => setMedalOpen(false)} initialData={[]} isCreating={true} />}
    </>
  )
}


export default Navbar
