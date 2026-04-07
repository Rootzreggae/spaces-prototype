import type { CSSProperties } from 'react'

type Variant = 'success' | 'warning' | 'error' | 'info' | 'purple'

const colors: Record<Variant, { bg: string; text: string }> = {
  success: { bg: 'rgba(16, 185, 129, 0.15)', text: '#34d399' },
  warning: { bg: 'rgba(245, 158, 11, 0.15)', text: '#fbbf24' },
  error:   { bg: 'rgba(239, 68, 68, 0.15)', text: '#f87171' },
  info:    { bg: 'rgba(59, 130, 246, 0.15)', text: '#60a5fa' },
  purple:  { bg: 'rgba(99, 102, 241, 0.15)', text: '#a5b4fc' },
}

interface Props {
  variant: Variant
  dot?: boolean
  children: React.ReactNode
}

export function StatusBadge({ variant, dot, children }: Props) {
  const c = colors[variant]
  const style: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
    padding: '4px 10px',
    borderRadius: 12,
    fontSize: 12,
    fontWeight: 600,
    background: c.bg,
    color: c.text,
  }
  return (
    <span style={style}>
      {dot && <span style={{ width: 6, height: 6, borderRadius: '50%', background: c.text }} />}
      {children}
    </span>
  )
}
