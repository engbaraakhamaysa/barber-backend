# Barber Shop Management System — Backend

A production-oriented RESTful API for managing a barber shop, including customers, barbers, bookings, booking slots, queue management, and customer-barber blocking.

The backend is built with **Node.js, Express.js, TypeScript, and PostgreSQL**, following a modular architecture that separates routing, controllers, services, repositories, validation, and database access.

---

## Features

- User authentication and authorization
- Role-based access control
- Admin and barber roles
- Customer management
- Barber management
- Booking slot management
- Customer booking system
- Real-time queue management logic
- Customer-barber blocking system
- Input validation
- Centralized database access using PostgreSQL
- RESTful API architecture
- Unit testing
- Integration testing
- Transaction handling for critical database operations
- Type-safe development with TypeScript

---

## Tech Stack

### Backend

- Node.js
- Express.js
- TypeScript
- PostgreSQL
- RESTful API

### Authentication & Security

- JWT authentication
- Role-based authorization
- Password hashing
- Protected routes
- Request validation

### Testing

- Jasmine
- Unit Tests
- Integration Tests

### Development Tools

- Git
- GitHub
- Postman
- Docker

---

# Architecture

The project follows a modular layered architecture:

```text
Request
   │
   ▼
Routes
   │
   ▼
Validation Middleware
   │
   ▼
Authentication / Authorization
   │
   ▼
Controller
   │
   ▼
Service
   │
   ▼
Repository
   │
   ▼
PostgreSQL
```

Each layer has a specific responsibility.

### Routes

Define API endpoints and connect them with middleware and controllers.

### Validation

Validate incoming request data before it reaches the controller.

### Controllers

Handle HTTP requests and responses.

Controllers are responsible for:

- Reading request data
- Calling services
- Returning HTTP status codes
- Returning API responses
- Handling controller-level errors

### Services

Contain application and business logic.

The service layer prevents business rules from being placed directly inside controllers or database queries.

### Repositories

Handle database communication.

Repositories are responsible for:

- SQL queries
- Creating records
- Reading records
- Updating records
- Deleting records
- Database transactions

---

# Project Structure

```text
src/
│
├── config/
│   └── db.ts
│
├── middlewares/
│   ├── auth.middleware.ts
│   └── authorize.ts
│
├── modules/
│   │
│   ├── auth/
│   │   ├── auth.controller.ts
│   │   ├── auth.repository.ts
│   │   ├── auth.routes.ts
│   │   ├── auth.service.ts
│   │   ├── auth.types.ts
│   │   └── auth.validation.ts
│   │
│   ├── customers/
│   │   ├── customer.controller.ts
│   │   ├── customer.repository.ts
│   │   ├── customer.routes.ts
│   │   ├── customer.service.ts
│   │   ├── customer.types.ts
│   │   └── customer.validation.ts
│   │
│   ├── barbers/
│   │   ├── barber.controller.ts
│   │   ├── barber.repository.ts
│   │   ├── barber.routes.ts
│   │   ├── barber.service.ts
│   │   ├── barber.types.ts
│   │   └── barber.validation.ts
│   │
│   ├── booking-slots/
│   │   ├── booking-slot.controller.ts
│   │   ├── booking-slot.repository.ts
│   │   ├── booking-slot.routes.ts
│   │   ├── booking-slot.service.ts
│   │   ├── booking-slot.types.ts
│   │   └── booking-slot.validation.ts
│   │
│   ├── bookings/
│   │   ├── booking.controller.ts
│   │   ├── booking.repository.ts
│   │   ├── booking.routes.ts
│   │   ├── booking.service.ts
│   │   ├── booking.types.ts
│   │   └── booking.validation.ts
│   │
│   ├── queue/
│   │   ├── queue.controller.ts
│   │   ├── queue.repository.ts
│   │   ├── queue.routes.ts
│   │   ├── queue.service.ts
│   │   ├── queue.types.ts
│   │   └── queue.validation.ts
│   │
│   └── customer-barber-block/
│       ├── customer-barber-block.controller.ts
│       ├── customer-barber-block.repository.ts
│       ├── customer-barber-block.routes.ts
│       ├── customer-barber-block.service.ts
│       ├── customer-barber-block.types.ts
│       └── customer-barber-block.validation.ts
│
├── app.ts
└── server.ts
```

