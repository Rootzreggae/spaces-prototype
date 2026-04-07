import { useState } from 'react'
import { SegmentBanner } from '../shared/SegmentBanner'
import { SettingsShell } from './SettingsShell'

export function SettingsLanding() {
  const [searchFocused, setSearchFocused] = useState(false)

  return (
    <SettingsShell>
      <SegmentBanner />

      {/* Title + search */}
      <h1 style={styles.title}>Settings</h1>
      <p style={styles.subtitle}>Platform configuration and cross-app settings health.</p>

      <div style={{ position: 'relative', marginTop: 20, marginBottom: 8 }}>
        <input
          placeholder="Search settings..."
          onFocus={() => setSearchFocused(true)}
          onBlur={() => setSearchFocused(false)}
          style={{
            ...styles.searchInput,
            borderColor: searchFocused ? 'var(--dt-accent)' : 'var(--dt-border-default)',
          }}
        />
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--dt-text-faint)" strokeWidth="2" style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)' }}>
          <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <span style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', fontSize: 11, color: 'var(--dt-text-faint)', fontFamily: 'var(--dt-font-mono)', background: 'var(--dt-bg-raised)', padding: '2px 6px', borderRadius: 4 }}>⌘.</span>
      </div>
      <div style={{ display: 'flex', gap: 8, marginBottom: 32 }}>
        <span style={{ fontSize: 12, color: 'var(--dt-text-faint)' }}>Try</span>
        {['alerting profiles', 'data retention', 'OneAgent'].map((t) => (
          <span key={t} style={styles.tryChip}>{t}</span>
        ))}
      </div>

      {/* Needs attention */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--dt-text-faint)', textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: 'var(--dt-font-mono)' }}>Needs attention</span>
            <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--dt-warning)', background: 'var(--dt-warning-subtle)', padding: '1px 8px', borderRadius: 10 }}>4</span>
          </div>
          <span style={{ fontSize: 12, color: 'var(--dt-accent)', cursor: 'pointer' }}>View audit log</span>
        </div>
        {attentionItems.map((item, i) => (
          <div key={i} style={{ ...styles.attentionCard, borderLeft: `3px solid ${item.color}`, animation: `fadeInUp 300ms var(--dt-ease-out) ${i * 60}ms both` }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 4px 24px rgba(0,0,0,0.2)' }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none' }}
          >
            <div style={{ ...styles.attentionIcon, background: item.bg, color: item.color }}>{item.icon}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--dt-text-primary)', marginBottom: 4 }}>
                {item.title} <span style={styles.appBadge}>{item.app}</span>
              </div>
              <div style={{ fontSize: 12, color: 'var(--dt-text-muted)', lineHeight: 1.5 }}>{item.desc}</div>
              <div style={{ fontSize: 11, color: item.color, fontWeight: 600, marginTop: 4 }}>{item.severity} · {item.time}</div>
            </div>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--dt-text-faint)" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
          </div>
        ))}
      </div>

      {/* Recent actions */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--dt-text-faint)', textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: 'var(--dt-font-mono)' }}>Recent actions</span>
          <span style={{ fontSize: 12, color: 'var(--dt-accent)', cursor: 'pointer' }}>View full audit log</span>
        </div>
        {recentActions.map((action, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0', borderBottom: i < recentActions.length - 1 ? '1px solid var(--dt-border-subtle)' : 'none' }}>
            <div style={styles.avatar}>{action.initials}</div>
            <div style={{ flex: 1 }}>
              <span style={{ fontSize: 13, color: 'var(--dt-text-primary)', fontWeight: 500 }}>{action.user}</span>
              <span style={{ ...styles.actionBadge, background: action.bg, color: action.color }}>{action.action}</span>
              <span style={{ fontSize: 13, color: 'var(--dt-accent)', cursor: 'pointer' }}>{action.target}</span>
              <span style={{ fontSize: 13, color: 'var(--dt-text-muted)' }}> {action.detail}</span>
            </div>
            <div style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>
              <div style={{ fontSize: 12, color: 'var(--dt-text-faint)' }}>{action.time}</div>
              <div style={{ fontSize: 11, color: 'var(--dt-text-faint)' }}>{action.category}</div>
            </div>
          </div>
        ))}
      </div>
    </SettingsShell>
  )
}

// ── Data ──────────────────────────────────────────────────────

