-- ═══════════════════════════════════════════════════════════════════════════
-- VUMI® Europe — Spain Strategic Intelligence Portal
-- Migration 001: Core intelligence schema
-- Project: pytjweipmorwfdmxdcgi (eu-west-1)
-- Date: 2026-04-24
-- ═══════════════════════════════════════════════════════════════════════════
-- POLICY: This schema stores ONLY verified, structured metrics.
-- The corpus (qualitative intel) lives in project knowledge (RAG).
-- Numerical KPIs (GRPs, impressions, reach, frequency, spend, CPL) come
-- exclusively from this database. Never infer. Never approximate.
-- ═══════════════════════════════════════════════════════════════════════════

-- Extensions
create extension if not exists "uuid-ossp" schema extensions;
create extension if not exists "vector"     schema extensions;
create extension if not exists "pg_cron"    schema extensions;
create extension if not exists "pgcrypto"   schema extensions;

-- ── 1. MEDIA CAMPAIGNS ───────────────────────────────────────────────────────
-- Source of truth for all campaign performance metrics.
-- Populated by: media agency exports, UTM aggregations, broker tracking links.
-- ─────────────────────────────────────────────────────────────────────────────
create table if not exists public.media_campaigns (
  id                  uuid        primary key default extensions.uuid_generate_v4(),
  created_at          timestamptz default now() not null,
  updated_at          timestamptz default now() not null,

  -- Identity
  campaign_name       text        not null,
  campaign_code       text        unique,
  channel             text        not null, -- tv | radio | ooh | display | sem | social | email | broker_direct
  medium              text,                 -- e.g. "Meta Ads", "Google Ads", "La Vanguardia"
  target_segment      text,                 -- ven | mex | col | nomada | hnw | corporate
  ccaa                text,                 -- madrid | cataluna | andalucia | etc.
  
  -- Dates
  period_start        date        not null,
  period_end          date,
  
  -- Reach / GRP metrics (TV/Radio)
  grps                numeric(10,2),
  reach_pct           numeric(6,3),         -- % of target audience reached
  frequency           numeric(6,2),         -- average exposures
  universe            bigint,               -- target audience size (persons)
  
  -- Volume metrics (digital)
  impressions         bigint,
  clicks              integer,
  ctr                 numeric(6,4),         -- click-through rate
  
  -- Lead / conversion
  leads               integer,
  cpl                 numeric(10,2),        -- cost per lead (€)
  applications        integer,              -- policy applications started
  policies_issued     integer,              -- policies actually issued
  
  -- Spend
  spend_eur           numeric(12,2),
  spend_currency      text        default 'EUR',
  
  -- Metadata
  source              text,                 -- "agency_export" | "utm_aggregator" | "manual"
  verified            boolean     default false,
  notes               text,

  constraint chk_channel check (channel in (
    'tv','radio','ooh','display','sem','social','email',
    'broker_direct','affiliate','pr','event','other'
  ))
);

create index if not exists idx_media_campaigns_segment  on public.media_campaigns (target_segment);
create index if not exists idx_media_campaigns_channel  on public.media_campaigns (channel);
create index if not exists idx_media_campaigns_period   on public.media_campaigns (period_start, period_end);
create index if not exists idx_media_campaigns_ccaa     on public.media_campaigns (ccaa);

-- ── 2. BROKER PIPELINE ───────────────────────────────────────────────────────
-- Track every broker / correduría relationship from first contact to active.
-- ─────────────────────────────────────────────────────────────────────────────
create table if not exists public.broker_pipeline (
  id                  uuid        primary key default extensions.uuid_generate_v4(),
  created_at          timestamptz default now() not null,
  updated_at          timestamptz default now() not null,
  
  -- Identity
  broker_name         text        not null,
  legal_name          text,
  broker_type         text        not null, -- correduría | agente | comparador | flex_benefits | asociacion
  association         text,                 -- adecose | aunna | espabrok | cojebro | fecor | independent
  
  -- Geography
  ccaa_primary        text,
  city                text,
  
  -- Contact
  contact_name        text,
  contact_email       text,
  contact_phone       text,
  
  -- Pipeline status
  status              text        not null default 'prospect',
  -- prospect → contacted → meeting_scheduled → proposal_sent → 
  -- agreement_signed → first_quote → first_policy → active
  
  status_updated_at   timestamptz default now(),
  next_action         text,
  next_action_date    date,
  
  -- Volume (when active)
  policies_ytd        integer     default 0,
  premium_ytd_eur     numeric(12,2) default 0,
  
  -- Tier / priority
  tier                integer,              -- 1 | 2 | 3
  priority            text        default 'normal', -- high | normal | low
  
  notes               text,
  assigned_to         text,                 -- VUMI commercial owner

  constraint chk_broker_type check (broker_type in (
    'correduría','agente','comparador','flex_benefits','asociacion','other'
  )),
  constraint chk_status check (status in (
    'prospect','contacted','meeting_scheduled','proposal_sent',
    'agreement_signed','first_quote','first_policy','active','inactive','lost'
  ))
);

