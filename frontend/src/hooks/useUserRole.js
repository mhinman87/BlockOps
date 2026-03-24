import { useState, useEffect, useRef } from 'react';
import { supabase } from '../services/supabase';

// Persist role across navigations AND browser refreshes
const ROLE_KEY = 'blockops_user_role';
const getCachedRole = () => {
  try { return sessionStorage.getItem(ROLE_KEY); } catch { return null; }
};
const setCachedRole = (role) => {
  try { sessionStorage.setItem(ROLE_KEY, role); } catch {}
};

export const useUserRole = () => {
  const [role, setRole] = useState(getCachedRole);
  const [loading, setLoading] = useState(getCachedRole() === null);
  const fetched = useRef(false);

  useEffect(() => {
    if (fetched.current) return;

    const fetchRole = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setCachedRole('client');
        setRole('client');
        setLoading(false);
        fetched.current = true;
        return;
      }

      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user.id)
        .single();

      const resolvedRole = (!error && data) ? data.role : 'client';
      setCachedRole(resolvedRole);
      setRole(resolvedRole);
      setLoading(false);
      fetched.current = true;
    };

    fetchRole();
  }, []);

  const isReviewer = role === 'reviewer';
  const isAdmin = role === 'admin';
  const isTeam = isReviewer || isAdmin;

  return { role, loading, isReviewer, isAdmin, isTeam };
};
