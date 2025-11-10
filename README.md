# 🧭 Nexmin Admin Dashboard

A **role-based Admin Dashboard** built with **Next.js 15 + TypeScript**, **Redux Toolkit**, **Material UI (MUI)**, and **Tailwind CSS**.  
Implements the core functionality required as part of the take home assignment, which includes **User Management**, **Order Management**, **Accounts**, and **Reports**, with full **role-based access control**.

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/Arty27/nexmin-dashboard-ui.git
cd nexmin-dashboard

# Install dependencies
npm install

# (optional) For CSV download helper
npm install file-saver

# Run the development server
npm run dev

# Run test suite
npm run test
```

## 🧱 Project Structure

```
src/
├─ app/
│ ├─ layout.tsx
│ ├─ page.tsx
│ ├─ dashboard/
│ │ ├─ layout.tsx
│ │ ├─ page.tsx
│ │ ├─ orders/page.tsx
│ │ ├─ accounts/page.tsx
│ │ ├─ reports/page.tsx
│ │ ├─ users/page.tsx
│ │ └─ components/
├─ features/
│ ├─ authSlice.ts
│ ├─ ordersSlice.ts
│ ├─ accountsSlice.ts
│ └─ usersSlice.ts
├─ store/
│ └─ store.ts
├─ utils/
│ └─ downloadReport.ts
├─ public/
  └─ images/

```

---

## ⚙️ Implemented Features

### 🔐 Role-Based Access Control (RBAC)

Each role has specific access to modules:

| Role              | Accessible Modules               |
| ----------------- | -------------------------------- |
| **Super Admin**   | Users, Orders, Accounts, Reports |
| **Accountant**    | Accounts, Reports                |
| **Support Staff** | Orders                           |

- Role stored and managed in Redux (`authSlice`)
- Sidebar dynamically renders based on logged-in role
- Route protection via `<ProtectedRoute>` wrapper

---

### 👥 User Management (Super Admin)

- Display and manage user list via MUI Table
- Add, view, and delete users
- Add User modal supports name, email, and role
- Data maintained using Redux slice (`usersSlice`)

---

### 📦 Orders Module (Super Admin & Support Staff)

- MUI Table displays order details (orderId, amount, status, etc.)
- Clickable rows open a modal with full order details
- Data sourced from Redux (`ordersSlice`)
- Supports filtering and visual order status indicators

---

### 💰 Accounts Module (Super Admin & Accountant)

- View all payment-related data
- Filter accounts by _Paid_ / _Pending_ / _All_
- Accountant can mark payments as complete
- Integrated Redux management for reactive updates

---

### 📊 Reports Module (Super Admin & Accountant)

- Summarizes order and revenue data
- MUI Table
- CSV export support using `downloadReport.ts` helper
- Fully tested with Jest + React Testing Library

---

### 🎨 UI and Styling

- **Material UI (MUI)** for components
- **Tailwind CSS** for responsive layout
- Unified dark/light theme structure
- Tables, modals, and buttons styled consistently
