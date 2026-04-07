import type { CSSProperties } from 'react'

interface Props {
  message: string
  visible: boolean
}

export function Toast({ message, visible }: Props) {
  const style: CSSProperties = {
    position: 'fixed', bottom: 32, left: '50%',
    transform: `translateX(-50%) translateY(${visible ? 0 : 12}px)`,
    background: 'var(--dt-bg-overlay)', color: 'var(--dt-text-primary)',
    border: '1px solid var(--dt-border-default)',
    padding: '12px 24px', borderRadius: 'var(--dt-radius-lg)',
    fontSize: 13, fontWeight: 500, fontFamily: 'var(--dt-font-body)',
    boxShadow: 'var(--dt-shadow-lg)',
    opacity: visible ? 1 : 0, pointerEvents: 'none',
    transition: `opacity var(--dt-duration-base) var(--dt-ease), transform var(--dt-duration-base) var(--dt-ease)`,
    zIndex: 10000, display: 'flex', alignItems: 'center', gap: 10,
  }
  return (
    <div style={style}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--dt-accent)" strokeWidth="2.5">
        <path d="M22 11.08V12a10 10 0 11-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
      </svg>
      {message}
    </div>
  )
}
