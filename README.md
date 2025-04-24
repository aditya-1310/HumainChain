# AI Safety Incident Log API

A RESTful API service for logging and managing AI safety incidents.

## Tech Stack

- Node.js
- TypeScript
- Express
- MongoDB with Mongoose ODM

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (running locally or accessible MongoDB instance)

## Setup

1. Clone the repository

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following content:
   ```
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/ai_safety_incidents
   ```

4. Build the TypeScript code:
   ```bash
   npm run build
   ```

5. Seed the database with sample incidents (optional):
   ```bash
   npx ts-node src/scripts/seedData.ts
   ```

## Running the Application

Development mode (with hot reload):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

## API Documentation

### 1. GET /incidents
Retrieves all incidents from the database.

```bash
curl -X GET http://localhost:3000/incidents
```

Response (200 OK):
```json
[
  {
    "id": "1234...",
    "title": "AI Model Bias Detection",
    "description": "Detected significant bias in AI model outputs...",
    "severity": "High",
    "reported_at": "2024-02-01T00:00:00.000Z"
  }
]
```

### 2. POST /incidents
Creates a new incident.

```bash
curl -X POST http://localhost:3000/incidents \
  -H "Content-Type: application/json" \
  -d '{
    "title": "New Incident",
    "description": "Detailed description here",
    "severity": "Medium"
  }'
```

Response (201 Created):
```json
{
  "id": "5678...",
  "title": "New Incident",
  "description": "Detailed description here",
  "severity": "Medium",
  "reported_at": "2024-03-20T12:00:00.000Z"
}
```

Validation:
- Required fields: title, description, severity
- Severity must be one of: "Low", "Medium", "High"
- Missing/invalid fields return 400 Bad Request

### 3. GET /incidents/{id}
Retrieves a specific incident by ID.

```bash
curl -X GET http://localhost:3000/incidents/5678...
```

Response (200 OK):
```json
{
  "id": "5678...",
  "title": "New Incident",
  "description": "Detailed description here",
  "severity": "Medium",
  "reported_at": "2024-03-20T12:00:00.000Z"
}
```

### 4. DELETE /incidents/{id}
Deletes a specific incident.

```bash
curl -X DELETE http://localhost:3000/incidents/5678...
```

Response: 204 No Content on success, 404 Not Found if incident doesn't exist

## Error Handling

The API implements comprehensive error handling:

- 400 Bad Request: Invalid input data
- 404 Not Found: Resource not found
- 500 Server Error: Database or server issues

Error responses include descriptive messages:
```json
{
  "message": "Error description here"
}
```

## Design Decisions

1. **Database Choice**: MongoDB was chosen for:
   - Flexible schema for future extensions
   - Built-in support for JSON data
   - Easy integration with Node.js/TypeScript

2. **TypeScript**: Used for:
   - Type safety
   - Better IDE support
   - Enhanced code maintainability

3. **Express.js**: Selected for:
   - Minimal boilerplate
   - Extensive middleware ecosystem
   - Easy routing and error handling

4. **Error Handling**: Implemented comprehensive error handling with appropriate HTTP status codes and descriptive messages.

5. **Validation**: Input validation ensures data integrity and provides clear error messages.

## Data Model

Incident Schema:
- id: Unique identifier (auto-generated)
- title: String (required)
- description: String (required)
- severity: String (enum: Low, Medium, High) (required)
- reported_at: Date (auto-generated) 