# DSA Journal

An AI-powered full-stack web application that helps users maintain a personal journal of Data Structures and Algorithms (DSA) problems. The application allows users to securely save solved problems, maintain personal notes, and leverage Google's Gemini AI to automatically identify algorithmic patterns and generate reasoning for each problem.

---

## Features

### Authentication
- User Signup
- Secure Login
- Email OTP Verification
- JWT-based Authentication
- User Profile Management

### Problem Management
- Add new DSA problems
- Edit existing problems
- Delete problems
- View all saved problems
- Store personal notes for every problem

### AI Features
- Automatic algorithm pattern detection using Google Gemini AI
- AI-generated reasoning explaining the detected pattern

### Database
- MongoDB Atlas integration
- Secure storage of user accounts and problems

---

## Tech Stack

### Frontend
- React
- Vite
- React Router DOM
- Tailwind CSS
- Lucide React
- Fetch API

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication
- Nodemailer
- Google Gemini API
- bcrypt / bcryptjs
- dotenv
- CORS

---

## Project Structure

```
DSA_Journal
│
├── client
│   ├── public
│   ├── src
│   │   ├── assets
│   │   ├── components
│   │   ├── data
│   │   ├── pages
│   │   ├── api.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   └── vite.config.js
│
├── server
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── services
│   ├── utils
│   ├── server.js
│   └── package.json
│
├── README.md
└── .gitignore
```

---

## Installation

### Clone the Repository

```bash
git clone <repository-url>
```

```bash
cd DSA_Journal
```

---

## Install Dependencies

### Frontend

```bash
cd client
npm install
```

### Backend

```bash
cd server
npm install
```

---

## Environment Variables

### Backend (`server/.env`)

Create a `.env` file inside the `server` folder.

```env
PORT=5000

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

GEMINI_API_KEY=your_gemini_api_key

EMAIL=your_email_address

APP_PASSWORD=your_google_app_password
```

### Frontend (`client/.env`)

Create a `.env` file inside the `client` folder.

```env
VITE_API_URL=http://localhost:5000/api/problems
```

> **Note:** The `.env` files should never be committed to GitHub.

---

## Running the Project

### Start the Backend

```bash
cd server
npm install
npm run dev
```

### Start the Frontend

```bash
cd client
npm install
npm run dev
```

Open the application in your browser using the URL displayed by Vite (typically `http://localhost:5173`).

---

## API Endpoints

### Authentication

| Method | Endpoint |
|----------|-----------------------|
| POST | /api/users/signup |
| POST | /api/users/login |
| POST | /api/users/verify-otp |
| GET | /api/users/profile |
| PUT | /api/users/profile |

### Problems

| Method | Endpoint |
|----------|-----------------------|
| POST | /api/problems |
| GET | /api/problems |
| GET | /api/problems/:id |
| PUT | /api/problems/:id |
| DELETE | /api/problems/:id |

---

## Data Model

### Problem

```javascript
Problem {
    title: String,

    source: String,

    problemLink: String,

    content: String,

    pattern: String,

    reasoning: String,

    myNotes: String,

    createdAt: Date
}
```

---

## Workflow

1. Create an account.
2. Verify your email using the OTP.
3. Login securely.
4. Add a DSA problem.
5. Gemini AI automatically identifies the algorithm pattern.
6. AI generates reasoning for the detected pattern.
7. Save personal notes.
8. Edit or delete problems whenever required.

---

## Future Enhancements

- Search problems
- Filter by algorithm pattern
- Difficulty categorization
- Favorite problems
- Dark mode
- Problem statistics dashboard

---

## Contributors

- **Ayesha Riyaz**
- **Aarushi**

---

## License

This project is developed for educational purposes as part of a Full Stack Web Development internship.