import { spaceDashboards } from '../../data/mock-data'
import { SegmentBanner } from '../shared/SegmentBanner'

export function Dashboards() {
  return (
    <div style={{ padding: '0 32px 32px' }}>
      <SegmentBanner />
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 0', borderBottom: '1px solid #2d3339', marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--dt-success)' }} />
          <span style={{ fontSize: 15, fontWeight: 600, color: 'var(--dt-text-primary)' }}>Dashboards</span>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button style={btnStyle}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /></svg>
            Search dashboards
          </button>
          <button style={{ ...btnStyle, background: 'var(--dt-accent)', color: 'var(--dt-text-primary)', borderColor: 'var(--dt-accent)' }}>+ New Dashboard</button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
        {spaceDashboards.map((db) => (
          <div key={db.id} style={cardStyle}>
            {/* Placeholder chart area */}
            <div style={{ height: 140, background: 'var(--dt-bg-raised)', borderRadius: 6, marginBottom: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#2d3339" strokeWidth="1.5">
                <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18" /><path d="M9 21V9" />
              </svg>
            </div>
            <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--dt-text-primary)', marginBottom: 4 }}>{db.name}</div>
            <div style={{ fontSize: 12, color: 'var(--dt-text-muted)' }}>
              {db.owner} &middot; Viewed {db.lastViewed}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const btnStyle: React.CSSProperties = {
  padding: '6px 14px', fontSize: 12, fontWeight: 500,
  border: '1px solid #2d3339', borderRadius: 6,
  background: 'var(--dt-bg-raised)', color: 'var(--dt-text-secondary)', cursor: 'pointer',
  fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: 8,
}

const cardStyle: React.CSSProperties = {
  background: 'var(--dt-bg-surface)', border: '1px solid #2d3339',
  borderRadius: 12, padding: 20, cursor: 'pointer',
  transition: 'border-color 150ms',
}