create index if not exists idx_broker_status    on public.broker_pipeline (status);
create index if not exists idx_broker_tier      on public.broker_pipeline (tier);
create index if not exists idx_broker_ccaa      on public.broker_pipeline (ccaa_primary);

-- ── 3. REGULATORY TRACKER ────────────────────────────────────────────────────
-- Single table tracking all regulatory milestones. Critical for GTM gating.
-- ─────────────────────────────────────────────────────────────────────────────
create table if not exists public.regulatory_tracker (
  id                  uuid        primary key default extensions.uuid_generate_v4(),
  created_at          timestamptz default now() not null,
  updated_at          timestamptz default now() not null,
  
  milestone           text        not null unique,
  -- "dgsfp_lps_inscription" | "bde_list_inclusion" | "product_approval_euro_health"
  -- "provider_agreement_quironsalud" | "provider_agreement_hm" | etc.
  
  category            text        not null, -- regulatory | operational | commercial | provider
  status              text        not null default 'unknown',
  -- unknown | in_progress | pending_authority | complete | blocked | not_required
  
  blocking_gtm        boolean     default false,  -- TRUE = blocks media activation
  
  description         text,
  last_verified_at    date,
  target_date         date,
  completed_at        date,
  
  authority           text,  -- dgsfp | mfsa | bde | internal
  reference_number    text,  -- official expediente number when known
  
  notes               text,
  source              text,  -- who/what confirmed this status
  
  constraint chk_reg_status check (status in (
    'unknown','in_progress','pending_authority','complete','blocked','not_required'
  )),
  constraint chk_reg_category check (category in (
    'regulatory','operational','commercial','provider','legal'
  ))
);

-- Seed the known milestones from Wave 1 intelligence
insert into public.regulatory_tracker 
  (milestone, category, status, blocking_gtm, description, authority, last_verified_at)
values
  ('dgsfp_lps_inscription', 'regulatory', 'unknown', true,
   'VUMI Insurance Europe Ltd. (Malta C-112852) inscription in DGSFP registry via LPS or establishment. Not confirmed as of 24-abr-2026.',
   'dgsfp', '2026-04-24'),
  
  ('bde_malta_list_inclusion', 'regulatory', 'unknown', false,
   'Inclusion in Banco de España list of EEE insurance entities domiciled in Malta. Not present in 18-mar-2026 list.',
   'bde', '2026-04-24'),
  
  ('mfsa_passport_notification', 'regulatory', 'unknown', false,
   'MFSA notification to DGSFP under Solvencia II passporting rules (2-month window).',
   'mfsa', null),
  
  ('product_approval_euro_health', 'operational', 'unknown', false,
   'Euro Health Priority/Pro/Premier product documentation approved for Spain distribution.',
   'internal', null),
  
  ('provider_direct_billing_quironsalud', 'provider', 'unknown', false,
   'Direct billing agreement with Quirónsalud network (Spain-wide).',
   'internal', null),
  
  ('provider_direct_billing_hm', 'provider', 'unknown', false,
   'Direct billing agreement with HM Hospitales.',
   'internal', null),
  
  ('provider_direct_billing_vithas', 'provider', 'unknown', false,
   'Direct billing agreement with Vithas.',
   'internal', null),
  
  ('provider_cun_agreement', 'provider', 'unknown', false,
   'Partnership type with Clínica Universidad de Navarra: reference vs. direct billing TBD.',
   'internal', null),
  
  ('vumi_agent_portal_es', 'commercial', 'unknown', false,
   'agentsportal.vumigroup.com accessible in Spanish with Spain-specific product specs.',
   'internal', null),
  
  ('am_best_rating_published', 'regulatory', 'unknown', false,
   'A.M. Best or equivalent solvency rating publicly available for VUMI Insurance Europe.',
   'internal', null)

