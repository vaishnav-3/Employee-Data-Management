
# 🧑‍💼 Employee Management System

A **full-stack CRUD application** built with **Next.js (App Router)**, **TypeScript**, **Prisma (SQLite)**, **TailwindCSS**, and **ShadCN UI**.
This app allows you to **add, view, edit, and delete employees**, showcasing end-to-end development skills with a clean architecture and intuitive UI.

---

## 🎯 **Objective**

The goal of this project is to demonstrate a clear understanding of **full-stack fundamentals**, including:

* API design and CRUD operations
* Frontend state management and UI components
* Clean code, modular structure, and developer-friendly setup

---

## 🧩 **Features**

* Full CRUD (Create, Read, Update, Delete) functionality
* Add/Edit employees using **ShadCN Dialogs**
* Toast notifications with **React Hot Toast** for instant feedback
* Responsive and modern UI using **TailwindCSS**
* Clean separation of backend (API) and frontend (UI)
* SQLite database managed with **Prisma ORM**

---

## 📁 **Project Structure**

```
employee-management/
├── app/
│   ├── page.tsx                     # Redirects to /employees
│   ├── employees/
│   │   ├── page.tsx                 # Main employee management page
│   │   └── components/
│   │       ├── employee-dialog.tsx  # ShadCN modal for Add/Edit employee
│   │       ├── employee-table.tsx   # Employee table with edit/delete actions
│   │
│   └── api/
│       └── employees/
│           ├── route.ts             # GET (all) + POST (create)
│           └── [id]/
│               └── route.ts         # PUT (update) + DELETE (remove)
│
├── lib/
│   └── prisma.ts                    # Prisma client instance
│
├── prisma/
│   └── schema.prisma                # SQLite database schema
│
├── components/
│   └── toast-provider.tsx           # React Hot Toast provider setup
│
├── .env                             # Environment variables (not committed)
├── package.json
└── README.md
```

---

## 🧠 **Database Schema**

**`prisma/schema.prisma`**

```prisma
model Employee {
  id        Int      @id @default(autoincrement())
  name      String
  email     String   @unique
  position  String
  createdAt DateTime @default(now())
}
```

---

## 🔗 **API Endpoints**

| Method     | Endpoint             | Description                                                        |
| ---------- | -------------------- | ------------------------------------------------------------------ |
| **GET**    | `/api/employees`     | Get all employees                                                  |
| **POST**   | `/api/employees`     | Create a new employee <br>**Body:** `{ name, email, position }`    |
| **PUT**    | `/api/employees/:id` | Update an employee by ID <br>**Body:** `{ name, email, position }` |
| **DELETE** | `/api/employees/:id` | Delete an employee by ID                                           |

---

## ⚙️ **Environment Setup**

Create a **.env** file in the root directory and add the following variables:

```bash
# Environment
NODE_ENV=development

# Database (SQLite local file)
DATABASE_URL="file:./dev.db"
```

---

## 💻 **Setup Instructions**

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/vaishnav-3/Employee-Data-Management.git
cd Employee-Data-Management
```

---

### 2️⃣ Install Dependencies

```bash
npm install
```

---

### 3️⃣ Setup the Database

Generate Prisma Client:

```bash
npx prisma generate
```

Run the first migration (creates tables):

```bash
npx prisma migrate dev --name init
```

Optional — open Prisma Studio to inspect the DB visually:

```bash
npx prisma studio
```

---

### 4️⃣ Start the Development Server

```bash
npm run dev
```

Then open your browser at:
👉 [http://localhost:3000/employees](http://localhost:3000/employees)

---

## 🧪 **Database Commands Reference**

| Command                              | Description                                                  |
| ------------------------------------ | ------------------------------------------------------------ |
| `npx prisma generate`                | Generates Prisma Client for your schema                      |
| `npx prisma migrate dev --name init` | Creates and runs DB migrations                               |
| `npx prisma db push`                 | Pushes schema changes to the database (no migration history) |
| `npx prisma studio`                  | Opens a visual DB editor                                     |

---

## ⚙️ **Design Choices & Assumptions**

* Used **SQLite** for simplicity — perfect for demos and quick local testing
* **Next.js App Router** for modular and modern file-based routing
* API routes use Prisma directly for clean backend logic
* **Dialog-based forms** for inline Add/Edit UX
* **React Hot Toast** for modern non-blocking notifications

---

## 🧑‍💻 **Tech Stack**

* **Frontend:** Next.js (App Router), React, TypeScript, TailwindCSS, ShadCN UI
* **Backend:** Next.js API Routes, Prisma ORM
* **Database:** SQLite
* **Utilities:** React Hot Toast for notifications
