**Week 2: Notes API**

A high-performance, type-safe REST API built with Fastify and TypeScript. This project implements a full in-memory CRUD (Create, Read, Update, Delete) system for managing personal notes, featuring strict JSON Schema validation and automated timestamps.

**Features**

1.Type-Safety: Fully implemented with TypeScript interfaces.

2.Schema Validation: Every request and response is guarded by JSON schemas.

3.RESTful Architecture: Follows standard HTTP methods and status codes.

4.Automated Auditing: Tracks createdAt and updatedAt for every resource.

**\*API Reference**

1. List All Notes
   Retrieve a full list of all notes currently stored in memory.

`URL: GET /notes`

`Status: 200 OK`

Example Request:

`curl -X GET http://localhost:6475/notes`

2. Create a Note
   Add a new note to the system. An id and createdAt will be automatically generated.

`URL: POST /notes`

`Status: 201 Created`

Body:

JSON

`{`
`"title": "Learning Fastify",`
`"content": "Building schemas is actually pretty fun."`
`}`

3. Get Note by ID

Retrieve a specific note using its unique identifier.

`URL: GET /notes/:id`

`Status: 200 OK / 404 Not Found`

Example: `GET /notes/1`

4. Update a Note (Full Update)

Replace the title or content of an existing note. The updatedAt field will be refreshed.

`URL: PUT /notes/:id`

`Status: 200 OK / 400 Bad Request / 404 Not Found`

Body:

JSON

`{`
`"title": "Revised Title",`
`"content": "Updated content goes here."`
`}`

5. Delete a Note
   Permanently remove a note from the memory store.

`URL: DELETE /notes/:id`

`Status: 204 No Content / 404 Not Found`

Example Request:

`curl -X DELETE http://localhost:6475/notes/1`

**Getting Started**

Prerequisites

`Node.js (v18+)`

`npm or pnpm`

Installation

Install dependencies:

`npm install`

Start the development server (with auto-reload):

`npm run dev`

The server will be listening at: `http://localhost:6475`

**Validation Rules**

Title: Required for POST and PUT. Must be a string.

Content: Optional. Must be a string.

ID: Must be provided as a path parameter for single-resource operations.
