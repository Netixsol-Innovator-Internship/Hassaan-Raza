# Task Manager API (Node.js + Express)

A beginner-friendly **RESTful API** built with **Node.js** and **Express.js** for managing tasks (in-memory, no database yet).  
It supports **CRUD operations** and includes **Swagger documentation** for easy testing.

---

## 🚀 Live Demo
**Base URL (Vercel)**  
https://hassaan-week3-day1-expressjs.vercel.app  

**Swagger Docs**  
https://hassaan-week3-day1-expressjs.vercel.app/api-docs  

---

## 📌 Features
- Create a new task
- Retrieve all tasks
- Retrieve a task by ID
- Update an existing task
- Delete a task
- In-memory storage (no DB)
- Swagger API documentation
- Error handling & validation

---

## 📂 API Endpoints

| Method | Endpoint              | Description               | Request Body |
|--------|-----------------------|---------------------------|--------------|
| GET    | `/api/tasks`           | Get all tasks             | ❌           |
| GET    | `/api/tasks/:id`       | Get task by ID            | ❌           |
| POST   | `/api/tasks`           | Create a new task         | ✅           |
| PUT    | `/api/tasks/:id`       | Update an existing task   | ✅           |
| DELETE | `/api/tasks/:id`       | Delete a task             | ❌           |

---

## 📝 Sample Task Object
```json
{
  "id": "uuid-string",
  "title": "Learn Express",
  "completed": false
}
