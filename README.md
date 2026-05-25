# FoodBook

A full-stack food booking and restaurant ordering application. Browse restaurants, view menus, book tables, and place orders — all from one place.

## Tech Stack

| Layer    | Technology                                      |
|----------|-------------------------------------------------|
| Frontend | React 19, Vite, Tailwind CSS v4, React Router v7 |
| Backend  | Java 21, Spring Boot 3.4.5, Spring Security 6   |
| Database | PostgreSQL (hosted on Render)                   |
| Auth     | JWT (stateless, Bearer token)                   |

---

## Prerequisites

- **Java 21** — [Download](https://adoptium.net/)
- **Node.js 18+** — [Download](https://nodejs.org/)
- A running **PostgreSQL** instance (or use the Render DB — see Environment Setup)

---

## Environment Setup

The server reads credentials from environment variables. Create the file `server/.env` with the following content:

```env
DB_URL=jdbc:postgresql://<host>/<dbname>?sslmode=require
DB_USERNAME=<your-db-username>
DB_PASSWORD=<your-db-password>
JWT_SECRET=<base64-encoded-secret>

# Set to true for a fresh database (seeds demo restaurants and users).
# Set to false once the database is already populated.
SEED_ENABLED=true
```

> `server/.env` is excluded from Git. Never commit real credentials.

---

## Running Locally

### 1. Backend

```bash
cd server

# Load env vars and start the Spring Boot server
export $(cat .env | xargs) && ./mvnw spring-boot:run
```

The API will be available at `http://localhost:8080`.

> **First run with a fresh database:** set `SEED_ENABLED=true` in `.env` before starting. The seeder will populate 8 restaurants, ~110 menu items, and 2 demo user accounts. On subsequent runs, set it back to `false` to skip the seeder.

### 2. Frontend

Open a second terminal:

```bash
cd client
npm install      # only needed on first run
npm run dev
```

The app will be available at `http://localhost:5173`.

The Vite dev server proxies all `/api` requests to `http://localhost:8080`, so no CORS configuration is needed.

---

## Demo Accounts

| Role  | Email                | Password   |
|-------|----------------------|------------|
| Admin | admin@foodbook.com   | admin123   |
| User  | user@foodbook.com    | user123    |

---

## Features

**User**
- Browse and search restaurants by name or cuisine
- View menus with category tabs (All, Starters, Mains, etc.)
- Add items to cart (single restaurant per cart, cross-restaurant prompt)
- Place food orders and track their status
- Book tables with date, time, guest count, and special requests
- View order and booking history

**Admin**
- Dashboard with restaurant overview
- Full CRUD for restaurants (add, edit, delete)
- Manage order statuses (Pending → Confirmed → Preparing → Ready → Delivered)

---

## Project Structure

```
foodbook-app/
├── client/                   # React + Vite frontend
│   └── src/
│       ├── components/       # Navbar, RestaurantCard, MenuItemCard, etc.
│       ├── context/          # AuthContext (JWT), CartContext
│       ├── pages/            # All route-level pages
│       │   └── admin/        # Admin-only pages
│       └── services/         # Axios API calls
│
└── server/                   # Spring Boot backend
    └── src/main/java/com/foodbook/server/
        ├── config/           # SecurityConfig (JWT, CORS)
        ├── controller/       # REST controllers
        ├── dto/              # Request/Response DTOs
        ├── entity/           # JPA entities
        ├── enums/            # Role, OrderStatus, BookingStatus
        ├── repository/       # Spring Data JPA repositories
        ├── security/         # JwtUtil, JwtAuthenticationFilter
        └── service/          # Business logic
```

---

## API Overview

| Method | Endpoint                          | Access      | Description                  |
|--------|-----------------------------------|-------------|------------------------------|
| POST   | `/api/auth/register`              | Public      | Register a new user          |
| POST   | `/api/auth/login`                 | Public      | Login, returns JWT           |
| GET    | `/api/restaurants`                | Public      | List / search restaurants    |
| GET    | `/api/restaurants/{id}`           | Public      | Get restaurant by ID         |
| GET    | `/api/restaurants/{id}/menu`      | Public      | Get menu for restaurant      |
| POST   | `/api/orders`                     | Auth        | Place an order               |
| GET    | `/api/orders/user`                | Auth        | Get current user's orders    |
| POST   | `/api/bookings`                   | Auth        | Create a table booking       |
| GET    | `/api/bookings/user`              | Auth        | Get current user's bookings  |
| PUT    | `/api/bookings/{id}/cancel`       | Auth        | Cancel a booking             |
| GET    | `/api/orders/restaurant/{id}`     | Admin       | Get orders for a restaurant  |
| PUT    | `/api/orders/{id}/status`         | Admin       | Update order status          |
| POST   | `/api/restaurants`                | Admin       | Create a restaurant          |
| PUT    | `/api/restaurants/{id}`           | Admin       | Update a restaurant          |
| DELETE | `/api/restaurants/{id}`           | Admin       | Delete a restaurant          |
