# 🚚 LogiTrack – Logistics Management System

![React](https://img.shields.io/badge/React-19-blue?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-green?logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-success?logo=mongodb)
![JWT](https://img.shields.io/badge/Auth-JWT-orange)
![Vercel](https://img.shields.io/badge/Frontend-Vercel-black?logo=vercel)
![Render](https://img.shields.io/badge/Backend-Render-46E3B7?logo=render)

**LogiTrack** is a modern Logistics Management System built using React, Node.js, Express, MongoDB Atlas, and JWT Authentication. It enables administrators to efficiently manage shipments through a secure dashboard while providing a demo account with view-only access for evaluation.

---
## 📸 Project Preview

![Dashboard](README-images/dashboard.png)


## 🌐 Live Demo

**Frontend (Vercel)**  
https://logistics-management-system-dusky.vercel.app

**Backend API (Render)**  
https://logitrack-backend-kb1x.onrender.com

---

## 🔑 Demo Credentials

### 👀 Demo Account (View Only)

**Email:** demo@logitrack.com

**Password:** demo123

>The demo account is provided for recruiters, faculty, and evaluators to explore the application safely with view-only access.

---

## ✨ Features

- 🔐 JWT Authentication
- 👤 Admin & Demo User Roles
- 🔒 Role-Based Access Control (Admin & Demo)
- - 🚛 Shipment Management (Create, Read, Update & Delete)
- 👨‍💼 Admin Dashboard
- 👀 Demo View-Only Mode
- 📊 Dashboard Analytics
- 📈 Interactive Charts
- 🔍 Shipment Details
- 🔔 Toast Notifications
- 📱 Responsive Design
- 🎨 Modern UI
- ☁️ Cloud Deployment
- 🔒 Protected API Routes
- ⚡ Fast React Interface

---

## 🔒 Security

- JWT Authentication
- Password Hashing using bcrypt
- Protected API Routes
- Role-Based Authorization

## 📸 Screenshots

### Login Page

![Login](README-images/login.png)

---

### Dashboard

![Dashboard](README-images/dashboard.png)
---

![Dashboard](README-images/dashboard2.png)

### Shipment Management

![Shipments](README-images/shipments.png)

---

### Create Shipment

![Create Shipment](README-images/create-shipment.png)

---

### Demo Mode

![Demo Mode](README-images/demo-mode.png)

---

## 🛠 Tech Stack

### Frontend

- React.js
- HTML5
- CSS3
- JavaScript (ES6+)
- React Toastify
- Recharts
- React Icons

### Backend

- Node.js
- Express.js
- JWT
- bcrypt
- REST API

### Database

- MongoDB Atlas
- Mongoose ODM

### Deployment

- Vercel
- Render

---

## 🏛 Architecture

Frontend (React)
        │
 REST API (JWT)
        │
Backend (Node.js + Express)
        │
MongoDB Atlas


## 🏗 Project Structure

```
logistics-app
│
├── backend
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── index.js
│   └── package.json
│
├── public
├── src
│   ├── components
│   ├── App.js
│   ├── Login.js
│   └── ...
│
├── README-images
├── package.json
└── README.md
```

---

## ⚙ Installation

### Clone Repository

```bash
git clone https://github.com/nageshfulari/Logistics-Management-System.git
```

### Frontend

```bash
npm install
npm start
```

### Backend

```bash
cd backend
npm install
npm start
```

---

## 🔐 Environment Variables

### Backend (.env)

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key
```

### Frontend (.env)

```env
REACT_APP_API_URL=http://localhost:5000
```

---

## 🚀 Future Enhancements

- Email Notifications
- Real-Time Shipment Tracking
- Google Maps Integration
- QR Code Shipment Verification
- Advanced Analytics Dashboard
- Multi-User Role Management
- Export Reports (PDF & Excel)

---

## 👨‍💻 Author

**Nagesh Fulari**

Bachelor of Engineering (Computer Engineering)

GitHub:
https://github.com/nageshfulari

---

## ⭐ Support

If you found this project useful, consider giving it a ⭐ on GitHub.

## 📄 License

This project is developed for educational and portfolio purposes.