package com.gym_app.gym_app.controller;

import com.gym_app.gym_app.model.Workout;
import com.gym_app.gym_app.repository.WorkoutRepository;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/workouts")
public class WorkoutController {
    private final WorkoutRepository workoutRepository;

    public WorkoutController(WorkoutRepository workoutRepository) {
        this.workoutRepository = workoutRepository;
    }

    //CREATE
    @CrossOrigin(origins = "http://localhost:5173")
    @PostMapping
    public ResponseEntity<Workout> createWorkout(@RequestBody Workout workout) {
        try {
            //System.out.println("Received workout: " + workout.getWorkoutName());

            Workout savedWorkout = workoutRepository.save(workout);
            return new ResponseEntity<>(savedWorkout, HttpStatus.CREATED);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>((HttpHeaders) null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //READ
    @GetMapping
    public List<Workout> findAllWorkouts(){
        return workoutRepository.findAll();
    }

    @GetMapping("/{id}")
    public Workout findWorkoutByID(@PathVariable Long id){
        return workoutRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Workout not found with id " + id));
    }

    //UPDATE
    @PutMapping("/{id}")
    public Workout updateWorkout(@PathVariable Long id, @RequestBody Workout updatedWorkout){
        return workoutRepository.findById(id).map(workout -> {
            workout.setWorkoutName(updatedWorkout.getWorkoutName());
            workout.setWorkoutDate(updatedWorkout.getWorkoutDate());
            workout.setNotes(updatedWorkout.getNotes());
            return workoutRepository.save(workout);
        }).orElseThrow(() -> new RuntimeException("Workout not found"));
    }

    //DELETE
    @DeleteMapping("/{id}")
    public String removeWorkoutById(@PathVariable Long id) {
        try {
            if (workoutRepository.existsById(id)) {
                workoutRepository.deleteById(id);
                return "Successfully deleted exercise " + id;
            } else {
                return "Exercise not found";
            }
        } catch (Exception e) {
            throw new RuntimeException("Could not delete: " + e.getMessage());
        }
    }
}

