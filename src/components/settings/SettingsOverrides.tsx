import { useState } from 'react'
import { overrideEntities } from '../../data/settings-data'
import { SegmentBanner } from '../shared/SegmentBanner'
import { SettingsShell } from './SettingsShell'

const typeLabels: Record<string, string> = {
  'host-group': 'Host Groups',
  'k8s-cluster': 'Kubernetes Clusters',
  'host': 'Hosts',
}

const typeIcons: Record<string, React.ReactNode> = {
  'host-group': <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></svg>,
  'k8s-cluster': <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><circle cx="12" cy="12" r="3" /><path d="M12 1v6m0 6v10" /><path d="M4.22 4.22l4.24 4.24m7.08 7.08l4.24 4.24" /></svg>,
  'host': <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><rect x="2" y="2" width="20" height="8" rx="2" /><rect x="2" y="14" width="20" height="8" rx="2" /><circle cx="6" cy="6" r="1" fill="currentColor" /><circle cx="6" cy="18" r="1" fill="currentColor" /></svg>,
}

export function SettingsOverrides() {
  const [selected, setSelected] = useState<Set<string>>(new Set())

  const grouped = {
    'host-group': overrideEntities.filter((e) => e.type === 'host-group'),
    'k8s-cluster': overrideEntities.filter((e) => e.type === 'k8s-cluster'),
    'host': overrideEntities.filter((e) => e.type === 'host'),
  }

  const toggleSelect = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <SettingsShell
      breadcrumb={[
        { label: 'Settings', path: '/settings' },
        { label: 'Overrides summary' },
      ]}
    >
      <SegmentBanner />

      <h1 style={styles.title}>Overrides</h1>
      <p style={styles.subtitle}>{overrideEntities.length} entities have customised settings across your environment</p>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 12, marginTop: 24, marginBottom: 24 }}>
        <select style={styles.filterSelect}>
          <option>All categories</option>
          <option>Collect and capture</option>
          <option>Analyze and Alert</option>
        </select>
        <select style={styles.filterSelect}>
          <option>All schemas</option>
          <option>Anomaly detection</option>
          <option>General monitoring</option>
        </select>
        <span style={{ fontSize: 12, color: 'var(--dt-text-faint)', alignSelf: 'center' }}>
          Showing all overrides. Use filters above to narrow by category or schema.
        </span>
      </div>

      {/* Selected actions bar */}
      {selected.size > 0 && (
        <div style={styles.selectionBar}>
          <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--dt-text-primary)' }}>{selected.size} selected</span>
          <button style={styles.resetBtn}>Reset selected</button>
          <button onClick={() => setSelected(new Set())} style={{ ...styles.resetBtn, background: 'none', border: 'none', color: 'var(--dt-text-muted)' }}>Cancel</button>
        </div>
      )}

      {/* Table — v8 style */}
      <div style={{ background: '#1c2024', border: '1px solid #2d3339', borderRadius: 10, overflow: 'hidden' }}>
      {Object.entries(grouped).map(([type, entities]) => {
        if (entities.length === 0) return null
        return (
          <div key={type} style={{ marginBottom: 24 }}>
            <div style={styles.groupHeader}>
              {typeIcons[type]}
              <span>{typeLabels[type]} ({entities.length})</span>
            </div>
            {entities.map((entity, i) => (
              <div key={entity.id} style={{
                ...styles.row,
                animation: `fadeIn 200ms var(--dt-ease-out) ${i * 30}ms both`,
              }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(20,150,255,0.03)' }}
                onMouseLeave={(e) => { e.currentTarget.style.background = '#1c2024' }}
              >
                <input
                  type="checkbox"
                  checked={selected.has(entity.id)}
                  onChange={() => toggleSelect(entity.id)}
                  style={{ accentColor: '#1496ff', cursor: 'pointer', width: 16, height: 16 }}
                />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 500, color: '#1496ff', cursor: 'pointer', textDecoration: 'none' }}
                    onMouseEnter={(e) => { (e.target as HTMLElement).style.textDecoration = 'underline' }}
                    onMouseLeave={(e) => { (e.target as HTMLElement).style.textDecoration = 'none' }}
                  >{entity.name}</div>
                  <div style={{ fontSize: 12, color: '#6c757d', fontFamily: 'var(--dt-font-mono)' }}>{entity.entityId}</div>
                </div>
                <div style={{ fontSize: 12, color: 'var(--dt-text-muted)', flex: 1 }}>{entity.customizedFields}</div>
                <div style={{ display: 'flex', gap: 6 }}>
                  <button style={styles.actionBtn}>Edit</button>
                  <button style={styles.actionBtn}>Reset</button>
                </div>
              </div>
            ))}
          </div>
        )
      })}

      </div>

      {/* Pagination */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 16, fontSize: 12, color: 'var(--dt-text-faint)' }}>
        <span>Page 1 of 10</span>
        <div style={{ display: 'flex', gap: 4 }}>
          {[1, 2, 3].map((p) => (
            <span key={p} style={{
              padding: '4px 10px', borderRadius: 4, cursor: 'pointer',
              background: p === 1 ? 'var(--dt-accent)' : 'var(--dt-bg-raised)',
              color: p === 1 ? '#fff' : 'var(--dt-text-muted)',
              fontSize: 12, fontWeight: 500,
            }}>{p}</span>
          ))}
          <span style={{ padding: '4px 8px', color: 'var(--dt-text-faint)' }}>...</span>
          <span style={{ padding: '4px 10px', borderRadius: 4, cursor: 'pointer', background: 'var(--dt-bg-raised)', color: 'var(--dt-text-muted)', fontSize: 12 }}>10</span>
        </div>
      </div>
    </SettingsShell>
  )
}

