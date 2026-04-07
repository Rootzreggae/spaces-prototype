export function WizardStep1() {
  return (
    <div>
      <div style={{ textAlign: 'center', marginBottom: 48 }}>
        <div style={{ width: 72, height: 72, borderRadius: 16, background: 'rgba(59,130,246,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
          <svg width="32" height="32" fill="none" stroke="#3b82f6" strokeWidth="2" viewBox="0 0 24 24">
            <rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" />
            <rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" />
          </svg>
        </div>
        <h2 style={{ fontSize: 24, fontWeight: 600, color: 'var(--dt-text-primary)', marginBottom: 12 }}>Create a Space</h2>
        <p style={{ fontSize: 15, color: 'var(--dt-text-muted)', maxWidth: 520, margin: '0 auto', lineHeight: 1.6 }}>
          Spaces help you organize your environment by team, project, or service. Define who can access what, and let teams manage their own monitoring.
        </p>
      </div>

      {/* Benefits cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 48 }}>
        {benefits.map((b) => (
          <div key={b.title} style={cardStyle}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: b.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
              {benefitIcons[b.title]}
            </div>
            <h4 style={{ fontSize: 14, fontWeight: 600, color: 'var(--dt-text-primary)', marginBottom: 8 }}>{b.title}</h4>
            <p style={{ fontSize: 13, color: 'var(--dt-text-muted)', lineHeight: 1.5 }}>{b.desc}</p>
          </div>
        ))}
      </div>

      {/* What you'll do */}
      <div style={{ background: 'var(--dt-bg-raised)', border: '1px solid #2a2a4a', borderRadius: 12, padding: 32 }}>
        <h3 style={{ fontSize: 14, fontWeight: 600, color: 'var(--dt-text-primary)', marginBottom: 20, textTransform: 'uppercase', letterSpacing: 0.5 }}>What you'll do</h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
          {steps.map((s, i) => (
            <div key={s.label} style={{ display: 'flex', alignItems: 'center', flex: i < steps.length - 1 ? 1 : 'none' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, whiteSpace: 'nowrap' }}>
                <span style={{ width: 24, height: 24, borderRadius: '50%', background: 'var(--dt-bg-overlay)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 600, color: 'var(--dt-text-muted)' }}>{i + 1}</span>
                <span style={{ fontSize: 13, color: 'var(--dt-text-secondary)' }}>{s.label}</span>
              </div>
              {i < steps.length - 1 && (
                <div style={{ flex: 1, height: 1, background: 'var(--dt-border-default)', margin: '0 16px' }} />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const cardStyle: React.CSSProperties = {
  padding: 24, background: 'var(--dt-bg-surface)', border: '1px solid #2a2a4a',
  borderRadius: 12,
}

const benefitIcons: Record<string, React.ReactNode> = {
  'Team-based access': <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87" /><path d="M16 3.13a4 4 0 010 7.75" /></svg>,
  'Organized dashboards': <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18" /><path d="M9 21V9" /></svg>,
  'Simplified permissions': <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>,
}

const benefits = [
  { title: 'Team-based access', desc: 'Give teams access only to the data they need, reducing noise and improving focus.', bg: 'rgba(59,130,246,0.15)' },
  { title: 'Organized dashboards', desc: 'Keep dashboards and configurations scoped to specific teams or projects.', bg: 'rgba(16,185,129,0.15)' },
  { title: 'Simplified permissions', desc: 'Manage access at the Space level instead of individual entities.', bg: 'rgba(99,102,241,0.15)' },
]

const steps = [
  { label: 'Name & describe' },
  { label: 'Define data scope' },
  { label: 'Assign groups' },
  { label: 'Review & create' },
]
