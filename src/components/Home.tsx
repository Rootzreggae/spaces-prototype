import { useState } from 'react'
import { NavLink } from 'react-router-dom'

const sectionIcons: Record<string, React.ReactNode> = {
  Spaces: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" /></svg>,
  Settings: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4" /></svg>,
  Observability: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>,
}

const appSections = [
  {
    title: 'Spaces',
    items: [
      { label: 'Spaces Home', path: '/spaces', desc: 'Landing page and Space overview' },
      { label: 'Create Space', path: '/spaces/create', desc: 'Guided wizard for Central Team' },
      { label: 'Manage Environments', path: '/spaces/manage', desc: 'Account management hub' },
    ],
  },
  {
    title: 'Settings',
    items: [
      { label: 'Settings Home', path: '/settings', desc: 'Platform configuration landing' },
    ],
  },
  {
    title: 'Observability',
    items: [
      { label: 'Dashboards', path: '/dashboards', desc: 'Space-scoped dashboards' },
      { label: 'Problems', path: '/problems', desc: 'Space-scoped problem view' },
      { label: 'Before / After', path: '/before-after', desc: 'Value comparison demo' },
    ],
  },
]

export function Home() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  return (
    <div style={{ flex: 1, overflow: 'auto', display: 'flex', justifyContent: 'center', padding: '60px 40px', position: 'relative' }}>
      <div style={{ maxWidth: 900, width: '100%', position: 'relative' }}>
        <div style={{ position: 'fixed', top: '-30%', left: '20%', width: '60%', height: '60%', background: 'radial-gradient(ellipse at center, rgba(20,150,255,0.06) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />

        <div style={{ marginBottom: 64, position: 'relative', zIndex: 1, animation: 'fadeInUp 600ms var(--dt-ease-out) both' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', color: 'var(--dt-accent)', fontFamily: 'var(--dt-font-mono)', marginBottom: 20 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--dt-accent)', boxShadow: '0 0 8px var(--dt-accent)', display: 'inline-block' }} />
            DYNATRACE · INTERACTIVE PROTOTYPE
          </div>
          <h1 style={{ fontSize: 72, fontWeight: 700, letterSpacing: '-0.04em', fontFamily: 'var(--dt-font-display)', lineHeight: 0.95, marginBottom: 20, background: 'linear-gradient(135deg, var(--dt-text-primary) 55%, rgba(20,150,255,0.75) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Spaces &amp; Settings
          </h1>
          <p style={{ fontSize: 18, lineHeight: 1.7, color: 'var(--dt-text-muted)', maxWidth: 520 }}>
            Permission governance and platform configuration for enterprise observability.
            Use the persona toggle at the bottom to switch perspectives.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 64, position: 'relative', zIndex: 1 }}>
          {appSections.map((section, si) => (
            <div
              key={section.title}
              onMouseEnter={() => setHoveredCard(si)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{
                background: 'var(--dt-bg-surface)',
                border: `1px solid ${hoveredCard === si ? 'rgba(20,150,255,0.35)' : 'var(--dt-border-subtle)'}`,
                borderRadius: 'var(--dt-radius-xl)', overflow: 'hidden',
                animation: 'fadeInUp 500ms var(--dt-ease-out) both',
                animationDelay: `${si * 100 + 200}ms`,
                transform: hoveredCard === si ? 'translateY(-3px)' : 'none',
                boxShadow: hoveredCard === si ? '0 8px 32px rgba(20,150,255,0.1), 0 2px 8px rgba(0,0,0,0.3)' : 'none',
                transition: 'transform 200ms ease, box-shadow 200ms ease, border-color 200ms ease',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '20px 20px 14px' }}>
                <span style={{ color: 'var(--dt-accent)' }}>{sectionIcons[section.title]}</span>
                <h3 style={{ fontSize: 15, fontWeight: 600, fontFamily: 'var(--dt-font-display)', color: 'var(--dt-text-primary)', margin: 0 }}>{section.title}</h3>
              </div>
              <div style={{ height: 1, background: 'var(--dt-border-subtle)', margin: '0 20px' }} />
              <div style={{ padding: '6px 0' }}>
                {section.items.map((item) => (
                  <NavLink key={item.path} to={item.path} style={{
                    display: 'flex', alignItems: 'center', gap: 8,
                    padding: '8px 20px', textDecoration: 'none',
                    color: 'var(--dt-text-secondary)', fontSize: 13,
                    transition: 'all var(--dt-duration-fast) var(--dt-ease)',
                  }}>
                    <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--dt-border-strong)', flexShrink: 0 }} />
                    <span style={{ flex: 1 }}>{item.label}</span>
                    <span style={{ opacity: 0.3, fontSize: 12, fontFamily: 'var(--dt-font-mono)' }}>→</span>
                  </NavLink>
                ))}
              </div>
            </div>
          ))}
        </div>

        <p style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 12, color: 'var(--dt-text-faint)', fontFamily: 'var(--dt-font-mono)', justifyContent: 'center', position: 'relative', zIndex: 1 }}>
          <span style={{ display: 'inline-block', width: 40, height: 1, background: 'var(--dt-border-subtle)' }} />
          Designed by Nilson Gaspar · Lead Product Designer · 2025–2026
          <span style={{ display: 'inline-block', width: 40, height: 1, background: 'var(--dt-border-subtle)' }} />
        </p>
      </div>
    </div>
  )
}
