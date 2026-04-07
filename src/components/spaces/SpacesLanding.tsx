import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import { practitionerSpaces, spaceSegments } from '../../data/mock-data'
import type { PractitionerSpace, Segment } from '../../data/mock-data'

export function SpacesLanding() {
  const { state, hasSpaces } = useApp()
  const navigate = useNavigate()

  if (state.persona === 'central-team') {
    return <CentralTeamView hasSpaces={hasSpaces} onNavigate={navigate} />
  }

  if (state.persona === 'space-admin') {
    return <SpaceAdminView />
  }

  return <PractitionerView hasSpaces={hasSpaces} />
}

// ── Central Team ──────────────────────────────────────────────

function CentralTeamView({ hasSpaces, onNavigate }: { hasSpaces: boolean; onNavigate: (p: string) => void }) {
  return (
    <div style={styles.page}>
      <AppHeader />
      <div style={styles.content}>
        <h1 style={styles.title}>Spaces</h1>
        <p style={styles.subtitle}>Create and manage Spaces to delegate administration to your teams.</p>

        <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
          <button onClick={() => onNavigate('/spaces/create')} style={styles.primaryBtn}>+ Create Space</button>
          {hasSpaces && <button onClick={() => onNavigate('/spaces/manage')} style={styles.secondaryBtn}>Manage Environments & Spaces</button>}
        </div>

        {!hasSpaces && <EmptyState message="No Spaces created yet" detail="Create your first Space to organize your environment by team, project, or service." />}
      </div>
    </div>
  )
}

// ── Space Admin ───────────────────────────────────────────────

