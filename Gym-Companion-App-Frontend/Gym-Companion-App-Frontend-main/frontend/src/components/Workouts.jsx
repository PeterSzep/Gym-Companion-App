import React, { useEffect, useState } from "react"
import WorkoutCard from "../components/WorkoutCard"
import { fetchAll, deleteEntryById} from "../fetches.js"

const Workouts = () => {
  const [workouts, setWorkouts] = useState([])
  const [loading, setLoading] = useState(true)
  const controller = "workouts"

  const handleDelete = async (id) => {
    const success = await deleteEntryById("workoutLogs",id);
    if (success) {
      setWorkouts((prevWorkouts) => prevWorkouts.filter((w) => w.id !== id))
    } else {
      alert("Could not delete from database")
    }
  };

  useEffect(() => {
    fetchAll(controller, setWorkouts, setLoading)
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        <span className="ml-3 text-slate-400">Loading workouts...</span>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 ">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">My workouts</h1>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {workouts && workouts.length > 0 ? (
          workouts.map((w) => <WorkoutCard key={w.id} workout={w} onDelete={handleDelete} />)
        ) : (
          <p className="text-slate-500 col-span-full text-center">
            No workouts found. Time to hit the gym!
          </p>
        )}
      </div>
    </div>
  )
}

export default Workouts
