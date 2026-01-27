package com.gym_app.gym_app.controller;

import com.gym_app.gym_app.model.Exercise;
import com.gym_app.gym_app.repository.ExerciseRepository;
import com.gym_app.gym_app.repository.WorkoutLogRepository;
import jakarta.transaction.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/exercises")
public class ExerciseController {
    private final ExerciseRepository repository;

    private final WorkoutLogRepository workoutLogRepository;

    public ExerciseController(ExerciseRepository repository, WorkoutLogRepository workoutLogRepository) {
        this.repository = repository;
        this.workoutLogRepository = workoutLogRepository;
    }

    //CREATE
    @PostMapping
    public Exercise createExercise(@RequestBody Exercise exercise) {
        return repository.save(exercise);
    }

    //READ
    @GetMapping
    public List<Exercise> getExercises() {
        return repository.findAll();
    }

    @GetMapping("/{id}")
    public Exercise getExerciseById(@PathVariable Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Exercise not found with id: " + id));
    }

    // UPDATE
    @PutMapping("/{id}")
    public Exercise update(@PathVariable Long id, @RequestBody Exercise updatedData) {
        return repository.findById(id).map(exercise -> {
            exercise.setExerciseName(updatedData.getExerciseName());
            exercise.setMuscleGroup(updatedData.getMuscleGroup());
            exercise.setEquipment(updatedData.getEquipment());
            return repository.save(exercise);
        }).orElseThrow(() -> new RuntimeException("Exercise not found"));
    }

    //DELETE
    @Transactional
    @DeleteMapping("/{id}")
    public String removeExerciseById(@PathVariable Long id) {
        try {
            if (repository.existsById(id)) {
                workoutLogRepository.deleteByExerciseId(id);

                repository.deleteById(id);
                return "Successfully deleted exercise and associated logs.";
            }
            return "Exercise not found";
        } catch (Exception e) {
            throw new RuntimeException("Could not delete: " + e.getMessage());
        }
    }


}