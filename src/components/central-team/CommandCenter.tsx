import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { AccountNav } from './AccountNav'
import { StatusBadge } from '../shared/StatusBadge'
import { environments as baseEnvironments } from '../../data/mock-data'
import { useApp } from '../../context/AppContext'
import type { Environment, Space } from '../../data/mock-data'

export function CommandCenter() {
  const [expanded, setExpanded] = useState<Set<string>>(new Set(['lg2324ef']))
  const [filters, setFilters] = useState<Record<string, 'my' | 'all'>>({})
  const navigate = useNavigate()
  const { state: appState } = useApp()

  // Merge created spaces into environments — created spaces go into Production
  const environments = useMemo(() => {
    return baseEnvironments.map((env) => {
      if (env.id === 'lg2324ef') {
        return { ...env, spaces: [...appState.createdSpaces, ...env.spaces] }
      }
      return env
    })
  }, [appState.createdSpaces])

  // Show empty state for environments with no spaces
  const hasAnySpaces = environments.some((e) => e.spaces.length > 0)

  const toggle = (id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const totalSpaces = environments.reduce((s, e) => s + e.spaces.length, 0)
  const totalMembers = environments.reduce((s, e) => s + e.totalMembers, 0)
  const totalEntities = environments.reduce((s, e) => s + e.totalEntities, 0)

  return (
    <div style={{ background: 'var(--dt-bg-base)', minHeight: '100%', display: 'flex', flexDirection: 'column' }}>
      <AccountNav />

      {/* Breadcrumb */}
      <div style={styles.breadcrumb}>
        <svg width="16" height="16" fill="none" stroke="#9ca3af" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
        <span style={{ color: 'var(--dt-accent-hover)', cursor: 'pointer' }}>Dynatrace</span>
        <span style={{ color: 'var(--dt-text-faint)' }}>›</span>
        <span style={{ color: 'var(--dt-text-secondary)' }}>Environments & Spaces</span>
      </div>

      <main style={{ padding: '0 40px 80px', width: '100%' }}>
        {/* Header */}
        <div style={{ marginBottom: 32 }}>
          <h1 style={{ fontSize: 28, fontWeight: 600, color: 'var(--dt-text-primary)', marginBottom: 8 }}>Environments & Spaces</h1>
          <p style={{ fontSize: 15, color: 'var(--dt-text-muted)', maxWidth: 700, lineHeight: 1.5 }}>
            Manage your environments and organize observability data with Spaces. View all Spaces across environments, manage access, and monitor usage.
          </p>
        </div>

        {/* Stats */}
        <div style={styles.stats}>
          <Stat value="3" label="Environments" color="#22c55e" />
          <div style={styles.divider} />
          <Stat value={String(totalSpaces)} label="Total Spaces" color="#3b82f6" />
          <div style={styles.divider} />
          <Stat value={totalMembers.toLocaleString()} label="Total Members" color="#6366f1" />
          <div style={styles.divider} />
          <Stat value={`${(totalEntities / 1000).toFixed(1)}K`} label="Entities Scoped" color="#f59e0b" />
        </div>

        {/* Search bar */}
        <div style={styles.searchBar}>
          <div style={styles.searchBox}>
            <svg width="16" height="16" fill="none" stroke="#6b7280" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            <input style={styles.searchInput} placeholder="Search across all environments and spaces..." />
          </div>
          <button style={styles.exportBtn}>
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
            Export
          </button>
        </div>

        {/* Empty state — no spaces yet */}
        {!hasAnySpaces && (
          <div style={{
            padding: '64px 40px', textAlign: 'center',
            background: 'var(--dt-bg-surface, #12151a)', border: '1px dashed var(--dt-border-default, rgba(255,255,255,0.09))',
            borderRadius: 16, marginBottom: 24,
            animation: 'fadeInUp 500ms var(--dt-ease-out, ease) both',
          }}>
            <div style={{ width: 64, height: 64, borderRadius: 16, background: 'var(--dt-accent-subtle, rgba(20,150,255,0.1))', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
              <svg width="28" height="28" fill="none" stroke="var(--dt-accent, #1496ff)" strokeWidth="2" viewBox="0 0 24 24">
                <rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" />
                <rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" />
              </svg>
            </div>
            <h3 style={{ fontSize: 20, fontWeight: 600, color: 'var(--dt-text-primary)', marginBottom: 8, fontFamily: 'var(--dt-font-display, inherit)' }}>No Spaces yet</h3>
            <p style={{ fontSize: 14, color: '#6b7585', maxWidth: 440, margin: '0 auto 24px', lineHeight: 1.6 }}>
              Create your first Space to organize your environment by team, project, or service.
              Spaces let you delegate administration while keeping platform-level guardrails intact.
            </p>
            <button onClick={() => navigate('/central-team/create')} style={{
              padding: '12px 28px', borderRadius: 8, fontSize: 14, fontWeight: 600,
              background: 'var(--dt-accent, #1496ff)', border: 'none', color: '#fff',
              cursor: 'pointer', fontFamily: 'var(--dt-font-body, inherit)',
            }}>
              + Create your first Space
            </button>
          </div>
        )}

        {/* Environment cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {environments.map((env) => (
            <EnvironmentCard
              key={env.id}
              env={env}
              isExpanded={expanded.has(env.id)}
              filter={filters[env.id] || 'my'}
              onToggle={() => toggle(env.id)}
              onFilterChange={(f) => setFilters((prev) => ({ ...prev, [env.id]: f }))}
              onCreateSpace={() => navigate('/central-team/create')}
            />
          ))}
        </div>

        {/* Demo controls */}
        <div style={{ position: 'fixed', bottom: 24, right: 24, display: 'flex', gap: 8, zIndex: 100 }}>
          <span style={{ fontSize: 11, color: 'var(--dt-text-faint)', alignSelf: 'center', marginRight: 4 }}>Demo:</span>
          <button style={styles.demoBtn} onClick={() => setExpanded(new Set())}>Collapse All</button>
          <button style={styles.demoBtn} onClick={() => setExpanded(new Set(environments.map((e) => e.id)))}>Expand All</button>
        </div>
      </main>
    </div>
  )
}

function Stat({ value, label, color }: { value: string; label: string; color: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <div style={{ width: 40, height: 40, borderRadius: 10, background: `${color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg width="20" height="20" fill="none" stroke={color} viewBox="0 0 24 24" strokeWidth="2">
          <rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" />
          <rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" />
        </svg>
      </div>
      <div>
        <div style={{ fontSize: 22, fontWeight: 600, color: 'var(--dt-text-primary)' }}>{value}</div>
        <div style={{ fontSize: 12, color: 'var(--dt-text-faint)' }}>{label}</div>
      </div>
    </div>
  )
}

interface EnvCardProps {
  env: Environment
  isExpanded: boolean
  filter: 'my' | 'all'
  onToggle: () => void
  onFilterChange: (f: 'my' | 'all') => void
  onCreateSpace: () => void
}

function EnvironmentCard({ env, isExpanded, filter, onToggle, onFilterChange, onCreateSpace }: EnvCardProps) {
  const envColors: Record<string, string> = { production: 'var(--dt-success)', staging: 'var(--dt-warning)', development: '#1496ff' }
  const color = envColors[env.type] || 'var(--dt-accent)'

  return (
    <div style={{ ...styles.card, borderColor: isExpanded ? color : 'var(--dt-border-default)' }}>
      {/* Header */}
      <div style={styles.cardHeader} onClick={onToggle}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flex: 1 }}>
          <svg width="14" height="14" fill="none" stroke="#9ca3af" viewBox="0 0 24 24"
            style={{ transform: isExpanded ? 'rotate(90deg)' : 'none', transition: 'transform 200ms' }}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 16, fontWeight: 600, color: 'var(--dt-text-primary)' }}>{env.name}</span>
              <StatusBadge variant={env.status === 'running' ? 'success' : 'error'} dot>{env.status === 'running' ? 'Running' : 'Stopped'}</StatusBadge>
            </div>
            <div style={{ fontSize: 12, color: 'var(--dt-text-faint)', marginTop: 2 }}>
              <span style={{ color: 'var(--dt-accent-hover)', cursor: 'pointer' }}>{env.id}</span> &middot; Platform enabled
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
          <div style={{ display: 'flex', gap: 24 }}>
            <EnvStat value={String(env.spaces.length)} label="Spaces" />
            <EnvStat value={env.totalMembers.toLocaleString()} label="Members" />
            <EnvStat value={env.totalEntities >= 1000 ? `${(env.totalEntities / 1000).toFixed(1)}K` : String(env.totalEntities)} label="Entities" />
          </div>
          <div style={{ display: 'flex', gap: 8 }} onClick={(e) => e.stopPropagation()}>
            <button style={styles.newSpaceBtn} onClick={onCreateSpace}>+ New Space</button>
            <button style={styles.settingsBtn}>
              <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3" strokeWidth="2" /><path strokeLinecap="round" strokeWidth="2" d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06" /></svg>
              Settings
            </button>
          </div>
        </div>
      </div>

      {/* Spaces table */}
      {isExpanded && (
        <div style={{ padding: '0 20px 20px' }}>
          {/* Toolbar */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', marginBottom: 8 }}>
            <div style={styles.spacesSearch}>
              <svg width="14" height="14" fill="none" stroke="#6b7280" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              <input style={{ background: 'none', border: 'none', color: 'var(--dt-text-secondary)', fontSize: 13, outline: 'none', flex: 1 }} placeholder={`Search spaces in ${env.name}...`} />
            </div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <div style={styles.toggleFilter}>
                {(['my', 'all'] as const).map((f) => (
                  <button key={f} onClick={() => onFilterChange(f)} style={{
                    ...styles.toggleBtn,
                    background: filter === f ? 'var(--dt-accent)' : 'transparent',
                    color: filter === f ? '#fff' : 'var(--dt-text-muted)',
                  }}>
                    {f === 'my' ? 'My Spaces' : 'All Spaces'}
                  </button>
                ))}
              </div>
              <span style={{ fontSize: 12, color: 'var(--dt-text-faint)', cursor: 'pointer' }}>Sort: Recent ▾</span>
            </div>
          </div>

          {/* Table */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr minmax(80px, 120px) minmax(80px, 120px) minmax(100px, 160px) 80px', gap: 0 }}>
            {/* Header */}
            {['SPACE', 'MEMBERS', 'ENTITIES', 'LAST MODIFIED', ''].map((h) => (
              <div key={h} style={{ padding: '8px 12px', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5, color: 'var(--dt-text-faint)', borderBottom: '1px solid #2a2a4a' }}>{h}</div>
            ))}
            {/* Rows */}
            {env.spaces.map((sp) => (
              <SpaceRow key={sp.id} space={sp} />
            ))}
          </div>

          {env.spaces.length > 5 && (
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 16, fontSize: 12, color: 'var(--dt-text-faint)' }}>
              <span>Showing 1–{env.spaces.length} of {env.spaces.length} spaces</span>
              <div style={{ display: 'flex', gap: 4 }}>
                {[1, 2, 3].map((p) => (
                  <span key={p} style={{ ...styles.pageBtn, ...(p === 1 ? { background: 'var(--dt-accent)', color: '#fff' } : {}) }}>{p}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function EnvStat({ value, label }: { value: string; label: string }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ fontSize: 18, fontWeight: 600, color: 'var(--dt-text-primary)' }}>{value}</div>
      <div style={{ fontSize: 11, color: 'var(--dt-text-faint)' }}>{label}</div>
    </div>
  )
}

function SpaceRow({ space }: { space: Space }) {
  return (
    <>
      <div style={{ padding: '14px 12px', borderBottom: '1px solid rgba(42,42,74,0.5)' }}>
        <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--dt-text-primary)' }}>{space.name}</div>
        <div style={{ fontSize: 11, color: 'var(--dt-text-faint)', fontFamily: "'SF Mono', monospace" }}>{space.slug}</div>
      </div>
      <div style={{ ...cellStyle }}>{space.members}</div>
      <div style={{ ...cellStyle }}>{space.entities.toLocaleString()}</div>
      <div style={{ ...cellStyle }}>{space.lastModified}</div>
      <div style={{ ...cellStyle, display: 'flex', gap: 4 }}>
        <button style={styles.actionIcon} title="Edit">
          <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
        </button>
        <button style={styles.actionIcon} title="More">
          <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" /></svg>
        </button>
      </div>
    </>
  )
}

const cellStyle: React.CSSProperties = {
  padding: '14px 12px', fontSize: 13, color: 'var(--dt-text-muted)',
  borderBottom: '1px solid rgba(42,42,74,0.5)', display: 'flex', alignItems: 'center',
}

const styles: Record<string, React.CSSProperties> = {
  breadcrumb: {
    display: 'flex', alignItems: 'center', gap: 8,
    padding: '12px 24px', background: 'var(--dt-bg-raised)',
    borderBottom: '1px solid #2a2a4a', fontSize: 13,
  },
  stats: {
    display: 'flex', alignItems: 'center', gap: 32,
    padding: '24px 32px', background: 'var(--dt-bg-surface)',
    border: '1px solid #2a2a4a', borderRadius: 12, marginBottom: 24,
  },
  divider: { width: 1, height: 40, background: 'var(--dt-border-default)' },
  searchBar: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    marginBottom: 24, gap: 16,
  },
  searchBox: {
    display: 'flex', alignItems: 'center', gap: 10,
    padding: '10px 16px', background: 'var(--dt-bg-raised)',
    border: '1px solid #2a2a4a', borderRadius: 8, flex: 1, maxWidth: 500,
  },
  searchInput: {
    background: 'none', border: 'none', color: 'var(--dt-text-secondary)',
    fontSize: 13, outline: 'none', flex: 1, fontFamily: 'inherit',
  },
  exportBtn: {
    display: 'inline-flex', alignItems: 'center', gap: 8,
    padding: '8px 16px', borderRadius: 6, fontSize: 13, fontWeight: 500,
    background: 'var(--dt-bg-overlay)', border: '1px solid #3a3a5a', color: 'var(--dt-text-secondary)',
    cursor: 'pointer', fontFamily: 'inherit',
  },
  card: {
    background: 'var(--dt-bg-surface)', border: '1px solid #2a2a4a',
    borderRadius: 12, overflow: 'hidden', transition: 'border-color 200ms',
  },
  cardHeader: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '16px 20px', cursor: 'pointer', transition: 'background 150ms',
  },
  newSpaceBtn: {
    padding: '6px 16px', borderRadius: 6, fontSize: 12, fontWeight: 500,
    background: 'var(--dt-accent)', border: 'none', color: '#fff', cursor: 'pointer',
    fontFamily: 'inherit',
  },
  settingsBtn: {
    display: 'inline-flex', alignItems: 'center', gap: 6,
    padding: '6px 14px', borderRadius: 6, fontSize: 12, fontWeight: 500,
    background: 'var(--dt-bg-overlay)', border: '1px solid #3a3a5a', color: 'var(--dt-text-secondary)',
    cursor: 'pointer', fontFamily: 'inherit',
  },
  spacesSearch: {
    display: 'flex', alignItems: 'center', gap: 8,
    padding: '8px 14px', background: 'var(--dt-bg-raised)',
    border: '1px solid #2a2a4a', borderRadius: 6, width: 280,
  },
  toggleFilter: {
    display: 'flex', background: 'var(--dt-bg-overlay)', borderRadius: 6, overflow: 'hidden',
  },
  toggleBtn: {
    padding: '6px 14px', fontSize: 12, fontWeight: 500,
    border: 'none', cursor: 'pointer', fontFamily: 'inherit',
    transition: 'all 150ms',
  },
  actionIcon: {
    width: 28, height: 28, borderRadius: 4, border: 'none',
    background: 'transparent', color: 'var(--dt-text-faint)', cursor: 'pointer',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  },
  pageBtn: {
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    width: 28, height: 28, borderRadius: 6, cursor: 'pointer',
    background: 'var(--dt-bg-overlay)', color: 'var(--dt-text-muted)', fontSize: 12, fontWeight: 500,
  },
  demoBtn: {
    padding: '6px 14px', fontSize: 11, fontWeight: 500,
    background: 'var(--dt-bg-surface)', border: '1px solid #3a3a5a',
    borderRadius: 6, color: 'var(--dt-text-secondary)', cursor: 'pointer', fontFamily: 'inherit',
  },
}
