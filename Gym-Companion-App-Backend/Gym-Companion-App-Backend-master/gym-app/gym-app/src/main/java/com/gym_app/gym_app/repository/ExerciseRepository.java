package com.gym_app.gym_app.repository;

import com.gym_app.gym_app.model.Exercise;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ExerciseRepository extends JpaRepository<Exercise, Long> {
    Optional<Exercise> findByExerciseName(String exerciseName);
}