---

# Authentication & Authorization

The API uses JWT-based authentication.

Protected endpoints require a valid access token:

```http
Authorization: Bearer <access_token>
```

The authorization middleware controls access according to the user's role.

Supported roles include:

```text
admin
barber
```

For example:

```typescript
authorize("barber", "admin");
```

allows both barber and admin users to access the endpoint.

---

# Main Modules

## Customers

The customer module manages customer information.

Supported operations:

- Create customer
- Get all customers
- Get customer by ID
- Update customer
- Delete customer

Customers can be created without an account, allowing the system to support walk-in customers and customers who book without authentication.

---

## Barbers

The barber module manages barber information and their relationship with shops.

Supported operations include:

- Create barber
- Get barber by ID
- Get barbers by shop
- Update barber
- Delete barber

---

## Booking Slots

Booking slots represent available time slots associated with barbers.

Supported operations:

- Create booking slot
- Get all booking slots
- Get booking slot by ID
- Get slots by barber
- Update booking slot
- Delete booking slot

---

## Bookings

The booking module manages customer appointments.

A booking connects:

```text
Customer
   │
   ▼
Booking
   │
   ▼
Booking Slot
   │
   ▼
Barber
```

Supported booking statuses:

```text
pending
confirmed
cancelled
completed
no_show
```

The booking creation process validates the related customer and booking slot before creating the booking.

Database transactions are used for critical booking operations to ensure consistency.

---

## Queue

The queue module manages customers waiting for service.

Supported queue statuses:

```text
waiting
called
in_service
completed
cancelled
```

The module supports:

- Joining the queue
- Getting the complete queue
- Getting a queue entry by ID
- Getting a barber's queue
- Getting a customer's active queue entry
- Getting the next waiting customer
- Updating queue status
- Removing a queue entry

The service layer also prevents a customer from joining the queue multiple times while already waiting.

---

## Customer-Barber Blocking

This module allows a barber to block a specific customer.

A block belongs to a customer-barber relationship:

```text
Customer ──────── Barber
     │
     └── Block
```

Supported operations:

- Block customer
- Get block by ID
- Get active blocks by barber
- Get active blocks by customer
- Unblock customer
- Delete block record

The service prevents duplicate active blocks between the same customer and barber.

---

# API Overview

The main API resources are organized as follows:

```text
/api/auth
/api/customers
/api/barbers
/api/booking-slots
/api/bookings
/api/queue
/api/customer-barber-blocks
```

---

## Customer Endpoints

| Method | Endpoint         | Access       | Description       |
| ------ | ---------------- | ------------ | ----------------- |
| POST   | `/customers`     | Public       | Create customer   |
| GET    | `/customers`     | Barber/Admin | Get all customers |
| GET    | `/customers/:id` | Barber/Admin | Get customer      |
| PUT    | `/customers/:id` | Barber/Admin | Update customer   |
| DELETE | `/customers/:id` | Barber/Admin | Delete customer   |

---

## Booking Slot Endpoints

| Method | Endpoint                          | Access       | Description      |
| ------ | --------------------------------- | ------------ | ---------------- |
| POST   | `/booking-slots`                  | Barber/Admin | Create slot      |
| GET    | `/booking-slots`                  | Barber/Admin | Get all slots    |
| GET    | `/booking-slots/:id`              | Barber/Admin | Get slot         |
| GET    | `/booking-slots/barber/:barberId` | Barber/Admin | Get barber slots |
| PUT    | `/booking-slots/:id`              | Barber/Admin | Update slot      |
| DELETE | `/booking-slots/:id`              | Barber/Admin | Delete slot      |

---

## Booking Endpoints

| Method | Endpoint                         | Access       | Description           |
| ------ | -------------------------------- | ------------ | --------------------- |
| POST   | `/bookings`                      | Public       | Create booking        |
| GET    | `/bookings`                      | Barber/Admin | Get all bookings      |
| GET    | `/bookings/:id`                  | Barber/Admin | Get booking           |
| GET    | `/bookings/customer/:customerId` | Barber/Admin | Get customer bookings |
| GET    | `/bookings/barber/:barberId`     | Barber/Admin | Get barber bookings   |
| PUT    | `/bookings/:id`                  | Barber/Admin | Update booking status |
| DELETE | `/bookings/:id`                  | Barber/Admin | Delete booking        |

---

## Queue Endpoints

| Method | Endpoint                       | Access       | Description               |
| ------ | ------------------------------ | ------------ | ------------------------- |
| POST   | `/queue`                       | Public       | Join queue                |
| GET    | `/queue`                       | Barber/Admin | Get queue                 |
| GET    | `/queue/:id`                   | Barber/Admin | Get queue entry           |
| GET    | `/queue/customer/:customerId`  | Public       | Get active customer queue |
| GET    | `/queue/barber/:barberId`      | Barber/Admin | Get barber queue          |
| GET    | `/queue/barber/:barberId/next` | Barber/Admin | Get next waiting customer |
| PUT    | `/queue/:id`                   | Barber/Admin | Update queue              |
| DELETE | `/queue/:id`                   | Barber/Admin | Delete queue entry        |

---

## Customer-Barber Block Endpoints

| Method | Endpoint                                       | Access       | Description         |
| ------ | ---------------------------------------------- | ------------ | ------------------- |
| POST   | `/customer-barber-blocks`                      | Barber/Admin | Block customer      |
| GET    | `/customer-barber-blocks/:id`                  | Barber/Admin | Get block           |
| GET    | `/customer-barber-blocks/barber/:barberId`     | Barber/Admin | Get barber blocks   |
| GET    | `/customer-barber-blocks/customer/:customerId` | Barber/Admin | Get customer blocks |
| PATCH  | `/customer-barber-blocks/:id/unblock`          | Barber/Admin | Unblock customer    |
| DELETE | `/customer-barber-blocks/:id`                  | Barber/Admin | Delete block        |

---

# Validation

The API validates request data before processing it.

Examples of validation include:

- Required fields
- Positive integer IDs
- Valid date values
- Valid enum statuses
- Customer name length
- Phone data type
- Blocking reason length
- Booking slot time validation
- Start and end time consistency

Invalid requests return:

```http
400 Bad Request
```

Example:

```json
{
  "message": "Valid customer_id is required"
}
```

---

# Error Handling

The API uses appropriate HTTP status codes.

Common responses include:

| Status | Meaning                  |
| ------ | ------------------------ |
| 200    | Successful request       |
| 201    | Resource created         |
| 400    | Invalid request data     |
| 401    | Authentication required  |
| 403    | Insufficient permissions |
| 404    | Resource not found       |
| 409    | Resource conflict        |
| 500    | Internal server error    |

Business conflicts are handled explicitly.

For example:

```text
CUSTOMER_ALREADY_IN_QUEUE
CUSTOMER_ALREADY_BLOCKED_BY_BARBER
BOOKING_SLOT_NOT_FOUND
CUSTOMER_NOT_FOUND
```

These service-level errors are converted by controllers into meaningful HTTP responses.

---

# Database

The application uses **PostgreSQL** as its relational database.

The database contains relationships between the main entities:

```text
Users
 │
 ├── Barbers
 │      │
 │      ├── Booking Slots
 │      │       │
 │      │       └── Bookings
 │      │
 │      └── Customer Blocks
 │
 └── Authentication


Customers
 │
 ├── Bookings
 ├── Queue Entries
 └── Customer-Barber Blocks
```

Parameterized SQL queries are used to prevent SQL injection.

Example:

```sql
SELECT *
FROM customers
WHERE id = $1;
```

---

# Transactions

Database transactions are used when multiple database operations must succeed or fail together.

Example booking flow:

```text
BEGIN
   │
   ├── Validate booking slot
   │
   ├── Validate customer
   │
   ├── Create booking
   │
   └── COMMIT
```

If any operation fails:

```text
ROLLBACK
```

