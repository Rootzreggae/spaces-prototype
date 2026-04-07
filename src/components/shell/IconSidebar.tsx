import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useApp } from '../../context/AppContext'

interface SidebarItem {
  id: string
  path: string
  label: string
  icon: React.ReactNode
  separator?: boolean
  personas?: Array<'central-team' | 'space-admin' | 'practitioner'>
  badge?: number
}

const items: SidebarItem[] = [
  { id: 'home', path: '/', label: 'Home', icon: <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /> },
  { id: 'spaces', path: '/spaces', label: 'Spaces', icon: <><circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" /></> },
  { id: 'search', path: '/search', label: 'Search', icon: <><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /></> },
  { id: 'apps', path: '/apps', label: 'Apps', icon: <><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /></> },
  { id: 'sep1', path: '', label: '', separator: true, icon: null },
  { id: 'dashboards', path: '/dashboards', label: 'Dashboards', icon: <><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18" /><path d="M9 21V9" /></> },
  { id: 'notebooks', path: '/notebooks', label: 'Notebooks', icon: <><path d="M4 19.5A2.5 2.5 0 016.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" /></>, personas: ['central-team', 'space-admin'] },
  { id: 'problems', path: '/problems', label: 'Problems', icon: <><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></>, badge: 2 },
  { id: 'releases', path: '/releases', label: 'Releases', icon: <><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></>, personas: ['central-team', 'space-admin'] },
  { id: 'workflows', path: '/workflows', label: 'Workflows', icon: <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />, personas: ['central-team', 'space-admin'] },
  { id: 'sep2', path: '', label: '', separator: true, icon: null },
  { id: 'settings', path: '/settings', label: 'Settings', icon: <><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" /></> },
]

export function IconSidebar() {
  const location = useLocation()
  const navigate = useNavigate()
  const { state } = useApp()
  const [expanded, setExpanded] = useState(false)
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const persona = state.persona
  const width = expanded ? 200 : 48

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/'
    return location.pathname.startsWith(path)
  }

  const visibleItems = items.filter((item) => {
    if (item.separator) return true
    if (!item.personas) return true
    return item.personas.includes(persona)
  })

  return (
    <aside style={{ ...styles.sidebar, width, minWidth: width }}>
      <div style={styles.top}>
        {visibleItems.map((item) => {
          if (item.separator) return <div key={item.id} style={styles.separator} />
          const active = isActive(item.path)
          return (
            <div key={item.id} style={styles.itemWrapper}>
              {active && <div style={styles.activeIndicator} />}
              <button
                onClick={() => item.path && navigate(item.path)}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
                style={{
                  ...styles.iconBtn,
                  ...(active ? styles.iconBtnActive : {}),
                  ...(!active && hoveredItem === item.id ? { background: 'rgba(20,150,255,0.08)', color: 'var(--dt-text-primary)', boxShadow: 'inset 0 0 0 1px rgba(20,150,255,0.15)' } : {}),
                  width: expanded ? 'calc(100% - 12px)' : 36,
                  justifyContent: expanded ? 'flex-start' : 'center',
                  paddingLeft: expanded ? 12 : 0,
                  gap: expanded ? 10 : 0,
                }}
                title={expanded ? undefined : item.label}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                  {item.icon}
                </svg>
                {expanded && (
                  <span style={{ fontSize: 13, fontWeight: 400, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {item.label}
                  </span>
                )}
                {item.badge && (
                  <span style={{ ...styles.badge, ...(expanded ? { position: 'static', marginLeft: 'auto' } : {}) }}>{item.badge}</span>
                )}
              </button>
            </div>
          )
        })}
      </div>

      <div style={styles.bottom}>
        <button
          onClick={() => setExpanded(!expanded)}
          style={{ ...styles.iconBtn, width: expanded ? 'calc(100% - 12px)' : 36, justifyContent: expanded ? 'flex-start' : 'center', paddingLeft: expanded ? 12 : 0, gap: expanded ? 10 : 0 }}
          title={expanded ? 'Collapse' : 'Expand'}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, transform: expanded ? 'none' : 'rotate(180deg)', transition: 'transform var(--dt-duration-base) var(--dt-ease)' }}>
            <polyline points="11 17 6 12 11 7" /><polyline points="18 17 13 12 18 7" />
          </svg>
          {expanded && <span style={{ fontSize: 13 }}>Collapse</span>}
        </button>
        <button style={{ ...styles.iconBtn, width: expanded ? 'calc(100% - 12px)' : 36, justifyContent: expanded ? 'flex-start' : 'center', paddingLeft: expanded ? 12 : 0, gap: expanded ? 10 : 0 }} title="User">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" />
          </svg>
          {expanded && <span style={{ fontSize: 13 }}>Nilson Gaspar</span>}
        </button>
      </div>
    </aside>
  )
}

const styles: Record<string, React.CSSProperties> = {
  sidebar: {
    height: '100vh',
    background: 'var(--dt-bg-void)',
    borderRight: '1px solid var(--dt-border-subtle)',
    display: 'flex', flexDirection: 'column',
    alignItems: 'center', padding: '8px 0',
    zIndex: 50,
    transition: 'width var(--dt-duration-base) var(--dt-ease), min-width var(--dt-duration-base) var(--dt-ease)',
    overflow: 'hidden',
  },
  top: {
    flex: 1, display: 'flex', flexDirection: 'column',
    alignItems: 'center', gap: 2, width: '100%',
  },
  bottom: {
    display: 'flex', flexDirection: 'column',
    alignItems: 'center', gap: 2, padding: '8px 0',
    borderTop: '1px solid var(--dt-border-subtle)',
    width: '100%',
  },
  itemWrapper: {
    position: 'relative', width: '100%',
    display: 'flex', justifyContent: 'center',
  },
  activeIndicator: {
    position: 'absolute', left: 0, top: 6, bottom: 6,
    width: 3, borderRadius: '0 3px 3px 0',
    background: 'var(--dt-accent)',
    boxShadow: '0 0 8px var(--dt-accent), 0 0 16px rgba(20,150,255,0.3)',
  },
  iconBtn: {
    height: 36, borderRadius: 8,
    border: 'none', background: 'transparent',
    color: 'var(--dt-text-muted)', cursor: 'pointer',
    display: 'flex', alignItems: 'center',
    transition: 'all var(--dt-duration-fast) var(--dt-ease)',
    position: 'relative', fontFamily: 'var(--dt-font-body)',
  },
  iconBtnActive: {
    color: 'var(--dt-accent)',
    background: 'var(--dt-accent-subtle)',
  },
  separator: {
    width: '60%', height: 1,
    background: 'var(--dt-border-subtle)',
    margin: '4px 0',
  },
  badge: {
    position: 'absolute', top: 2, right: 2,
    minWidth: 16, height: 16, borderRadius: 8,
    padding: '0 4px',
    background: 'var(--dt-error)',
    color: '#fff', fontSize: 9, fontWeight: 700,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    lineHeight: 1,
  },
}
