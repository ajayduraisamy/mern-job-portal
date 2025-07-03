# 💼 MERN Job Portal Application

A full-featured job portal built using the MERN (MongoDB, Express.js, React, Node.js) stack, allowing users to browse, apply, and manage job postings. Includes role-based dashboards for Admin, Recruiters, and Job Seekers.

---

## 🚀 Features

- 🔐 **Authentication & Authorization** (Login, Register, Role-based Access)

- 🏢 **Recruiter Dashboard** to post jobs and manage applicants
- 👨‍🎓 **User Dashboard** to apply for jobs and upload resumes
- 📄 Resume Upload & File Management
- 🔍 Job Browsing with filters and search
- 📊 Clean and responsive UI

---

## 🛠 Tech Stack

### Frontend:
- React
- Vite
- Tailwind CSS
- Redux Toolkit
- Axios

### Backend:
- Node.js
- Express.js
- MongoDB (with Mongoose)
- Multer (File Uploads)
- JWT for Auth

---

## 📁 Folder Structure
mern-job-portal/
├── backend/ # Node.js Express API
├── frontend/ # React + Vite UI
└── README.md



---

## 🧪 Getting Started Locally

### ⚙️ Backend

```bash
cd backend
npm install
# Create a .env file and add MONGO_URI, JWT_SECRET, PORT, etc.
npm run dev


cd frontend
npm install
npm run dev

