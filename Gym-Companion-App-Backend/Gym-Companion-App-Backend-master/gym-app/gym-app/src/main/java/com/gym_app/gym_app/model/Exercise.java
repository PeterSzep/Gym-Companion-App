package com.gym_app.gym_app.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Table(name = "exercises")
@Data
public class Exercise {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long exerciseId;

    @OneToMany(mappedBy = "exercise")
    @JsonIgnoreProperties("exercise")
    private List<WorkoutLog> workoutLogs;

    @Column(name = "exercise_name", nullable = false)
    private String exerciseName;

    @Column(name = "muscle_group")
    private String muscleGroup;

    private String equipment;
}