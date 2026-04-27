// app/intelligence/roadmap/page.tsx
import Link from 'next/link';

const S = {
  card: { background: '#fff', border: '1px solid #E2E8F0', borderRadius: 8, padding: 24, boxShadow: '0 1px 2px rgba(0,0,0,.04)' } as React.CSSProperties,
  kicker: { fontSize: 11, color: '#00A9E0', fontWeight: 600, textTransform: 'uppercase' as const, letterSpacing: '0.12em', marginBottom: 6 },
};

const GATES = [
  {
    days: 30,
    title: 'Activación Fundacional',
    color: '#E55B4D',
    bg: '#FBE8E2',
    status: 'in_progress',
    exit_criterion: 'DGSFP inscripción verificada públicamente + vumigroup.com copy corregido + 3 brokers P0 reunión inicial completada',
    owner: 'VUMI Europe + Strategy Lead',
    blockers: ['Confirmar inscripción DGSFP en registro público', 'Corregir copy vumigroup.com Spain exclusion'],
    initiatives: [
      'Mystery shopping pricing competidores (perfiles A, B, C)',
      'Outreach brokers P0: C1 Broker, Medicorasse, Espabrok, Euromutua, Sanitas Expat Brokers',
      'Ficha producto VUMI Euro Health EN/ES para brokers',
      'Confirmación modelo: ¿delegado físico España?',
    ],
  },
  {
    days: 60,
    title: 'Validación Canal Broker',
    color: '#0033A0',
    bg: '#EEF2FF',
    status: 'not_started',
    exit_criterion: '5+ brokers Tier 1 con propuesta aceptada (NDA o carta de intención) + price corridor VUMI definido vs competencia',
    owner: 'Strategy + VUMI Commercial',
    blockers: [],
    initiatives: [
      'Pricing corridor VUMI vs competidores — decisión interna',
      'Material broker: battle cards por competidor (Bupa, Allianz, AXA, Cigna)',
      'Outreach brokers P1 (segunda oleada)',
      'Rating AM Best: decisión go/no-go',
    ],
  },
  {
    days: 90,
    title: 'Primeras Pólizas España',
    color: '#00A9E0',
    bg: '#E6F6FC',
    status: 'not_started',
    exit_criterion: '10+ pólizas emitidas vía canal broker en Madrid y/o Barcelona + NPS ≥ 60 primeros asegurados',
    owner: 'VUMI Operations + Broker Channel',
    blockers: [],
    initiatives: [
      'Proceso emisión póliza: ¿cuánto tarda VUMI vs Allianz?',
      'Direct billing: confirmación Quirónsalud, HM, Clínica Navarra',
      'Proceso claims en España — SLA definido',
      'Wave 2 audiencias: Argentina y jubilados británicos Costa del Sol',
    ],
  },
  {
    days: 180,
    title: 'Escala Geográfica',
    color: '#6A3AAF',
    bg: '#F4EEFB',
    status: 'not_started',
    exit_criterion: 'Presencia activa en 4+ ciudades P0/P1 + 3+ brokers Tier 2 activos + 50+ pólizas en cartera',
    owner: 'Strategy + VUMI Commercial',
    blockers: [],
    initiatives: [
      'Activación Valencia, Málaga/Marbella, Sevilla (P1–P2)',
      'Revisión pricing tras mystery shopping Wave 2',
      'Employee Benefits: corporates con empleados LatAm expatriados',
      'Evaluación canal digital (comparadores: Policomparador, HolaSeguro)',
    ],
  },
  {
    days: 365,
    title: 'Market Presence Consolidada',
    color: '#2DA771',
    bg: '#E3F4F0',
    status: 'not_started',
    exit_criterion: '200+ pólizas · 8+ brokers activos · penetración measurable en segmento venezolano/colombiano HNW Madrid + Barcelona',
    owner: 'VUMI Europe',
    blockers: [],
    initiatives: [
      'Análisis retención primera cohorte',
      'Decisión: ¿oficina física España o modelo remoto?',
      'Wave 3: asociaciones de inmigrantes, colegios profesionales',
      'Reporting regulatorio DGSFP — primer año de actividad',
    ],
  },
];

const STATUS_META: Record<string, { label: string; color: string; bg: string }> = {
  in_progress: { label: 'En curso', color: '#B45309', bg: '#FEF3CD' },
  not_started: { label: 'No iniciado', color: '#6B7785', bg: '#F5F7FA' },
  done: { label: 'Completado', color: '#2DA771', bg: '#E3F4F0' },
  blocked: { label: 'Bloqueado', color: '#E55B4D', bg: '#FBE8E2' },
};

