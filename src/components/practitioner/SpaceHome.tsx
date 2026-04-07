import { useState } from 'react'
import { DataCard } from '../shared/DataCard'

export function SpaceHome() {
  const [welcomeDismissed, setWelcomeDismissed] = useState(true)
  const [showFirstVisit, setShowFirstVisit] = useState(false)

  const toggleFirstVisit = () => {
    if (showFirstVisit) {
      setShowFirstVisit(false)
      setWelcomeDismissed(true)
    } else {
      setShowFirstVisit(true)
      setWelcomeDismissed(false)
    }
  }

  return (
    <div style={{ padding: '0 32px 32px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#b4bcc4" strokeWidth="2">
            <rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" />
            <rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" />
          </svg>
          <span style={{ fontSize: 15, fontWeight: 600, color: 'var(--dt-text-primary)' }}>Spaces</span>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={toggleFirstVisit} style={btnStyle}>
            {showFirstVisit ? 'Hide Welcome' : 'Show Welcome'}
          </button>
          <button style={{ ...btnStyle, background: 'var(--dt-bg-raised)', border: '1px solid #2d3339', color: 'var(--dt-text-secondary)', display: 'flex', alignItems: 'center', gap: 8, padding: '6px 16px' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /></svg>
            Search in Payments
          </button>
        </div>
      </div>

      {/* Welcome Card */}
      {!welcomeDismissed && (
        <DataCard style={{ marginBottom: 24, background: 'var(--dt-bg-surface)', border: '1px solid #2d3339' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
            <div style={{ width: 40, height: 40, background: 'rgba(20,150,255,0.12)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1496ff" strokeWidth="2">
                <rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" />
                <rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" />
              </svg>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--dt-text-primary)', marginBottom: 6 }}>Welcome to Payments</div>
              <div style={{ fontSize: 13, color: 'var(--dt-text-secondary)', lineHeight: 1.5 }}>
                Your team has set up this Space with the services, dashboards, and data relevant to your work. Everything else stays out of the way.
              </div>
            </div>
            <button onClick={() => setWelcomeDismissed(true)} style={{ background: 'none', border: 'none', color: 'var(--dt-text-muted)', cursor: 'pointer', padding: 4 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
            </button>
          </div>
          <div style={{ display: 'flex', gap: 16, marginTop: 16, fontSize: 13, color: 'var(--dt-text-secondary)' }}>
            <span><strong style={{ color: 'var(--dt-text-primary)' }}>12</strong> services</span>
            <span style={{ color: 'var(--dt-text-muted)' }}>&middot;</span>
            <span><strong style={{ color: 'var(--dt-text-primary)' }}>8</strong> dashboards</span>
            <span style={{ color: 'var(--dt-text-muted)' }}>&middot;</span>
            <span><strong style={{ color: 'var(--dt-text-primary)' }}>5</strong> notebooks</span>
            <span style={{ color: 'var(--dt-text-muted)' }}>&middot;</span>
            <span><strong style={{ color: 'var(--dt-text-primary)' }}>24</strong> hosts</span>
          </div>
          <div style={{ marginTop: 16 }}>
            <button onClick={() => setWelcomeDismissed(true)} style={{ ...btnStyle, background: 'var(--dt-accent)', color: 'var(--dt-text-primary)' }}>Start exploring</button>
          </div>
        </DataCard>
      )}

      {/* Content cards */}
      {(welcomeDismissed || !showFirstVisit) && (
        <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: 20, marginBottom: 32 }}>
          {/* Your activity */}
          <DataCard style={{ background: 'var(--dt-bg-surface)', border: '1px solid #2d3339' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <div style={{ width: 32, height: 32, background: 'rgba(20,150,255,0.12)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1496ff" strokeWidth="2"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
              </div>
              <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--dt-text-primary)' }}>Your activity</span>
            </div>
            {activityItems.map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 0', borderBottom: i < activityItems.length - 1 ? '1px solid #2d3339' : 'none' }}>
                <span style={{ fontSize: 11, color: item.color, background: item.bg, padding: '2px 8px', borderRadius: 4, fontWeight: 600 }}>{item.type}</span>
                <span style={{ flex: 1, fontSize: 13, color: 'var(--dt-text-secondary)' }}>{item.name}</span>
                <span style={{ fontSize: 12, color: 'var(--dt-text-muted)' }}>{item.time}</span>
              </div>
            ))}
            <div style={{ marginTop: 12, textAlign: 'right' }}>
              <span style={{ fontSize: 12, color: 'var(--dt-accent)', cursor: 'pointer' }}>View all activity &rarr;</span>
            </div>
          </DataCard>

          {/* In this Space */}
          <DataCard style={{ background: 'var(--dt-bg-surface)', border: '1px solid #2d3339' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <div style={{ width: 32, height: 32, background: 'rgba(245,158,11,0.12)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></svg>
              </div>
              <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--dt-text-primary)' }}>In this Space</span>
            </div>
            {scopeItems.map((item, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: i < scopeItems.length - 1 ? '1px solid #2d3339' : 'none' }}>
                <span style={{ fontSize: 13, color: 'var(--dt-text-secondary)' }}>{item.label}</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--dt-text-primary)' }}>{item.count}</span>
              </div>
            ))}
          </DataCard>
        </div>
      )}

      {/* Space Activity */}
      {(welcomeDismissed || !showFirstVisit) && (
        <div>
          <div style={{ marginBottom: 16 }}>
            <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--dt-text-primary)' }}>Space activity</span>
            <span style={{ fontSize: 12, color: 'var(--dt-text-muted)', marginLeft: 12 }}>Recent actions in this Space</span>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr>
                {['Action', 'Object', 'Time'].map((h) => (
                  <th key={h} style={{ textAlign: 'left', padding: '8px 12px', fontSize: 11, textTransform: 'uppercase', letterSpacing: 0.5, color: 'var(--dt-text-muted)', borderBottom: '1px solid #2d3339' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableRows.map((row, i) => (
                <tr key={i} style={{ borderBottom: '1px solid rgba(45,51,57,0.5)' }}>
                  <td style={{ padding: '10px 12px' }}>
                    <span style={{ fontSize: 11, fontWeight: 600, padding: '2px 8px', borderRadius: 4, background: row.actionBg, color: row.actionColor }}>{row.action}</span>
                  </td>
                  <td style={{ padding: '10px 12px', color: 'var(--dt-text-secondary)' }}>
                    {row.object} <span style={{ fontSize: 10, color: 'var(--dt-text-muted)', background: 'var(--dt-bg-raised)', padding: '2px 6px', borderRadius: 4, marginLeft: 8 }}>{row.badge}</span>
                  </td>
                  <td style={{ padding: '10px 12px', color: 'var(--dt-text-muted)' }}>{row.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 12, fontSize: 12 }}>
            <span style={{ color: 'var(--dt-text-muted)' }}>Showing 6 of 24 events</span>
            <span style={{ color: 'var(--dt-accent)', cursor: 'pointer' }}>View full log &rarr;</span>
          </div>
        </div>
      )}
    </div>
  )
}

const btnStyle: React.CSSProperties = {
  padding: '6px 14px', fontSize: 12, fontWeight: 500,
  border: '1px solid #3a3a5a', borderRadius: 6,
  background: 'transparent', color: '#aaa', cursor: 'pointer',
  fontFamily: 'inherit',
}

const activityItems = [
  { type: 'Dashboard', name: 'Payment Processing Overview', time: '2h ago', color: 'var(--dt-accent)', bg: 'rgba(20,150,255,0.12)' },
  { type: 'Notebook', name: 'Q1 Performance Analysis', time: 'Yesterday', color: 'var(--dt-success)', bg: 'rgba(34,197,94,0.12)' },
  { type: 'Service', name: 'payment-gateway', time: '3d ago', color: 'var(--dt-warning)', bg: 'rgba(245,158,11,0.12)' },
]

const scopeItems = [
  { label: 'Services', count: 5 },
  { label: 'Hosts', count: 24 },
  { label: 'Kubernetes namespaces', count: 8 },
  { label: 'Dashboards', count: 8 },
  { label: 'Notebooks', count: 5 },
]

const tableRows = [
  { action: 'Viewed', actionBg: 'rgba(20,150,255,0.12)', actionColor: 'var(--dt-accent)', object: 'Payment processing overview', badge: 'Dashboard', time: '2 hours ago' },
  { action: 'Edited', actionBg: 'rgba(34,197,94,0.12)', actionColor: 'var(--dt-success)', object: 'Q1 performance analysis', badge: 'Notebook', time: 'Yesterday' },
  { action: 'Resolved', actionBg: 'rgba(99,102,241,0.12)', actionColor: '#a5b4fc', object: 'High latency on payment-gateway', badge: 'Problem', time: 'Yesterday' },
  { action: 'Created', actionBg: 'rgba(34,197,94,0.12)', actionColor: 'var(--dt-success)', object: 'SLA monitoring', badge: 'Dashboard', time: '2 days ago' },
  { action: 'Triggered', actionBg: 'rgba(239,68,68,0.12)', actionColor: '#f87171', object: 'Error rate spike in checkout-service', badge: 'Problem', time: '3 days ago' },
  { action: 'Edited', actionBg: 'rgba(34,197,94,0.12)', actionColor: 'var(--dt-success)', object: 'Alerting profiles', badge: 'Setting', time: '4 days ago' },
]
