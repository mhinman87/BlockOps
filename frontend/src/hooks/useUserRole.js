import { useEffect, useRef, useState } from 'react';
import { supabase } from '../services/supabase';

export const useUserRole = () => {
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const requestSequence = useRef(0);

  useEffect(() => {
    let active = true;

    const resolveRole = async (user) => {
      const requestId = ++requestSequence.current;
      setLoading(true);

      if (!user) {
        if (active && requestId === requestSequence.current) {
          setRole('client');
          setLoading(false);
        }
        return;
      }

      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user.id)
        .maybeSingle();

      if (!active || requestId !== requestSequence.current) return;

      // Authorization must fail closed. Missing rows, query failures, and unknown
      // values all resolve to the client role.
      const resolvedRole = !error && ['reviewer', 'admin'].includes(data?.role)
        ? data.role
        : 'client';

      setRole(resolvedRole);
      setLoading(false);
    };

    supabase.auth.getUser().then(({ data: { user } }) => resolveRole(user));

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      // Defer the database lookup until Supabase releases its auth callback lock.
      setTimeout(() => resolveRole(session?.user || null), 0);
    });

    return () => {
      active = false;
      requestSequence.current += 1;
      subscription.unsubscribe();
    };
  }, []);

  const isReviewer = role === 'reviewer';
  const isAdmin = role === 'admin';
  const isTeam = isReviewer || isAdmin;

  return { role, loading, isReviewer, isAdmin, isTeam };
};
