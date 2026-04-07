import { detectedTags } from '../../data/mock-data'
import type { WizardState } from './CreateWizard'

interface Props {
  form: WizardState
  updateForm: (partial: Partial<WizardState>) => void
}

export function WizardStep2({ form, updateForm }: Props) {
  const selectedTagData = detectedTags.find((t) => t.name === form.selectedTag)

  return (
    <div>
      <h2 style={{ fontSize: 22, fontWeight: 600, color: 'var(--dt-text-primary)', marginBottom: 8 }}>Define Data Scope</h2>
      <p style={{ fontSize: 14, color: 'var(--dt-text-muted)', marginBottom: 32, lineHeight: 1.6 }}>
        Specify which signals belong to this Space. The matcher determines which logs, metrics, traces, and events
        are routed here through OpenPipeline. We'll assess overlap risk based on your matcher configuration.
      </p>

      {/* Name */}
      <div style={{ marginBottom: 24 }}>
        <label style={labelStyle}>Name <span style={{ color: 'var(--dt-error)' }}>*</span></label>
        <input
          style={inputStyle}
          placeholder="e.g., Mobile Payment Team"
          value={form.spaceName}
          onChange={(e) => updateForm({ spaceName: e.target.value })}
        />
      </div>

      {/* Description */}
      <div style={{ marginBottom: 32 }}>
        <label style={labelStyle}>Description</label>
        <textarea
          style={{ ...inputStyle, minHeight: 80, resize: 'vertical' }}
          placeholder="What does this team do?"
          value={form.description}
          onChange={(e) => updateForm({ description: e.target.value })}
        />
      </div>

      {/* ID */}
      <div style={{ marginBottom: 32 }}>
        <label style={labelStyle}>ID (dt.space)</label>
        <div style={{ ...inputStyle, color: 'var(--dt-text-faint)', cursor: 'default' }}>
          {form.spaceName ? `dt.space.${form.spaceName.toLowerCase().replace(/\s+/g, '-')}` : 'auto-generated from name'}
        </div>
        <p style={hintStyle}>Auto-generated from the Space name. Used in API calls and URLs.</p>
      </div>

      {/* Tag selection */}
      <div style={{ marginBottom: 24 }}>
        <label style={labelStyle}>Choose what this Space includes</label>
        <p style={hintStyle}>Select an existing tag to define which data belongs to this Space. OpenPipeline will automatically route matching signals.</p>

        {form.selectedTag && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8, marginBottom: 4 }}>
            <span style={{ fontSize: 12, color: 'var(--dt-success)' }}>✓ 3 Spaces use this tag</span>
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 16 }}>
          {detectedTags.map((tag) => (
            <div
              key={tag.name}
              onClick={() => updateForm({ selectedTag: tag.name, selectedValue: null })}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '14px 16px', background: 'var(--dt-bg-surface)',
                border: `2px solid ${form.selectedTag === tag.name ? 'var(--dt-accent)' : 'var(--dt-border-default)'}`,
                borderRadius: 10, cursor: 'pointer', transition: 'all 150ms',
              }}
            >
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--dt-text-primary)', fontFamily: "'SF Mono', monospace" }}>{tag.name}</div>
                <div style={{ fontSize: 12, color: 'var(--dt-text-faint)', marginTop: 2 }}>{tag.description}</div>
              </div>
              <span style={{ fontSize: 12, color: 'var(--dt-text-faint)' }}>{tag.values.length} values</span>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
          <span style={{ fontSize: 11, color: 'var(--dt-text-faint)', textTransform: 'uppercase', letterSpacing: 0.5 }}>OR USE A COMMON PATTERN</span>
        </div>
        <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
          {['k8s.cluster', 'host.group', 'service.name', 'application'].map((p) => (
            <span key={p} style={{ padding: '4px 10px', borderRadius: 6, fontSize: 12, color: 'var(--dt-accent-hover)', background: 'rgba(59,130,246,0.1)', cursor: 'pointer' }}>{p}</span>
          ))}
        </div>
      </div>

      {/* Value selection */}
      {selectedTagData && (
        <div style={{ marginTop: 32 }}>
          <label style={labelStyle}>Pick a value for {selectedTagData.name}</label>
          <p style={hintStyle}>Select an unused value to create a new Space. Values already assigned to existing Spaces are shown as taken.</p>

          {form.selectedTag && (
            <div style={{ padding: '12px 16px', background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.2)', borderRadius: 8, fontSize: 13, color: 'var(--dt-accent-hover)', marginTop: 12, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M12 16v-4M12 8h.01" /></svg>
              Your existing 3 Spaces all use {selectedTagData.name}. We recommend using the same dimension to avoid cross-field overlap.
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 8 }}>
            {selectedTagData.values.map((v) => (
              <div
                key={v.value}
                onClick={() => updateForm({ selectedValue: v.value })}
                style={{
                  padding: '14px 16px',
                  background: form.selectedValue === v.value ? 'rgba(59,130,246,0.1)' : 'var(--dt-bg-surface)',
                  border: `2px solid ${form.selectedValue === v.value ? 'var(--dt-accent)' : 'var(--dt-border-default)'}`,
                  borderRadius: 10, cursor: 'pointer', transition: 'all 150ms',
                }}
              >
                <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--dt-text-primary)', fontFamily: "'SF Mono', monospace" }}>{v.value}</div>
                <div style={{ fontSize: 12, color: 'var(--dt-text-faint)', marginTop: 4 }}>{v.hosts} hosts &middot; {v.services} services</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

const labelStyle: React.CSSProperties = { display: 'block', fontSize: 14, fontWeight: 600, color: 'var(--dt-text-primary)', marginBottom: 8 }
const hintStyle: React.CSSProperties = { fontSize: 12, color: 'var(--dt-text-faint)', marginTop: 6, lineHeight: 1.5 }
const inputStyle: React.CSSProperties = {
  width: '100%', padding: '12px 14px', background: 'var(--dt-bg-overlay)',
  border: '2px solid #3a3a5a', borderRadius: 8, color: 'var(--dt-text-primary)',
  fontSize: 14, fontFamily: 'inherit', outline: 'none',
}
