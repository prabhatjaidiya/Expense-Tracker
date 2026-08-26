# 💰 Expense Tracker

<p align="center">
  <img src="https://img.shields.io/badge/React-19-blue?logo=react" />
  <img src="https://img.shields.io/badge/Vite-Frontend-purple?logo=vite" />
  <img src="https://img.shields.io/badge/TailwindCSS-Styling-38BDF8?logo=tailwindcss" />
  <img src="https://img.shields.io/badge/Recharts-Analytics-orange" />
  <img src="https://img.shields.io/badge/License-MIT-green" />
</p>

A modern, responsive, and feature-rich **Expense Tracker** built with **React**, **Vite**, **Tailwind CSS**, and **Recharts** to help users manage their personal finances efficiently.

## 🌐 Live Demo

👉 https://expense-tracker-lovat-pi.vercel.app/

---

# ✨ Features

## 🌐 Public Dashboard

The dashboard is accessible without authentication, allowing visitors to explore the application before creating an account.

Visitors can:

* View the dashboard layout
* Explore sample financial data
* Load demo transactions
* View charts and analytics
* Explore budget information
* Experience the application without registration

Authenticated users can access their own personalized financial data.

---

## 💳 Transaction Management

* Add Transactions
* Edit Transactions
* Delete Transactions
* Search Transactions
* Filter by Category
* Filter by Type
* Sort by Date
* Sort by Amount

---

## 📈 Analytics

Interactive charts built using **Recharts**.

* Monthly Income vs Expense
* Expense Trend
* Savings Trend
* Expense Categories
* Top Spending Categories
* Financial Insights

---

## 💸 Budget Management

* Monthly Budget
* Category Budgets
* Budget Progress
* Budget Alerts
* Remaining Budget
* Overspending Detection

---

## 🔔 Notification Center

Automatic notifications for:

* Budget exceeded
* Budget warning
* Large expenses
* High income
* Monthly milestones
* Financial achievements

---

## 👤 Authentication

* Register
* Login
* Forgot Password
* User Session
* Protected Application Routes
* Public Dashboard
* Demo Mode

### Route Access

| Route              | Access       |
| ------------------ | ------------ |
| `/` Dashboard      | 🌐 Public    |
| `/login`           | 🌐 Public    |
| `/register`        | 🌐 Public    |
| `/forgot-password` | 🌐 Public    |
| `/transactions`    | 🔒 Protected |
| `/add-expense`     | 🔒 Protected |
| `/analytics`       | 🔒 Protected |
| `/budget`          | 🔒 Protected |
| `/reports`         | 🔒 Protected |
| `/profile`         | 🔒 Protected |

### Demo Mode

Visitors can explore the dashboard without creating an account.

* Load sample financial transactions
* View charts and analytics
* Explore budget information
* View dashboard statistics
* Demo data is temporary
* Demo data is separate from authenticated user data
* Demo data is not added to a user's account
* Demo data is cleared when a user logs in

---

## 👤 User Profile

* Edit Profile
* Upload Avatar
* Change Password
* Account Statistics
* Logout
* Delete Account
* Delete All Data

---

## 🌙 Dark Mode

* Light Theme
* Dark Theme
* Fully Responsive

---

## 📤 Export

* Export CSV
* Export PDF Report
* Export Dashboard PDF

---

# 📱 Responsive Design

The application is designed to work across:

* Desktop
* Tablet
* Mobile

---

# 🛠 Tech Stack

### Frontend

* React
* Vite
* Tailwind CSS
* React Router DOM
* Context API

### Charts

* Recharts

### Icons

* Lucide React
* React Icons

### Libraries

* React Datepicker
* React Toastify
* PapaParse
* File Saver
* jsPDF
* jsPDF AutoTable
* html2canvas

---

# 📂 Folder Structure

```text
src
│
├── assets
├── components
├── context
├── pages
├── utils
├── hooks
├── App.jsx
└── main.jsx
```

---

# 🚀 Getting Started

## Clone the repository

```bash
git clone https://github.com/yourusername/expense-tracker.git
```

## Move into the project

```bash
cd expense-tracker
```

## Install dependencies

```bash
npm install
```

## Run locally

```bash
npm run dev
```

## Production build

```bash
npm run build
```

## Preview production build

```bash
npm run preview
```

---

# 💾 Data Storage

The application currently uses **Local Storage** for client-side data persistence.

### Stored Data

* User Accounts
* User Transactions
* Monthly Budgets
* Category Budgets
* Notifications
* Theme
* User Profile

### Demo Data

Demo data is handled separately from authenticated user data.

When a visitor selects **Load Demo Data**:

* Sample transactions are loaded into the dashboard
* No login or registration is required
* Demo transactions are not saved to the user's account
* Demo data is cleared when the user logs in
* Real user transactions remain isolated by `userId`

No backend is currently required.

---

# 📷 Screenshots

Create a folder named **screenshots** inside the project.

```text
expense-tracker
│
├── screenshots
│   ├── dashboard.png
│   ├── transactions.png
│   ├── analytics.png
│   ├── budget.png
│   ├── profile.png
│   ├── notifications.png
│   └── darkmode.png
```

## Dashboard

![Dashboard](screenshots/dashboard.png)

---

## Transactions

![Transactions](screenshots/transactions.png)

---

## Analytics

![Analytics](screenshots/analytics.png)

---

## Budget

![Budget](screenshots/budget.png)

---

## Profile

![Profile](screenshots/profile.png)

---

## Notification Center

![Notifications](screenshots/notifications.png)

---

## Dark Mode

![Dark Mode](screenshots/darkmode.png)

---

# 🎯 Future Improvements

* Recurring Transactions
* Savings Goals
* Investment Tracking
* Multi Currency Support
* Cloud Database
* AI Spending Insights
* Receipt Scanner
* Email Reports
* Progressive Web App (PWA)

---

# 📚 What I Learned

Building this project helped me practice:

* React Fundamentals
* Context API
* State Management
* CRUD Operations
* Routing
* Protected Routes
* Public Routes
* Local Storage
* Responsive Design
* Data Visualization
* Budget Calculations
* PDF & CSV Export
* Authentication
* Dark Mode Implementation

---

# 🤝 Contributing

Contributions are always welcome.

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

---

# 📄 License

This project is licensed under the MIT License.

---

# 👨‍💻 Author

**Prabhat Jaidiya**

If you like this project, don't forget to ⭐ the repository.