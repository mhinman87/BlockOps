import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../services/supabase';

export const useDeliverableStatus = () => {
  const [statuses, setStatuses] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchStatuses = useCallback(async () => {
    const { data, error } = await supabase
      .from('deliverable_status')
      .select('*');

    if (!error && data) {
      const map = {};
      data.forEach(item => {
        map[item.storage_path] = item;
      });
      setStatuses(map);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchStatuses();
  }, [fetchStatuses]);

  const updateStatus = async (storagePath, newStatus, notes = null) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { error: 'Not authenticated' };

    const existing = statuses[storagePath];
    if (existing) {
      const { error } = await supabase
        .from('deliverable_status')
        .update({
          status: newStatus,
          reviewed_by: user.id,
          reviewed_at: new Date().toISOString(),
          revision_notes: notes,
          updated_at: new Date().toISOString(),
        })
        .eq('storage_path', storagePath);

      if (!error) {
        await fetchStatuses();
        return { success: true };
      }
      return { error: error.message };
    } else {
      // Create new record
      const { error } = await supabase
        .from('deliverable_status')
        .insert({
          storage_path: storagePath,
          title: storagePath.split('/').pop().replace('.md', '').replace(/_/g, ' '),
          status: newStatus,
          reviewed_by: user.id,
          reviewed_at: new Date().toISOString(),
          revision_notes: notes,
        });

      if (!error) {
        await fetchStatuses();
        return { success: true };
      }
      return { error: error.message };
    }
  };

  const getStatus = (storagePath) => {
    return statuses[storagePath]?.status || 'draft';
  };

  const getStatusInfo = (storagePath) => {
    return statuses[storagePath] || null;
  };

  return { statuses, loading, updateStatus, getStatus, getStatusInfo, refresh: fetchStatuses };
};
