# ⚡ SalesCRM — Smart Sales Platform

A state-of-the-art, high-performance Commercial Sales CRM designed for modern sales teams. Built with React 19, Vite, TailwindCSS v4, Framer Motion, and Node.js REST backend API with MongoDB.

![SalesCRM Banner](https://img.shields.io/badge/SalesCRM-v1.0.0-7c3aed?style=for-the-badge)
![React](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css)
![NodeJS](https://img.shields.io/badge/Node.js-REST_API-339933?style=for-the-badge&logo=node.js)

---

## ✨ Features

- **📊 Dynamic Dashboard**: Live pipeline statistics, revenue trends, conversion rates, and 4 interactive charts (Recharts).
- **👥 Lead Management**: Track prospects, filter by status, sort table columns, and manage leads with quick actions.
- **🏢 Account & Customer Management**: Manage active client relationships and associated key contacts.
- **🎯 Opportunity Pipeline**: Real-time deal stage tracking (Prospecting → Qualification → Proposal → Negotiation → Won / Lost), value range filtering, and expected close dates.
- **🔐 JWT Authentication & RBAC**: Secure JWT-based sessions, automated Axios interceptors, role-based controls (Administrator vs. Sales Representative).
- **🎨 Modern SaaS UI/UX**: Premium dark theme with glassmorphism, glowing micro-animations, responsive tables, and Framer Motion transitions.
- **📖 In-App Support Center**: Searchable guide and documentation.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 19 + Vite 8
- **Styling**: TailwindCSS v4 + Custom Glassmorphism System
- **Animations**: Framer Motion
- **Charts**: Recharts
- **Icons**: Lucide React
- **Forms & Validation**: React Hook Form
- **Routing**: React Router DOM v7
- **HTTP Client**: Axios with Auth Interceptors

### Backend
- **Runtime**: Node.js + Express
- **Database**: MongoDB with Mongoose
- **Security**: JSON Web Tokens (JWT) + Bcrypt password hashing
- **Validation**: Express Validator

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js (v18+)
- MongoDB running locally or a MongoDB Atlas URI

### 2. Backend Setup
```bash
cd backend
npm install
npm run dev
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🔒 Roles & Permissions

| Feature | Administrator | Sales Representative |
| :--- | :---: | :---: |
| View Dashboard & Analytics | ✅ | ✅ |
| Create & Edit Leads / Customers / Deals | ✅ | ✅ |
| Filter & Search Pipeline | ✅ | ✅ |
| Bulk Export / CSV Download | ✅ | ✅ |
| Delete Records (Single / Bulk) | ✅ | ❌ |

---

## 📜 License

Crafted for modern sales teams. Built with precision and care.
