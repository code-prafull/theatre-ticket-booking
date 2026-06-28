# 🎬 Movie Ticket Booking System

A full-stack Movie Ticket Booking System built with **React.js, Node.js, Express.js, MongoDB, JWT Authentication, and Razorpay**.

---

# 🚀 Features

## 👤 User Features

* User Registration
* User Login & Logout
* JWT Authentication
* Protected Routes
* Browse Movies
* Movie Details
* Theatre Selection
* Show Selection
* Seat Selection
* Booking Summary
* Razorpay Payment Integration
* My Bookings
* Booking Confirmation Email

---

## 👨‍💼 Admin Features

* Admin Dashboard
* Role Based Authentication
* Movie Management (CRUD)
* Theatre Management (CRUD)
* Show Management (CRUD)
* Booking Management

---

# 🛠 Tech Stack

## Frontend

* React.js
* React Router DOM
* Tailwind CSS
* Material UI
* Axios
* React Hot Toast

---

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* bcrypt
* Cookie Parser
* Nodemailer
* Razorpay

---

# 📂 Project Structure

## Frontend

```
src
│
├── components
├── context
├── pages
├── routes
├── services
└── utils
```

---

## Backend

```
backend
│
├── config
├── controllers
├── database
├── middleware
├── models
├── routes
├── services
└── utils
```

---

# 🔐 Authentication

* JWT Authentication
* Protected Routes
* Role Based Access
* Admin Authorization

---

# 🎟 Booking Flow

```
Register/Login

↓

Browse Movies

↓

Select Theatre

↓

Select Show

↓

Choose Seats

↓

Checkout

↓

Payment

↓

Booking Confirmation
```

---

# 📧 Email Notification

After successful booking, users receive a confirmation email containing:

* Movie Name
* Theatre
* Seats
* Date
* Time
* Total Amount

---

# 📦 Installation

## Clone Repository

```bash
git clone <repository-url>
```

---

## Backend

```bash
cd backend
npm install
npm run dev
```

---

## Frontend

```bash
cd frontend
npm install
npm run dev
```

---

# 🔑 Environment Variables

Backend `.env`

```
PORT=

MONGO_URI=

JWT_SECRET=

JWT_EXPIRE=

RAZORPAY_KEY_ID=

RAZORPAY_KEY_SECRET=

EMAIL_USER=

EMAIL_PASS=
```

---

# 📌 APIs

## Authentication

* POST /api/auth/register
* POST /api/auth/login
* POST /api/auth/logout
* GET /api/auth/profile

---

## Movies

* GET /api/movies
* POST /api/movies
* PUT /api/movies/:id
* DELETE /api/movies/:id

---

## Theatres

* GET /api/theatres
* POST /api/theatres
* PUT /api/theatres/:id
* DELETE /api/theatres/:id

---

## Shows

* GET /api/shows
* POST /api/shows
* PUT /api/shows/:id
* DELETE /api/shows/:id

---

## Bookings

* POST /api/bookings
* GET /api/bookings/my-bookings
* GET /api/bookings/:id

---

## Payments

* POST /api/payment/create-order
* POST /api/payment/verify

---

# 📸 Screenshots

* Home Page
* Login
* Register
* Movie Details
* Seat Selection
* Checkout
* Payment
* Admin Dashboard

(Add screenshots after completing the UI.)

---

# 🚀 Future Enhancements

* Image Upload (Cloudinary/ImageKit)
* QR Code Ticket
* PDF Ticket Download
* Search & Filters
* Booking Analytics
* Revenue Dashboard
* Responsive Admin Panel
* User Profile
* Wishlist
* Reviews & Ratings

---

# 👨‍💻 Author

**Prafull Singh**

B.Tech Student | Full Stack Developer | DSA Enthusiast

---

## ⭐ If you like this project, consider giving it a star on GitHub.
