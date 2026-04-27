// lib/intelligence.ts
// Single source of truth for all portal data fetching.
// All queries use the Supabase REST API with service role key — server-side only.
// Field names are exact matches to the verified database schema.

const SB_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SB_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

async function sbQuery(path: string, params?: Record<string, string>): Promise<any[]> {
  const url = new URL(`${SB_URL}/rest/v1/${path}`);
  if (params) Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  const res = await fetch(url.toString(), {
    headers: {
      apikey: SB_KEY,
      Authorization: `Bearer ${SB_KEY}`,
      'Content-Type': 'application/json',
    },
    next: { revalidate: 300 }, // 5-min cache
  });
  if (!res.ok) return [];
  return res.json();
}

// ─── COCKPIT ───────────────────────────────────────────────────────────────────

export async function getCockpitKPIs() {
  const [brokers, gaps, decisions, signals, audiences, cities] = await Promise.all([
    sbQuery('vumi_brokers', { select: 'id,tier', tier: 'eq.tier_1' }),
    sbQuery('vumi_data_gaps', { select: 'id,priority,blocker', status: 'neq.resolved' }),
    sbQuery('vumi_decisions', { select: 'id,status', status: 'eq.active' }),
    sbQuery('vumi_signal_monitor', { select: 'id,relevance_score,action_required', relevance_score: 'gte.80', order: 'detected_at.desc', limit: '10' }),
    sbQuery('vumi_audience_segments', { select: 'id,nationality' }),
    sbQuery('vumi_geo_opportunity', { select: 'id,launch_priority', launch_priority: 'in.(p0,p1)' }),
  ]);
  return {
    tier1_brokers: brokers.length,
    open_gaps: gaps.length,
    blockers: gaps.filter((g: any) => g.blocker).length,
    active_decisions: decisions.length,
    high_signals: signals.length,
    action_signals: signals.filter((s: any) => s.action_required).length,
    latam_audience_segments: new Set(audiences.map((a: any) => a.nationality)).size,
    priority_cities: cities.length,
  };
}

export async function getRecentSignals(limit = 10) {
  return sbQuery('vumi_signal_monitor', {
    select: 'id,signal_type,result_title,result_url,result_summary,published_at,relevance_score,entity,action_required,action_note,detected_at',
    relevance_score: 'gte.70',
    order: 'detected_at.desc',
    limit: String(limit),
  });
}

export async function getRecentDecisions(limit = 5) {
  return sbQuery('vumi_decisions', {
    select: 'id,title,decision,domain,rationale,reversibility,decided_at,decided_by,status,commit_sha,deployment_id',
    status: 'eq.active',
    order: 'decided_at.desc',
    limit: String(limit),
  });
}

export async function getGeoOpportunities() {
  return sbQuery('vumi_geo_opportunity', {
    select: '*',
    order: 'launch_priority.asc,city.asc',
  });
}

// ─── BROKERS ──────────────────────────────────────────────────────────────────

export async function getBrokers() {
  return sbQuery('vumi_brokers', {
    select: 'id,name,legal_name,website,dgsfp_code,broker_type,tier,primary_ccaa,primary_city,provinces,expat_focus,latam_focus,vip_hnw_focus,carriers_intermediated,association_membership,annual_health_premium_eur,fit_score,outreach_priority,notes',
    order: 'fit_score.desc',
  });
}

// ─── COMPETITORS ──────────────────────────────────────────────────────────────

export async function getCompetitors() {
  return sbQuery('vumi_competitors', {
    select: 'id,brand_name,legal_entity_spain_facing,regulator,regulator_jurisdiction,dgsfp_status,segment,global_customers_millions,spain_market_share_pct,rating_am_best,parent_company,strengths,weaknesses,visa_spain_eligible,vumi_differentiation_angle,source_urls,notes',
  });
}

export async function getCompetitorProducts() {
  return sbQuery('vumi_competitor_products', {
    select: 'id,competitor_id,product_name,product_tier,annual_limit_eur,annual_limit_usd,maternity,dental,evacuation,worldwide_ex_usa,worldwide_incl_usa,visa_eligible_spain,price_min_eur_per_year,price_max_eur_per_year,pricing_profile,pricing_as_of,source_url,notes',
    order: 'annual_limit_eur.desc',
  });
}

// ─── AUDIENCES ────────────────────────────────────────────────────────────────

export async function getAudienceTopline() {
  return sbQuery('vumi_v_audience_topline', { select: '*' });
}

export async function getAudienceSegments(nationality?: string) {
  const params: Record<string, string> = {
    select: 'id,nationality,segment_label,padron_total,geography_ccaa,geography_city,socioeconomic_tier,education_profile,insurance_propensity,channel_preference,key_pain_point,gtm_message,source_url,source_year',
    order: 'nationality.asc,padron_total.desc',
  };
  if (nationality) params['nationality'] = `eq.${nationality}`;
  return sbQuery('vumi_audience_segments', params);
}

// ─── GATES / GAPS ─────────────────────────────────────────────────────────────

export async function getDataGaps() {
  return sbQuery('vumi_data_gaps', {
    select: 'id,question,domain,why_it_matters,required_evidence,recommended_source,recommended_method,priority,blocker,owner,eta,status,resolution_notes',
    status: 'neq.resolved',
    order: 'blocker.desc,priority.asc,eta.asc',
  });
}

export async function getHypotheses() {
  return sbQuery('strategic_hypotheses', {
    select: '*',
    order: 'confidence_score.desc',
  });
}

// ─── SIGNALS ──────────────────────────────────────────────────────────────────

export async function getSignals(limit = 50) {
  return sbQuery('vumi_signal_monitor', {
    select: 'id,signal_type,result_title,result_url,result_summary,published_at,detected_at,relevance_score,entity,action_required,action_note,provider',
    order: 'detected_at.desc',
    limit: String(limit),
  });
}

// ─── PORTAL PAYLOAD (for /intelligence/data route) ────────────────────────────

export async function getPortalPayload() {
  const res = await fetch(`${SB_URL}/rest/v1/vumi_v_portal_payload?select=*`, {
    headers: {
      apikey: SB_KEY,
      Authorization: `Bearer ${SB_KEY}`,
    },
    next: { revalidate: 60 },
  });
  if (!res.ok) return null;
  const rows = await res.json();
  return rows[0] ?? null;
}
