import { useState } from "react"
import { createExercise } from "../fetches"
import { updateExercise } from "../fetches";

const CreateExercise = ({
  onClose,
  workoutId,
  initalData = {},
  isCreating,
}) => {
  const [formData, setFormData] = useState({
    name: initalData.exercise?.exerciseName || "",
    muscleGroup: initalData.exercise?.muscleGroup || "",
    equipment: initalData.exercise?.equipment || "",
    sets: initalData.sets || "",
    reps: initalData.reps || "",
    weight: initalData.weight || "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      workout: { id: workoutId },
      exercise: {
        exerciseName: formData.name,
        muscleGroup: formData.muscleGroup,
        equipment: formData.equipment,
      },
      sets: parseInt(formData.sets),
      reps: parseInt(formData.reps),
      weight: parseFloat(formData.weight),
    };

    if (isCreating) {
      const newExercise = await createExercise(payload);
      if (newExercise) {
        onClose();
        window.location.reload();
      } else {
        alert("Something went wrong with creating your exercise");
      }
    } else {
      const result = await updateExercise(initalData.id, payload);

      if (result) {
        onClose();
        window.location.reload();
      } else {
        alert("Could not update exercise details");
      }
    }
  };

  return (
    <div className="fixed inset-0 z-[110] bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-md rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-slate-800 bg-slate-800/50">
          <h2 className="text-xl font-bold text-white">
            {isCreating ? "Log Exercise Details" : "Edit your Exercise!"}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="space-y-3">
            <h3 className="text-blue-500 text-[10px] font-black uppercase tracking-widest">
              Exercise Info
            </h3>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                Name
              </label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Benchpress"
                className="w-full bg-slate-800 border border-slate-700 rounded-xl py-2 px-4 text-white focus:border-blue-500 outline-none"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                  Muscle Group
                </label>
                <input
                  name="muscleGroup"
                  value={formData.muscleGroup}
                  onChange={handleChange}
                  placeholder="Chest"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl py-2 px-4 text-white focus:border-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                  Equipment
                </label>
                <input
                  name="equipment"
                  value={formData.equipment}
                  onChange={handleChange}
                  placeholder="Barbell"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl py-2 px-4 text-white focus:border-blue-500 outline-none"
                />
              </div>
            </div>
          </div>

          <hr className="border-slate-800" />

          <div className="space-y-3">
            <h3 className="text-blue-500 text-[10px] font-black uppercase tracking-widest">
              Performance
            </h3>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                  Sets
                </label>
                <input
                  type="number"
                  name="sets"
                  min="1"
                  value={formData.sets}
                  onChange={handleChange}
                  placeholder="0"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl py-2 px-4 text-white focus:border-blue-500 outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                  Reps
                </label>
                <input
                  type="number"
                  name="reps"
                  min="1"
                  value={formData.reps}
                  onChange={handleChange}
                  placeholder="0"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl py-2 px-4 text-white focus:border-blue-500 outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                  KG
                </label>
                <input
                  type="number"
                  name="weight"
                  min="1"
                  value={formData.weight}
                  onChange={handleChange}
                  placeholder="0"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl py-2 px-4 text-white focus:border-blue-500 outline-none"
                  required
                />
              </div>
            </div>
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
              Save Log
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateExercise
