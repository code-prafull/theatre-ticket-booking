# 🎬 Movie Ticket Booking System (Backend)

A scalable Movie Ticket Booking System backend built using the MERN stack. This project follows a clean MVC architecture and is being developed phase by phase with production-oriented practices.

---

# 🚀 Tech Stack

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* Bcrypt
* Cookie Parser
* CORS
* Helmet
* Morgan
* Compression
* Express Rate Limit

---

# 📁 Current Folder Structure

```text
backend/
│
├── src/
│   ├── config/
│   ├── constants/
│   ├── controllers/
│   │   └── auth.controller.js
│   ├── database/
│   │   └── db.js
│   ├── middleware/
│   │   └── auth.middleware.js
│   ├── models/
│   │   └── user.model.js
│   ├── repositories/
│   ├── routes/
│   │   └── auth.routes.js
│   ├── services/
│   ├── utils/
│   ├── validators/
│   ├── app.js
│   └── server.js
│
├── uploads/
├── .env
├── .gitignore
├── package.json
└── README.md
```

---

# ✅ Features Completed

## Phase 1 — Backend Setup

* Express Server Setup
* MongoDB Connection
* Environment Variables
* CORS Configuration
* Helmet Security
* Compression Middleware
* Morgan Logger
* Cookie Parser
* JSON & URL Encoded Parsers
* Project Folder Structure

---

## Phase 2 — Authentication

### User Authentication

* User Registration
* User Login
* User Logout
* Get Logged-in User Profile

### Security

* Password Hashing using Bcrypt
* JWT Token Generation
* HTTP Only Cookies
* Protected Routes Middleware
* Authorization using Bearer Token

---

# 📌 API Endpoints

## Authentication

### Register User

```http
POST /api/auth/register
```

### Login User

```http
POST /api/auth/login
```

### Logout User

```http
POST /api/auth/logout
```

### Get Profile

```http
GET /api/auth/profile
```

---

# 📦 Installed Packages

### Production Dependencies

```bash
express
mongoose
dotenv
bcrypt
jsonwebtoken
cookie-parser
cors
helmet
compression
morgan
multer
express-rate-limit
```

### Development Dependency

```bash
nodemon
```

---

# 🔐 Authentication Flow

```text
Client
   │
   ▼
Register / Login
   │
   ▼
Password Hashing (Bcrypt)
   │
   ▼
JWT Token Generation
   │
   ▼
HTTP Only Cookie
   │
   ▼
Protected Middleware
   │
   ▼
Authorized API Access
```

---

# 📂 Current Architecture

```text
Routes
   │
   ▼
Controllers
   │
   ▼
Models
   │
   ▼
MongoDB
```

> Repository and Service layers will be added in a future refactoring phase.

---

# 🛠️ Environment Variables

Create a `.env` file in the project root.

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

JWT_EXPIRE=7d

NODE_ENV=development

CLIENT_URL=http://localhost:5173
```

---

# ▶️ Run the Project

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

---

# 🗺️ Development Roadmap

* ✅ Backend Setup
* ✅ Authentication Module
* ⏳ Movie Management
* ⏳ Theatre Management
* ⏳ Show Scheduling
* ⏳ Seat Selection & Booking
* ⏳ Payment Integration
* ⏳ Ticket Generation
* ⏳ Admin Dashboard
* ⏳ Deployment

---

# 👨‍💻 Author

**Prafull Singh**

This project is being built step by step to demonstrate full-stack backend development, authentication, clean project structure, and scalable API design.
