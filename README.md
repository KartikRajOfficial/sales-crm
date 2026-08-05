<div align="center">

#  SalesCRM

### A Modern Full-Stack Customer Relationship Management (CRM) Platform

Built with **React • Node.js • Express • MongoDB**

![GitHub stars](https://img.shields.io/github/stars/KartikRajOfficial/sales-crm?style=for-the-badge)
![GitHub forks](https://img.shields.io/github/forks/KartikRajOfficial/sales-crm?style=for-the-badge)
![GitHub license](https://img.shields.io/github/license/KartikRajOfficial/sales-crm?style=for-the-badge)

---

A modern, scalable and responsive CRM platform that enables businesses to efficiently manage **Customers**, **Leads**, **Sales Opportunities**, and **Business Analytics** from a single dashboard.

</div>

---

# ✨ Features

### 🔐 Authentication

- Secure JWT Authentication
- User Registration
- User Login
- Protected Routes
- Session Management
- Logout

---

### 📊 Dashboard

- Business KPI Cards
- Monthly Sales Analytics
- Revenue Statistics
- Sales Funnel
- Lead Status Distribution
- Opportunity Stage Analysis
- Interactive Charts

---

### 👥 Customer Management

- Add Customer
- Edit Customer
- Delete Customer
- Search Customers
- Sorting
- Pagination

---

### 🎯 Lead Management

- Create Leads
- Update Lead Status
- Delete Leads
- Search
- Sorting
- Pagination

---

### 💼 Opportunity Management

- Create Opportunities
- Revenue Tracking
- Sales Pipeline
- Stage Management
- CRUD Operations

---

### ⚙️ Settings

- User Profile
- Password Update
- Secure Logout

---

# 🏗️ Tech Stack

## Frontend

- React 19
- Vite
- Tailwind CSS
- React Router
- Axios
- Framer Motion
- Recharts
- Lucide React

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcrypt
- Express Validator

## Tools

- Git
- GitHub
- VS Code
- Thunder Client

---

# 📂 Project Structure

```text
sales-crm

├── backend
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── validators
│   ├── utils
│   └── server.js
│
├── frontend
│   ├── src
│   │   ├── api
│   │   ├── components
│   │   ├── context
│   │   ├── hooks
│   │   ├── pages
│   │   ├── routes
│   │   ├── services
│   │   └── utils
│   └── package.json
│
└── README.md
```

---

# 🛠️ Installation

## Clone Repository

```bash
git clone https://github.com/KartikRajOfficial/sales-crm.git
```

---

## Backend Setup

```bash
cd sales-crm/backend

npm install
```

Create a `.env` file

```env
PORT=5000

MONGO_URI=YOUR_MONGODB_CONNECTION_STRING

JWT_SECRET=YOUR_SECRET_KEY
```

Run Backend

```bash
npm run dev
```

---

## Frontend Setup

```bash
cd ../frontend

npm install

npm run dev
```

Frontend runs on

```
http://localhost:5173
```

Backend runs on

```
http://localhost:5000
```

---

# 📡 API Endpoints

## Authentication

```
POST /api/auth/register

POST /api/auth/login
```

---

## Dashboard

```
GET /api/dashboard
```

---

## Customers

```
GET /api/customers

POST /api/customers

PUT /api/customers/:id

DELETE /api/customers/:id
```

---

## Leads

```
GET /api/leads

POST /api/leads

PUT /api/leads/:id

DELETE /api/leads/:id
```

---

## Opportunities

```
GET /api/opportunities

POST /api/opportunities

PUT /api/opportunities/:id

DELETE /api/opportunities/:id
```

---

# 🔒 Authentication Flow

```text
User Login

      │

      ▼

JWT Generated

      │

      ▼

Token Stored

      │

      ▼

Protected API Access

      │

      ▼

MongoDB
```

---

# 📈 Project Highlights

- Full Stack MERN Application
- JWT Authentication
- RESTful APIs
- Protected Routes
- Responsive UI
- Dashboard Analytics
- Interactive Charts
- CRUD Operations
- Search & Pagination
- Clean MVC Architecture
- Modern SaaS Design

---

# 🚀 Future Improvements

- Role Based Access Control
- Email Notifications
- CSV Export
- Profile Image Upload
- AI Sales Prediction
- Audit Logs
- Real-time Notifications
- Cloud Deployment

---

# 🤝 Contributing

Contributions are welcome!

Feel free to fork the repository, create a new branch and submit a Pull Request.

---

# 📜 License

This project is developed for educational and internship purposes.

---

# 👨‍💻 Developer

**Kartik Raj**

Software Developer

GitHub: https://github.com/KartikRajOfficial

LinkedIn: *(Add your LinkedIn URL here)*

---

<div align="center">

### ⭐ If you found this project useful, consider giving it a star!

Made with ❤️ using React, Node.js & MongoDB

</div>
