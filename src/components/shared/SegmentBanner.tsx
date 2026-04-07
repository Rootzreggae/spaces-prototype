import { useApp } from '../../context/AppContext'

export function SegmentBanner() {
  const { state, dispatch } = useApp()
  const seg = state.activeSegment

  if (!seg) return null

  return (
    <div style={styles.banner}>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={seg.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
      </svg>
      <span style={{ fontSize: 12, color: 'var(--dt-text-secondary)' }}>
        Filtered by segment: <strong style={{ color: seg.color }}>{seg.name}</strong>
        <span style={{ color: 'var(--dt-text-faint)', marginLeft: 8 }}>{seg.entityCount} entities</span>
      </span>
      <button onClick={() => dispatch({ type: 'SET_ACTIVE_SEGMENT', payload: null })} style={styles.clearBtn}>
        Clear
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
      </button>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  banner: {
    display: 'flex', alignItems: 'center', gap: 10,
    padding: '8px 16px', marginBottom: 16,
    background: 'var(--dt-bg-surface)',
    border: '1px solid var(--dt-border-subtle)',
    borderRadius: 8,
    animation: 'fadeIn 200ms var(--dt-ease-out) both',
  },
  clearBtn: {
    display: 'flex', alignItems: 'center', gap: 4,
    marginLeft: 'auto', padding: '4px 10px', fontSize: 11, fontWeight: 500,
    background: 'none', border: '1px solid var(--dt-border-default)',
    borderRadius: 4, color: 'var(--dt-text-muted)', cursor: 'pointer',
    fontFamily: 'var(--dt-font-body)', transition: 'all var(--dt-duration-fast)',
  },
}
