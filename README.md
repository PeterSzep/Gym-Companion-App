# 🏋️‍♂️ Full-Stack Gym Companion
This is a high-performance workout tracking suite designed to eliminate the friction of traditional fitness apps. It features a robust Spring Boot REST API and a sleek, aesthetically driven React dashboard, allowing athletes to log sets, manage exercise libraries, and visualize progress in real-time.

🏗️ System Architecture
The platform is built on a decoupled architecture, ensuring a smooth flow between the data layer and the user interface:

⚙️ Backend (Spring Boot)
The core business logic and data persistence layer. It handles the relational mapping between sessions and exercises using a "Join Table" logic.

Framework: Spring Boot 4.0.2 / Java 25

Persistence: Spring Data JPA / Hibernate

Database: H2 (Development) / PostgreSQL (Production)

Key Logic: * Workout: Tracks individual sessions (e.g., "Leg Day").

Exercise: A unique library of movements (e.g., "Squats").

WorkoutLog: The bridge entity recording specific sets, reps, and weight.

Circular Reference Management: Uses Jackson with @JsonIgnoreProperties for clean JSON serialization.

💻 Frontend (React)
A "gym-floor-ready" interface designed for speed and responsiveness.

Core: React 18 (Vite-powered for instant HMR)

Styling: Tailwind CSS

Icons: Lucide-React

Features:

Workout Intelligence: Automatically links new exercises to current sessions.

Scrollable Exercise Vault: A sleek modal to view and manage sets.

Instant UI Feedback: Optimized state management for a "no-reload" experience.

Responsive Fluidity: Fully optimized for mobile use during training