on conflict (milestone) do nothing;

-- ── 4. COMPETITOR INTELLIGENCE ────────────────────────────────────────────────
-- Track competitor pricing, positioning, and channel intelligence.
-- Populated by: mystery shopping, broker interviews, public sources.
-- ─────────────────────────────────────────────────────────────────────────────
create table if not exists public.competitor_intel (
  id                  uuid        primary key default extensions.uuid_generate_v4(),
  created_at          timestamptz default now() not null,
  
  competitor          text        not null,  -- bupa_global | cigna_global | allianz_care | axa_global | others
  intel_type          text        not null,  -- pricing | product | channel | media | regulatory
  
  -- Pricing (mystery shopping results)
  profile_type        text,  -- proA_35m_madrid | proB_family_bcn | proC_hnw_55m_marbella
  plan_name           text,
  premium_annual_eur  numeric(10,2),
  deductible_eur      numeric(10,2),
  coverage_limit_eur  numeric(12,2),
  coverage_zone       text,  -- worldwide_ex_usa | worldwide | europe
  
  -- Source
  source              text,
  source_date         date,
  verified            boolean default false,
  
  notes               text,

  constraint chk_competitor check (competitor in (
    'bupa_global','cigna_global','allianz_care','axa_global_healthcare',
    'sanitas','adeslas','asisa','dkv','mapfre_salud','other'
  )),
  constraint chk_intel_type check (intel_type in (
    'pricing','product','channel','media','regulatory','personnel','other'
  ))
);

create index if not exists idx_competitor_name on public.competitor_intel (competitor);
create index if not exists idx_competitor_type on public.competitor_intel (intel_type);

-- ── 5. AUDIENCE SEGMENTS ─────────────────────────────────────────────────────
-- Quantitative profile of each target segment. Updated from INE, broker data.
-- ─────────────────────────────────────────────────────────────────────────────
create table if not exists public.audience_segments (
  id                  uuid        primary key default extensions.uuid_generate_v4(),
  updated_at          timestamptz default now() not null,
  
  segment_id          text        not null unique,  -- ven | mex | col | nomada | hnw_expat | corporate
  segment_label       text        not null,
  
  -- Population (Spain)
  population_spain    integer,               -- total residents
  population_source   text,
  population_date     date,
  
  -- Economic profile
  median_income_eur   integer,
  high_income_pct     numeric(5,2),          -- % earning > 3x SMI
  
  -- Insurance intent (survey/broker data)
  uninsured_pct       numeric(5,2),          -- % without private health insurance
  wtp_monthly_eur     integer,               -- willingness to pay (median €/month)
  
  -- Geographic concentration (top 3 CCAA)
  top_ccaa            jsonb,                 -- [{"ccaa": "madrid", "pct": 45.2}, ...]
  
  -- Channel preference
  preferred_channel   text,                  -- broker | direct_digital | employer | referral
  
  -- Notes
  notes               text
);

-- Seed known segments from corpus
insert into public.audience_segments
  (segment_id, segment_label, population_spain, population_source, population_date, top_ccaa, preferred_channel)
values
  ('ven', 'Comunidad venezolana en España', 330000, 'corpus_02_wave1', '2024-01-01',
   '[{"ccaa":"madrid","pct":40},{"ccaa":"cataluna","pct":22},{"ccaa":"c_valenciana","pct":15}]',
   'broker'),
  ('mex', 'Comunidad mexicana en España', 90000, 'corpus_03_wave1', '2024-01-01',
   '[{"ccaa":"madrid","pct":38},{"ccaa":"pais_vasco","pct":20},{"ccaa":"cataluna","pct":18}]',
   'direct_digital'),
  ('col', 'Comunidad colombiana en España', 280000, 'corpus_04_wave1', '2024-01-01',
   '[{"ccaa":"c_valenciana","pct":30},{"ccaa":"madrid","pct":28},{"ccaa":"murcia","pct":15}]',
   'broker'),
  ('nomada', 'Nómada digital (Visa Ley Startups)', null, 'corpus_08_wave1', '2024-01-01',
   '[{"ccaa":"cataluna","pct":35},{"ccaa":"madrid","pct":30},{"ccaa":"andalucia","pct":20}]',
   'direct_digital'),
  ('hnw_expat', 'HNW expat anglosajón (Costa del Sol)', null, 'corpus_08_wave1', '2024-01-01',
   '[{"ccaa":"andalucia","pct":65},{"ccaa":"c_valenciana","pct":20}]',
   'broker')
