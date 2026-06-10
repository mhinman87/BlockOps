import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';

// Applies the dark theme class only on dashboard routes — the public marketing
// site (/, /contact, /company, /blog, /login) is always light, regardless of
// the saved theme preference.
export default function ThemeRouteSync() {
  const { pathname } = useLocation();
  const { dark } = useTheme();
  useEffect(() => {
    const isDashboard = pathname.startsWith('/dashboard');
    document.documentElement.classList.toggle('dark', isDashboard && dark);
  }, [pathname, dark]);
  return null;
}
