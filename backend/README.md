# Barber Booking API – Backend

## Requirements

- **Node.js 18+**
- npm / pnpm

---

## Installation

```bash
npm install
```

---

## Environment Variables

Create a `.env` file in the project root based on `.env.example`:

```env
PORT=3001
API_KEY=your-backend-api-key
BARBER_API_URL=barber-api-url
BARBER_API_KEY=your-barber-api-key
```

### Variable Reference

| Variable         | Description                     |
| ---------------- | ------------------------------- |
| `PORT`           | Backend server port             |
| `API_KEY`        | API key for protected endpoints |
| `BARBER_API_URL` | External barber service API URL |
| `BARBER_API_KEY` | External barber service API key |

---

## Running the Server

### Development Mode

```bash
npm run dev
```

The server will be available at:

```
http://localhost:3001
```

---

## Health Check

```http
GET /health
```

Example response:

```json
{
  "status": "ok",
  "timestamp": "2025-12-10T09:21:34.123Z",
  "service": "nn-coding-challenge-backend"
}
```

---

## API Protection

All `/api/*` endpoints are **protected with an API key**.

Example request header:

```http
x-api-key: your-backend-api-key
```

---

## API Documentation (Swagger / OpenAPI)

The backend provides interactive Swagger documentation:

```
http://localhost:3001/api-docs
```

Documentation includes:

- Available endpoints
- Request and response schemas
- Error codes

---

## Core Features

- Retrieve barbers from external API
- Create bookings
- List bookings (by email or barberId)
- Delete bookings
- Business rules enforcement:

  - Past dates are not allowed
  - Closed on Sundays
  - Closed on holidays
  - Prevent double-booking of time slots
  - Operating hours validation (07:00–20:00)

---

## Tech Stack

- Node.js
- Express
- TypeScript
- Swagger (swagger-jsdoc, swagger-ui-express)
- File-based data storage (`bookings.json`)
- Environment variables (dotenv)