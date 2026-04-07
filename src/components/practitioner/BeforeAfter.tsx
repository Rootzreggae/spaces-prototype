import { useState } from 'react'

type Tab = 'before' | 'after'

export function BeforeAfter() {
  const [tab, setTab] = useState<Tab>('before')

  return (
    <div style={{ padding: '0 32px 32px' }}>
      <div style={{ padding: '16px 0', marginBottom: 24 }}>
        <span style={{ fontSize: 15, fontWeight: 600, color: 'var(--dt-text-primary)' }}>Before / After Spaces</span>
        <p style={{ fontSize: 13, color: 'var(--dt-text-muted)', marginTop: 4 }}>See how Spaces reduces noise and focuses your team on what matters.</p>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 24, background: 'var(--dt-bg-raised)', borderRadius: 8, padding: 4, width: 'fit-content' }}>
        {(['before', 'after'] as const).map((t) => (
          <button key={t} onClick={() => setTab(t)} style={{
            padding: '8px 20px', fontSize: 13, fontWeight: 600, border: 'none',
            borderRadius: 6, cursor: 'pointer', fontFamily: 'inherit', textTransform: 'capitalize',
            background: tab === t ? (t === 'before' ? 'rgba(239,68,68,0.15)' : 'rgba(34,197,94,0.15)') : 'transparent',
            color: tab === t ? (t === 'before' ? '#f87171' : '#34d399') : 'var(--dt-text-muted)',
            transition: 'all 150ms',
          }}>
            {t} Spaces
          </button>
        ))}
      </div>

      {/* Before panel */}
      {tab === 'before' && (
        <div>
          <div style={annotationStyle('var(--dt-error)')}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
            47 problems across the entire environment — most are irrelevant to the Payments team
          </div>
          <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 6 }}>
            {beforeProblems.map((p, i) => (
              <div key={i} style={{
                ...rowStyle, opacity: p.relevant ? 1 : 0.4,
                borderLeft: `3px solid ${p.relevant ? 'var(--dt-error)' : 'var(--dt-border-default)'}`,
              }}>
                <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--dt-text-primary)', flex: 1 }}>{p.title}</span>
                <span style={{ fontSize: 11, color: 'var(--dt-text-muted)', whiteSpace: 'nowrap' }}>{p.team}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* After panel */}
      {tab === 'after' && (
        <div>
          <div style={annotationStyle('var(--dt-success)')}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            Only 2 problems — both directly affecting Payments services. Signal, not noise.
          </div>
          <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 6 }}>
            {afterProblems.map((p, i) => (
              <div key={i} style={{ ...rowStyle, borderLeft: '3px solid #ef4444' }}>
                <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--dt-text-primary)', flex: 1 }}>{p.title}</span>
                <span style={{ fontSize: 11, color: 'var(--dt-text-muted)', whiteSpace: 'nowrap' }}>{p.team}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

const annotationStyle = (color: string): React.CSSProperties => ({
  display: 'flex', alignItems: 'center', gap: 12,
  padding: '16px 20px', borderRadius: 10, fontSize: 13, fontWeight: 600,
  background: `${color}12`, border: `1px solid ${color}33`, color,
})

const rowStyle: React.CSSProperties = {
  display: 'flex', alignItems: 'center', gap: 16,
  padding: '12px 16px', background: 'var(--dt-bg-surface)', border: '1px solid #2d3339',
  borderRadius: 8,
}

const beforeProblems = [
  { title: 'High error rate on payment-gateway', team: 'Payments', relevant: true },
  { title: 'Memory leak in checkout-service', team: 'Payments', relevant: true },
  { title: 'DNS resolution failure on infra-lb-03', team: 'Infrastructure', relevant: false },
  { title: 'Disk space warning on monitoring-node-7', team: 'Platform', relevant: false },
  { title: 'Certificate expiry on cdn-edge-eu', team: 'Security', relevant: false },
  { title: 'Pod restart loop in data-pipeline-worker', team: 'Data Engineering', relevant: false },
  { title: 'Slow query on analytics-db-replica', team: 'Analytics', relevant: false },
  { title: 'Network latency spike on k8s-node-12', team: 'Infrastructure', relevant: false },
]

const afterProblems = [
  { title: 'High error rate on payment-gateway', team: 'Payments' },
  { title: 'Memory leak in checkout-service', team: 'Payments' },
]
