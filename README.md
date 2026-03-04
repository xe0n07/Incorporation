# Company Incorporation Tool

A full-stack web application to incorporate companies with multi-step form and draft persistence.

## Tech Stack
- **Frontend**: React, Vite, Tailwind CSS, Axios
- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL

## Setup Instructions

### Prerequisites
- Node.js v18+
- PostgreSQL

### Database Setup
```bash
psql -U postgres
CREATE DATABASE incorporation_db;
\c incorporation_db
```
Run the SQL from `backend/src/db/schema.sql`

### Backend
```bash
cd backend
npm install
cp .env.example .env   # fill in your DB credentials
npm run dev
```
Runs on http://localhost:5000

### Frontend
```bash
cd frontend
npm install
npm run dev
```
Runs on http://localhost:5173

## API Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /companies | Create company (draft) |
| GET | /companies | Get all companies with shareholders |
| GET | /companies/:id | Get one company with shareholders |
| POST | /companies/:id/shareholders | Add shareholders |

## Features
- Multi-step incorporation form
- Draft persistence (survives browser refresh)
- Dynamic shareholder forms based on count
- Admin panel to view all companies