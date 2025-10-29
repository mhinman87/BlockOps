# 🚀 Getting Started with Block Ops

Welcome! Your Block Ops platform is ready to go. This guide will get you up and running in minutes.

## ⚡ Quick Start (Choose One)

### Option A: Fastest Way (5 minutes)

Follow the **QUICKSTART.md** file - it has all the copy-paste commands you need.

### Option B: Step-by-Step

Follow the detailed setup in **README.md** → Getting Started section.

---

## 📋 What You Have

### ✅ Completed Features

**Frontend (React + Tailwind CSS)**
- 🏠 **Landing Page** - Professional site with hero, services, team, contact
- 🔐 **Login/Register** - User authentication with dark theme
- 📊 **Dashboard** - Dark-themed client dashboard inspired by Modernize
- 👤 **Profile Page** - User profile view and edit
- ⚙️ **Settings Page** - Notification and preference toggles
- 📱 **Responsive Design** - Works on mobile, tablet, desktop

**Backend (FastAPI)**
- 🔑 **Authentication API** - Registration, login, token refresh
- 🛡️ **JWT Security** - Access & refresh tokens with bcrypt hashing
- 📦 **Database Ready** - SQLite for dev, PostgreSQL for production
- 📝 **API Docs** - Auto-generated at `/docs` endpoint
- 🔄 **CORS Configured** - Ready for frontend integration

