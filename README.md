# 💰 Finance Backend API

A backend system for managing financial records with user roles, session-based authentication, and dashboard insights.

---

## 🚀 Features

### 👤 User & Role Management

* Create, update, delete users
* Assign roles (Admin, Analyst, Viewer)
* Manage user status (active/inactive)
* Role-based access control

### 💸 Financial Records

* Create, update, delete financial records
* Filter records by type, category, date
* Ownership-based update/delete

### 📊 Dashboard APIs

* Total income
* Total expenses
* Net balance

### 🔒 Security

* Session-based authentication
* Permission-based authorization (`checkPermission`)

---

## 🛠️ Tech Stack

* Node.js
* Express.js
* MySQL
* Sequelize ORM
* Joi Validation
* Express Session

---

## ⚙️ Setup Instructions

### 1️⃣ Clone Project

```bash
git clone https://github.com/bhaskarshankar488/finance-backend-api-nodeJs
cd finance-backend-api-nodeJs
```

---

### 2️⃣ Install Dependencies

```bash
npm install
```

---

### 3️⃣ Setup Environment Variables

Create a `.env` file in root:

```env
PORT=5000

DB_HOST=127.0.0.1
DB_PORT=3306
DB_NAME=finance_db
DB_USER=root
DB_PASSWORD=

ADMIN_EMAIL=admin@system.com
ADMIN_PASSWORD=admin123

```bash
npm run setup
---

### 4️⃣ Create Database

In MySQL:

```sql
CREATE DATABASE finance_db;
```

---

### 5️⃣ Run Migrations

```bash
npx sequelize db:migrate
```

👉 This will create:

* Users table
* Records table

---

### 6️⃣ Seed Admin User (IMPORTANT)

Make sure admin user exists using ENV:

```env
ADMIN_EMAIL=admin@system.com
ADMIN_PASSWORD=admin123
```

👉 This user is used for login

---

### 7️⃣ Start Server

```bash
npm run dev
```

Server runs at:

```
http://localhost:5000
```

---

## 🔐 Authentication

* Login creates session
* Session stored in cookies
* All APIs require login

---

## 👥 Roles & Permissions

| Role    | Access                          |
| ------- | ------------------------------- |
| Viewer  | Read-only (records + dashboard) |
| Analyst | Read + insights                 |
| Admin   | Full access                     |

---

## 🧪 API Testing Guide

### 🔹 Step 1: Login

```http
POST /api/auth/login
```

```json
{
  "email": "admin@system.com",
  "password": "admin123"
}
```

👉 Session cookie will be created

---

## 👤 User APIs

```http
POST   /api/users/createuser
GET    /api/users
GET    /api/users/:id
PUT    /api/users/:id
PATCH  /api/users/:id/role
PATCH  /api/users/:id/status
DELETE /api/users/:id
```

---

## 💰 Finance APIs

### Create Record

```http
POST /api/finance
```

```json
{
  "amount": 5000,
  "type": "income",
  "category": "salary",
  "date": "2026-01-10",
  "notes": "Salary"
}
```

---

### Get Records

```http
GET /api/finance
GET /api/finance?type=income
GET /api/finance?category=food
GET /api/finance?startDate=2026-01-01&endDate=2026-01-31
```

---

### Update Record

```http
PUT /api/finance/:id
```

---

### Delete Record

```http
DELETE /api/finance/:id
```

---

## 📊 Dashboard API

```http
GET /api/finance/dashboard
```

Response:

```json
{
  "totalIncome": 19500,
  "totalExpense": 800,
  "netBalance": 18700
}
```

---

## 🔁 Testing Flow

1. Login
2. Create User (optional)
3. Create Finance Records
4. Fetch records with filters
5. Update/Delete records
6. Check dashboard

---

## 🧠 Design Decisions

* Layered architecture (Controller → Service → Model)
* Permission-based access instead of hardcoded roles
* Session authentication instead of JWT (simpler for this project)

---

## ⚠️ Assumptions

* Amount stored as numeric/decimal
* Expense handled using absolute values
* Admin user seeded via environment variables

---

## 📌 Future Improvements

* Pagination & sorting
* Centralized error handling
* Query validation
* DB-level aggregation

---

## 👨‍💻 Author

Bhaskara K S

---

## 📄 Note

This project is built for backend assessment purposes and demonstrates core backend engineering concepts.