const attentionItems = [
  { title: 'Kubernetes monitoring has 3 outdated settings', app: 'Kubernetes app', desc: 'Deprecated schema properties are still in use. Affects pod visibility and resource attribution.', severity: 'High', time: 'Detected 2 hours ago', color: 'var(--dt-error)', bg: 'var(--dt-error-subtle)', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg> },
  { title: 'RUM settings conflict across 2 host groups', app: 'Real User Monitoring', desc: 'Entity-level overrides on web-frontend-prod and mobile-api-prod contradict environment defaults.', severity: 'Medium', time: 'Detected yesterday', color: 'var(--dt-warning)', bg: 'var(--dt-warning-subtle)', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg> },
  { title: 'Alerting profiles missing notification channel', app: 'Analyze and Alert', desc: '2 alerting profiles have no notification target configured. Alerts will fire but nobody will be notified.', severity: 'Medium', time: 'Detected 3 days ago', color: 'var(--dt-warning)', bg: 'var(--dt-warning-subtle)', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 01-3.46 0" /></svg> },
  { title: 'Log monitoring retention policy expiring soon', app: 'Storage', desc: 'Default retention bucket "logs-90d" expires in 12 days. Review or extend to avoid data loss.', severity: 'Info', time: '5 days ago', color: 'var(--dt-accent)', bg: 'var(--dt-accent-subtle)', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" /></svg> },
]

const recentActions = [
  { user: 'Anas Khader', initials: 'AK', action: 'modified', target: 'Anomaly detection rules', detail: 'on host group web-frontend-prod', time: '25 min ago', category: 'Analyze and Alert', color: 'var(--dt-accent)', bg: 'var(--dt-accent-subtle)' },
  { user: 'BenBen', initials: 'BB', action: 'created', target: 'AWS connection', detail: 'for account prod-eu-west-1', time: '2 hours ago', category: 'Connections', color: 'var(--dt-success)', bg: 'var(--dt-success-subtle)' },
  { user: 'Ricky Martin Singer', initials: 'RS', action: 'disabled', target: 'Slack notification channel', detail: 'for alerting profile Infrastructure Critical', time: '25 min ago', category: 'Analyze and Alert', color: 'var(--dt-error)', bg: 'var(--dt-error-subtle)' },
]

// ── Styles ────────────────────────────────────────────────────

const styles: Record<string, React.CSSProperties> = {
  title: { fontSize: 28, fontWeight: 600, color: 'var(--dt-text-primary)', fontFamily: 'var(--dt-font-display)', marginBottom: 4 },
  subtitle: { fontSize: 15, color: 'var(--dt-text-muted)' },
  searchInput: {
    width: '100%', padding: '14px 16px 14px 44px',
    background: 'var(--dt-bg-surface)', border: '1px solid var(--dt-border-default)',
    borderRadius: 10, color: 'var(--dt-text-primary)', fontSize: 15,
    fontFamily: 'var(--dt-font-body)', outline: 'none', transition: 'border-color 150ms',
  },
  tryChip: {
    padding: '4px 10px', fontSize: 12, fontWeight: 500,
    background: 'var(--dt-bg-raised)', border: '1px solid var(--dt-border-subtle)',
    borderRadius: 6, color: 'var(--dt-text-secondary)', cursor: 'pointer',
  },
  attentionCard: {
    display: 'flex', alignItems: 'flex-start', gap: 16,
    padding: '16px 20px', marginBottom: 8,
    background: 'var(--dt-bg-surface)', border: '1px solid var(--dt-border-subtle)',
    borderRadius: 10, cursor: 'pointer',
    transition: 'transform 200ms ease, box-shadow 200ms ease, border-color 200ms ease',
  },
  attentionIcon: {
    width: 36, height: 36, borderRadius: 10,
    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
  },
  appBadge: {
    fontSize: 11, fontWeight: 500, padding: '2px 8px', borderRadius: 4,
    background: 'var(--dt-bg-raised)', color: 'var(--dt-text-muted)',
    marginLeft: 8,
  },
  avatar: {
    width: 32, height: 32, borderRadius: '50%',
    background: 'var(--dt-accent)', color: '#fff',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: 11, fontWeight: 700, flexShrink: 0,
  },
  actionBadge: {
    fontSize: 11, fontWeight: 600, padding: '2px 8px', borderRadius: 4,
    marginLeft: 6, marginRight: 4,
  },
}
