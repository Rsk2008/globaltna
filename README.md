```
# GlobalTNA — Mini Service Request Board

## Setup Instructions

### Prerequisites

- Node.js v18 or above — https://nodejs.org
- A MongoDB Atlas account (free) — https://www.mongodb.com/cloud/atlas

### MongoDB Setup

1. Sign up at MongoDB Atlas and create a free M0 cluster
2. Create a database user with a username and password
3. Go to Network Access and add 0.0.0.0/0 to allow all connections
4. Click Connect → Drivers → Node.js and copy your connection string

## Required Environment Variables

Create a `.env` file inside the `backend` folder:

```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
```

Create a `.env.local` file inside the `frontend` folder:

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

Server runs at http://localhost:5000

### Frontend

Open a second terminal:

```
cd frontend
npm install
npm run dev
```

App runs at http://localhost:3000

Both the backend and frontend need to be running at the same time.
```

