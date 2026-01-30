# Portfolio Monorepo

This is a monorepo containing both the frontend and backend for the portfolio project.

## Project Structure

```
portfolio/
├── backend/          # Express.js backend server
├── frontend/         # React + Vite frontend application
└── README.md
```

## Prerequisites

- Node.js (v18 or higher recommended)
- npm

## Getting Started

### Backend

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies (if not already installed):
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```
   
   Or start the production server:
   ```bash
   npm start
   ```

   The backend server will run on `http://localhost:3000`

### Frontend

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies (if not already installed):
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

   The frontend will typically run on `http://localhost:5173` (Vite's default port)

## Running Both Services

To run both the backend and frontend simultaneously, open two terminal windows:

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

## Technologies Used

### Backend
- Express.js - Web framework
- CORS - Cross-Origin Resource Sharing
- Nodemon - Development server with auto-reload

### Frontend
- React - UI library
- Vite - Build tool and development server