export default function RoadmapPage() {
  return (
    <div style={{ maxWidth: 1000 }}>
      <div style={{ marginBottom: 24 }}>
        <div style={S.kicker}>Roadmap Estratégico</div>
        <h1 style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: 26, letterSpacing: '-0.025em', color: '#2C3539', marginBottom: 6 }}>
          Plan de Lanzamiento — España
        </h1>
        <p style={{ fontSize: 13, color: '#6B7785', maxWidth: 700 }}>
          5 gates: 30 / 60 / 90 / 180 / 365 días. Cada gate tiene exit criterion, owner y bloqueadores.
          Status actualizable desde Gates.{' '}
          <Link href="/intelligence/gates" style={{ color: '#0033A0', fontWeight: 600 }}>Ver gaps activos →</Link>
        </p>
      </div>

      {/* Timeline visual */}
      <div style={{ display: 'flex', gap: 0, marginBottom: 28, overflowX: 'auto', paddingBottom: 8 }}>
        {GATES.map((gate, i) => {
          const statusMeta = STATUS_META[gate.status] || STATUS_META.not_started;
          return (
            <div key={gate.days} style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 130 }}>
                <div style={{
                  width: 52, height: 52, borderRadius: '50%',
                  background: gate.color, color: '#fff',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                  fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: 13, lineHeight: 1.1,
                  border: gate.status === 'in_progress' ? '3px solid #F4B860' : '3px solid transparent',
                }}>
                  <span style={{ fontSize: 16 }}>{gate.days}</span>
                  <span style={{ fontSize: 9 }}>días</span>
                </div>
                <div style={{ fontSize: 10, color: gate.color, fontWeight: 700, textAlign: 'center', marginTop: 6, lineHeight: 1.3 }}>
                  {gate.title}
                </div>
                <span style={{ background: statusMeta.bg, color: statusMeta.color, padding: '2px 6px', borderRadius: 99, fontSize: 9, fontWeight: 600, marginTop: 4 }}>
                  {statusMeta.label}
                </span>
              </div>
              {i < GATES.length - 1 && (
                <div style={{ width: 40, height: 2, background: '#E2E8F0', flexShrink: 0 }} />
              )}
            </div>
          );
        })}
      </div>

      {/* Gate detail cards */}
      {GATES.map(gate => {
        const statusMeta = STATUS_META[gate.status] || STATUS_META.not_started;
        return (
          <div key={gate.days} style={{ ...S.card, marginBottom: 16, borderTop: `4px solid ${gate.color}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
              <div>
                <div style={S.kicker}>Gate {gate.days} días</div>
                <div style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: 17, color: '#2C3539' }}>
                  {gate.title}
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                {gate.blockers.length > 0 && (
                  <span style={{ background: '#FBE8E2', color: '#E55B4D', padding: '3px 8px', borderRadius: 99, fontSize: 10, fontWeight: 700 }}>
                    ⚠ {gate.blockers.length} bloqueador{gate.blockers.length > 1 ? 'es' : ''}
                  </span>
                )}
                <span style={{ background: statusMeta.bg, color: statusMeta.color, padding: '3px 8px', borderRadius: 99, fontSize: 10, fontWeight: 600 }}>
                  {statusMeta.label}
                </span>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div>
                <div style={{ fontSize: 11, color: '#6B7785', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>
                  Exit Criterion
                </div>
                <div style={{ fontSize: 13, color: '#2C3539', lineHeight: 1.5, background: gate.bg, padding: 12, borderRadius: 6 }}>
                  {gate.exit_criterion}
                </div>
                <div style={{ marginTop: 10, fontSize: 12, color: '#6B7785' }}>
                  <strong style={{ color: '#2C3539' }}>Owner:</strong> {gate.owner}
                </div>
                {gate.blockers.length > 0 && (
                  <div style={{ marginTop: 8 }}>
                    <div style={{ fontSize: 11, color: '#E55B4D', fontWeight: 600, marginBottom: 4 }}>Bloqueadores:</div>
                    {gate.blockers.map(b => (
                      <div key={b} style={{ fontSize: 12, color: '#2C3539', padding: '4px 0', borderLeft: '3px solid #E55B4D', paddingLeft: 8, marginBottom: 4 }}>
                        {b}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div>
                <div style={{ fontSize: 11, color: '#6B7785', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>
                  Iniciativas Clave
                </div>
                <ul style={{ paddingLeft: 16, margin: 0, fontSize: 12, color: '#2C3539', lineHeight: 1.8 }}>
                  {gate.initiatives.map(ini => (
                    <li key={ini}>{ini}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
