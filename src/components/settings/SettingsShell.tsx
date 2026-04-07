import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../../context/AppContext'

interface BreadcrumbItem {
  label: string
  path?: string
}

interface Props {
  breadcrumb?: BreadcrumbItem[]
  children: React.ReactNode
}

// ── Mega menu data (ported from v8-connected prototype) ──────

const megaDataItems = [
  { id: 'collect', name: 'Collect and Capture', desc: 'OneAgent, data sources', href: '/settings/category/collect-capture', icon: <><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><polyline points="7,10 12,15 17,10" /><line x1="12" y1="15" x2="12" y2="3" /></> },
  { id: 'process', name: 'Process and Contextualize', desc: 'OpenPipeline, processing rules', href: '/settings/category/process', icon: <path d="M22 12h-4l-3 9L9 3l-3 9H2" /> },
  { id: 'storage', name: 'Storage', desc: 'Retention, buckets', href: '/settings/category/storage', icon: <><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18" /></> },
  { id: 'segmentation', name: 'Segmentation', desc: 'Segments, access control', href: '/settings/category/segmentation', icon: <><circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" /></> },
  { id: 'analyze', name: 'Analyze and Alert', desc: 'Profiles, notifications', href: '/settings/category/analyze-alert', icon: <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" /> },
]

const megaPlatformItems = [
  { id: 'general', name: 'General', desc: 'Preferences, defaults', href: '/settings/category/general', icon: <><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4" /></> },
  { id: 'connections', name: 'Connections', desc: 'Cloud, APIs, integrations', href: '/settings/category/connections', icon: <path d="M18 20V10M12 20V4M6 20v-6" /> },
  { id: 'apps', name: 'Apps', desc: 'App configurations', href: '/settings/category/apps', icon: <><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" /></> },
  { id: 'internal', name: 'Internal', desc: 'App configurations', href: '/settings/category/internal', icon: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /> },
  { id: 'unmapped', name: 'Unmapped schemas', desc: 'App configurations', href: '/settings', icon: <><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></> },
  { id: 'localdev', name: 'Local Dev', desc: 'App configurations', href: '/settings', icon: <><polyline points="16,18 22,12 16,6" /><polyline points="8,6 2,12 8,18" /></> },
]

export function SettingsShell({ breadcrumb, children }: Props) {
  const navigate = useNavigate()
  const { state } = useApp()
  const [categoriesOpen, setCategoriesOpen] = useState(false)
  const categoriesRef = useRef<HTMLButtonElement>(null)
  const [menuPos, setMenuPos] = useState<{ top: number; left: number } | null>(null)

  const handleToggleCategories = () => {
    if (!categoriesOpen && categoriesRef.current) {
      const rect = categoriesRef.current.getBoundingClientRect()
      setMenuPos({ top: rect.bottom + 4, left: rect.left })
    }
    setCategoriesOpen((prev) => !prev)
  }

  useEffect(() => {
    if (!categoriesOpen) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setCategoriesOpen(false)
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [categoriesOpen])

  const scopeLabel = state.scope === 'environment'
    ? 'Applies to 156 hosts · 12 hosts groups · 3 K8s clusters'
    : state.activeSpace
      ? `Scoped to ${state.activeSpace.name}`
      : 'Environment'

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      {/* App header */}
      <div style={styles.appHeader}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6c757d" strokeWidth="1.75"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06" /></svg>
          <span style={{ fontSize: 14, fontWeight: 500, color: '#fff' }}>Settings</span>
        </div>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6c757d" strokeWidth="1.75" style={{ cursor: 'pointer' }}>
          <circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
      </div>

      {/* Context bar */}
      <div style={styles.contextBar}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, flex: 1 }}>
          <button ref={categoriesRef} onClick={handleToggleCategories} style={{ ...styles.categoriesBtn, ...(categoriesOpen ? { borderColor: '#1496ff', color: '#fff' } : {}) }} aria-expanded={categoriesOpen}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /></svg>
            Categories
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ transform: categoriesOpen ? 'rotate(180deg)' : 'none', transition: 'transform 200ms' }}>
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
          <div style={{ width: 1, height: 28, background: '#2d3339' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6c757d" strokeWidth="1.75">
              {state.scope === 'environment'
                ? <><circle cx="12" cy="12" r="10" /><path d="M2 12h20" /></>
                : <><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></>}
            </svg>
            <span style={{ fontSize: 13, color: '#b4bcc4' }}>Environment</span>
            <span style={{ fontSize: 13, color: '#b4bcc4' }}>{scopeLabel}</span>
            <span style={{ fontSize: 13, color: '#f59e0b', cursor: 'pointer' }}>16 with overrides</span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button style={styles.headerBtn}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
            History
          </button>
          <button style={styles.headerBtn}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /></svg>
            Search entities
            <span style={{ fontSize: 10, color: '#6c757d', fontFamily: 'var(--dt-font-mono)', marginLeft: 4 }}>⌘E</span>
          </button>
        </div>
      </div>

      {/* Mega menu */}
      {categoriesOpen && (
        <>
          <div style={styles.megaBackdrop} onClick={() => setCategoriesOpen(false)} />
          <div style={{ ...styles.megaMenu, top: menuPos?.top ?? 88, left: menuPos?.left ?? 64 }}>
            <div style={styles.megaCol}>
              <div style={styles.megaColTitle}>DATA</div>
              {megaDataItems.map((item) => (
                <button key={item.id} onClick={() => { setCategoriesOpen(false); navigate(item.href) }} style={styles.megaMenuItem}
                  onMouseEnter={(e) => { e.currentTarget.style.background = '#1c2024'; e.currentTarget.style.color = '#ffffff'; const svg = e.currentTarget.querySelector('svg'); if (svg) svg.style.opacity = '1' }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = '#b4bcc4'; const svg = e.currentTarget.querySelector('svg'); if (svg) svg.style.opacity = '0.6' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ opacity: 0.6, flexShrink: 0, transition: 'opacity 150ms' }}>{item.icon}</svg>
                  <div>
                    <div style={styles.megaItemName}>{item.name}</div>
                    <div style={styles.megaItemDesc}>{item.desc}</div>
                  </div>
                </button>
              ))}
              <div style={{ marginTop: 8, borderTop: '1px solid #2d3339', paddingTop: 14 }}>
                <button onClick={() => { setCategoriesOpen(false); navigate('/settings/overrides') }} style={styles.megaMenuItem}
                  onMouseEnter={(e) => { e.currentTarget.style.background = '#1c2024'; e.currentTarget.style.color = '#ffffff' }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = '#b4bcc4' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6c5ce7" strokeWidth="2" style={{ flexShrink: 0 }}><polyline points="16,18 22,12 16,6" /><polyline points="8,6 2,12 8,18" /></svg>
                  <div>
                    <div style={styles.megaItemName}>Overrides summary</div>
                    <div style={styles.megaItemDesc}>Hierarchies and overrides</div>
                  </div>
                </button>
              </div>
            </div>
            <div style={styles.megaCol}>
              <div style={styles.megaColTitle}>PLATFORM</div>
              {megaPlatformItems.map((item) => (
                <button key={item.id} onClick={() => { setCategoriesOpen(false); navigate(item.href) }} style={styles.megaMenuItem}
                  onMouseEnter={(e) => { e.currentTarget.style.background = '#1c2024'; e.currentTarget.style.color = '#ffffff'; const svg = e.currentTarget.querySelector('svg'); if (svg) svg.style.opacity = '1' }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = '#b4bcc4'; const svg = e.currentTarget.querySelector('svg'); if (svg) svg.style.opacity = '0.6' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ opacity: 0.6, flexShrink: 0, transition: 'opacity 150ms' }}>{item.icon}</svg>
                  <div>
                    <div style={styles.megaItemName}>{item.name}</div>
                    <div style={styles.megaItemDesc}>{item.desc}</div>
                  </div>
                </button>
              ))}
            </div>
            <div style={styles.megaPromo}>
              <div style={{ fontSize: 24 }}>&#10024;</div>
              <div style={{ fontSize: 15, fontWeight: 600, color: '#fff' }}>Dynatrace AI</div>
              <div style={{ fontSize: 12, color: '#b4bcc4', lineHeight: 1.4 }}>Davis AI and CoPilot settings for intelligent observability</div>
              <button style={{ marginTop: 8, padding: '8px 20px', background: '#6c5ce7', border: 'none', borderRadius: 6, color: '#fff', fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit' }}>Configure AI</button>
            </div>
          </div>
        </>
      )}

      {/* Breadcrumb */}
      {breadcrumb && breadcrumb.length > 0 && (
        <div style={styles.breadcrumb}>
          {breadcrumb.map((item, i) => (
            <span key={i}>
              {i > 0 && <span style={{ color: '#6c757d', margin: '0 8px' }}>›</span>}
              {item.path ? (
                <span style={{ color: '#1496ff', cursor: 'pointer' }} onClick={() => navigate(item.path!)}>{item.label}</span>
              ) : (
                <span style={{ color: '#b4bcc4' }}>{item.label}</span>
              )}
            </span>
          ))}
        </div>
      )}

      {/* Page content */}
      <div style={{ flex: 1, overflow: 'auto', padding: 32 }}>
        {children}
      </div>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  appHeader: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '12px 32px', borderBottom: '1px solid #2d3339',
  },
  contextBar: {
    display: 'flex', alignItems: 'center', gap: 16,
    padding: '10px 32px', background: '#14171a',
    borderBottom: '1px solid #2d3339',
  },
  categoriesBtn: {
    display: 'flex', alignItems: 'center', gap: 6,
    padding: '6px 12px', fontSize: 13, fontWeight: 500,
    color: '#b4bcc4', background: '#1c2024',
    border: '1px solid #2d3339', borderRadius: 6,
    cursor: 'pointer', fontFamily: 'inherit', transition: 'all 150ms',
  },
  headerBtn: {
    display: 'flex', alignItems: 'center', gap: 6,
    padding: '6px 12px', fontSize: 12, fontWeight: 500,
    background: '#1c2024', border: '1px solid #2d3339',
    borderRadius: 6, color: '#b4bcc4', cursor: 'pointer',
    fontFamily: 'inherit', transition: 'all 150ms',
  },
  breadcrumb: {
    display: 'flex', alignItems: 'center',
    padding: '10px 32px', fontSize: 13,
    borderBottom: '1px solid #2d3339',
  },
  megaBackdrop: { position: 'fixed', inset: 0, zIndex: 199 },
  megaMenu: {
    position: 'fixed', display: 'flex', gap: 16, padding: 16, minWidth: 700,
    background: '#252a2f', border: '1px solid #2d3339',
    borderRadius: 12, boxShadow: '0 16px 48px rgba(0,0,0,0.5)', zIndex: 200,
    animation: 'scaleIn 120ms var(--dt-ease-out) both', transformOrigin: 'top left',
  },
  megaCol: { flex: 1, minWidth: 200 },
  megaColTitle: { fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', color: '#6c757d', padding: '8px 12px', marginBottom: 4 },
  megaMenuItem: { display: 'flex', alignItems: 'center', gap: 10, width: '100%', padding: '10px 12px', background: 'none', border: 'none', borderRadius: 8, cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left', transition: 'all 150ms', color: '#b4bcc4' },
  megaItemName: { fontWeight: 500, color: 'inherit', fontSize: 13 },
  megaItemDesc: { fontSize: 12, color: '#6c757d' },
  megaPromo: { width: 180, background: 'linear-gradient(135deg, rgba(108,92,231,0.15), rgba(20,150,255,0.08))', border: '1px solid rgba(108,92,231,0.25)', borderRadius: 10, padding: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 8 },
}