This prevents partially completed database operations.

---

# Testing

The project includes both **Unit Tests** and **Integration Tests** using Jasmine.

## Unit Tests

Unit tests test individual application components in isolation.

For example, service tests mock repository methods:

```text
Service
   │
   └── Mock Repository
```

This allows business logic to be tested without depending on the real database.

Example test areas:

- Creating barbers
- Hashing passwords
- Getting records
- Updating records
- Deleting records
- Handling missing records
- Service-level business rules

---

## Integration Tests

Integration tests verify that multiple application components work correctly together with the database.

Typical flow:

```text
Test
 │
 ▼
Service
 │
 ▼
Repository
 │
 ▼
Test PostgreSQL Database
```

This verifies the actual database queries, repository behavior, and integration between application layers.

---

# Running Tests

Compile the TypeScript project first:

```bash
npm run build
```

Run unit tests:

```bash
NODE_ENV=test npx jasmine dist/tests/unit/**/*.spec.js
```

Run integration tests:

```bash
NODE_ENV=test npx jasmine dist/tests/integration/**/*.spec.js
```

Or use the test scripts defined in `package.json` if available.

---

# Environment Variables

Create a `.env` file in the project root.

Example:

```env
NODE_ENV=development

PORT=3000

DB_HOST=localhost
DB_PORT=5432
DB_NAME=barber_db
DB_USER=postgres
DB_PASSWORD=your_password

JWT_SECRET=your_jwt_secret
```

For integration tests, use a separate test environment:

```env
NODE_ENV=test

TEST_DB_HOST=localhost
TEST_DB_PORT=5432
TEST_DB_NAME=barber_test_db
TEST_DB_USER=postgres
TEST_DB_PASSWORD=your_password
```

Do not commit `.env` files or database credentials to GitHub.

---

# Installation

Clone the repository:

```bash
git clone <repository-url>
```

Move into the project:

```bash
cd barber-backend
```

Install dependencies:

```bash
npm install
```

Create the environment files:

```text
.env
.env.test
```

Configure your PostgreSQL database and environment variables.

---

# Development

Start the development server:

```bash
npm run dev
```

Build the project:

```bash
npm run build
```

Start the production build:

```bash
npm start
```

---

# API Testing

The API can be tested using tools such as:

- Postman
- Insomnia
- REST Client
- Frontend application

Protected endpoints require a JWT access token:

```http
Authorization: Bearer <token>
```

---

# Design Principles

The backend follows several software engineering principles:

### Separation of Concerns

Each layer has one main responsibility.

```text
Route       → Request routing
Validation  → Input validation
Controller  → HTTP handling
Service     → Business logic
Repository  → Database access
```

### Type Safety

TypeScript interfaces and types are used to define:

- Database entities
- Request data
- Update inputs
- Response structures
- Status values

### Reusability

Business logic is kept inside services instead of being duplicated across controllers.

### Maintainability

The modular structure makes it easier to:

- Add new features
- Modify existing modules
- Write tests
- Debug problems
- Scale the application

---

# Security Considerations

The API includes several security practices:

- JWT-based authentication
- Role-based authorization
- Password hashing
- Protected administrative endpoints
- Input validation
- Parameterized SQL queries
- Environment-based secrets
- Database transactions for critical operations

---

# Future Improvements

Possible future improvements include:

- Refresh token authentication
- Centralized error-handling middleware
- Rate limiting
- API documentation with Swagger/OpenAPI
- Pagination
- Advanced booking conflict prevention
- Automated database migrations
- Dockerized production deployment
- CI/CD pipeline
- Logging and monitoring
- API response standardization

---

# Project Status

The backend currently provides the core functionality required for a barber shop management system, including authentication, barber management, customer management, booking management, booking slots, queue management, and customer-barber blocking.

The project also includes both unit and integration tests to improve reliability and maintainability.

---

# Author

**Baraa Khamaysa**

Computer Systems Engineering Graduate
Junior Full Stack Web Developer

GitHub:
`https://github.com/engbaraakhamaysa`

---

# License

This project is developed for educational and portfolio purposes.
