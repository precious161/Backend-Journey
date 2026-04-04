# Task Management System API (Week 3)

This repository contains a RESTful API built with **Fastify**, **Prisma ORM**, and **PostgreSQL**. This iteration evolves from the previous in-memory Notes API to a persistent, containerized database architecture using a decoupled **Controller-Service-Repository** pattern.

---

## Prerequisites

- **Docker** & **Docker Compose** (Required for containerized deployment)
- **Node.js** (v18+) & **npm** (Required for local development)

---

## Deployment & Initialization

### 1. Environment Configuration

Create a `.env` file in the root directory. The `DATABASE_URL` must point to the PostgreSQL service defined in your Docker configuration.

```env
DATABASE_URL="postgresql://postgres:password@db:5432/tasks_db?schema=public"
PORT=3274
NODE_ENV=development
```

### 2. Container Orchestration

Build and launch the application and database containers:

```bash
docker-compose up -d --build
```

### 3. Database Schema & Seeding

Synchronize the PostgreSQL schema and seed the mandatory **Default User (ID: 1)**. Task creation will fail if User 1 is not present in the database.

```bash
# Push schema and generate Prisma Client
docker-compose exec api npx prisma db push

# Seed the required default user
docker-compose exec api npx prisma db seed
```

---

## API Specification

**Base Path:** `/tasks`

| Method   | Endpoint | Description            | Payload Requirement                    |
| :------- | :------- | :--------------------- | :------------------------------------- |
| `POST`   | `/`      | Create a new task      | `title` (req), `description`, `status` |
| `GET`    | `/`      | List all tasks         | Optional Query: `?status=[VALUE]`      |
| `GET`    | `/:id`   | Retrieve task by ID    | N/A                                    |
| `PUT`    | `/:id`   | Update task details    | Partial or full task object            |
| `DELETE` | `/:id`   | Permanent task removal | N/A                                    |

### Data Validation Rules

- **Task Status Enum:** Restricted to `OPEN`, `IN_PROGRESS`, or `DONE`.
- **Automated Logic:** All tasks are associated with **User ID 1** by default.
- **Timestamps:** `createdAt` and `updatedAt` are managed automatically by the database layer.

---

## Development Workflow

### Local Execution (Host Machine)

To run the API on your host while the database remains containerized:

1. Start the DB: `docker-compose up db -d`
2. Update `.env` `DATABASE_URL` to use `localhost:5432`.
3. Install dependencies: `npm install`
4. Execute: `npm run dev`

### Core Scripts

- `npm run build`: Compiles TypeScript to the `dist/` directory.
- `npm run dev`: Starts the server with hot-reloading via `tsx`.
- `npm run start`: Runs the production-ready compiled code.

---

## Monitoring & Utilities

- **Logs:** `docker-compose logs -f api`
- **Prisma Studio:** Run `npx prisma studio` to manage data via a GUI at `http://localhost:5555`.
- **Teardown:** `docker-compose down -v` (Removes containers and persistent volumes).

---

## Safety & Serialization

Input is strictly validated using **JSON Schemas** via Fastify's AJV engine. Outgoing responses are serialized to ensure internal database implementation details (like specific foreign keys or internal flags) remain private.
