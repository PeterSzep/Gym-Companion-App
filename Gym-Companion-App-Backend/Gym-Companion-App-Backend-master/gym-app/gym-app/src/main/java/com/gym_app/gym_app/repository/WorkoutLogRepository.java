package com.gym_app.gym_app.repository;

import com.gym_app.gym_app.model.WorkoutLog;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface WorkoutLogRepository extends JpaRepository<WorkoutLog, Long> {

    @Modifying
    @Transactional
    @Query("DELETE FROM WorkoutLog w WHERE w.exercise.id = :exerciseId")
    void deleteByExerciseId(@Param("exerciseId") Long exerciseId);
}
