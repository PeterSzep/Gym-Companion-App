## ⚙️ Gym Companion Backend
IronPath Backend is a robust REST API built with Spring Boot and Spring Data JPA. It handles the core business logic, persistence of workout data, and the relational mapping between workout sessions and exercise definitions.

🛠️ Tech Stack
Framework: Spring Boot 4.0.2

Language: Java 25

Persistence: Spring Data JPA / Hibernate

Database: H2 (Dev) / PostgreSQL (Prod)

JSON Handling: Jackson with @JsonIgnoreProperties for circular reference management

Tools: Lombok for boilerplate reduction

🏗️ Database Schema & Relationships
The backend manages three primary entities with a "Join Table" logic to track progress over time:

Workout: Represents a single training session (e.g., "Leg Day").

Exercise: A library of movements (e.g., "Squats"). Unique by name.

WorkoutLog: The bridge entity that records specific sets, reps, and weight for an Exercise within a Workout.
