package com.gym_app.gym_app.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "workouts")
@Data

public class Workout {
    @Id
    @Column(name = "workout_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToMany(mappedBy = "workout", cascade = CascadeType.ALL)
    @JsonManagedReference("workout-logs")
    private List<WorkoutLog> workoutLogs;

    @Column(name = "workout_date", nullable = false)
    private LocalDate workoutDate;

    @Column(name = "workout_name", nullable = false, length = 100)
    private String workoutName;

    @Column(name = "notes", columnDefinition = "TEXT")
    private String notes;

}
