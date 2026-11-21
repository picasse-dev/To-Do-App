# To-Do App

A full-stack To-Do application built to practice and strengthen my skills in frontend and backend development. The application allows users to create, edit, delete, and manage tasks through a React interface connected to a REST API.

## Project Structure

The project is organized into two independent applications:

```text
To-Do-App/
├── Activities_Frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   └── App.jsx
│   └── package.json
│
├── Activities_Backend/
│   ├── index.js
│   └── package.json
│
└── README.md
```

## Technologies

### Frontend
- **React** – Component-based user interface.
- **Vite** – Development environment and build tool.
- **Axios** – HTTP requests and communication with the backend.
- **JavaScript (ES6+)** – Application logic and state management.

### Backend
- **Node.js** – JavaScript runtime environment.
- **Express** – Backend framework for building the REST API.
- **REST API** – HTTP endpoints for managing activities.

## Features

Currently implemented or under development:

- [x] Display existing activities.
- [x] Create new activities.
- [x] Mark activities as completed or pending.
- [x] Edit existing activities.
- [x] Delete activities.
- [x] Separate frontend components.
- [x] Extract API communication into a dedicated service module.
- [ ] Persistent database integration.
- [ ] Improved error handling and notifications.
- [ ] Application deployment.

## Getting Started

### Prerequisites

Make sure you have installed:

- Node.js
- npm

### Installation

Clone the repository:

```bash
git clone https://github.com/picasse-dev/To-Do-App.git
cd To-Do-App
```

### Run the Backend

```bash
cd Activities_Backend
npm install
npm start
```

The backend is configured to run on:

```text
http://localhost:3002
```

### Run the Frontend

Open another terminal:

```bash
cd Activities_Frontend
npm install
npm run dev
```

Vite will provide a local development URL in your terminal.

## API Endpoints

The backend currently defines the following endpoints:

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/activities` | Retrieve all activities |
| POST | `/api/activities` | Create a new activity |
| PUT | `/api/activities/:id` | Update an activity |

## Project Goals

This project is part of my ongoing learning process in full-stack software development.

The main objectives are to:

- Understand React components, props, and state management.
- Work with React Hooks such as `useState` and `useEffect`.
- Implement CRUD operations.
- Understand HTTP methods and REST API architecture.
- Connect a React frontend to a Node.js backend.
- Practice modularization and separation of concerns.
- Eventually integrate a database and deploy the application.

## Current Status

This project is actively under development. New features, improvements, and backend functionalities will be added as I continue learning and expanding the application.