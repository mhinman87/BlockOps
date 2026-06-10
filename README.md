# Block Ops - Regional Anesthesiology Consulting Platform

A modern Block Ops web app with a public landing page, authenticated internal dashboard, and Supabase-backed content/task system for regional anesthesiology consulting.

## Tech Stack

- **Frontend**: React 19 + Vite + Tailwind CSS + React Router
- **Data/Auth**: Supabase + PostgreSQL
- **Content system**: launch tasks, milestones, sites, and deliverables tables
- **Deployment**: Static frontend on Render, Supabase as the live backend backbone

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

- Node.js 16+
- Supabase project access

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file with the following variables:
```env
VITE_SUPABASE_URL=https://msnwupckhoomeiqxfbts.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

4. Start the development server:
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

## Data Model

The live app reads and writes directly to Supabase tables such as:

- `sites`
- `content_objects`
- `content_representations`
- `launch_tasks`
- `launch_tasks_v2`
- `launch_milestones`
- `weekly_agendas`

## Environment Variables

### Frontend (.env)
```env
VITE_SUPABASE_URL=https://msnwupckhoomeiqxfbts.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

## Deployment

### Frontend (Render)
- Build command: `npm install && npm run build`
- Static publish path: `dist`
- Environment variables: set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`

### Supabase
- Database: live tables and seed data are applied directly in Supabase
- Use the SQL editor or a pooler connection for future migrations

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
