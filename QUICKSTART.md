# Quick Start Guide - Block Ops

Get Block Ops running locally in 5 minutes.

## Terminal 1: Start the Backend

```bash
# Navigate to backend
cd backend

# Activate virtual environment
source venv/bin/activate

# Create .env file (use defaults for local development)
cat > .env << EOF
DATABASE_URL=sqlite:///./test.db
SECRET_KEY=dev-key-change-in-production
JWT_EXPIRATION_HOURS=24
FRONTEND_URL=http://localhost:5173
EOF

# Start the server
uvicorn app.main:app --reload
```

✅ Backend running at: `http://localhost:8000`
📖 API docs available at: `http://localhost:8000/docs`

## Terminal 2: Start the Frontend

```bash
# Navigate to frontend
cd frontend

# Install dependencies (if not already done)
npm install

# Start development server
npm run dev
```

✅ Frontend running at: `http://localhost:5173`

## Testing the Application

1. **Visit the Landing Page**: `http://localhost:5173`
   - See the landing page with company info, services, and team

2. **Create an Account**:
   - Click "Get Started" or "Sign In" button
   - Click "Sign up" to create a new account
   - Fill in email, full name, and password

3. **Log In**:
   - Use your credentials to sign in
   - You'll be redirected to the dashboard

4. **Explore the Dashboard**:
   - View your profile on the Profile page
   - Adjust settings on the Settings page
   - Check out the quick actions

## What's Implemented

✅ Landing page with hero, services, team, and contact sections
✅ User authentication (registration and login)
✅ JWT-based authentication with refresh tokens
✅ Protected routes and dashboard
✅ User profile management
✅ Settings page with preferences
✅ Responsive dark-themed dashboard
✅ Modern UI inspired by Modernize template

## Troubleshooting

### Backend won't start
- Make sure you're in the `backend` directory
- Check that the virtual environment is activated
- Run: `pip install -r requirements.txt` if packages are missing

### Frontend won't start
- Make sure you're in the `frontend` directory
- Run: `npm install` if node_modules is missing
- Check that port 5173 is not in use

### API connection errors
- Make sure both backend and frontend are running
- Check that `VITE_API_URL` in frontend `.env` matches your backend URL
- Backend should be on `http://localhost:8000`

## Environment Variables

### Backend (.env)
```env
DATABASE_URL=sqlite:///./test.db           # SQLite for dev, PostgreSQL for prod
SECRET_KEY=dev-key-change-in-production    # Change in production!
JWT_EXPIRATION_HOURS=24                    # Token expiration time
FRONTEND_URL=http://localhost:5173         # Frontend URL for CORS
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:8000         # Backend API URL
```

## Next Steps

- [ ] Customize team member information
- [ ] Add your company contact information
- [ ] Set up PostgreSQL for production
- [ ] Deploy to Render
- [ ] Implement CRM features
- [ ] Add consultation scheduling
- [ ] Build mobile app with React Native

---

For detailed documentation, see [README.md](./README.md)
