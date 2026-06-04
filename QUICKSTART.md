# Quick Start Guide - Block Ops

Get Block Ops running locally in 5 minutes.

## Terminal 1: Configure Supabase

```bash
cd frontend
cat > .env << EOF
VITE_SUPABASE_URL=https://msnwupckhoomeiqxfbts.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
EOF
```

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
✅ Supabase-backed content/task tables in the live database
✅ Launch milestone board and weekly agenda records
✅ Site-aware metadata tables (`sites`, `content_objects`, `content_representations`)
✅ Protected dashboard and internal content surfaces
✅ Responsive dark-themed dashboard
✅ Modern UI inspired by Modernize template

## Troubleshooting

#### Frontend won't start
- Make sure you're in the `frontend` directory
- Run: `npm install` if node_modules is missing
- Check that port 5173 is not in use

#### Supabase connection errors
- Make sure `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are set correctly
- Confirm the project is reachable and the anon key is active
- Check the browser console for Supabase auth/data errors

## Environment Variables

### Frontend (.env)
```env
VITE_SUPABASE_URL=https://msnwupckhoomeiqxfbts.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

## Next Steps

- [ ] Populate the app with the right Supabase anon key in production
- [ ] Verify frontend deployment on Render
- [ ] Keep expanding the launch milestone/task system
- [ ] Add more site-aware content and launch reporting
- [ ] Implement CRM features
- [ ] Add consultation scheduling

---

For detailed documentation, see [README.md](./README.md)
