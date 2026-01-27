import React, { useState } from "react"
import { Calendar, NotebookPen, ListChecks, Trash2, Edit3 } from "lucide-react"
import Details from "./Details"
import CreateWorkout from "./CreateWorkout"

const WorkoutCard = ({ workout, onDelete}) => {
  const [isVisible, setIsVisible] = useState(false)
  const [isModelVisible, setModelVisible] = useState(false)

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl hover:border-blue-500/50 transition-all group relative">
      
      <div className="absolute top-4 right-4 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <button
          onClick={() => setModelVisible(true)}
          className="p-2 text-slate-400 hover:text-blue-400 hover:bg-blue-400/10 rounded-lg transition-colors"
          title="Edit Workout"
        >
          <Edit3 className="w-4 h-4" />
        </button>
        <button
          onClick={() => {
            if (window.confirm("Are you sure you want to delete this workout?")) {
              onDelete(workout.id);
            }
          }}
          className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
          title="Delete Workout"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      <div className="flex justify-between items-start mb-4 pr-12">
        <div>
          <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition">
            {workout.workoutName}
          </h3>
          <span className="flex items-center text-xs text-slate-500 mt-1">
            <Calendar className="w-3 h-3 mr-1 text-blue-500" />
            {workout.workoutDate}
          </span>
        </div>
      </div>

      <div className="flex items-start gap-2 mb-6 min-h-[40px]">
        <NotebookPen className="w-4 h-4 text-slate-600 mt-1 flex-shrink-0" />
        <p className="text-sm text-slate-400 italic line-clamp-2">
          {workout.notes || "No notes for this session."}
        </p>
      </div>

      <div className="flex justify-between items-center pt-4 border-t border-slate-800">
        <div className="flex items-center text-xs font-medium text-slate-500">
          <ListChecks className="w-4 h-4 mr-1 text-blue-500" />
          <span>{workout.workoutLogs?.length || 0} Exercises</span>
        </div>
        
        <button
          onClick={() => setIsVisible(true)}
          className="bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold py-2 px-4 rounded-lg transition-all active:scale-95"
        >
          View Details
        </button>
      </div>

      {isVisible && (
        <Details 
          workout={workout} 
          onClose={() => setIsVisible(false)} 
        />
      )}

       {isModelVisible && (
        <CreateWorkout
          onClose={() => setModelVisible(false)}
          initialData={workout} 
          isCreating={false}
        />
      )}
    </div>
  )
}

export default WorkoutCard;