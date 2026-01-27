package com.gym_app.gym_app.controller;

import com.gym_app.gym_app.model.Exercise;
import com.gym_app.gym_app.model.Workout;
import com.gym_app.gym_app.model.WorkoutLog;
import com.gym_app.gym_app.repository.ExerciseRepository;
import com.gym_app.gym_app.repository.WorkoutLogRepository;
import com.gym_app.gym_app.repository.WorkoutRepository;
import jakarta.transaction.Transactional;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/workoutLogs")
public class WorkoutLogController {

    private final WorkoutLogRepository workoutLogRepository;
    private final WorkoutRepository workoutRepository;
    private final ExerciseRepository exerciseRepository;

    public WorkoutLogController(
            WorkoutLogRepository workoutLogRepository,
            WorkoutRepository workoutRepository,
            ExerciseRepository exerciseRepository
    ) {
        this.workoutLogRepository = workoutLogRepository;
        this.workoutRepository = workoutRepository;
        this.exerciseRepository = exerciseRepository;
    }

    //CREATE
    @PostMapping
    public ResponseEntity<WorkoutLog> createWorkoutLog(@RequestBody WorkoutLog log) {
        Workout workout = workoutRepository.findById(log.getWorkout().getId())
                .orElseThrow(() -> new RuntimeException("Workout not found"));

        if (log.getExercise() == null) {
            throw new IllegalArgumentException("Exercise data must not be null");
        }

        Exercise exercise = exerciseRepository.findByExerciseName(log.getExercise().getExerciseName())
                .orElseGet(() -> {
                    if (log.getExercise().getExerciseName() == null) {
                        throw new IllegalArgumentException("Exercise name must not be null");
                    }
                    return exerciseRepository.save(log.getExercise());
                });

        log.setWorkout(workout);
        log.setExercise(exercise);

        return ResponseEntity.ok(workoutLogRepository.save(log));
    }
    //READ
    @GetMapping
    public List<WorkoutLog> findAllWorkoutLogs(){
        return workoutLogRepository.findAll();
    }

    @GetMapping("/{id}")
    public WorkoutLog findWorkoutLogById(@PathVariable Long id){
        return workoutLogRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Workout log not found with id " + id));
    }

    //UPDATE
    @PutMapping("/{id}")
    @Transactional
    public WorkoutLog updateWorkoutLog(@PathVariable Long id, @RequestBody WorkoutLog updatedData) {
        return workoutLogRepository.findById(id).map(log -> {
            log.setSets(updatedData.getSets());
            log.setReps(updatedData.getReps());
            log.setWeight(updatedData.getWeight());

            if (log.getExercise() != null && updatedData.getExercise() != null) {
                Exercise existingExercise = log.getExercise();
                existingExercise.setExerciseName(updatedData.getExercise().getExerciseName());
                existingExercise.setMuscleGroup(updatedData.getExercise().getMuscleGroup());
                existingExercise.setEquipment(updatedData.getExercise().getEquipment());
            }

            return workoutLogRepository.save(log);
        }).orElseThrow(() -> new RuntimeException("Log not found"));
    }

    //DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteWorkoutLog(@PathVariable Long id) {
        if (workoutLogRepository.existsById(id)) {
            workoutLogRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}