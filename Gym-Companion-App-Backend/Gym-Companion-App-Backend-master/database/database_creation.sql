-- ==========================================
-- 1. DATABASE CREATION (Run as Superuser/Postgres)
-- ==========================================

-- Disconnect other users and drop if exists (CAUTION: wipes data)
-- DROP DATABASE IF EXISTS gym_database;
-- CREATE DATABASE gym_database;

-- ==========================================
-- 2. SCHEMA CREATION
-- ==========================================

CREATE TABLE IF NOT EXISTS exercises (
    exercise_id SERIAL PRIMARY KEY,
    exercise_name VARCHAR(100) NOT NULL,
    muscle_group VARCHAR(50),
    equipment VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS workouts (
    workout_id SERIAL PRIMARY KEY,
    workout_date DATE DEFAULT CURRENT_DATE,
    workout_name VARCHAR(100),
    notes TEXT
);

CREATE TABLE IF NOT EXISTS workout_logs (
    log_id SERIAL PRIMARY KEY,
    workout_id INTEGER REFERENCES workouts(workout_id) ON DELETE CASCADE,
    exercise_id INTEGER REFERENCES exercises(exercise_id),
    sets INTEGER,
    reps INTEGER,
    weight_kgs DECIMAL(5, 2)
);

-- ==========================================
-- 3. INITIAL SEED DATA
-- ==========================================

INSERT INTO exercises (exercise_name, muscle_group, equipment) VALUES 
('Bench Press', 'Chest', 'Barbell'),
('Squat', 'Legs', 'Barbell'),
('Deadlift', 'Back', 'Barbell'),
('Bicep Curl', 'Arms', 'Dumbbell'),
('Pull-up', 'Back', 'Bodyweight')
ON CONFLICT DO NOTHING;

INSERT INTO workouts (workout_name, notes) VALUES 
('Morning Push Session', 'Feeling strong today'),
('Late Night Leg Day', 'Focused on form');

-- Linking logs to the workouts created above
INSERT INTO workout_logs (workout_id, exercise_id, sets, reps, weight_kgs) VALUES 
(1, 1, 3, 10, 135),
(1, 4, 3, 12, 25),
(2, 2, 5, 5, 225);

-- ==========================================
-- 4. SEQUENCE SYNC
-- ==========================================
-- Crucial for PostgreSQL after manual ID inserts/imports
SELECT setval(pg_get_serial_sequence('exercises', 'exercise_id'), coalesce(max(exercise_id), 1)) FROM exercises;
SELECT setval(pg_get_serial_sequence('workouts', 'workout_id'), coalesce(max(workout_id), 1)) FROM workouts;
SELECT setval(pg_get_serial_sequence('workout_logs', 'log_id'), coalesce(max(log_id), 1)) FROM workout_logs;