on conflict (segment_id) do nothing;

-- ── 6. STRATEGIC SIGNALS ─────────────────────────────────────────────────────
-- Time-series log of key intelligence signals shown on the portal dashboard.
-- Drives the BLOQUEANTE/ATENCIÓN/OK/PENDIENTE status strip.
-- ─────────────────────────────────────────────────────────────────────────────
create table if not exists public.strategic_signals (
  id                  uuid        primary key default extensions.uuid_generate_v4(),
  created_at          timestamptz default now() not null,
  
  signal_key          text        not null,  -- dgsfp_status | pricing_status | rating_status | etc.
  level               text        not null,  -- BLOQUEANTE | ATENCIÓN | OK | PENDIENTE
  label               text        not null,
  detail              text,
  active              boolean     default true,
  
  resolved_at         timestamptz,
  resolved_by         text,
  
  source              text,                  -- who/what updated this signal

  constraint chk_signal_level check (level in ('BLOQUEANTE', 'ATENCIÓN', 'OK', 'PENDIENTE'))
);

create index if not exists idx_signals_active on public.strategic_signals (active, level);
create index if not exists idx_signals_key    on public.strategic_signals (signal_key);

-- Seed current signals from Wave 1
insert into public.strategic_signals (signal_key, level, label, detail, active) values
  ('dgsfp_inscription', 'BLOQUEANTE',
   'DGSFP — Inscripción no confirmada',
   'VUMI Insurance Europe Ltd. (Malta, C 112852) no aparece en la lista BdE de 18-mar-2026. Confirmación en apps.dgsfp.mineco.es pendiente. Bloquea toda activación media orientada a visados.',
   true),
  ('pricing_mystery_shop', 'ATENCIÓN',
   'Pricing IPMI — Mystery shopping pendiente',
   'Sin cotizaciones comparativas sistematizadas para los 3 perfiles clave (35 años Madrid / familia Barcelona / HNW Marbella). Necesario para definir price corridor.',
   true),
  ('solvency_rating', 'ATENCIÓN',
   'Rating de solvencia — No publicado',
   'Ni A.M. Best ni ratio SCR (SFCR maltés) disponibles públicamente. Contexto MUFACE hace que brokers sofisticados soliciten este dato activamente.',
   true),
  ('solvency_ii_framework', 'OK',
   'Pasaporte europeo (Solvencia II) — Marco claro',
   'Proceso LPS MFSA → DGSFP documentado. Plazo estándar: 2 meses tras notificación. Marco operativo sólido una vez confirmada inscripción.',
   true),
  ('broker_channel', 'OK',
   'Canal broker — Receptor confirmado',
   'Corredurías mid-market buscan alternativa tras retirada DKV de MUFACE. Asociaciones Adecose, Aunna, Espabrok/Cojebro con >400 corredurías representadas.',
   true),
  ('commercial_delegate', 'PENDIENTE',
   'Delegado comercial España — ¿Físico o remoto?',
   'Factor decisivo para activación canal broker. Sin presencia física, las corredurías pequeñas no activan contrato. Respuesta interna pendiente.',
   true);

-- ── 7. CORPUS EMBEDDINGS ─────────────────────────────────────────────────────
-- Vector store for RAG over the VUMI corpus documents.
-- Populated by: ingestion pipeline (scripts/ingest-corpus.ts)
-- ─────────────────────────────────────────────────────────────────────────────
create table if not exists public.corpus_chunks (
  id                  uuid        primary key default extensions.uuid_generate_v4(),
  created_at          timestamptz default now() not null,
  
  source_doc          text        not null,  -- "01_VUMI_Facts_Corpus" | "02_..." etc.
  chunk_index         integer     not null,
  content             text        not null,
  
  -- Metadata for filtering
  category            text,   -- regulatory | competitive | audience | broker | media | product
  ccaa                text,
  segment             text,
  
  -- Vector (1536 dims for text-embedding-3-small, 3072 for text-embedding-3-large)
  embedding           extensions.vector(1536),
  
  -- Dedup
  content_hash        text,
  
  unique (source_doc, chunk_index)
);

