# CommuSync

CommuSync is a full-stack task management application built with a Next.js frontend, an Express API, and MongoDB persistence. It provides a clean task workflow for creating, viewing, updating, completing, filtering, and deleting tasks.

## Features

- Create tasks with a title and optional description
- View all tasks from MongoDB
- Filter tasks by all, open, or completed status
- Edit task title and description
- Toggle tasks between open and completed
- Delete individual tasks
- Clear all completed tasks
- Responsive Next.js interface
- REST API backed by Express and Mongoose

## Tech Stack

**Frontend**

- Next.js
- React
- TypeScript
- Tailwind CSS
- Axios

**Backend**

- Node.js
- Express
- TypeScript
- MongoDB
- Mongoose

## Project Structure

```txt
CommuSync/
|-- client/              # Next.js frontend
|   |-- app/             # App Router pages and layout
|   |-- components/      # Reusable UI components
|   |-- hooks/           # React state and task actions
|   |-- services/        # API client layer
|   |-- types/           # Frontend TypeScript types
|   `-- utils/           # Shared frontend constants
|-- server/              # Express backend
|   `-- src/
|       |-- config/      # Database connection
|       |-- controllers/ # Request handlers
|       |-- models/      # Mongoose models
|       |-- routes/      # API routes
|       |-- services/    # Database logic
|       `-- validators/  # Request validation
`-- README.md
```

## Getting Started

### Prerequisites

- Node.js
- npm
- MongoDB running locally or a MongoDB connection string

### 1. Install Dependencies

Install frontend dependencies:

```bash
cd client
npm install
```

Install backend dependencies:

```bash
cd ../server
npm install
```

### 2. Configure Environment Variables

Create `server/.env`:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/mini-task-manager
CLIENT_URL=http://localhost:3000
```

Create `client/.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

The frontend will call the tasks endpoint at:

```txt
http://localhost:5000/api/tasks
```

### 3. Run the Backend

```bash
cd server
npm run dev
```

The API runs on:

```txt
http://localhost:5000
```

### 4. Run the Frontend

Open a second terminal:

```bash
cd client
npm run dev
```

The app runs on:

```txt
http://localhost:3000
```

## API Endpoints

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/api/tasks` | Fetch all tasks |
| `POST` | `/api/tasks` | Create a new task |
| `PATCH` | `/api/tasks/:id` | Update task details or status |
| `PUT` | `/api/tasks/:id` | Update task details or status |
| `DELETE` | `/api/tasks/:id` | Delete a task |

## Available Scripts

Frontend scripts:

```bash
cd client
npm run dev
npm run build
npm run start
npm run lint
```

Backend scripts:

```bash
cd server
npm run dev
npm run build
npm run start
```

## Data Storage

Tasks are stored in MongoDB using the configured `MONGO_URI`.

With the default local configuration, data is stored in:

```txt
Database: mini-task-manager
Collection: tasks
```

## Build Checks

Use these commands before shipping changes:

```bash
cd client
npm run lint
npm run build
```

```bash
cd server
npm run build
```

## License

This project is private and intended for learning, development, and portfolio use.
