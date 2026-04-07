import { spaceProblems } from '../../data/mock-data'
import { StatusBadge } from '../shared/StatusBadge'
import { SegmentBanner } from '../shared/SegmentBanner'

export function Problems() {
  return (
    <div style={{ padding: '0 32px 32px' }}>
      <SegmentBanner />
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 0', borderBottom: '1px solid #2d3339', marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--dt-success)' }} />
          <span style={{ fontSize: 15, fontWeight: 600, color: 'var(--dt-text-primary)' }}>Problems</span>
          <StatusBadge variant="error">{spaceProblems.filter((p) => p.status === 'open').length} open</StatusBadge>
        </div>
        <div style={{ fontSize: 12, color: 'var(--dt-text-muted)' }}>Scoped to Payments Space</div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {spaceProblems.map((p) => (
          <div key={p.id} style={{
            display: 'flex', alignItems: 'center', gap: 16,
            padding: '16px 20px', background: 'var(--dt-bg-surface)', border: '1px solid #2d3339',
            borderRadius: 10, borderLeft: `3px solid ${severityColors[p.severity]}`,
            cursor: 'pointer', transition: 'border-color 150ms',
          }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--dt-text-primary)', marginBottom: 4 }}>{p.title}</div>
              <div style={{ fontSize: 12, color: 'var(--dt-text-muted)' }}>{p.id} &middot; {p.entity} &middot; {p.timestamp}</div>
            </div>
            <StatusBadge variant={p.status === 'open' ? (p.severity === 'critical' ? 'error' : 'warning') : 'success'} dot>
              {p.status === 'open' ? p.severity : 'resolved'}
            </StatusBadge>
          </div>
        ))}
      </div>

      {/* Annotation */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 12,
        padding: '16px 20px', borderRadius: 10, fontSize: 13, fontWeight: 600,
        marginTop: 24, background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)', color: 'var(--dt-success)',
      }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg>
        Only showing problems from entities within the Payments Space — no noise from other teams.
      </div>
    </div>
  )
}

const severityColors: Record<string, string> = {
  critical: 'var(--dt-error)',
  warning: 'var(--dt-warning)',
  info: 'var(--dt-accent)',
}
