# 📚 Library Management System

A full-stack **Library Management System** designed to simplify and digitize library operations for students and administrators. The application provides separate student and admin experiences with authentication, book management, borrowing workflows, and library-related features.

## 🚀 Live Demo

🔗 **[View Live Application](https://zingy-seahorse-1daec8.netlify.app/)**

> The frontend is deployed on Netlify.

---

## 📌 Features

### 👨‍🎓 Student

* Student registration and login
* Firebase Authentication
* Student dashboard
* Browse available books
* Search and explore library resources
* View research papers
* View question papers
* Manage personal library
* View notifications
* Student profile and settings
* Logout functionality

### 👨‍💼 Admin

* Admin authentication
* Admin dashboard
* Manage books
* Manage users
* View library reports
* Admin settings
* Library administration and monitoring

### 🔐 Authentication & Authorization

* Firebase Email/Password Authentication
* Role-based routing
* Separate student and admin dashboards
* Protected routes
* Persistent authentication state
* Automatic redirection based on user role

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Vite
* React Router
* Tailwind CSS
* JavaScript
* Axios
* React Hot Toast

### Backend

* Node.js
* Express.js
* REST APIs

### Database

* PostgreSQL

### Authentication

* Firebase Authentication

### Deployment

* Netlify

### Development Tools

* Git
* GitHub
* VS Code
* Postman

---

## 🏗️ Project Structure

```text
Library-Management-System/
│
├── backend/
│   ├── package.json
│   └── ...
│
├── public/
│
├── src/
│   ├── components/
│   ├── context/
│   │   └── AuthContext.jsx
│   ├── pages/
│   ├── App.jsx
│   └── main.jsx
│
├── .gitignore
├── index.html
├── index.js
├── package.json
├── package-lock.json
├── netlify.toml
├── postcss.config.js
├── tailwind.config.js
├── vite.config.js
└── README.md
```

---

## 🔑 Authentication

The application uses **Firebase Authentication** for user authentication.

The authentication flow supports:

```text
User
  ↓
Firebase Authentication
  ↓
Authenticated User
  ↓
Role Detection
  ↓
 ┌───────────────┐
 │               │
Student         Admin
 │               │
 ↓               ↓
Student Home    Admin Dashboard
```

New users are treated as students by default, while authorized admin accounts are routed to the admin dashboard.

---

## ⚙️ Environment Variables

Create a `.env` file in the **root directory** of the project.

```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
```

### Important

Never commit your `.env` file to GitHub.

The project uses `.gitignore` to prevent environment files from being committed.

For Netlify deployment, add the same `VITE_FIREBASE_*` variables under the project's environment variables.

---

## 💻 Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/mansipatil12345/Library-Management-System.git
```

### 2. Navigate into the project

```bash
cd Library-Management-System
```

### 3. Install frontend dependencies

```bash
npm install
```

### 4. Configure environment variables

Create a `.env` file in the project root and add your Firebase configuration.

### 5. Start the frontend

```bash
npm run dev
```

The frontend will normally run at:

```text
http://localhost:5173
```

---

## 🖥️ Backend Setup

Navigate to the backend directory:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Start the backend:

```bash
node ../index.js
```

For development with Nodemon:

```bash
nodemon ../index.js
```

The backend runs on:

```text
http://localhost:5000
```

---

## 🗄️ Database

The backend uses **PostgreSQL** for persistent library data.

Make sure PostgreSQL is installed and running before starting the backend.

Configure your database connection according to the backend configuration used in the project.

Typical database configuration includes:

```text
Database Name
Username
Password
Host
Port
```

---

## 🔄 Application Architecture

```text
                  ┌─────────────────────┐
                  │      React UI       │
                  │    Vite Frontend    │
                  └──────────┬──────────┘
                             │
                             │ HTTP / REST API
                             ↓
                  ┌─────────────────────┐
                  │   Node + Express    │
                  │      Backend        │
                  └──────────┬──────────┘
                             │
                             ↓
                  ┌─────────────────────┐
                  │     PostgreSQL      │
                  │      Database       │
                  └─────────────────────┘

                  ┌─────────────────────┐
                  │ Firebase Auth       │
                  │ Email / Password    │
                  └──────────┬──────────┘
                             │
                             ↓
                     User Authentication
```

---

## 🛡️ Protected Routes

The application uses role-based protected routes.

### Student Routes

```text
/student/home
/student/books
/student/research-papers
/student/question-papers
/student/my-library
/student/notifications
/student/profile
/student/settings
```

### Admin Routes

```text
/admin/dashboard
/admin/books
/admin/users
/admin/reports
/admin/settings
```

Unauthorized users are redirected according to their authenticated role.

---

## 📱 Responsive Interface

The application is designed to provide a responsive experience across different screen sizes, including desktop and mobile devices.

---

## 🧪 Testing

During development, API endpoints can be tested using:

* Postman
* Browser
* React frontend

The application can be tested locally using:

```bash
npm run dev
```

and the backend using:

```bash
node ../index.js
```

---

## 🌐 Deployment

The frontend is deployed using **Netlify**.

### Production

🔗 **https://zingy-seahorse-1daec8.netlify.app/**

The production deployment uses Firebase environment variables configured through Netlify.

---

## 🔒 Security

* Firebase Authentication is used for user authentication.
* Environment variables are excluded from version control.
* Protected routes restrict access based on user roles.
* Sensitive configuration values are not stored directly in the repository.

> Note: Frontend role checks are intended for application routing. Production-grade authorization should additionally be enforced on the backend.

---

## 📈 Future Improvements

* Fine and penalty management
* Book reservation system
* Email notifications
* Advanced library analytics
* Book recommendations
* Online book renewal
* Improved admin reporting
* Advanced backend authorization
* Automated testing
* Docker-based deployment

---

## 🤝 Contributing

Contributions and suggestions are welcome.

To contribute:

```bash
# Fork the repository

# Create a feature branch
git checkout -b feature/your-feature

# Commit your changes
git commit -m "Add your feature"

# Push the branch
git push origin feature/your-feature
```

Then open a Pull Request.

---

## 👩‍💻 Author

**Mansi Patil**

B.Tech Computer Engineering

GitHub: [@mansipatil12345](https://github.com/mansipatil12345)

---

## ⭐ Support

If you find this project useful, consider giving the repository a ⭐ on GitHub.

**Built with React, Node.js, Express, PostgreSQL and Firebase.**