function SpaceAdminView() {
  const { state: appState, dispatch } = useApp()
  const scope = appState.scope
  const selectedSpace = appState.activeSpace || practitionerSpaces[0]
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const setScope = (s: 'environment' | 'space') => dispatch({ type: 'SET_SCOPE', payload: s })
  const setSelectedSpace = (sp: PractitionerSpace) => dispatch({ type: 'SET_ACTIVE_SPACE', payload: sp })

  return (
    <div style={styles.page}>
      <AppHeader />
      <div style={styles.content}>
        <h1 style={styles.title}>Spaces</h1>
        <p style={styles.subtitle}>Manage your assigned Spaces. Switch context to configure monitoring, alerts, and team settings.</p>

        {/* Scope tabs — Environment vs Space */}
        <div style={{ display: 'flex', gap: 4, background: 'var(--dt-bg-raised)', padding: 3, borderRadius: 8, width: 'fit-content', marginTop: 24 }}>
          <button onClick={() => setScope('environment')} style={{ ...styles.scopeTab, ...(scope === 'environment' ? styles.scopeTabActive : {}) }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M2 12h20" /></svg>
            Environment
          </button>
          <button onClick={() => setScope('space')} style={{ ...styles.scopeTab, ...(scope === 'space' ? styles.scopeTabActive : {}) }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></svg>
            Space
          </button>
        </div>

        {scope === 'environment' && (
          <div style={{ marginTop: 24, animation: 'fadeIn 200ms var(--dt-ease-out) both' }}>
            <div style={styles.infoCard}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--dt-accent)" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M12 16v-4M12 8h.01" /></svg>
              <span style={{ fontSize: 13, color: 'var(--dt-text-secondary)', lineHeight: 1.5 }}>
                Environment view — you see all resources and all Spaces. Settings at this level apply as defaults unless overridden at Space level.
              </span>
            </div>

            {/* Stats */}
            <div style={{ marginTop: 24, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
              {[{ n: '156', l: 'Hosts' }, { n: '89', l: 'Services' }, { n: '3', l: 'K8s clusters' }, { n: '47', l: 'Total Spaces' }].map((s) => (
                <div key={s.l} style={styles.statCard}>
                  <div style={{ fontSize: 24, fontWeight: 600, color: 'var(--dt-text-primary)' }}>{s.n}</div>
                  <div style={{ fontSize: 11, color: 'var(--dt-text-faint)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{s.l}</div>
                </div>
              ))}
            </div>

            {/* Your Spaces overview */}
            <div style={{ marginTop: 32 }}>
              <h3 style={{ fontSize: 14, fontWeight: 600, color: 'var(--dt-text-primary)', marginBottom: 16, fontFamily: 'var(--dt-font-display)' }}>Your Spaces</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
                {practitionerSpaces.map((sp) => (
                  <button key={sp.name} onClick={() => { setSelectedSpace(sp); setScope('space') }} style={{ ...styles.miniSpaceCard, borderLeft: `3px solid ${sp.color}` }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                      <span style={{ width: 8, height: 8, borderRadius: '50%', background: sp.color }} />
                      <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--dt-text-primary)' }}>{sp.name}</span>
                    </div>
                    <div style={{ fontSize: 11, color: 'var(--dt-text-faint)', textTransform: 'uppercase' }}>{sp.environment}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Recent activity across env */}
            <div style={{ marginTop: 32 }}>
              <h3 style={{ fontSize: 14, fontWeight: 600, color: 'var(--dt-text-primary)', marginBottom: 16, fontFamily: 'var(--dt-font-display)' }}>Recent Activity</h3>
              {envActivity.map((a, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0', borderBottom: i < envActivity.length - 1 ? '1px solid var(--dt-border-subtle)' : 'none' }}>
                  <span style={{ fontSize: 11, fontWeight: 600, padding: '2px 8px', borderRadius: 4, background: a.bg, color: a.color }}>{a.action}</span>
                  <span style={{ flex: 1, fontSize: 13, color: 'var(--dt-text-secondary)' }}>{a.object}</span>
                  <span style={{ fontSize: 11, color: 'var(--dt-text-faint)', padding: '2px 6px', background: 'var(--dt-bg-raised)', borderRadius: 4 }}>{a.space}</span>
                  <span style={{ fontSize: 12, color: 'var(--dt-text-faint)', whiteSpace: 'nowrap' }}>{a.time}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {scope === 'space' && (
          <div style={{ marginTop: 24, animation: 'fadeIn 200ms var(--dt-ease-out) both' }}>
            {/* Space switcher */}
            <div style={{ position: 'relative', maxWidth: 400, marginBottom: 32 }}>
              <label style={{ fontSize: 11, fontWeight: 600, color: 'var(--dt-text-faint)', textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: 'var(--dt-font-mono)', display: 'block', marginBottom: 8 }}>
                Active Space
              </label>
              <button onClick={() => setDropdownOpen(!dropdownOpen)} style={styles.switcherTrigger}>
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: selectedSpace.color, boxShadow: `0 0 8px ${selectedSpace.color}40` }} />
                <div style={{ flex: 1, textAlign: 'left' }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--dt-text-primary)' }}>{selectedSpace.name}</div>
                  <div style={{ fontSize: 11, color: 'var(--dt-text-faint)', textTransform: 'uppercase' }}>{selectedSpace.environment}</div>
                </div>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--dt-text-muted)" strokeWidth="2"
                  style={{ transform: dropdownOpen ? 'rotate(180deg)' : 'none', transition: 'transform 200ms' }}>
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>

              {dropdownOpen && (
                <div style={styles.dropdown}>
                  <div style={{ padding: '10px 14px', borderBottom: '1px solid var(--dt-border-subtle)' }}>
                    <input placeholder="Search spaces..." style={styles.searchInput} />
                  </div>
                  <div style={{ padding: 4 }}>
                    <div style={{ padding: '6px 10px', fontSize: 10, fontWeight: 600, color: 'var(--dt-text-faint)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Your Spaces</div>
                    {practitionerSpaces.map((space) => (
                      <button
                        key={space.name}
                        onClick={() => { setSelectedSpace(space); setDropdownOpen(false) }}
                        style={{
                          ...styles.dropdownItem,
                          background: space.name === selectedSpace.name ? 'var(--dt-accent-subtle)' : 'transparent',
                          color: space.name === selectedSpace.name ? 'var(--dt-accent)' : 'var(--dt-text-secondary)',
                        }}
                      >
                        <span style={{ width: 8, height: 8, borderRadius: '50%', background: space.color, flexShrink: 0 }} />
                        <span style={{ flex: 1, fontWeight: 500, textAlign: 'left' }}>{space.name}</span>
                        <span style={{ fontSize: 10, color: 'var(--dt-text-faint)', textTransform: 'uppercase' }}>{space.environment}</span>
                        {space.name === selectedSpace.name && (
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--dt-accent)" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Space context — stats + activity */}
            <div style={{ ...styles.spaceCard, borderLeft: `3px solid ${selectedSpace.color}` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                <span style={{ width: 12, height: 12, borderRadius: '50%', background: selectedSpace.color, boxShadow: `0 0 10px ${selectedSpace.color}50` }} />
                <span style={{ fontSize: 18, fontWeight: 600, color: 'var(--dt-text-primary)', fontFamily: 'var(--dt-font-display)' }}>{selectedSpace.name}</span>
                <span style={{ fontSize: 11, color: 'var(--dt-text-faint)', textTransform: 'uppercase', letterSpacing: '0.05em', marginLeft: 'auto', fontFamily: 'var(--dt-font-mono)' }}>{selectedSpace.environment}</span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 20 }}>
                {[{ n: '12', l: 'Services' }, { n: '8', l: 'Dashboards' }, { n: '5', l: 'Notebooks' }, { n: '24', l: 'Hosts' }].map((s) => (
                  <div key={s.l} style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: 22, fontWeight: 600, color: 'var(--dt-text-primary)' }}>{s.n}</div>
                    <div style={{ fontSize: 11, color: 'var(--dt-text-faint)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{s.l}</div>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', gap: 8, borderTop: '1px solid var(--dt-border-subtle)', paddingTop: 16 }}>
                <button style={styles.cardBtn}>View Dashboards</button>
                <button style={styles.cardBtn}>Settings</button>
                <button style={styles.cardBtn}>Problems</button>
                <button style={styles.cardBtn}>Members</button>
              </div>
            </div>

            {/* Scope info banner */}
            <div style={{ ...styles.infoCard, marginTop: 20 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--dt-accent)" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
              <span style={{ fontSize: 13, color: 'var(--dt-text-secondary)', lineHeight: 1.5 }}>
                Scoped to <strong style={{ color: 'var(--dt-text-primary)' }}>{selectedSpace.name}</strong> — Dashboards, Problems, and Settings will only show resources belonging to this Space. You have admin permissions.
              </span>
            </div>

            {/* Segment selector */}
            <SegmentSelector spaceName={selectedSpace.name} />

            {/* Space activity */}
            <div style={{ marginTop: 32 }}>
              <h3 style={{ fontSize: 14, fontWeight: 600, color: 'var(--dt-text-primary)', marginBottom: 16, fontFamily: 'var(--dt-font-display)' }}>Space Activity</h3>
              {spaceActivity.map((a, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0', borderBottom: i < spaceActivity.length - 1 ? '1px solid var(--dt-border-subtle)' : 'none' }}>
                  <span style={{ fontSize: 11, fontWeight: 600, padding: '2px 8px', borderRadius: 4, background: a.bg, color: a.color }}>{a.action}</span>
                  <span style={{ flex: 1, fontSize: 13, color: 'var(--dt-text-secondary)' }}>{a.object}</span>
                  <span style={{ fontSize: 12, color: 'var(--dt-text-faint)', whiteSpace: 'nowrap' }}>{a.time}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// ── Practitioner ──────────────────────────────────────────────

function PractitionerView({ hasSpaces }: { hasSpaces: boolean }) {
  return (
    <div style={styles.page}>
      <AppHeader />
      <div style={styles.content}>
        <h1 style={styles.title}>Spaces</h1>
        <p style={styles.subtitle}>Spaces organize your team's services, dashboards, and workflows into focused environments.</p>

        {!hasSpaces ? (
          <EmptyState message="No Spaces available yet" detail="Your administrator hasn't set up Spaces for your account yet. In the meantime, you can access all environment resources from the sidebar. When Spaces become available, they'll appear here." />
        ) : (
          <div style={{ marginTop: 32 }}>
            <div style={{ ...styles.spaceCard, borderLeft: `3px solid ${practitionerSpaces[0].color}` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: practitionerSpaces[0].color }} />
                <span style={{ fontSize: 18, fontWeight: 600, color: 'var(--dt-text-primary)' }}>{practitionerSpaces[0].name}</span>
              </div>
              <p style={{ fontSize: 14, color: 'var(--dt-text-muted)', lineHeight: 1.6, marginBottom: 16 }}>
                Your team's monitoring scope. Everything you see in Dashboards, Problems, and Settings is scoped to this Space.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
                {[{ n: '12', l: 'Services' }, { n: '8', l: 'Dashboards' }, { n: '5', l: 'Notebooks' }, { n: '24', l: 'Hosts' }].map((s) => (
                  <div key={s.l} style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: 22, fontWeight: 600, color: 'var(--dt-text-primary)' }}>{s.n}</div>
                    <div style={{ fontSize: 11, color: 'var(--dt-text-faint)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{s.l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Segment selector for practitioner */}
            <SegmentSelector spaceName={practitionerSpaces[0].name} />
          </div>
        )}
      </div>
    </div>
  )
}

// ── Segment Selector ──────────────────────────────────────────

function SegmentSelector({ spaceName }: { spaceName: string }) {
  const { state: appState, dispatch } = useApp()
  const segments = spaceSegments[spaceName] || []

  if (segments.length === 0) return null

  return (
    <div style={{ marginTop: 24 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--dt-text-faint)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
        </svg>
        <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--dt-text-faint)', textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: 'var(--dt-font-mono)' }}>
          Filter by segment
        </span>
        {appState.activeSegment && (
          <span style={{ fontSize: 11, color: appState.activeSegment.color, fontFamily: 'var(--dt-font-mono)', marginLeft: 'auto' }}>
            Filtering ~{appState.activeSegment.entityCount} entities
          </span>
        )}
      </div>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        {/* All data pill */}
        <button
          onClick={() => dispatch({ type: 'SET_ACTIVE_SEGMENT', payload: null })}
          style={{
            ...segPillStyle,
            background: !appState.activeSegment ? 'var(--dt-accent-subtle)' : 'var(--dt-bg-raised)',
            color: !appState.activeSegment ? 'var(--dt-accent)' : 'var(--dt-text-muted)',
            borderColor: !appState.activeSegment ? 'var(--dt-accent)' : 'var(--dt-border-default)',
          }}
        >
          All data
        </button>

        {/* Segment pills */}
        {segments.map((seg) => {
          const isActive = appState.activeSegment?.id === seg.id
          return (
            <button
              key={seg.id}
              onClick={() => dispatch({ type: 'SET_ACTIVE_SEGMENT', payload: isActive ? null : seg })}
              style={{
                ...segPillStyle,
                background: isActive ? `${seg.color}18` : 'var(--dt-bg-raised)',
                color: isActive ? seg.color : 'var(--dt-text-muted)',
                borderColor: isActive ? seg.color : 'var(--dt-border-default)',
              }}
            >
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: seg.color, flexShrink: 0 }} />
              {seg.name}
              <span style={{ fontSize: 10, opacity: 0.6, fontFamily: 'var(--dt-font-mono)' }}>{seg.entityCount}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

const segPillStyle: React.CSSProperties = {
  display: 'inline-flex', alignItems: 'center', gap: 6,
  padding: '6px 14px', fontSize: 12, fontWeight: 500,
  border: '1px solid', borderRadius: 20,
  cursor: 'pointer', fontFamily: 'var(--dt-font-body)',
  transition: 'all var(--dt-duration-fast) var(--dt-ease)',
  whiteSpace: 'nowrap',
}

// ── Shared Components ─────────────────────────────────────────

function AppHeader() {
  return (
    <div style={styles.appHeader}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--dt-text-muted)" strokeWidth="1.75">
        <circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
      </svg>
      <span style={{ fontSize: 14, fontWeight: 500 }}>Spaces</span>
      <span style={{ marginLeft: 'auto', cursor: 'pointer', color: 'var(--dt-text-faint)' }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>
      </span>
    </div>
  )
}

function EmptyState({ message, detail }: { message: string; detail: string }) {
  return (
    <div style={styles.emptyState}>
      <div style={styles.emptyIcon}>
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--dt-text-faint)" strokeWidth="1.5">
          <circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
        </svg>
      </div>
      <h3 style={{ fontSize: 18, fontWeight: 600, color: 'var(--dt-text-primary)', marginBottom: 8 }}>{message}</h3>
      <p style={{ fontSize: 14, color: 'var(--dt-text-muted)', maxWidth: 440, lineHeight: 1.6, textAlign: 'center' }}>{detail}</p>
    </div>
  )
}

// ── Data ──────────────────────────────────────────────────────

const envActivity = [
  { action: 'Created', bg: 'rgba(0,212,170,0.12)', color: 'var(--dt-success)', object: 'SLA monitoring dashboard', space: 'Payments', time: '2h ago' },
  { action: 'Modified', bg: 'rgba(20,150,255,0.12)', color: 'var(--dt-accent)', object: 'Anomaly detection rules', space: 'Infrastructure', time: '4h ago' },
  { action: 'Resolved', bg: 'rgba(99,102,241,0.12)', color: '#a5b4fc', object: 'High latency on payment-gateway', space: 'Payments', time: 'Yesterday' },
  { action: 'Triggered', bg: 'rgba(255,77,106,0.12)', color: 'var(--dt-error)', object: 'Disk space warning', space: 'Infrastructure', time: 'Yesterday' },
]

const spaceActivity = [
  { action: 'Viewed', bg: 'rgba(20,150,255,0.12)', color: 'var(--dt-accent)', object: 'Payment processing overview', time: '2h ago' },
  { action: 'Edited', bg: 'rgba(0,212,170,0.12)', color: 'var(--dt-success)', object: 'Q1 performance analysis', time: 'Yesterday' },
  { action: 'Resolved', bg: 'rgba(99,102,241,0.12)', color: '#a5b4fc', object: 'High latency on payment-gateway', time: 'Yesterday' },
  { action: 'Created', bg: 'rgba(0,212,170,0.12)', color: 'var(--dt-success)', object: 'SLA monitoring dashboard', time: '2 days ago' },
]

// ── Styles ────────────────────────────────────────────────────

const styles: Record<string, React.CSSProperties> = {
  page: { flex: 1, display: 'flex', flexDirection: 'column' },
  appHeader: {
    display: 'flex', alignItems: 'center', gap: 8,
    padding: '12px 32px', borderBottom: '1px solid var(--dt-border-subtle)',
    fontSize: 14, color: 'var(--dt-text-primary)',
  },
  content: { padding: 32, flex: 1 },
  title: { fontSize: 28, fontWeight: 600, color: 'var(--dt-text-primary)', fontFamily: 'var(--dt-font-display)', marginBottom: 8 },
  subtitle: { fontSize: 15, color: 'var(--dt-text-muted)', lineHeight: 1.6, maxWidth: 600 },
  primaryBtn: {
    padding: '10px 24px', borderRadius: 8, fontSize: 14, fontWeight: 600,
    background: 'var(--dt-accent)', border: 'none', color: '#fff',
    cursor: 'pointer', fontFamily: 'var(--dt-font-body)',
  },
  secondaryBtn: {
    padding: '10px 20px', borderRadius: 8, fontSize: 14, fontWeight: 500,
    background: 'var(--dt-bg-surface)', border: '1px solid var(--dt-border-default)',
    color: 'var(--dt-text-secondary)', cursor: 'pointer', fontFamily: 'var(--dt-font-body)',
  },
  emptyState: {
    display: 'flex', flexDirection: 'column', alignItems: 'center',
    padding: '80px 40px', marginTop: 40,
    border: '1px dashed var(--dt-border-default)', borderRadius: 16,
    animation: 'fadeInUp 400ms var(--dt-ease-out) both',
  },
  emptyIcon: {
    width: 72, height: 72, borderRadius: 16, background: 'var(--dt-bg-surface)',
    display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24,
  },
  scopeTab: {
    display: 'flex', alignItems: 'center', gap: 6,
    padding: '8px 16px', fontSize: 13, fontWeight: 500, border: 'none',
    borderRadius: 6, cursor: 'pointer', fontFamily: 'var(--dt-font-body)',
    background: 'transparent', color: 'var(--dt-text-muted)',
    transition: 'all var(--dt-duration-fast) var(--dt-ease)',
  },
  scopeTabActive: {
    background: 'var(--dt-bg-surface)', color: 'var(--dt-accent)',
    boxShadow: 'var(--dt-shadow-sm)',
  },
  switcherTrigger: {
    display: 'flex', alignItems: 'center', gap: 12, width: '100%',
    padding: '12px 16px', background: 'var(--dt-bg-surface)',
    border: '2px solid var(--dt-border-default)', borderRadius: 10,
    cursor: 'pointer', fontFamily: 'var(--dt-font-body)',
    transition: 'border-color var(--dt-duration-fast)',
  },
  dropdown: {
    position: 'absolute', top: 'calc(100% + 6px)', left: 0, right: 0,
    background: 'var(--dt-bg-overlay)', border: '1px solid var(--dt-border-default)',
    borderRadius: 10, boxShadow: 'var(--dt-shadow-lg)',
    zIndex: 100, overflow: 'hidden',
    animation: 'scaleIn 150ms var(--dt-ease-out) both',
  },
  searchInput: {
    width: '100%', padding: '8px 12px', background: 'var(--dt-bg-raised)',
    border: '1px solid var(--dt-border-default)', borderRadius: 6,
    color: 'var(--dt-text-primary)', fontSize: 13, fontFamily: 'var(--dt-font-body)',
    outline: 'none',
  },
  dropdownItem: {
    display: 'flex', alignItems: 'center', gap: 10, width: '100%',
    padding: '10px 14px', border: 'none', borderRadius: 6,
    cursor: 'pointer', fontSize: 13, fontFamily: 'var(--dt-font-body)',
    transition: 'background var(--dt-duration-fast)',
  },
  infoCard: {
    display: 'flex', alignItems: 'flex-start', gap: 12,
    padding: '16px 20px', background: 'var(--dt-accent-subtle)',
    border: '1px solid rgba(20,150,255,0.15)', borderRadius: 10,
  },
  statCard: {
    padding: 20, background: 'var(--dt-bg-surface)',
    border: '1px solid var(--dt-border-subtle)', borderRadius: 10, textAlign: 'center',
  },
  spaceCard: {
    padding: 24, background: 'var(--dt-bg-surface)',
    border: '1px solid var(--dt-border-subtle)', borderRadius: 12,
  },
  miniSpaceCard: {
    padding: 16, background: 'var(--dt-bg-surface)',
    border: '1px solid var(--dt-border-subtle)', borderRadius: 10,
    cursor: 'pointer', textAlign: 'left' as const, fontFamily: 'var(--dt-font-body)',
    transition: 'all var(--dt-duration-fast) var(--dt-ease)',
  },
  cardBtn: {
    padding: '8px 16px', borderRadius: 6, fontSize: 12, fontWeight: 500,
    background: 'var(--dt-bg-raised)', border: '1px solid var(--dt-border-default)',
    color: 'var(--dt-text-secondary)', cursor: 'pointer', fontFamily: 'var(--dt-font-body)',
    transition: 'all var(--dt-duration-fast)',
  },
}