create index if not exists idx_corpus_source on public.corpus_chunks (source_doc);
create index if not exists idx_corpus_category on public.corpus_chunks (category);

-- IVFFlat index for fast similarity search (build after ingestion)
-- CREATE INDEX idx_corpus_embedding ON public.corpus_chunks 
--   USING ivfflat (embedding extensions.vector_cosine_ops) WITH (lists = 100);

-- ── 8. UPDATED_AT TRIGGERS ───────────────────────────────────────────────────
create or replace function public.handle_updated_at()
returns trigger language plpgsql
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create or replace trigger trg_media_campaigns_updated
  before update on public.media_campaigns
  for each row execute function public.handle_updated_at();

create or replace trigger trg_broker_pipeline_updated
  before update on public.broker_pipeline
  for each row execute function public.handle_updated_at();

create or replace trigger trg_regulatory_tracker_updated
  before update on public.regulatory_tracker
  for each row execute function public.handle_updated_at();

-- ── 9. ROW LEVEL SECURITY ────────────────────────────────────────────────────
alter table public.media_campaigns     enable row level security;
alter table public.broker_pipeline     enable row level security;
alter table public.regulatory_tracker  enable row level security;
alter table public.competitor_intel    enable row level security;
alter table public.audience_segments   enable row level security;
alter table public.strategic_signals   enable row level security;
alter table public.corpus_chunks       enable row level security;

-- Read-only policy for authenticated users (portal consumers)
-- Adjust to your auth strategy (service_role bypasses RLS)
create policy "authenticated_read_media_campaigns"
  on public.media_campaigns for select
  to authenticated using (true);

create policy "authenticated_read_broker_pipeline"
  on public.broker_pipeline for select
  to authenticated using (true);

create policy "authenticated_read_regulatory"
  on public.regulatory_tracker for select
  to authenticated using (true);

create policy "authenticated_read_competitor_intel"
  on public.competitor_intel for select
  to authenticated using (true);

create policy "authenticated_read_segments"
  on public.audience_segments for select
  to authenticated using (true);

create policy "authenticated_read_signals"
  on public.strategic_signals for select
  to authenticated using (true);

create policy "authenticated_read_corpus"
  on public.corpus_chunks for select
  to authenticated using (true);

-- ── 10. HELPER VIEWS ─────────────────────────────────────────────────────────

-- Current active blockers (used by portal status strip)
create or replace view public.v_active_signals as
  select signal_key, level, label, detail, created_at
  from public.strategic_signals
  where active = true
  order by 
    case level
      when 'BLOQUEANTE' then 1
      when 'ATENCIÓN'   then 2
      when 'PENDIENTE'  then 3
      when 'OK'         then 4
    end,
    created_at desc;

-- Broker pipeline summary
create or replace view public.v_broker_summary as
  select
    status,
    tier,
    count(*) as count,
    sum(policies_ytd) as total_policies,
    sum(premium_ytd_eur) as total_premium_eur
  from public.broker_pipeline
  group by status, tier
  order by tier nulls last, status;

-- Campaign performance by channel
create or replace view public.v_campaign_kpis as
  select
    channel,
    target_segment,
    ccaa,
    sum(impressions) as total_impressions,
    sum(leads) as total_leads,
    sum(policies_issued) as total_policies,
    sum(spend_eur) as total_spend_eur,
    case 
      when sum(leads) > 0 then round(sum(spend_eur) / sum(leads), 2)
      else null
    end as avg_cpl_eur,
    count(*) as campaigns
  from public.media_campaigns
  where verified = true
  group by channel, target_segment, ccaa
  order by total_spend_eur desc nulls last;

-- ═══════════════════════════════════════════════════════════════════════════
-- END MIGRATION 001
-- Run time: ~2s on fresh project
-- To apply: Supabase Dashboard → SQL Editor → paste and run
-- Or: supabase db push (if CLI configured)
-- ═══════════════════════════════════════════════════════════════════════════
