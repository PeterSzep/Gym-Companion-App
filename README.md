# GymCompanion

A full-stack workout tracking app. Log gym sessions, track exercises with sets, reps, and weight, and manage your training history.

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, Vite, Tailwind CSS 4 |
| Backend | Spring Boot 4, Java 25, Spring Data JPA |
| Database | PostgreSQL |

## Prerequisites

- Java 25+
- Node.js 18+
- PostgreSQL running on `localhost:5432`

## Setup

### Database

Create a PostgreSQL database named `gymDatabase` and a user with access to it. Update the credentials in `backend/gym-app/gym-app/src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/gymDatabase
spring.datasource.username=your_username
spring.datasource.password=your_password
```

Hibernate will auto-create the tables on first run (`ddl-auto=update`).

### Backend

```bash
cd Gym-Companion-App-Backend/gym-app/gym-app
./mvnw spring-boot:run
```

Runs on `http://localhost:8080`.

### Frontend

```bash
cd Gym-Companion-App-Frontend/frontend
npm install
npm run dev
```

Runs on `http://localhost:5173`.

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/workouts` | List all workouts |
| POST | `/api/workouts` | Create a workout |
| PUT | `/api/workouts/{id}` | Update a workout |
| DELETE | `/api/workouts/{id}` | Delete a workout |
| GET | `/api/exercises` | List all exercises |
| POST | `/api/exercises` | Create an exercise |
| PUT | `/api/exercises/{id}` | Update an exercise |
| DELETE | `/api/exercises/{id}` | Delete an exercise |
| GET | `/api/workoutLogs` | List all workout logs |
| POST | `/api/workoutLogs` | Log an exercise to a workout (auto-creates exercise if name is new) |
| PUT | `/api/workoutLogs/{id}` | Update a log entry |
| DELETE | `/api/workoutLogs/{id}` | Delete a log entry |

## Project Structure

```
├── backend/
│   └── gym-app/gym-app/        # Spring Boot application
│       ├── src/main/java/com/gym_app/gym_app/
│       │   ├── controller/     # REST controllers
│       │   ├── model/          # JPA entities (Workout, Exercise, WorkoutLog)
│       │   ├── repository/     # Spring Data repositories
│       │   └── config/         # CORS config
│       └── src/main/resources/
│           └── application.properties
└── frontend/
    └── frontend/               # React application
        └── src/
            ├── App.jsx         # Root — holds workout state
            ├── fetches.js      # All API calls
            └── components/
                ├── Navbar.jsx
                ├── Workouts.jsx
                ├── WorkoutCard.jsx
                ├── Details.jsx
                ├── CreateWorkout.jsx
                └── CreateExercise.jsx
```

## Data Model

```
Workout  ──< WorkoutLog >──  Exercise
  id             id              id
  workoutName    sets            exerciseName
  workoutDate    reps            muscleGroup
  notes          weight          equipment
```

A `WorkoutLog` is a join between a `Workout` and an `Exercise` that stores performance data (sets, reps, weight).
