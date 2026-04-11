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

Since the Week 4 update focuses on how the user's identity is verified, we should include the **Authentication & Authorization** logic specifically. This covers how a user gets their token and how that token is then used to unlock the Tasks API.

Here is the documentation for the **Authentication** layer we implemented:

---

## Week 4: Authentication & Security Layer

### **The Authentication Mechanism**

The system uses **JWT (JSON Web Tokens)** to handle stateless authentication. Instead of the server remembering who you are (session), the server provides you with a signed token that you must present with every request.

#### **1. Authentication Flow**

1. **Identity Verification**: The user sends credentials to the `/auth/login` endpoint.
2. **Token Issuance**: Upon successful verification, the server signs a JWT containing the `userId`.
3. **Storage**: The client stores this token (usually in LocalStorage or an HTTP-only cookie).
4. **Authorization**: The client includes the token in the `Authorization` header for all protected `/tasks` routes.

#### **2. Security Implementation: The `onRequest` Hook**

We implemented a global lifecycle hook using `fastify.addHook('onRequest', fastify.authenticate)`. This acts as a "Gatekeeper":

- **Before Schema Validation**: The hook runs before the server parses the request body, saving resources.
- **Token Verification**: It decodes the JWT and verifies the signature using the `JWT_SECRET`.
- **Identity Injection**: Once verified, the decoded payload (including the `userId`) is attached to the `request` object, making it available to the Controller.

### **Auth API Specification**

**Base Path:** `/auth` (or your specific auth prefix)

| Method | Endpoint    | Description                          | Requirements                |
| :----- | :---------- | :----------------------------------- | :-------------------------- |
| `POST` | `/register` | Create a new user account            | `email`, `password`, `name` |
| `POST` | `/login`    | Exchange credentials for a JWT token | `email`, `password`         |

### **Configuration**

To support this layer, the following must be configured in the `.env` file:

- **`JWT_SECRET`**: A long, random string used to sign and verify tokens. **Do not share this.**
- **`TOKEN_EXPIRY`**: (Optional) Defines how long a token remains valid (e.g., `1h`, `7d`).

---

### **Summary of the "Secure Handshake"**

By combining the **Auth Module** (Identity) with the **Task Module** (Action), we have achieved a decoupled security model. The Task module doesn't need to know _how_ to log a user in; it only needs to trust that the `request.user` object provided by the `onRequest` hook is valid.
