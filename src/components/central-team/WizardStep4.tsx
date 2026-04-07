import { detectedTags, groups } from '../../data/mock-data'
import type { WizardState } from './CreateWizard'

interface Props {
  form: WizardState
}

export function WizardStep4({ form }: Props) {
  const tag = detectedTags.find((t) => t.name === form.selectedTag)
  const value = tag?.values.find((v) => v.value === form.selectedValue)
  const selectedGroupData = groups.filter((g) => form.selectedGroups.includes(g.id))
  const totalEntities = value ? value.hosts + value.services : 0

  return (
    <div>
      <h2 style={{ fontSize: 22, fontWeight: 600, color: 'var(--dt-text-primary)', marginBottom: 8 }}>Review your Space</h2>
      <p style={{ fontSize: 14, color: 'var(--dt-text-muted)', marginBottom: 32, lineHeight: 1.6 }}>
        Please review the configuration before creating your Space.
      </p>

      {/* Space Details */}
      <div style={sectionStyle}>
        <div style={sectionTitle}>Space Details</div>
        <ReviewRow label="Name" value={form.spaceName || '—'} />
        <ReviewRow label="ID" value={form.spaceName ? `dt.space.${form.spaceName.toLowerCase().replace(/\s+/g, '-')}` : '—'} mono />
        <ReviewRow label="Description" value={form.description || '—'} />
        <ReviewRow label="Tag" value={form.selectedTag || '—'} mono />
        <ReviewRow label="Value" value={form.selectedValue || '—'} mono />
        <ReviewRow label="Estimated entities" value={totalEntities > 0 ? `~${totalEntities} (${value?.hosts} hosts, ${value?.services} services)` : '—'} />
      </div>

      {/* Assigned Groups */}
      <div style={{ ...sectionStyle, marginTop: 24 }}>
        <div style={sectionTitle}>Assigned Groups</div>
        {selectedGroupData.length === 0 && (
          <p style={{ fontSize: 13, color: 'var(--dt-text-faint)', padding: '12px 0' }}>No groups selected</p>
        )}
        {selectedGroupData.map((g) => {
          const role = form.groupRoles?.[g.id] || 'space-admin'
          const isAdmin = role === 'space-admin'
          return (
            <div key={g.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid var(--dt-border-default)' }}>
              <div>
                <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--dt-text-primary)' }}>{g.name}</span>
                <span style={{ fontSize: 12, color: 'var(--dt-text-faint)', marginLeft: 12 }}>{g.members} members</span>
              </div>
              <span style={{
                fontSize: 12, padding: '3px 10px', borderRadius: 4,
                color: isAdmin ? 'var(--dt-accent-hover)' : 'var(--dt-success)',
                background: isAdmin ? 'rgba(20,150,255,0.1)' : 'rgba(0,212,170,0.1)',
              }}>
                {isAdmin ? 'Space Admin' : 'Practitioner'}
              </span>
            </div>
          )
        })}
      </div>

      {/* Summary banner */}
      <div style={{ marginTop: 32, padding: '16px 20px', background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.2)', borderRadius: 10, display: 'flex', alignItems: 'center', gap: 12 }}>
        <svg width="18" height="18" fill="none" stroke="#60a5fa" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M12 16v-4M12 8h.01" /></svg>
        <span style={{ fontSize: 13, color: 'var(--dt-accent-hover)', lineHeight: 1.5 }}>
          Creating this Space will route matching signals through OpenPipeline and grant access to {selectedGroupData.length} group{selectedGroupData.length !== 1 ? 's' : ''}.
          This action can be modified later.
        </span>
      </div>
    </div>
  )
}

function ReviewRow({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #2a2a4a' }}>
      <span style={{ fontSize: 13, color: 'var(--dt-text-faint)' }}>{label}</span>
      <span style={{ fontSize: 13, color: 'var(--dt-text-primary)', fontWeight: 500, fontFamily: mono ? "'SF Mono', monospace" : 'inherit', textAlign: 'right', maxWidth: '60%' }}>{value}</span>
    </div>
  )
}

const sectionStyle: React.CSSProperties = {
  background: 'var(--dt-bg-surface)', border: '1px solid #2a2a4a',
  borderRadius: 12, padding: '24px 28px',
}

const sectionTitle: React.CSSProperties = {
  fontSize: 14, fontWeight: 600, color: 'var(--dt-text-primary)',
  marginBottom: 16, paddingBottom: 12, borderBottom: '1px solid #2a2a4a',
}
