import { useState, useEffect, useRef } from 'react';
import { supabase } from '../services/supabase';

// Cache role across hook instances to prevent flash on navigation
let cachedRole = null;

export const useUserRole = () => {
  const [role, setRole] = useState(cachedRole);
  const [loading, setLoading] = useState(cachedRole === null);
  const fetched = useRef(false);

  useEffect(() => {
    // If we already fetched this session, don't re-fetch
    if (cachedRole !== null && fetched.current) return;

    const fetchRole = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        cachedRole = 'client';
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

      if (error || !data) {
        cachedRole = 'client';
        setRole('client');
      } else {
        cachedRole = data.role;
        setRole(data.role);
      }
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
