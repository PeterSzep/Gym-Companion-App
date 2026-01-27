import { useState } from "react"
import { createWorkout, updateWorkout } from "../fetches"

const CreateWorkout = ({ onClose, initialData = {}, isCreating }) => {
  const [formData, setFormData] = useState({
  name: initialData.workoutName || "",
  date: initialData.workoutDate || "", 
  notes: initialData.notes || "",
});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  };

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (isCreating) {
      const newWorkout = await createWorkout(formData);

      if (newWorkout) {
        onClose()
        window.location.reload()
      } else {
        alert("Something went wrong saving your workout.")
      }
    } else {
      const newWorkout = await updateWorkout(initialData.id, formData)

      if (newWorkout) {
        onClose()
        window.location.reload()
      } else {
        alert("Something went wrong with editing your workout.")
      }
    }
  };

  return (
    <div className="fixed inset-0 z-[110] bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-md rounded-3xl shadow-2xl overflow-hidden">
        <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-800/50">
          <h2 className="text-xl font-bold text-white">
            {isCreating ? "Create a Workout!" : "Edit your Workout!"}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
              Name
            </label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your workout name example (Chest day)"
              className="w-full bg-slate-800 border border-slate-700 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-blue-500 transition"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
              Date
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              placeholder="Date"
              className="w-full bg-slate-800 border border-slate-700 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-blue-500 transition"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
              Notes
            </label>
            <textarea
              rows="3"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Notes"
              className="w-full bg-slate-800 border border-slate-700 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-blue-500 transition"
            />
          </div>

          <div className="pt-4 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-slate-800 hover:bg-slate-700 text-white font-bold py-3 rounded-xl transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl transition"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateWorkout
