# Tasks API: Production-Ready Task Management

A high-performance, containerized RESTful API built with **Fastify**, **Prisma**, and **PostgreSQL**. This project demonstrates a modular architecture designed for security, scalability, and automated reliability.

---

## System Architecture

This project implements a **Decoupled Layered Architecture** to ensure a strict separation of concerns:

- **Controllers:** Handle incoming HTTP requests and format outgoing responses.
- **Services:** House the core business logic and domain rules.
- **Repositories:** Abstract the database layer using Prisma ORM.
- **Plugins:** Centralized logic for Authentication (JWT), Error Handling, and Database connectivity.

---

## Getting Started

### 1. Environment Configuration

Create a `.env` file in the root directory:

```env
PORT=3274
NODE_ENV=development
DATABASE_URL="postgresql://postgres:password@db:5432/tasks_db?schema=public"
JWT_SECRET="your_ultra_secure_secret_key"
```

### 2. Rapid Deployment (Docker)

The entire stack (API + Database) is containerized for "one-command" execution:

```bash
docker-compose up -d --build
```

_The API will be available at `http://localhost:3274`._

---

## Security & Authentication

The API utilizes **JWT (JSON Web Tokens)** for stateless authentication.

- **Registration/Login:** Handled via the `/auth` module.
- **Authorization:** All `/tasks` endpoints are protected by a global `onRequest` hook.
- **Ownership Integrity:** Users can only view, update, or delete tasks they created. The system extracts the `userId` directly from the verified JWT payload.

---

## API Documentation (OpenAPI)

Interactive documentation is automatically generated and served via Swagger UI.

- **URL:** `http://localhost:3274/docs`
- **Features:** Real-time testing of endpoints, schema visualization, and JWT authorization simulation.

---

## Testing & Reliability

We maintain a high level of confidence through automated testing using **Vitest**.

- **Unit Tests:** Verify pure utility functions and authentication hashing.
- **Integration Tests:** Simulate full API lifecycles (Signup → Login → Task Creation) using `fastify.inject` to verify the database and middleware integration.

**Run the test suite:**

```bash
npm test
```

---

## Advanced Features

- **Structured Logging:** Uses **Pino** for high-performance logging. In development, logs are formatted via `pino-pretty` for readability on the HP Notebook terminal.
- **Centralized Error Handling:** All errors (Prisma, Validation, or Auth) are mapped to a consistent JSON envelope to ensure predictable client-side handling.
- **Input Validation:** Strict JSON Schema validation via Fastify's AJV engine prevents malformed data from reaching the database.

---

## Core Scripts

- `npm run dev`: Hot-reloading development server.
- `npm run build`: Compiles TypeScript for production deployment.
- `prisma studio`: GUI for exploring the database at `http://localhost:5555`.

---
