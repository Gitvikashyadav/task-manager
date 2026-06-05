<div align="center">

# ⚡ TaskFlow

### A Full-Stack Task Management Application

Built with **MongoDB · Express.js · React.js · Node.js**

[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://mongodb.com)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](LICENSE)

[Live Demo](https://task-manager-frontend-reum.onrender.com) · [Backend API](https://task-manager-backend-mmwj.onrender.com/api/health) · [Report Bug](https://github.com/yourusername/taskflow/issues) · [Request Feature](https://github.com/yourusername/taskflow/issues)

![TaskFlow Banner](https://via.placeholder.com/900x400/111827/38bdf8?text=TaskFlow+—+Manage+Your+Work)

</div>

---

## 📋 Table of Contents

- [About The Project](#-about-the-project)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Folder Structure](#-folder-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [API Reference](#-api-reference)
- [Deployment](#-deployment)
- [Screenshots](#-screenshots)
- [Contributing](#-contributing)

---

##  About The Project

TaskFlow is a production-ready, full-stack task management web application built as part of a MERN Stack internship assignment. It allows users to register, log in, and manage their personal tasks with full CRUD operations, search, filtering, and pagination — all wrapped in a modern dark-themed UI.

The app uses **JWT-based authentication** with access + refresh token rotation, stores the refresh token in an **httpOnly cookie** for security, and communicates via a fully RESTful API with proper error handling at every layer.

---

## ✨ Features

### Authentication
-  User registration with validation
-  Secure login with JWT (Access Token + Refresh Token)
-  Refresh token stored in httpOnly cookie (XSS-safe)
-  Auto-refresh access token on expiry (silent, no logout)
-  Logout clears token from DB and cookie

### Task Management
-  Create tasks with title, description, priority, status, due date
-  Edit any task inline via modal
-  Delete individual tasks with confirmation dialog
-  Toggle task status: `Pending → In Progress → Completed`
-  Bulk delete all completed tasks
-  Overdue task detection (red due date badge)

### Search, Filter & Sort
-  Debounced full-text search (title + description)
-  Filter by status (Pending / In Progress / Completed)
-  Filter by priority (Low / Medium / High)
-  Sort by Newest, Oldest, Title A–Z, Due Date

### Dashboard
- ✅ Live stats (Total, Pending, In Progress, Completed)
- ✅ Progress bar showing % completed
- ✅ Server-side pagination (9 tasks per page)
- ✅ Responsive sidebar with task counts per status
- ✅ Personalized greeting based on time of day

### UI/UX
- ✅ Fully responsive — mobile, tablet, desktop
- ✅ Dark theme with sky-blue accent system
- ✅ Smooth animations and micro-interactions
- ✅ Toast notifications for all actions
- ✅ Optimistic UI updates (toggle reflects instantly)

### Security & Performance
- ✅ Helmet.js security headers
- ✅ CORS with strict origin control
- ✅ Rate limiting (100 req / 15 min)
- ✅ Bcrypt password hashing (salt rounds: 12)
- ✅ MongoDB compound indexes for fast queries

---



## 📁 Folder Structure backend

```
taskflow/
│
├── 📂 backend/                         # Node.js + Express API
│   ├── 📂 src/
│   │   ├── 📂 config/
│   │   │   └── 📄 db.js                # MongoDB Atlas connection
│   │   │
│   │   ├── 📂 controllers/             # Business logic
│   │   │   ├── 📄 authController.js    # register, login, logout, refresh, getMe
│   │   │   └── 📄 taskController.js    # CRUD + search + filter + pagination
│   │   │
│   │   ├── 📂 middleware/
│   │   │   ├── 📄 authMiddleware.js    # JWT protect middleware
│   │   │   └── 📄 errorMiddleware.js   # Global error handler
│   │   │
│   │   ├── 📂 models/
│   │   │   ├── 📄 User.js              # User schema (name, email, password, refreshToken)
│   │   │   └── 📄 Task.js              # Task schema (title, desc, status, priority, dueDate, userId)
│   │   │
│   │   ├── 📂 routes/
│   │   │   ├── 📄 authRoutes.js        # /api/auth/* routes
│   │   │   └── 📄 taskRoutes.js        # /api/tasks/* routes (all protected)
│   │   │
│   │   └── 📂 utils/
│   │       └── 📄 generateTokens.js    # Access token + refresh token generators
│   │
│   ├── 📄 server.js                    # App entry point
│   ├── 📄 .env                         # Environment variables
│   └── 📄 package.json
```

## 📁 Folder Structure frontend
```
 📂 frontend/                        # React + Vite + Tailwind
    ├── 📂 src/
    │   ├── 📂 api/                     # Axios API functions
    │   │   ├── 📄 authApi.js           # register, login, logout, getMe, refresh
    │   │   └── 📄 taskApi.js           # getTasks, createTask, updateTask, deleteTask, toggle
    │   │
    │   ├── 📂 components/
    │   │   ├── 📂 layout/
    │   │   │   ├── 📄 Navbar.jsx       # Top bar with user menu & mobile toggle
    │   │   │   └── 📄 Sidebar.jsx      # Status nav, progress bar, clear completed
    │   │   │
    │   │   ├── 📂 tasks/
    │   │   │   ├── 📄 TaskCard.jsx     # Individual task card with priority bar & menu
    │   │   │   ├── 📄 TaskModal.jsx    # Create / Edit task form modal
    │   │   │   └── 📄 TaskFilters.jsx  # Search input + priority + sort dropdowns
    │   │   │
    │   │   └── 📂 ui/
    │   │       ├── 📄 Loader.jsx       # Spinner component (fullscreen & inline)
    │   │       └── 📄 ConfirmDialog.jsx # Delete confirmation modal
    │   │
    │   ├── 📂 context/
    │   │   └── 📄 AuthContext.jsx      # Global auth state + login/logout/register
    │   │
    │   ├── 📂 hooks/
    │   │   └── 📄 useTasks.js          # All task logic — fetch, create, update, delete
    │   │
    │   ├── 📂 pages/
    │   │   ├── 📂 auth/
    │   │   │   ├── 📄 LoginPage.jsx    # Login form with validation
    │   │   │   └── 📄 RegisterPage.jsx # Register form with validation
    │   │   └── 📂 dashboard/
    │   │       └── 📄 DashboardPage.jsx # Main app page
    │   │
    │   ├── 📂 utils/
    │   │   └── 📄 axiosInstance.js     # Axios with token injection + silent refresh
    │   │
    │   ├── 📄 App.jsx                  # Routes + Protected/Public route guards
    │   ├── 📄 main.jsx                 # React DOM entry point
    │   └── 📄 index.css               # Tailwind directives + global styles
    │
    ├── 📄 index.html                   # HTML entry point (Google Fonts loaded here)
    ├── 📄 vite.config.js               # Vite config with dev proxy
    ├── 📄 tailwind.config.js           # Tailwind theme + custom animations
    ├── 📄 postcss.config.js            # PostCSS plugins (Tailwind + Autoprefixer)
    └── 📄 package.json
```

---

## 🏁 Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org) v18 or higher
- [npm](https://www.npmjs.com) v9 or higher
- A [MongoDB Atlas](https://cloud.mongodb.com) account (free tier works)

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/yourusername/taskflow.git
cd taskflow
```

**2. Setup Backend**

```bash
cd backend
npm install
```

Create your `.env` file inside the `backend` folder (see [Environment Variables](#-environment-variables)):

```bash
# backend/.env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_ACCESS_SECRET=your_access_secret_key
JWT_REFRESH_SECRET=your_refresh_secret_key
JWT_ACCESS_EXPIRE=15m
JWT_REFRESH_EXPIRE=7d
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

Start the backend:

```bash
npm run dev
# Server runs on http://localhost:5000
```

**3. Setup Frontend**

Open a new terminal:

```bash
cd frontend
npm install
```

Create your `.env.development` file inside the `frontend` folder:

```bash
# frontend/.env.development
VITE_API_URL=http://localhost:5000/api
```

Start the frontend:

```bash
npm run dev
# App runs on http://localhost:5173
```

**4. Open the app**

Visit [http://localhost:5173](http://localhost:5173) — register an account and start managing tasks!

---

## 🔐 Environment Variables

### Backend (`backend/.env`)

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Port the server runs on | `5000` |
| `MONGO_URI` | MongoDB Atlas connection string | `mongodb+srv://user:pass@cluster...` |
| `JWT_ACCESS_SECRET` | Secret key for access tokens | `any_long_random_string` |
| `JWT_REFRESH_SECRET` | Secret key for refresh tokens | `another_long_random_string` |
| `JWT_ACCESS_EXPIRE` | Access token expiry | `15m` |
| `JWT_REFRESH_EXPIRE` | Refresh token expiry | `7d` |
| `CLIENT_URL` | Frontend URL (for CORS) | `http://localhost:5173` |
| `NODE_ENV` | Environment mode | `development` or `production` |

### Frontend (`frontend/.env.development` / `.env.production`)

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API base URL | `http://localhost:5000/api` |


---

##  API Reference

### Base URL
```
Local:       http://localhost:5000/api
Production:  https://your-backend.onrender.com/api
```

### Authentication Routes

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/auth/register` | ❌ | Register new user |
| `POST` | `/auth/login` | ❌ | Login and get tokens |
| `POST` | `/auth/refresh` |  Cookie | Refresh access token |
| `POST` | `/auth/logout` |  Bearer | Logout and clear cookie |
| `GET` | `/auth/me` |  Bearer | Get current user profile |

### Task Routes (all require Bearer token)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/tasks` | Get all tasks (with filters) |
| `POST` | `/tasks` | Create a new task |
| `GET` | `/tasks/:id` | Get a single task |
| `PUT` | `/tasks/:id` | Update a task |
| `PATCH` | `/tasks/:id/toggle` | Toggle task status |
| `DELETE` | `/tasks/:id` | Delete a task |
| `DELETE` | `/tasks/completed/clear` | Delete all completed tasks |

### GET /tasks — Query Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `page` | number | `1` | Page number |
| `limit` | number | `9` | Tasks per page |
| `search` | string | `''` | Search in title & description |
| `status` | string | `''` | Filter: `pending`, `in-progress`, `completed` |
| `priority` | string | `''` | Filter: `low`, `medium`, `high` |
| `sortBy` | string | `createdAt` | Sort field |
| `sortOrder` | string | `desc` | `asc` or `desc` |

### Example Requests

**Register**
```bash
POST /api/auth/register
Content-Type: application/json

{
  "name": "Vikash Kumar",
  "email": "vikash@example.com",
  "password": "password123"
}
```

**Create Task**
```bash
POST /api/tasks
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "title": "Build landing page",
  "description": "Design and code the homepage",
  "status": "pending",
  "priority": "high",
  "dueDate": "2024-12-31"
}
```

**Search Tasks**
```bash
GET /api/tasks?search=landing&status=pending&priority=high&page=1&limit=9
Authorization: Bearer <access_token>
```

### Response Format

All responses follow this structure:

```json
{
  "success": true,
  "message": "Task created successfully",
  "data": {
    "task": { ... }
  }
}
```

Error responses:
```json
{
  "success": false,
  "message": "Email already registered"
}
```

---

## 🚀 Deployment

### Deploy Backend to Render

1. Push your code to GitHub
2. Go to [render.com](https://render.com) → New → **Web Service**
3. Connect your GitHub repository
4. Set the following:
   - **Root Directory:** `backend`
   - **Build Command:** `npm install`
   - **Start Command:** `node server.js`
5. Add all environment variables from `backend/.env` in the **Environment** tab
6. **Important:** Set `CLIENT_URL` to your frontend's Render URL

### Deploy Frontend to Render

1. Go to [render.com](https://render.com) → New → **Static Site**
2. Connect the same repository
3. Set the following:
   - **Root Directory:** `frontend`
   - **Build Command:** `npm install && npm run build`
   - **Publish Directory:** `dist`
4. Add environment variable:
   - `VITE_API_URL` = `https://your-backend.onrender.com/api`

### ⚠️ Common Deployment Issue

> **CORS Error after deployment?**
>
> Go to Render backend → Environment tab → Update `CLIENT_URL` to your exact frontend URL.
> The value must match **exactly** — no trailing slash.
>
> ```
> ✅  https://task-manager-frontend-reum.onrender.com
> ❌  https://task-manager-frontend-reum.onrender.com/
> ```

---

## 🗄️ Database Schema

### User
```javascript
{
  name:         String,   // required, 2-50 chars
  email:        String,   // required, unique, lowercase
  password:     String,   // required, hashed with bcrypt (12 rounds)
  refreshToken: String,   // stored for refresh token rotation
  avatar:       String,   // optional profile image URL
  createdAt:    Date,
  updatedAt:    Date
}
```

### Task
```javascript
{
  title:       String,    // required, max 100 chars
  description: String,    // optional, max 500 chars
  status:      String,    // enum: 'pending' | 'in-progress' | 'completed'
  priority:    String,    // enum: 'low' | 'medium' | 'high'
  dueDate:     Date,      // optional
  userId:      ObjectId,  // ref: User (indexed)
  createdAt:   Date,
  updatedAt:   Date
}
```

---

## 🔒 Authentication Flow

```
1. User registers / logs in
        ↓
2. Server creates:
   - Access Token  (expires in 15 min)  → sent in JSON response
   - Refresh Token (expires in 7 days)  → stored in httpOnly cookie
        ↓
3. Frontend stores Access Token in memory (axios headers)
        ↓
4. Every API request sends: Authorization: Bearer <access_token>
        ↓
5. Access Token expires → Axios interceptor auto-calls /auth/refresh
        ↓
6. Server reads httpOnly cookie → issues new token pair
        ↓
7. User never gets logged out (seamless experience)
```

---

## 📸 Screenshots

| Login Page | Dashboard |
|-----------|-----------|
| ![Login](https://via.placeholder.com/400x250/111827/38bdf8?text=Login+Page) | ![Dashboard](https://via.placeholder.com/400x250/111827/38bdf8?text=Dashboard) |

| Task Modal | Mobile View |
|-----------|-------------|
| ![Modal](https://via.placeholder.com/400x250/111827/38bdf8?text=Task+Modal) | ![Mobile](https://via.placeholder.com/400x250/111827/38bdf8?text=Mobile+View) |

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/AmazingFeature`
3. Commit your changes: `git commit -m 'Add some AmazingFeature'`
4. Push to the branch: `git push origin feature/AmazingFeature`
5. Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

## 👨‍💻 Author

**Vikash Kumar**

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/yourusername)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/yourusername)

---

<div align="center">

Made with ❤️ as part of MERN Stack Internship Assignment

⭐ Star this repo if you found it helpful!

</div>
