package com.gym_app.gym_app.repository;

import com.gym_app.gym_app.model.Workout;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WorkoutRepository extends JpaRepository<Workout, Long> {
}
