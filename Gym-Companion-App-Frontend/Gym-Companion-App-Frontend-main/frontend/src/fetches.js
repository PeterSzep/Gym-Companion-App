export function fetchAll(controller, setData, setLoading) {
  setLoading(true)

  fetch(`http://localhost:8080/api/${controller}`)
    .then((response) => {
      if (!response.ok) throw new Error("Server error");
      return response.json()
    })
    .then((data) => {
      /*
      console.log("1. Raw data type:", typeof data)
      console.log("2. Is it an array?", Array.isArray(data))
      console.log("3. Actual content:", data)*/

      const actualList = Array.isArray(data)
        ? data
        : data.content || data.data || []

      setData(actualList)
      setLoading(false)
    })
    .catch((error) => {
      console.error("Fetch error:", error)
      setLoading(false)
      setData([])
    });
}

export function fetchByID(id, controller, setData) {
  fetch(`http://localhost:8080/api/${controller}/${id}`)
    .then((response) => {
      if (!response.ok) throw new Error("Server error")
      return response.json()
    })
    .then((data) => {
      setData(data)
      console.log(data)
    })
    .catch((error) => {
      console.error("Fetch error:", error)
      setData([])
    });
}

export async function deleteEntryById(model,id) {
    try {
        const response = await fetch(`http://localhost:8080/api/${model}/${id}`, {
            method: 'DELETE',
        });
        console.log("delete ok")
        return response.ok;
    } catch (error) {
        console.error("Delete error:", error)
        alert("Could not delete entry")
        return false
    }
}

export async function createWorkout(formData) {
    try{
      const response = await fetch(`http://localhost:8080/api/workouts`, {
            method: 'POST',
            headers: {
              "Content-Type" : "application/json",
            },
            body: JSON.stringify({
              workoutName: formData.name,
              workoutDate: formData.date,
              notes: formData.notes,
            }),
        })

        if(!response.ok){
          alert("Failed to create workout")
        }

        return await response.json()

    }catch(error){
      alert("Could not create workout")
      return null
    }
}

export async function updateWorkout(id, formData) {
    try {
        const response = await fetch(`http://localhost:8080/api/workouts/${id}`, { 
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: id,
                workoutName: formData.name,
                workoutDate: formData.date,
                notes: formData.notes,
            }),
        })

        if (!response.ok) {
            const errorData = await response.json()
            console.error("Server error:", errorData)
            alert("Failed to update workout")
            return null
        }

        return await response.json()

    } catch (error) {
        console.error("Fetch error:", error)
        alert("Could not update workout")
        return null
    }
}

export async function createExercise (payload) {
    try{
      const response = await fetch(`http://localhost:8080/api/workoutLogs`, {
            method: 'POST',
            headers: {
              "Content-Type" : "application/json",
            },
            body: JSON.stringify(payload)
        })

        if(!response.ok){
          alert("Failed to create workout")
        }

        return await response.json()

    }catch(error){
      alert("Could not create workout")
      return null
    }
}

export const updateExercise = async (id, payload) => {
  try {
    const response = await fetch(`http://localhost:8080/api/workoutLogs/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error("Failed to update exercise")
    }

    return await response.json()
  } catch (error) {
    console.error("Update Error:", error)
    return null
  }
};