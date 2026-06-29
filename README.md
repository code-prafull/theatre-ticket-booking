# 🎬 Movie Ticket Booking App

> A full-stack movie ticket booking application built as part of the **Creative Upaay Full Stack Development Assignment (2026)**.

---

## 🚀 Live Demo

- **Frontend:** [your-deployed-link.com](#)
- **Backend API:** [your-api-link.com/api](#)

---

## 📸 Screenshots

> *(Add screenshots of your app here)*

---

## ✨ Features

### Level 1 (Core)
- 🏠 **Home Page** — Now Showing, Coming Soon banners with search
- 🎥 **Movie Details** — Description, formats (2D/3D), cast info
- 🏟️ **Theatre Selection** — Browse available cinemas
- 📅 **Show Selection** — Date picker + time slot selector
- 💺 **Seat Selection** — Interactive seat grid with real-time state (Available / Occupied / Selected)
- 🧾 **Booking Summary** — Dynamic price calculation before payment
- 👤 **Authentication** — Register, Login with JWT
- 🔐 **Admin Panel** — Full CRUD for Movies, Shows, Theatres & Bookings
- 📋 **My Bookings** — View history, cancel active bookings

### Level 2 (Bonus)
- 💳 **Payment Gateway** — Razorpay integration with order creation & signature verification
- 📄 **PDF Ticket** — Downloadable ticket after booking confirmation
- 📱 **QR Code** — Unique QR code generated per booking
- 📧 **Email Confirmation** — Booking confirmation email via Nodemailer
- ❤️ **Wishlist** — Save favourite movies
- 📊 **Admin Dashboard** — Stats overview (movies, bookings, revenue)
- 🔒 **Role-Based Access** — Separate user & admin route protection

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React.js + Vite |
| Styling | Tailwind CSS |
| Backend | Node.js + Express.js |
| Database | MongoDB + Mongoose |
| Auth | JWT (JSON Web Tokens) |
| Payments | Razorpay |
| Email | Nodemailer |
| PDF/QR | Custom generators |
| State | React Context API |
| HTTP Client | Axios |

---

## 📁 Project Structure

```
📦 root
├── 📂 backend/src
│   ├── server.js
│   ├── app.js
│   ├── config/          # Razorpay, Nodemailer config
│   ├── controllers/     # auth, movie, show, theatre, booking, payment
│   ├── models/          # User, Movie, Show, Theatre, Booking, Payment
│   ├── routes/          # public, protected, admin routes
│   ├── middleware/       # auth & admin guards
│   ├── services/        # booking API helper
│   ├── utils/           # PDF, QR code, email sender
│   └── database/        # MongoDB connection
│
└── 📂 frontend/src
    ├── pages/           # Home, MovieDetails, SeatSelection, Payment, etc.
    ├── components/      # Reusable UI components
    ├── context/         # AuthContext
    ├── routes/          # AppRoutes with protected routes
    ├── services/        # Axios API modules
    └── utils/           # Seat layout generator
```

---

## ⚙️ Getting Started

### Prerequisites
- Node.js v18+
- MongoDB (local or Atlas)
- Razorpay account (test keys)
- Gmail account (for Nodemailer)

---

### Backend Setup

```bash
cd backend/src
npm install
```

Create a `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_gmail_app_password
```

Start the server:

```bash
npm run dev
```

---

### Frontend Setup

```bash
cd frontend/src
npm install
```

Create a `.env` file:

```env
VITE_API_URL=http://localhost:5000/api
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
```

Start the dev server:

```bash
npm run dev
```

---

## 🔑 Default Admin Credentials

> *(Add your admin email/password here for testing, or mention how to seed the DB)*

```
Email: admin@example.com
Password: admin123
```

---

## 📡 Key API Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/auth/register` | User registration | Public |
| POST | `/api/auth/login` | User login | Public |
| GET | `/api/movies` | Get all movies | Public |
| GET | `/api/shows/:movieId` | Get shows for a movie | Public |
| POST | `/api/bookings` | Create booking | User |
| GET | `/api/bookings/my` | My booking history | User |
| DELETE | `/api/bookings/:id` | Cancel booking | User |
| POST | `/api/payments/create-order` | Initiate payment | User |
| POST | `/api/payments/verify` | Verify payment | User |
| GET | `/api/admin/movies` | Manage movies | Admin |
| GET | `/api/admin/bookings` | View all bookings | Admin |

---

## 🤝 Acknowledgements

- [Creative Upaay](https://www.creativeupaay.com) — for the assignment
- [Razorpay Docs](https://razorpay.com/docs/) — payment integration reference
- [MongoDB Docs](https://www.mongodb.com/docs/) — database reference

---

## 👨‍💻 Author

**Prafull Singh**

---

*Built with ❤️ for Creative Upaay Full Stack Assignment 2026*
