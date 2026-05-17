# GlobalTNA — Mini Service Request Board

A full-stack web app where homeowners can post service requests and tradespeople can browse, view, and manage them. Built as part of the GlobalTNA Full-Stack Developer Intern technical assessment.

## Tech Stack

- **Frontend** — Next.js 15 (App Router), Tailwind CSS, TypeScript
- **Backend** — Node.js, Express
- **Database** — MongoDB Atlas
- **ODM** — Mongoose

## Prerequisites

- Node.js v18 or higher — https://nodejs.org
- A free MongoDB Atlas account — https://www.mongodb.com/cloud/atlas

## Database Setup

1. Create a free account at https://www.mongodb.com/cloud/atlas
2. Create a free M0 cluster
3. Create a database user with a username and password
4. Under Network Access, add 0.0.0.0/0 to allow connections from anywhere
5. Click Connect, select Drivers, copy the connection string

## Environment Variables

### Backend — create a file called `.env` inside the `backend` folder

```
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/globaltna?retryWrites=true&w=majority
```

### Frontend — create a file called `.env.local` inside the `frontend` folder

```
NEXT_PUBLIC_API_URL=http://localhost:5000
```

## Run Instructions

### Backend

```
cd backend
npm install
npm run seed
npm run dev
```

Server starts at http://localhost:5000

### Frontend

Open a second terminal:

```
cd frontend
npm install
npm run dev
```

App starts at http://localhost:3000

Both terminals must be running at the same time.

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | /api/jobs | Get all jobs. Supports ?category= and ?status= filters |
| GET | /api/jobs/:id | Get a single job |
| POST | /api/jobs | Create a new job |
| PATCH | /api/jobs/:id | Update status only |
| DELETE | /api/jobs/:id | Delete a job |
