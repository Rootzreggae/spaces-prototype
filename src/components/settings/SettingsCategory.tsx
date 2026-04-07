import { useParams, useNavigate } from 'react-router-dom'
import { settingsCategories } from '../../data/settings-data'
import { SegmentBanner } from '../shared/SegmentBanner'
import { SettingsShell } from './SettingsShell'

export function SettingsCategory() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const category = settingsCategories.find((c) => c.id === id)

  if (!category) {
    return <div style={{ padding: 32, color: 'var(--dt-text-muted)' }}>Category not found</div>
  }

  return (
    <SettingsShell
      breadcrumb={[
        { label: 'Settings', path: '/settings' },
        { label: category.name },
      ]}
    >
      <SegmentBanner />

      <h1 style={styles.title}>{category.name}</h1>
      <p style={styles.subtitle}>{category.description}</p>

      {/* Search */}
      <div style={{ position: 'relative', marginTop: 20, marginBottom: 32 }}>
        <input placeholder="Search settings..." style={styles.searchInput} />
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--dt-text-faint)" strokeWidth="2" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)' }}>
          <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <span style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', fontSize: 11, color: 'var(--dt-text-faint)', fontFamily: 'var(--dt-font-mono)', background: 'var(--dt-bg-raised)', padding: '2px 6px', borderRadius: 4 }}>⌘.</span>
      </div>

      {/* Schema cards */}
      {category.schemas.length === 0 ? (
        <div style={{ padding: 48, textAlign: 'center', color: 'var(--dt-text-faint)', border: '1px dashed var(--dt-border-default)', borderRadius: 12 }}>
          No settings schemas in this category yet.
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
          {category.schemas.map((schema, i) => (
            <button
              key={schema.id}
              onClick={() => navigate(`/settings/category/${id}/${schema.id}`)}
              style={{
                ...styles.schemaCard,
                animation: `fadeInUp 300ms var(--dt-ease-out) ${i * 40}ms both`,
              }}
            >
              <div style={styles.schemaIconWrap}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={category.group === 'data' ? 'var(--dt-accent)' : '#a78bfa'} strokeWidth="1.75">
                  <path d={category.icon} />
                </svg>
              </div>
              <div style={{ flex: 1, textAlign: 'left' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--dt-text-primary)' }}>{schema.name}</span>
                  {schema.overrides && (
                    <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--dt-warning)', background: 'var(--dt-warning-subtle)', padding: '1px 8px', borderRadius: 10 }}>
                      {schema.overrides} overrides
                    </span>
                  )}
                </div>
                <div style={{ fontSize: 12, color: 'var(--dt-text-muted)', marginTop: 4, lineHeight: 1.4 }}>{schema.description}</div>
              </div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--dt-text-faint)" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
            </button>
          ))}
        </div>
      )}
    </SettingsShell>
  )
}

const styles: Record<string, React.CSSProperties> = {
  title: { fontSize: 24, fontWeight: 600, color: 'var(--dt-text-primary)', fontFamily: 'var(--dt-font-display)', marginBottom: 4 },
  subtitle: { fontSize: 14, color: 'var(--dt-text-muted)', lineHeight: 1.6 },
  searchInput: {
    width: '100%', padding: '12px 16px 12px 40px',
    background: 'var(--dt-bg-surface)', border: '1px solid var(--dt-border-default)',
    borderRadius: 8, color: 'var(--dt-text-primary)', fontSize: 14,
    fontFamily: 'var(--dt-font-body)', outline: 'none',
  },
  schemaCard: {
    display: 'flex', alignItems: 'center', gap: 16,
    padding: '18px 20px', background: 'var(--dt-bg-surface)',
    border: '1px solid var(--dt-border-subtle)', borderRadius: 10,
    cursor: 'pointer', fontFamily: 'var(--dt-font-body)',
    transition: 'all var(--dt-duration-fast) var(--dt-ease)',
    width: '100%',
  },
  schemaIconWrap: {
    width: 40, height: 40, borderRadius: 10,
    background: 'var(--dt-bg-raised)',
    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
  },
}
