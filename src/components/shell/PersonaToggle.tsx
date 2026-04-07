import { useApp } from '../../context/AppContext'
import type { Persona } from '../../context/AppContext'

const personaIcons: Record<Persona, React.ReactNode> = {
  'central-team': <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 14v3M12 14v3M16 14v3" /></svg>,
  'space-admin': <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33" /></svg>,
  'practitioner': <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>,
}

const personas: { id: Persona; label: string }[] = [
  { id: 'central-team', label: 'Central Team' },
  { id: 'space-admin', label: 'Space Admin' },
  { id: 'practitioner', label: 'Practitioner' },
]

export function PersonaToggle() {
  const { state, dispatch } = useApp()

  return (
    <div style={styles.container}>
      <span style={styles.label}>Viewing as</span>
      <div style={styles.toggle}>
        {personas.map((p) => (
          <button
            key={p.id}
            onClick={() => dispatch({ type: 'SET_PERSONA', payload: p.id })}
            style={{
              ...styles.btn,
              ...(state.persona === p.id ? styles.btnActive : {}),
            }}
          >
            {personaIcons[p.id]}
            {p.label}
          </button>
        ))}
      </div>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    position: 'fixed', bottom: 20, left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex', alignItems: 'center', gap: 12,
    padding: '8px 12px 8px 16px',
    background: 'var(--dt-bg-overlay)',
    border: '1px solid var(--dt-border-default)',
    borderRadius: 12,
    boxShadow: 'var(--dt-shadow-lg)',
    zIndex: 1000,
    animation: 'fadeInUp 400ms var(--dt-ease-out) both',
    animationDelay: '500ms',
  },
  label: {
    fontSize: 11, fontWeight: 600, color: 'var(--dt-text-faint)',
    fontFamily: 'var(--dt-font-mono)',
    textTransform: 'uppercase', letterSpacing: '0.08em',
    whiteSpace: 'nowrap',
  },
  toggle: {
    display: 'flex', gap: 4,
    background: 'var(--dt-bg-surface)',
    borderRadius: 8, padding: 3,
  },
  btn: {
    display: 'flex', alignItems: 'center', gap: 6,
    padding: '6px 12px', fontSize: 12, fontWeight: 500,
    border: 'none', borderRadius: 6, cursor: 'pointer',
    fontFamily: 'var(--dt-font-body)',
    background: 'transparent',
    color: 'var(--dt-text-muted)',
    transition: 'all var(--dt-duration-fast) var(--dt-ease)',
    whiteSpace: 'nowrap',
  },
  btnActive: {
    background: 'var(--dt-accent)',
    color: '#fff',
  },
}
