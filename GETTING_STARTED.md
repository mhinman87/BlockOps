# 🚀 Getting Started with Block Ops

Welcome! Your Block Ops platform is ready to go. This guide will get you up and running in minutes.

> Current live architecture: the frontend uses Supabase directly for data and launch ops tables; the old backend-oriented notes below are kept only for historical context.

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

**Live Supabase Data Layer**
- 🗂️ **Launch Ops Tables** - milestones, v2 tasks, weekly agendas
- 🏗️ **Site-Aware Metadata** - sites, content_objects, content_representations
- 📚 **Foundation Catalog** - seeded deliverables and representations
- 🔒 **RLS Policies** - table-level access control for authenticated users
- 🌐 **Frontend Integration** - Supabase client reads/writes directly from the browser

**Live Stack**
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

**Terminal 1 - Frontend:**
```bash
cd frontend
npm install
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
│   │   ├── services/           # Supabase/data client
│   │   └── App.jsx             # Main app with routing
│   ├── package.json
├── README.md                    # Full documentation
├── QUICKSTART.md               # 5-min setup guide
├── IMPLEMENTATION_SUMMARY.md   # What's built
└── GETTING_STARTED.md          # This file
```

---

## 🔧 Key Technologies

| Part | Technology | Why |
|------|-----------|-----|
| Frontend UI | React 19 | Industry standard, large ecosystem |
| Frontend Build | Vite | Fast, modern, great DX |
| Styling | Tailwind CSS | Utility-first, responsive design |
| Routing | React Router | Standard for React SPAs |
| Data Layer | Supabase | Live backend and auth backbone |
| Database | PostgreSQL | Live production schema |
| Access Control | RLS | Table-level policy enforcement |

---

## 🔐 Security Features

✅ **RLS Policies** - Table-level access control
✅ **Supabase Client** - Browser-side data access with anon key
✅ **Seeded Live Schema** - Launch and site tables already in place
✅ **Protected Routes** - Dashboard requires app-level checks
✅ **Data Discipline** - Sensitive values stay out of the repo

---

## 📊 Legacy API Notes

The old FastAPI-style endpoint list is kept only as historical context. The live app now uses Supabase directly from the frontend for data access and launch ops workflows.

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

### Live Architecture Notes

The live app now uses Supabase directly from the frontend.

What to edit now:
- `frontend/.env` for `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`
- `frontend/src/services/supabase.js` for the client wrapper
- `README.md` / `QUICKSTART.md` for current setup and deployment notes

---

## 🚀 Deployment Checklist

- [ ] Review **README.md** deployment section
- [ ] Set production Supabase env vars in Render
- [ ] Verify live tables and seed data
- [ ] Create Render account
- [ ] Deploy the frontend service
- [ ] Test the live dashboard and content surfaces
- [ ] Set up monitoring/logging

See **README.md** for detailed deployment instructions.

---

## ⚠️ Known Limitations (To-Do)

Before launching to production, implement:
- [ ] Email verification for registration
- [ ] Password reset functionality
- [ ] Settings persistence
- [ ] Profile edit wiring
- [ ] Error logging & monitoring
- [ ] Rate limiting
- [ ] Automated tests

---

## 💡 Pro Tips

1. **Inspect Supabase Data**: Use the browser console and Supabase dashboard
2. **Check Browser Console**: Any errors will show in DevTools
3. **Inspect Network**: Network tab shows all data calls
4. **Refresh Carefully**: Make sure the anon key is loaded correctly
5. **Hot Reload**: Frontend supports hot reload during development

---

## 📞 Troubleshooting

### "Cannot GET /dashboard"
- Frontend not running? Start it in Terminal 1
- Env vars missing? Check `frontend/.env`

### "Invalid email or password"
- Email already exists? Use a different email
- Password requirements met? At least 8 characters recommended

### "Port 5173 already in use"
- Kill the process using that port
- Or run: `npm run dev -- --port 5174`

### "Module not found"
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
- **Supabase**: https://supabase.com/docs
- **PostgreSQL**: https://www.postgresql.org/docs/
- **RLS**: https://supabase.com/docs/guides/database/postgres/row-level-security

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
**Status**: Supabase-first frontend live
**Tech Stack**: React + Supabase + Tailwind CSS