**Design System**
- 🎨 Blue accent color (#5d87ff)
- 🌙 Dark theme for dashboard
- ☀️ Light theme for landing page
- 📐 Tailwind CSS for styling
- 🎯 Lucide React icons

---

## 🎯 Your Next Steps

### Before Running Locally

1. **Read these documents** (in order):
   - `QUICKSTART.md` - 5-minute setup
   - `README.md` - Full documentation
   - `IMPLEMENTATION_SUMMARY.md` - What's been built

2. **Customize the content** (optional):
   - Edit team member names/bios in `/frontend/src/pages/LandingPage.jsx`
   - Update contact info in the same file
   - Customize dashboard welcome message

### To Run the Application

**Terminal 1 - Backend:**
```bash
cd backend
source venv/bin/activate
uvicorn app.main:app --reload
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

Then visit: `http://localhost:5173`

### To Test the Full Flow

1. Visit landing page (should load automatically)
2. Click "Get Started" or "Sign In"
3. Click "Sign up" to create account
4. Fill in: email, name, password
5. Log in with those credentials
6. Explore the dashboard

---

## 📁 Project Structure

```
block-ops/
├── frontend/                    # React app
│   ├── src/
│   │   ├── pages/              # LandingPage, LoginPage, Dashboard, Profile, Settings
│   │   ├── components/         # DashboardLayout, ProtectedRoute
│   │   ├── contexts/           # AuthContext (state management)
│   │   ├── services/           # api.js (Axios client)
│   │   └── App.jsx             # Main app with routing
│   └── package.json
├── backend/                     # FastAPI app
│   ├── app/
│   │   ├── main.py             # FastAPI entry point
│   │   ├── models.py           # User database model
│   │   ├── schemas.py          # Request/response schemas
│   │   ├── auth.py             # JWT utilities
│   │   ├── database.py         # Database config
│   │   └── api/
│   │       └── auth.py         # Auth routes
│   └── requirements.txt
├── README.md                    # Full documentation
├── QUICKSTART.md               # 5-min setup guide
├── IMPLEMENTATION_SUMMARY.md   # What's built
└── GETTING_STARTED.md          # This file
```

---

## 🔧 Key Technologies

| Part | Technology | Why |
|------|-----------|-----|
| Frontend UI | React 18 | Industry standard, large ecosystem |
| Frontend Build | Vite | Fast, modern, great DX |
| Styling | Tailwind CSS | Utility-first, responsive design |
| Routing | React Router | Standard for React SPAs |
| Backend | FastAPI | Modern, fast, auto-docs |
| Database | PostgreSQL/SQLite | SQLite for dev, PostgreSQL for prod |
| Auth | JWT | Stateless, scalable |
| Password | bcrypt | Industry standard hashing |

---

## 🔐 Security Features

✅ **Password Hashing** - Using bcrypt via passlib
✅ **JWT Tokens** - Access & refresh tokens
✅ **CORS Protection** - Configured for frontend domain
✅ **Secure Sessions** - Tokens stored in localStorage
✅ **Protected Routes** - Dashboard requires authentication
✅ **Password Requirements** - Enforced on registration

---

## 📊 API Endpoints

**All endpoints available at:** `http://localhost:8000`
**API documentation:** `http://localhost:8000/docs`

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/api/auth/register` | Create new user account |
| POST | `/api/auth/login` | User login |
| POST | `/api/auth/refresh` | Refresh access token |
| GET | `/api/auth/me` | Get current user |
| GET | `/health` | Health check |

---

## 🎨 Customization Guide

### Change Landing Page Content

Edit `/frontend/src/pages/LandingPage.jsx`:
```javascript
// Line ~50: Change hero title
"Regional Anesthesiology <span className="text-primary">Consulting</span>"

// Line ~60: Change services - edit the services array
// Line ~80: Change team - edit the team array
```

### Change Dashboard Colors

Edit `/frontend/tailwind.config.js`:
```javascript
colors: {
  primary: '#5d87ff',          // Change this
  'dark-bg': '#1a1d2e',        // Or this
  'dark-card': '#252b3f',      // Or this
}
```

### Change Backend Settings

Edit `/backend/.env`:
```env
SECRET_KEY=your-secure-key      # Change for production!
JWT_EXPIRATION_HOURS=24         # Token lifetime
DATABASE_URL=sqlite:///./test.db # Use PostgreSQL in production
```

---

## 🚀 Deployment Checklist

- [ ] Review **README.md** deployment section
- [ ] Set up PostgreSQL database
- [ ] Generate strong `SECRET_KEY`
- [ ] Create Render account
- [ ] Deploy backend service
- [ ] Deploy frontend service
- [ ] Update frontend API URL
- [ ] Test login flow
- [ ] Set up monitoring/logging

See **README.md** for detailed deployment instructions.

---

## ⚠️ Known Limitations (To-Do)

Before launching to production, implement:
- [ ] Email verification for registration
- [ ] Password reset functionality
- [ ] Profile edit backend integration
- [ ] Settings persistence
- [ ] Error logging & monitoring
- [ ] Rate limiting
- [ ] Automated tests

---

## 💡 Pro Tips

1. **Use the API Docs**: Visit `http://localhost:8000/docs` to test API endpoints
2. **Check Browser Console**: Any errors will show in DevTools
3. **Inspect Network**: Network tab shows all API calls
4. **Clear Tokens**: Clear localStorage to force re-login
5. **Hot Reload**: Both frontend and backend support hot reload during development

---

## 📞 Troubleshooting

### "Cannot GET /dashboard"
- Backend not running? Start it in Terminal 1
- API URL wrong? Check `.env` files

### "Invalid email or password"
- Email already exists? Use a different email
- Password requirements met? At least 8 characters recommended

### "Port 5173 already in use"
- Kill the process using that port
- Or run: `npm run dev -- --port 5174`

### "Module not found"
- For backend: Run `pip install -r requirements.txt`
- For frontend: Run `npm install`

---

## 📚 Documentation Map

```
GETTING_STARTED.md (you are here)
├── QUICKSTART.md      ← Start here for fast setup
├── README.md          ← Full documentation
├── IMPLEMENTATION_SUMMARY.md  ← What's been built
└── Individual feature docs in comments
```

---

## 🎓 Learning Resources

- **React**: https://react.dev/learn
- **Tailwind**: https://tailwindcss.com/docs
- **FastAPI**: https://fastapi.tiangolo.com/
- **JWT**: https://jwt.io/
- **SQLAlchemy**: https://docs.sqlalchemy.org/

---

## ✨ You're All Set!

Your Block Ops platform is fully functional and ready for:
1. **Local development** - Make customizations
2. **Testing** - Try the full user flow
3. **Deployment** - Launch to production
4. **Iteration** - Build CRM features next

---

**Next:** Open `QUICKSTART.md` and follow the setup instructions!

Questions? Check the docs or review the source code comments.

---

**Created**: October 29, 2025
**Status**: Ready to Run
**Tech Stack**: React + FastAPI + Tailwind CSS
