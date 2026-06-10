-- ============================================
-- Block Ops — Example Site Seed
-- Pilot site for testing site-aware architecture
-- ============================================

begin;

insert into sites (
  site_id,
  site_name,
  client_account_name,
  status,
  launch_phase,
  primary_champion_name,
  primary_champion_role,
  lead_nurse_name
) values (
  'asc-demo',
  'ASC Demo Site',
  'Demo Health Partners',
  'onboarding',
  'prep',
  'Dr. Example Champion',
  'Physician Champion',
  'Jordan Example, RN'
)
on conflict (site_id) do update set
  site_name = excluded.site_name,
  client_account_name = excluded.client_account_name,
  status = excluded.status,
  launch_phase = excluded.launch_phase,
  primary_champion_name = excluded.primary_champion_name,
  primary_champion_role = excluded.primary_champion_role,
  lead_nurse_name = excluded.lead_nurse_name,
  updated_at = now();

commit;
