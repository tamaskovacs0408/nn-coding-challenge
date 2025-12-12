# Barber Booking – Frontend

## Requirements

- **Node.js 18+**
- Running **backend API** (separate repository)

---

## Installation

```bash
npm install
```

---

## Environment Variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_API_KEY=your_frontend_api_key
```

> ⚠️ The `NEXT_PUBLIC_` prefix is required because these values are accessible in the browser.

---

## Running the Development Server

```bash
npm run dev
```

By default, the app runs at:

```
http://localhost:3000
```

---

## Production Build

```bash
npm run build
npm run start
```

### Build Note

Some pages use **dynamic data** (e.g., `/barbers`, `/bookings`). To ensure the build succeeds without the backend running, the following approach is used:

```ts
import { unstable_noStore as noStore } from "next/cache";

noStore();
```

This ensures the build completes and the page works as SSR (Server-Side Rendering).

---

## Pages Overview

| Route                  | Description                          |
| ---------------------- | ------------------------------------ |
| `/`                    | Landing page                         |
| `/barbers`             | List of barbers                      |
| `/bookings`            | List of bookings (filtered by email) |
| `/bookings/[barberId]` | Create booking for a specific barber |

---

## State Management & Logic

- **Server Actions**: Create and delete bookings
- **Custom hooks**: Time slot logic (`useTimeSlots`)
- **Backend validation + frontend feedback**
- Handles holidays, Sundays, and past dates

---

## Tech Stack

- **Next.js 16+** (App Router)
- **React (latest, Next.js compatible)**
- **TypeScript**
- **SCSS (BEM methodology)**
- **shadcn/ui** (UI components)
- **Sonner** (toast notifications)
- **lucide-react** (icons)
