import { useState } from 'react'
import { groups } from '../../data/mock-data'
import type { WizardState, SpaceRole } from './CreateWizard'

interface Props {
  form: WizardState
  updateForm: (partial: Partial<WizardState>) => void
}

type Tab = 'suggested' | 'all' | 'selected'

const roleLabels: Record<SpaceRole, string> = {
  'space-admin': 'Space Admin',
  'practitioner': 'Practitioner',
}

const roleDescriptions: Record<SpaceRole, string> = {
  'space-admin': 'Can manage Space settings, create monitoring objects, configure pipelines',
  'practitioner': 'Can view data, use dashboards and notebooks, respond to problems',
}

export function WizardStep3({ form, updateForm }: Props) {
  const [tab, setTab] = useState<Tab>('suggested')
  const [search, setSearch] = useState('')

  const suggested = groups.filter((g) => g.suggested)
  const filtered = (tab === 'suggested' ? suggested : tab === 'selected' ? groups.filter((g) => form.selectedGroups.includes(g.id)) : groups)
    .filter((g) => g.name.toLowerCase().includes(search.toLowerCase()))

  const toggleGroup = (id: string) => {
    const isSelected = form.selectedGroups.includes(id)
    const newGroups = isSelected
      ? form.selectedGroups.filter((g) => g !== id)
      : [...form.selectedGroups, id]

    // Set default role when adding, remove role when deselecting
    const newRoles = { ...form.groupRoles }
    if (isSelected) {
      delete newRoles[id]
    } else {
      newRoles[id] = 'space-admin'
    }

    updateForm({ selectedGroups: newGroups, groupRoles: newRoles })
  }

  const setGroupRole = (groupId: string, role: SpaceRole) => {
    updateForm({ groupRoles: { ...form.groupRoles, [groupId]: role } })
  }

  const totalMembers = groups.filter((g) => form.selectedGroups.includes(g.id)).reduce((s, g) => s + g.members, 0)

  return (
    <div>
      <h2 style={{ fontSize: 22, fontWeight: 600, color: 'var(--dt-text-primary)', marginBottom: 8 }}>Assign groups</h2>
      <p style={{ fontSize: 14, color: 'var(--dt-text-muted)', marginBottom: 12, lineHeight: 1.6 }}>
        Choose which groups have access to this Space and set their permission levels.
      </p>
      <p style={{ fontSize: 13, color: 'var(--dt-text-faint)', marginBottom: 32, lineHeight: 1.5 }}>
        Map existing groups to this Space and define what they can do. <strong style={{ color: 'var(--dt-text-secondary)' }}>Space Admins</strong> can manage the Space settings, while <strong style={{ color: 'var(--dt-text-secondary)' }}>Practitioners</strong> can only see the data.
      </p>

      {/* Search */}
      <div style={searchStyle}>
        <svg width="18" height="18" fill="none" stroke="var(--dt-text-faint)" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8" strokeWidth="2" /><path d="M21 21l-4.35-4.35" strokeWidth="2" /></svg>
        <input style={{ background: 'none', border: 'none', color: 'var(--dt-text-secondary)', fontSize: 14, outline: 'none', flex: 1, fontFamily: 'inherit' }}
          placeholder="Search groups..." value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 20 }}>
        {([
          { id: 'suggested' as Tab, label: 'Suggested', count: suggested.length },
          { id: 'all' as Tab, label: 'All groups', count: groups.length },
          { id: 'selected' as Tab, label: 'Selected', count: form.selectedGroups.length },
        ]).map((t) => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{
            padding: '8px 16px', fontSize: 13, fontWeight: 500, border: 'none',
            borderRadius: 6, cursor: 'pointer', fontFamily: 'inherit',
            background: tab === t.id ? 'var(--dt-accent)' : 'var(--dt-bg-overlay)',
            color: tab === t.id ? '#fff' : 'var(--dt-text-muted)',
            transition: 'all 150ms',
          }}>
            {t.label} <span style={{ marginLeft: 6, padding: '1px 8px', borderRadius: 10, fontSize: 11, fontWeight: 600, background: tab === t.id ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.05)' }}>{t.count}</span>
          </button>
        ))}
      </div>

      {/* Groups list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 24 }}>
        {filtered.length === 0 && (
          <div style={{ padding: 32, textAlign: 'center', color: 'var(--dt-text-faint)', fontSize: 14 }}>
            {tab === 'selected' ? 'No groups selected yet' : 'No groups match your search'}
          </div>
        )}
        {filtered.map((g) => {
          const isSelected = form.selectedGroups.includes(g.id)
          const role = form.groupRoles[g.id] || 'space-admin'
          return (
            <div key={g.id} style={{
              background: 'var(--dt-bg-surface)',
              border: `2px solid ${isSelected ? 'var(--dt-accent)' : 'var(--dt-border-default)'}`,
              borderRadius: 10, transition: 'all 150ms', overflow: 'hidden',
            }}>
              {/* Group header — click to toggle */}
              <div
                onClick={() => toggleGroup(g.id)}
                style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '16px 20px', cursor: 'pointer' }}
              >
                <div style={{
                  width: 22, height: 22, borderRadius: 6,
                  border: `2px solid ${isSelected ? 'var(--dt-accent)' : 'var(--dt-border-strong)'}`,
                  background: isSelected ? 'var(--dt-accent)' : 'transparent',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>
                  {isSelected && <svg width="12" height="12" fill="none" stroke="#fff" strokeWidth="3" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12" /></svg>}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--dt-text-primary)' }}>{g.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--dt-text-faint)', marginTop: 2 }}>{g.members} members · Created {g.created}</div>
                </div>
                {g.suggested && <span style={{ fontSize: 10, fontWeight: 600, padding: '3px 8px', borderRadius: 4, background: 'rgba(59,130,246,0.12)', color: 'var(--dt-accent-hover)', textTransform: 'uppercase', letterSpacing: '0.03em' }}>Suggested</span>}
              </div>

              {/* Role assignment — shown when selected */}
              {isSelected && (
                <div style={{
                  padding: '12px 20px 16px', borderTop: '1px solid var(--dt-border-subtle)',
                  background: 'var(--dt-bg-raised)',
                  animation: 'fadeIn 150ms var(--dt-ease-out) both',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span style={{ fontSize: 12, color: 'var(--dt-text-faint)', fontWeight: 500, whiteSpace: 'nowrap' }}>SPACE PERMISSION</span>
                    <div style={{ display: 'flex', gap: 4, background: 'var(--dt-bg-surface)', borderRadius: 6, padding: 3, flex: 1 }}>
                      {(['space-admin', 'practitioner'] as SpaceRole[]).map((r) => (
                        <button
                          key={r}
                          onClick={(e) => { e.stopPropagation(); setGroupRole(g.id, r) }}
                          style={{
                            flex: 1, padding: '6px 12px', fontSize: 12, fontWeight: 500,
                            border: 'none', borderRadius: 4, cursor: 'pointer',
                            fontFamily: 'inherit', transition: 'all 100ms',
                            background: role === r ? 'var(--dt-accent)' : 'transparent',
                            color: role === r ? '#fff' : 'var(--dt-text-muted)',
                          }}
                        >
                          {roleLabels[r]}
                        </button>
                      ))}
                    </div>
                  </div>
                  <p style={{ fontSize: 11, color: 'var(--dt-text-faint)', marginTop: 8, lineHeight: 1.4 }}>
                    {roleDescriptions[role]}
                  </p>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Selection summary */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderTop: '1px solid var(--dt-border-default)' }}>
        <span style={{ fontSize: 13, color: 'var(--dt-text-muted)' }}>
          <strong style={{ color: 'var(--dt-text-primary)' }}>{form.selectedGroups.length}</strong> groups selected · <strong style={{ color: 'var(--dt-text-primary)' }}>{totalMembers}</strong> members
          {form.selectedGroups.length > 0 && (
            <span style={{ marginLeft: 12, color: 'var(--dt-text-faint)' }}>
              ({form.selectedGroups.filter((id) => form.groupRoles[id] === 'space-admin').length} admins,{' '}
              {form.selectedGroups.filter((id) => form.groupRoles[id] === 'practitioner').length} practitioners)
            </span>
          )}
        </span>
        {form.selectedGroups.length > 0 && (
          <button onClick={() => updateForm({ selectedGroups: [], groupRoles: {} })} style={{ background: 'none', border: 'none', color: 'var(--dt-accent-hover)', fontSize: 13, cursor: 'pointer', fontFamily: 'inherit' }}>Clear selection</button>
        )}
      </div>
    </div>
  )
}

const searchStyle: React.CSSProperties = {
  display: 'flex', alignItems: 'center', gap: 12,
  padding: '12px 16px', background: 'var(--dt-bg-overlay)',
  border: '2px solid var(--dt-border-strong)', borderRadius: 8, marginBottom: 20,
}
