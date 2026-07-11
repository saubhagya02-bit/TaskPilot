# TaskPilot

A full-stack task management app with JWT authentication, a daily dashboard view, and full CRUD for to-dos. Built with an Angular frontend and a Node.js/Express + MySQL backend.

![Node](https://img.shields.io/badge/Node.js-18%2B-339933?logo=node.js&logoColor=white)
![Angular](https://img.shields.io/badge/Angular-17%2B-DD0031?logo=angular&logoColor=white)
![Express](https://img.shields.io/badge/Express-4-000000?logo=express&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-8-4479A1?logo=mysql&logoColor=white)

## Features

- 🔐 JWT-based authentication (register / login) with hashed passwords (bcrypt)
- ☀️ **My Day** dashboard - see today's tasks and daily completion progress at a glance
- 📋 **To-Do** view - full CRUD: add, edit, complete, delete tasks with due dates
- 🛡️ Protected routes via route guards; auto-redirect on session expiry
- 🎨 Custom sidebar layout with profile photo upload (local, per-session)
- ⚡ Rate-limited login endpoint to slow down brute-force attempts

## Tech Stack

| Layer      | Tech |
|------------|------|
| Frontend   | Angular 17+ (standalone components), RxJS, ngx-toastr |
| Backend    | Node.js, Express |
| Database   | MySQL |
| Auth       | JSON Web Tokens (JWT), bcryptjs |

## Project Structure

```
taskpilot/
├── backend/                  # Express API
│   ├── config/db.js
│   ├── controllers/          # auth.controller.js, task.controller.js
│   ├── middleware/auth.js    # JWT verification
│   ├── routes/               # auth.routes.js, task.routes.js
│   ├── app.js
│   ├── server.js
│   └── schema.sql
│
└── frontend/                 # Angular app
    └── src/app/
        ├── core/              # AuthService, guards, HTTP interceptor
        ├── auth/              # login, register
        ├── features/
        │   ├── dashboard/     # "My Day" view
        │   └── tasks/         # to-do list + TaskService
        └── layout/            # sidebar shell
```

## Getting Started

### Prerequisites

- Node.js 18+
- MySQL (or MariaDB via XAMPP/WAMP)
- Angular CLI: `npm install -g @angular/cli`

### 1. Clone the repo

```bash
git clone https://github.com/<your-username>/taskpilot.git
cd taskpilot
```

### 2. Set up the database

```bash
mysql -u root -p < backend/schema.sql
```
Or paste the contents of `backend/schema.sql` into phpMyAdmin's SQL tab if you're using XAMPP.

### 3. Backend setup

```bash
cd backend
npm install
cp .env.example .env
```

Edit `.env`:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=taskpilot
JWT_SECRET=replace-this-with-a-long-random-string
PORT=5000
CLIENT_URL=http://localhost:4200
```

Generate a real `JWT_SECRET`:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Start the server:
```bash
npm run dev
```
API runs at `http://localhost:5000`.

### 4. Frontend setup

```bash
cd frontend
npm install
ng serve
```
App runs at `http://localhost:4200`.

### 5. Use it

Go to `http://localhost:4200/register`, create an account, then log in.

## API Reference

| Method | Endpoint             | Auth required | Description          |
|--------|-----------------------|:--------------:|-----------------------|
| POST   | `/api/auth/register`  | No             | Create a new account |
| POST   | `/api/auth/login`     | No             | Log in, returns JWT  |
| GET    | `/api/tasks`           | Yes            | List current user's tasks |
| POST   | `/api/tasks`           | Yes            | Create a task        |
| PUT    | `/api/tasks/:id`       | Yes            | Update a task         |
| DELETE | `/api/tasks/:id`       | Yes            | Delete a task         |

Protected routes require an `Authorization: Bearer <token>` header, set automatically by the frontend's HTTP interceptor after login.

## Known Limitations

- Profile photo is stored client-side (`localStorage`) only - not synced across devices or persisted server-side.
- No refresh-token flow; sessions expire after 1 day and the user is redirected to login.

## License

MIT- feel free to use this for coursework, learning, or as a starting point for your own project.
