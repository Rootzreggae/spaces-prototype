import type { CSSProperties, ReactNode } from 'react'

interface Props {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md'
  children: ReactNode
  onClick?: () => void
  disabled?: boolean
  style?: CSSProperties
}

export function Button({ variant = 'primary', size = 'md', children, onClick, disabled, style }: Props) {
  const base: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    border: 'none',
    borderRadius: 'var(--dt-radius-md)',
    fontFamily: 'inherit',
    fontWeight: 500,
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
    transition: 'all 0.15s',
    padding: size === 'sm' ? '6px 14px' : '10px 20px',
    fontSize: size === 'sm' ? 12 : 14,
    ...style,
  }

  const variants: Record<string, CSSProperties> = {
    primary: { background: 'var(--dt-accent-blue)', color: '#fff' },
    secondary: { background: 'var(--dt-bg-elevated)', color: 'var(--dt-text-secondary)', border: '1px solid var(--dt-border-strong)' },
    ghost: { background: 'transparent', color: 'var(--dt-text-muted)' },
  }

  return (
    <button style={{ ...base, ...variants[variant] }} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  )
}
