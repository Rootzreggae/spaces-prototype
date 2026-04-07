import { useParams, useNavigate } from 'react-router-dom'
import { settingsCategories } from '../../data/settings-data'
import { SettingsShell } from './SettingsShell'

export function SettingsSchema() {
  const { categoryId, schemaId } = useParams<{ categoryId: string; schemaId: string }>()
  const navigate = useNavigate()
  const category = settingsCategories.find((c) => c.id === categoryId)
  const schema = category?.schemas.find((s) => s.id === schemaId)

  if (!category || !schema) {
    return <div style={{ padding: 32, color: '#6c757d' }}>Schema not found</div>
  }

  return (
    <SettingsShell
      breadcrumb={[
        { label: 'Settings', path: '/settings' },
        { label: category.name, path: `/settings/category/${categoryId}` },
        { label: schema.name },
      ]}
    >
      {/* Page header */}
      <h1 style={{ fontSize: 22, fontWeight: 600, color: '#fff', marginBottom: 6 }}>{schema.name}</h1>
      <p style={{ fontSize: 13, color: '#6c757d', marginBottom: 32 }}>
        Environment scope · <span style={{ color: '#f59e0b', cursor: 'pointer' }}>3 entities with overrides</span> · Last modified 2h ago by benben@dynatrace.com
      </p>

      {/* Sub-setting cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12, marginBottom: 40 }}>
        {subSettings.map((sub) => (
          <button key={sub.name} style={s.subCard}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#3a4149' }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#2d3339' }}
          >
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 500, color: '#fff' }}>{sub.name}</div>
              <div style={{ fontSize: 13, color: '#6c757d', marginTop: 4 }}>{sub.desc}</div>
            </div>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6c757d" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
          </button>
        ))}
      </div>

      {/* Entities with overrides */}
      <div style={{ background: '#1c2024', border: '1px solid #2d3339', borderRadius: 10, overflow: 'hidden' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', borderBottom: '1px solid #2d3339' }}>
          <span style={{ fontSize: 15, fontWeight: 600, color: '#fff' }}>Entities with overrides</span>
          <span style={{ fontSize: 13, color: '#1496ff', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}
            onClick={() => navigate('/settings/overrides')}
          >
            View all overrides
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
          </span>
        </div>

        {/* Table header */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr auto', padding: '10px 20px', background: '#252a2f' }}>
          {['ENTITY', 'TYPE', 'FIELDS CUSTOMISED', 'MODIFIED', ''].map((h) => (
            <span key={h} style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.3px', color: '#6c757d' }}>{h}</span>
          ))}
        </div>

        {/* Table rows */}
        {overrideRows.map((row, i) => (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr auto', padding: '14px 20px', borderBottom: i < overrideRows.length - 1 ? '1px solid #2d3339' : 'none', alignItems: 'center', transition: 'background 150ms' }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(20,150,255,0.03)' }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent' }}
          >
            <div>
              <div style={{ fontSize: 13, fontWeight: 500, color: '#1496ff', cursor: 'pointer' }}
                onMouseEnter={(e) => { (e.target as HTMLElement).style.textDecoration = 'underline' }}
                onMouseLeave={(e) => { (e.target as HTMLElement).style.textDecoration = 'none' }}
              >{row.name}</div>
              <div style={{ fontSize: 12, color: '#6c757d', fontFamily: 'var(--dt-font-mono)' }}>{row.id}</div>
            </div>
            <span style={{ fontSize: 13, color: '#b4bcc4' }}>{row.type}</span>
            <span style={{ fontSize: 12, fontWeight: 600, color: '#f59e0b', background: 'rgba(245,158,11,0.12)', padding: '3px 10px', borderRadius: 4, width: 'fit-content' }}>{row.customised}</span>
            <span style={{ fontSize: 13, color: '#6c757d' }}>{row.modified}</span>
            <span style={{ fontSize: 13, color: '#1496ff', cursor: 'pointer', textDecoration: 'underline' }}>View</span>
          </div>
        ))}
      </div>
    </SettingsShell>
  )
}

const subSettings = [
  { name: 'OneAgent features', desc: 'Enable or disable specific monitoring capabilities' },
  { name: 'Monitored technologies', desc: 'Choose which frameworks and technologies to auto-detect' },
  { name: 'Monitoring overview', desc: 'View monitoring status across your environment' },
]

const overrideRows = [
  { name: 'HOST_GROUP-CWS-1-IG-1-HG', id: 'HOST_GROUP-530F73EC2754E115', type: 'Host group', customised: '1 overrides', modified: '1h ago' },
  { name: 'Google Kubernetes Engine', id: 'KUBERNETES_CLUSTER-A387S0880D349ADD', type: 'K8s cluster', customised: '1 overrides', modified: '3d ago' },
  { name: 'HOST_GROUP-CWS-4-IG-1-HG', id: 'HOST_GROUP-E7FBBCF7B1467174', type: 'Host', customised: '1 overrides', modified: '1w ago' },
]

const s: Record<string, React.CSSProperties> = {
  subCard: {
    display: 'flex', alignItems: 'center', gap: 16,
    padding: '20px 24px', background: '#1c2024',
    border: '1px solid #2d3339', borderRadius: 10,
    cursor: 'pointer', fontFamily: 'inherit',
    textAlign: 'left', transition: 'border-color 150ms',
  },
}
