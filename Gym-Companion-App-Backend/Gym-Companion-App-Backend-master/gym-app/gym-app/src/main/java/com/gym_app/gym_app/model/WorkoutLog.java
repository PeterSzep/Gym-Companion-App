package com.gym_app.gym_app.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "workout_logs")
@Data

public class WorkoutLog {
    @Id
    @Column(name = "log_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "workout_id", nullable = false)
    @JsonBackReference("workout-logs")
    private Workout workout;

    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinColumn(name = "exercise_id")
    @JsonIgnoreProperties("workoutLogs")
    private Exercise exercise;

    @Column(name = "sets")
    private Integer sets;

    @Column(name = "reps")
    private Integer reps;

    @Column(name = "weight_kgs")
    private Double weight;

    @JsonProperty("workoutName")
    public String getWorkoutName() {
        return (workout != null) ? workout.getWorkoutName() : null;
    }

    @JsonProperty("workoutDate")
    public String getWorkoutDate() {
        return (workout != null) ? workout.getWorkoutDate().toString() : null;
    }

    @JsonProperty("exerciseName")
    public String getExerciseName() {
        return (exercise != null) ? exercise.getExerciseName() : null;
    }
}
