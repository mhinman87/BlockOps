import { useState, useEffect } from 'react';
import { supabase } from '../services/supabase';

export const useUserRole = () => {
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRole = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setRole('client');
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user.id)
        .single();

      if (error || !data) {
        // No role assigned = client by default
        setRole('client');
      } else {
        setRole(data.role);
      }
      setLoading(false);
    };

    fetchRole();
  }, []);

  return { role, loading, isReviewer: role === 'reviewer', isAdmin: role === 'admin', isTeam: role === 'reviewer' || role === 'admin' };
};
