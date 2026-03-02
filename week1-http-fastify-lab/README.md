**HTTP-Fastify Lab**

**1. Overview**

This is a type-safe Node.js backend built to demonstrate the transition from basic HTTP interaction to a professional, modular API. It covers raw request handling and the implementation of a structured Model-View-Controller (MVC) pattern using Fastify and TypeScript.

**2. Features**

**2.1 Part A: HTTP Foundations**

Manual Interaction: Includes standalone scripts (http-get.ts and http-post.ts) to master programmatic GET and POST requests.

JSON Processing: Practical application of sending and receiving structured data without a browser.

**2.2 Part B: Modular API**

Health: A /health endpoint that calculates server uptime using global decorators.

Ping: A /ping endpoint for instant latency and heartbeat checks.

Echo: A type-safe /echo route that mirrors URL query parameters using TypeScript Generics.

**3. Architecture & Design**

Separation of Concerns: Logic is split into Routes (endpoints) and Controllers (logic).

Dependency Injection: Uses Fastify Plugins to prevent circular dependencies.

Type Safe: Comprehensive interface definitions for request queries.

**4. Installation & Usage**

**4.1 Setup**

Install the necessary dependencies:

`npm install`

**4.2 Running the Project**

Part A (Scripts): Run the baseline testers using tsx:

`Bash`

`npx tsx src/scripts/http-get.ts https://api.github.com`
`npx tsx src/scripts/http-post.ts  https://httpbin.org/post {"name":"Test"}`

Part B (Server): Start the API with hot-reload for development:

`Bash`

`npm run dev`

**4.3 Build & Deployment**

To compile the TypeScript source into production-ready JavaScript:

`Bash`

`npm run build`

**4.4 Testing**

Ping Test: `curl http://localhost:3478/ping`

Expected: `{"pong": true}`

Uptime Test: `curl http://localhost:3478/health`

Expected: `{ "status": "ok", "uptime": <number> }`

Echo Test : `curl http://localhost:3478/echo?msg=Hello`

Expected: `{"msg": "Hello"}`
