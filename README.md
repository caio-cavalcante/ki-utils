# ki-utils
Productivity hub with features I use daily.

## Prerequisites
- Node.js (v18 or higher)
- Docker Desktop
- npm or yarn

## Project Structure
```
ki-utils/
├── client/          # React frontend (Vite + TypeScript)
├── server/          # Express backend (TypeScript + Prisma)
└── README.md
```

## First-Time Setup

### 1. Install Dependencies
```bash
# Install client dependencies
cd ./client/
npm install

# Install server dependencies
cd ../server/
npm install
```

### 2. Database Setup
```bash
# Make sure Docker Desktop is running
# Start PostgreSQL container
cd ./server/
docker-compose up -d

# Generate Prisma client
npx prisma generate

# Push database schema
npx prisma db push
```

## Daily Development

### Start the Application
You'll need two terminal windows:

**Terminal 1 - Backend:**
```bash
cd ./server/
# Ensure Docker is running and database is up
docker-compose up -d
# Start the server
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd ./client/
npm run dev
```

The client will typically run on `http://localhost:5173` and the server on `http://localhost:3000` (check your console output for exact ports).

## Database Management

### View Database (Prisma Studio)
```bash
cd ./server/
npx prisma studio
```

### Stop Database
```bash
cd ./server/
docker-compose down
```

### Reset Database
```bash
cd ./server/
npx prisma db push --force-reset
```

## Troubleshooting

**Docker connection errors:**
- Ensure Docker Desktop is running
- Check if the container is up: `docker ps`

**Port already in use:**
- Check what's using the port: `netstat -ano | findstr :5433` (database)
- Stop the container and restart: `docker-compose down && docker-compose up -d`

**Prisma client errors:**
- Regenerate the client: `npx prisma generate`
- Ensure database is running before generating 
