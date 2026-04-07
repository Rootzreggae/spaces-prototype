import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { AccountNav } from './AccountNav'
import { WizardStep1 } from './WizardStep1'
import { WizardStep2 } from './WizardStep2'
import { WizardStep3 } from './WizardStep3'
import { WizardStep4 } from './WizardStep4'
import { useApp } from '../../context/AppContext'
import { groups } from '../../data/mock-data'

export type SpaceRole = 'space-admin' | 'practitioner'

export interface GroupAssignment {
  groupId: string
  role: SpaceRole
}

export interface WizardState {
  spaceName: string
  description: string
  selectedTag: string | null
  selectedValue: string | null
  selectedGroups: string[]
  /** Role assignment per group */
  groupRoles: Record<string, SpaceRole>
}

const STEPS = ['Welcome', 'Create Space', 'Assign Groups', 'Review']

export function CreateWizard() {
  const navigate = useNavigate()
  const { dispatch } = useApp()
  const [step, setStep] = useState(1)
  const [completed, setCompleted] = useState(false)
  const [form, setForm] = useState<WizardState>({
    spaceName: '',
    description: '',
    selectedTag: null,
    selectedValue: null,
    selectedGroups: [],
    groupRoles: {},
  })

  const updateForm = (partial: Partial<WizardState>) => setForm((prev) => ({ ...prev, ...partial }))

  const nextStep = () => {
    if (step === 4) {
      // Create the Space and add to app state
      const totalMembers = groups.filter((g) => form.selectedGroups.includes(g.id)).reduce((s, g) => s + g.members, 0)
      dispatch({
        type: 'ADD_SPACE',
        payload: {
          id: `sp-${Date.now()}`,
          name: form.spaceName || 'Untitled Space',
          slug: `dt.space.${(form.spaceName || 'untitled').toLowerCase().replace(/\s+/g, '-')}`,
          members: totalMembers,
          entities: Math.floor(Math.random() * 2000) + 500,
          lastModified: 'Just now',
        },
      })
      setCompleted(true)
      return
    }
    setStep((s) => Math.min(s + 1, 4))
  }

  const prevStep = () => setStep((s) => Math.max(s - 1, 1))

  const goToStep = useCallback((s: number) => {
    if (!completed) setStep(s)
  }, [completed])

  // Sync wizard state to context so sidebar can render step jumps
  useEffect(() => {
    dispatch({ type: 'SET_WIZARD', payload: { step, goToStep } })
    return () => { dispatch({ type: 'SET_WIZARD', payload: null }) }
  }, [step, goToStep, dispatch])

  const nextLabel = step === 1 ? 'Get started' : step === 4 ? 'Create Space' : 'Continue'
  const canNext = step === 1 || (step === 2 && form.spaceName.length > 0) || step === 3 || step === 4

  return (
    <div style={{ background: 'var(--dt-bg-base)', minHeight: '100%', display: 'flex', flexDirection: 'column' }}>
      <AccountNav />

      {/* Breadcrumb */}
      <div style={styles.breadcrumb}>
        <span style={{ color: 'var(--dt-accent-hover)', cursor: 'pointer' }} onClick={() => navigate('/central-team/dashboard')}>Dynatrace</span>
        <span style={{ color: 'var(--dt-text-faint)' }}>›</span>
        <span style={{ color: 'var(--dt-accent-hover)', cursor: 'pointer' }} onClick={() => navigate('/central-team/dashboard')}>Environments & Spaces</span>
        <span style={{ color: 'var(--dt-text-faint)' }}>›</span>
        <span style={{ color: 'var(--dt-text-secondary)' }}>Create Space</span>
      </div>

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '32px 40px 120px', width: '100%', flex: 1 }}>
        {/* Progress stepper */}
        <div style={styles.stepper}>
          {STEPS.map((label, i) => {
            const stepNum = i + 1
            const isActive = stepNum === step
            const isDone = stepNum < step || completed
            return (
              <div key={label} style={{ display: 'flex', alignItems: 'center', flex: i < STEPS.length - 1 ? 1 : 'none' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }} onClick={() => goToStep(stepNum)}>
                  <div style={{
                    width: 28, height: 28, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 12, fontWeight: 600,
                    background: isDone ? 'var(--dt-success)' : isActive ? 'var(--dt-accent)' : 'var(--dt-bg-overlay)',
                    color: isDone || isActive ? '#fff' : 'var(--dt-text-faint)',
                    transition: 'all 200ms',
                  }}>
                    {isDone ? '✓' : stepNum}
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 500, color: isActive ? 'var(--dt-text-primary)' : 'var(--dt-text-faint)', whiteSpace: 'nowrap' }}>{label}</span>
                </div>
                {i < STEPS.length - 1 && (
                  <div style={{ flex: 1, height: 2, margin: '0 16px', background: isDone ? 'var(--dt-success)' : 'var(--dt-bg-overlay)', transition: 'background 200ms' }} />
                )}
              </div>
            )
          })}
        </div>

        {/* Step content */}
        {!completed && step === 1 && <WizardStep1 />}
        {!completed && step === 2 && <WizardStep2 form={form} updateForm={updateForm} />}
        {!completed && step === 3 && <WizardStep3 form={form} updateForm={updateForm} />}
        {!completed && step === 4 && <WizardStep4 form={form} />}

        {/* Success */}
        {completed && (
          <div style={{ textAlign: 'center', padding: '60px 0' }}>
            <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(16,185,129,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
              <svg width="32" height="32" fill="none" stroke="#10b981" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
            </div>
            <h2 style={{ fontSize: 24, fontWeight: 600, color: 'var(--dt-text-primary)', marginBottom: 12 }}>Space created successfully!</h2>
            <p style={{ fontSize: 15, color: 'var(--dt-text-muted)', maxWidth: 500, margin: '0 auto 32px', lineHeight: 1.6 }}>
              Your new Space "{form.spaceName || 'Untitled'}" is ready. Team members can now access it from the Space switcher.
            </p>
            <div style={{ background: 'var(--dt-bg-surface)', border: '1px solid #2a2a4a', borderRadius: 12, padding: 32, maxWidth: 400, margin: '0 auto', textAlign: 'left' }}>
              <h3 style={{ fontSize: 14, fontWeight: 600, color: 'var(--dt-text-primary)', marginBottom: 16 }}>Suggested next steps</h3>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
                {['Open your new Space and explore', 'Review member permissions', 'Create another Space for a different team', 'Assign dashboards and alerts'].map((t) => (
                  <li key={t} style={{ fontSize: 13, color: 'var(--dt-text-muted)', display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--dt-accent)', flexShrink: 0 }} />{t}
                  </li>
                ))}
              </ul>
            </div>
            <div style={{ marginTop: 32, display: 'flex', justifyContent: 'center', gap: 12 }}>
              <button onClick={() => navigate('/practitioner/home')} style={styles.primaryBtn}>Go to Space →</button>
              <button onClick={() => { setCompleted(false); setStep(1); setForm({ spaceName: '', description: '', selectedTag: null, selectedValue: null, selectedGroups: [], groupRoles: {} }) }} style={styles.secondaryBtn}>Create another</button>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      {!completed && (
        <div style={styles.footer}>
          <button onClick={prevStep} style={{ ...styles.secondaryBtn, visibility: step === 1 ? 'hidden' : 'visible' }}>
            ← Back
          </button>
          <div style={{ display: 'flex', gap: 12 }}>
            <button onClick={() => navigate('/central-team/dashboard')} style={styles.secondaryBtn}>Cancel</button>
            <button onClick={nextStep} disabled={!canNext} style={{ ...styles.primaryBtn, opacity: canNext ? 1 : 0.5, cursor: canNext ? 'pointer' : 'not-allowed' }}>
              {nextLabel} {step < 4 && '→'}
              {step === 4 && ' ✓'}
            </button>
          </div>
        </div>
      )}

      {/* Demo controls removed — step jumps are now in the sidebar */}
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  breadcrumb: {
    display: 'flex', alignItems: 'center', gap: 8,
    padding: '12px 24px', background: 'var(--dt-bg-raised)',
    borderBottom: '1px solid #2a2a4a', fontSize: 13,
  },
  stepper: {
    display: 'flex', alignItems: 'center', marginBottom: 48,
  },
  footer: {
    position: 'sticky', bottom: 0,
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '16px 40px', background: 'var(--dt-bg-base)',
    borderTop: '1px solid #2a2a4a',
  },
  primaryBtn: {
    padding: '10px 24px', borderRadius: 6, fontSize: 14, fontWeight: 500,
    background: 'var(--dt-accent)', border: 'none', color: '#fff', cursor: 'pointer',
    fontFamily: 'inherit', transition: 'opacity 150ms',
  },
  secondaryBtn: {
    padding: '10px 20px', borderRadius: 6, fontSize: 14, fontWeight: 500,
    background: 'var(--dt-bg-overlay)', border: '1px solid #3a3a5a', color: 'var(--dt-text-secondary)',
    cursor: 'pointer', fontFamily: 'inherit',
  },
}