const styles: Record<string, React.CSSProperties> = {
  title: { fontSize: 24, fontWeight: 600, color: 'var(--dt-text-primary)', fontFamily: 'var(--dt-font-display)', marginBottom: 4 },
  subtitle: { fontSize: 14, color: 'var(--dt-text-muted)' },
  filterSelect: {
    padding: '8px 12px', fontSize: 13,
    background: 'var(--dt-bg-surface)', border: '1px solid var(--dt-border-default)',
    borderRadius: 6, color: 'var(--dt-text-secondary)',
    fontFamily: 'var(--dt-font-body)', outline: 'none', cursor: 'pointer',
  },
  selectionBar: {
    display: 'flex', alignItems: 'center', gap: 16,
    padding: '10px 16px', marginBottom: 16,
    background: 'var(--dt-accent-subtle)', border: '1px solid rgba(20,150,255,0.2)',
    borderRadius: 8, animation: 'fadeIn 150ms var(--dt-ease-out) both',
  },
  resetBtn: {
    padding: '6px 14px', fontSize: 12, fontWeight: 500,
    background: 'var(--dt-bg-raised)', border: '1px solid var(--dt-border-default)',
    borderRadius: 6, color: 'var(--dt-text-secondary)', cursor: 'pointer',
    fontFamily: 'var(--dt-font-body)',
  },
  groupHeader: {
    display: 'flex', alignItems: 'center', gap: 8,
    padding: '14px 20px 10px', fontSize: 12, fontWeight: 600,
    color: '#6c757d', textTransform: 'uppercase',
    letterSpacing: '0.3px',
  },
  row: {
    display: 'flex', alignItems: 'center', gap: 16,
    padding: '12px 20px',
    borderBottom: '1px solid #2d3339',
    transition: 'background 150ms',
    background: '#1c2024',
  },
  actionBtn: {
    padding: '6px 14px', fontSize: 12, fontWeight: 500,
    background: '#252a2f', border: '1px solid #2d3339',
    borderRadius: 6, color: '#b4bcc4', cursor: 'pointer',
    fontFamily: 'inherit', transition: 'all 150ms',
  },
}
