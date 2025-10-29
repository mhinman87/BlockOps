# Block Ops - Regional Anesthesiology Consulting Platform

A modern web application for Block Ops, providing a landing page and authenticated client dashboard for regional anesthesiology consulting services.

## Tech Stack

- **Frontend**: React 18 + Vite + Tailwind CSS + React Router
- **Backend**: FastAPI (Python) + PostgreSQL + SQLAlchemy
- **Authentication**: JWT tokens with access and refresh token support
- **Deployment**: Render-ready (frontend and backend as separate services)

## Project Structure

```
block-ops/
├── frontend/                 # React + Vite application
│   ├── src/
│   │   ├── components/       # Reusable components
│   │   ├── contexts/         # Auth context
│   │   ├── pages/            # Page components
│   │   ├── services/         # API integration
│   │   └── App.jsx
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── package.json
├── backend/                  # FastAPI application
│   ├── app/
│   │   ├── api/              # API endpoints
│   │   ├── auth.py           # JWT authentication utilities
│   │   ├── database.py       # Database configuration
│   │   ├── models.py         # SQLAlchemy models
│   │   ├── schemas.py        # Pydantic schemas
│   │   └── main.py           # FastAPI app initialization
│   ├── requirements.txt
│   └── venv/
└── README.md
```

## Features

### Landing Page
- Hero section with company overview
- Services section with service cards
- Team section with team member profiles
- Contact section with contact form
- Responsive design

### Client Dashboard (Authenticated)
- Modern dark theme inspired by Modernize template
- Sidebar navigation with icons
- User profile management
- Settings page with preferences
- Quick action buttons
- Metric cards displaying consulting data

### Authentication
- User registration and login
- JWT token-based authentication
- Access and refresh token support
- Secure password hashing with bcrypt
- Protected routes

## Getting Started

### Prerequisites

- Python 3.10+
- Node.js 16+
- PostgreSQL (for production) or SQLite (for development)

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Activate the virtual environment:
```bash
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Create a `.env` file with the following variables:
```env
DATABASE_URL=sqlite:///./test.db
SECRET_KEY=your-secret-key-change-this-in-production
JWT_EXPIRATION_HOURS=24
FRONTEND_URL=http://localhost:5173
```

4. Run the FastAPI server:
```bash
uvicorn app.main:app --reload
```

The API will be available at `http://localhost:8000`
API documentation: `http://localhost:8000/docs`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## Available Scripts

### Frontend

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Backend

- `uvicorn app.main:app --reload` - Start dev server
- `uvicorn app.main:app` - Start production server

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/refresh` - Refresh access token
- `GET /api/auth/me` - Get current user info

### Health Check
- `GET /health` - Check API status

## Default Credentials

Once you register a user through the sign-up page, you can log in with those credentials.

## Environment Variables

### Backend (.env)
```env
DATABASE_URL=postgresql://user:password@localhost:5432/blockops
SECRET_KEY=your-secret-key-change-in-production
JWT_EXPIRATION_HOURS=24
FRONTEND_URL=http://localhost:5173
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:8000
```

## Deployment

### Frontend (Render)
- Build command: `npm run build`
- Start command: `npm run preview`
- Environment variables: Set `VITE_API_URL` to your backend URL

### Backend (Render)
- Build command: `pip install -r requirements.txt`
- Start command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
- Environment variables: Set `DATABASE_URL`, `SECRET_KEY`, `FRONTEND_URL`

## Design System

### Colors
- Primary: `#5d87ff` (Blue)
- Dark Background: `#1a1d2e`
- Dark Card: `#252b3f`
- Dark Border: `#3a4157`

### Components
- Responsive design using Tailwind CSS
- Dark theme for dashboard
- Light theme for landing page
- Icons from Lucide React
- Smooth transitions and hover effects

## Future Features

- CRM system for business-side client management
- Mobile app (React Native)
- Consultation scheduling
- Document management
- Email notifications
- Two-factor authentication
- Advanced analytics and reporting

## Contributing

This is a private project for Block Ops. For contributions, please contact the CTO.

## License

Proprietary - Block Ops Company
