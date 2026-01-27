import { Trash2, Edit3, X } from "lucide-react"
import { useState } from "react"
import CreateExercise from "./CreateExercise"
import { deleteEntryById } from "../fetches"

const Details = ({ onClose, workout }) => {
  const [isMedalOpen, setMedalOpen] = useState(false)
  const [selectedLog, setSelectedLog] = useState(null)

  const handleEditClick = (log) => {
    setSelectedLog(log)
    setMedalOpen(true)
  };

  const handleAddClick = () => {
    setSelectedLog(null)
    setMedalOpen(true)
  };

  if (!workout) {
    return null
  }

  const handleDelete = async (id) => {
    const success = await deleteEntryById("exercises", id);

    if (success) {
      window.location.reload();
    } else {
      alert("Could not delete from database");
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-800/50 shrink-0">
          <div>
            <h2 className="text-2xl font-bold text-white">
              {workout.workoutName}
            </h2>
            <p className="text-blue-400 text-sm">{workout.workoutDate}</p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto custom-scrollbar flex-1">
          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">
            Exercises Performed
          </h4>

          <div className="space-y-3">
            {workout.workoutLogs && workout.workoutLogs.length > 0 ? (
              workout.workoutLogs.map((log) => (
                <div
                  key={log.id}
                  className="bg-slate-800/40 border border-slate-700 p-4 rounded-xl flex justify-between items-center group hover:border-slate-500 transition-colors"
                >
                  <div className="flex-1">
                    <p className="font-semibold text-slate-200 text-lg">
                      {log.exercise?.exerciseName || `Exercise ${log.id}`}
                    </p>
                    <div className="flex gap-3 mt-1">
                      <span className="text-xs text-slate-400 bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
                        {log.sets} x {log.reps}
                      </span>
                      <span className="text-xs text-blue-400 bg-blue-900/20 px-2 py-0.5 rounded border border-blue-900/30 font-bold">
                        {log.weight}kg
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditClick(log)}
                      className="p-2 text-slate-400 hover:text-blue-400 hover:bg-blue-400/10 rounded-lg transition"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        if (
                          window.confirm("Remove this exercise from the log?")
                        )
                          //console.log(log.exercise.exerciseId)
                          handleDelete(log.exercise.exerciseId)
                      }}
                      className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-10">
                <p className="text-slate-500">
                  No exercises logged for this session.
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="p-6 bg-slate-800/30 border-t border-slate-800 shrink-0">
          <button
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl transition shadow-lg shadow-blue-900/20"
            onClick={() => handleAddClick()}
          >
            Add an exercise
          </button>
        </div>
      </div>

      {isMedalOpen && (
        <CreateExercise
          onClose={() => {
            setMedalOpen(false)
            setSelectedLog(null)
          }}
          workoutId={workout.id}
          initalData={selectedLog || {}} 
          isCreating={!selectedLog} 
        />
      )}
    </div>
  )
}

export default Details
